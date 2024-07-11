import * as React from "react";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Button, Carousel, Form, Toast, ToastContainer} from "react-bootstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {ColDef} from "ag-grid-community";
import numeral from "numeral";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import AddDQE from "../AddDQE/AddDQE";
import {showAddDQE} from "../Slices/AddModalSlices";
import SearchDQE from "../SearchDQE/SearchDQE";
import {showSearchDQE} from "../Slices/SearchModalSlices";
import {Humanize} from "../Utils/Utils";
import PrintBL from "../ActionRenderer/PrintBL/PrintBL";

import AlertMessage from "../AlertMessage/AlertMessage";


const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

    case 'montant_qte' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'prix_unitaire' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    default:
      return <span>{value}</span>
  }

};

const DQE: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const[contrat,setContrat]=useState<string>('');
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
   const[resume,setResume]=useState<any>({});

  const gridRef = useRef(null);
  const { cid,av } = useParams();

  const defaultColDefs: ColDef = {
    sortable: true,
    resizable: true,
    minWidth: 200,
    autoHeight: true, wrapText: true,
    cellStyle: {textAlign: 'start', border: "none"},

  };

        const gridOptions:any = {
    pagination: true,
    defaultColDef:defaultColDefs,
    multiSortKey:'ctrl',
    animateRows:true,
  components: {
      InfoRenderer: InfoRenderer,
    },


    localeText: {
      // Default pagination text
      page: 'Page',
      to: 'à',
      of: 'sur',
      nextPage: 'Suivant',
      lastPage: 'Dernier',
      firstPage: 'Premier',
      previousPage: 'Precedent',


      loadingOoo: 'Chargement...',
      noRowsToShow: 'Pas de Données',

      // Add more custom texts as needed
    },
  };


    const getData = async(url:string) => {
        const contrat_id:string=encodeURIComponent(String(cid));
        const av_id:string=encodeURIComponent(String(av));
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/getdqe/?contrat__numero=${contrat_id}&contrat__avenant=${av_id}${url.replace('?',"&")}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setData(response.data.dqe);
          setResume(response.data.extra)
        })
        .catch((error:any) => {

        });


  }

  const msg = (s:string) => {
    alert(s)
  }

  const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/dqelistform/`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                    const updatedCols:any[] = [...response.data.fields,
                   
                    ];

                 setFields(updatedCols)



            })
            .catch((error:any) => {

            });

    }



       const handleRowClick = (event: any) => {
        setSelectedRows(event.data);

  };


     useEffect(() => {
    const paramsArray = Array.from(searchParams.entries());
    // Build the query string
    const queryString = paramsArray.reduce((acc, [key, value], index) => {
      if (index === 0) {
        return `?${key}=${encodeURIComponent(value)}`;
      } else {
        return `${acc}&${key}=${encodeURIComponent(value)}`;
      }
    }, '');

    getData(queryString);
  },[searchParams]);

      useEffect(() => {
        getFields();
    },[]);

    const dispatch=useDispatch();
    const addD = () => {
         dispatch(showAddDQE())

    }
      const searchD = () => {
        dispatch(showSearchDQE())

    }


  return (
      <>
          <AlertMessage/>
          <AddDQE refresh={()=>{getData('')}}/>
          <SearchDQE/>

          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                        
                              <div className="card-header py-3">
                              
                                    {av === '0' ? (
                                    <p className="text-primary m-0 fw-bold">DQE du Contrat Initial N° {cid} </p>
                                    ) : (
                                        <p className="text-primary m-0 fw-bold">DQE de l'avenant N° {av} du Contrat  N° {cid} </p>
                                    )}
 
                                  
                              </div>
                            
                              <div className="card-body ">
                                  <div className="row d-xxl-flex justify-content-xxl-center mb-4">
                                      


                                    <div className="row " >
                                        <div className="col-md-6 col-xl-3 mb-4">
                                            <div className="card shadow border-start-primary py-2">
                                            <div className="card-body" style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                <div className="row align-items-center no-gutters">
                                                <div className="col me-2">
                                                    <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                                                    <span style={{ fontSize: 12, color: "var(--bs-primary)" }}>
                                                        Montant (en HT)
                                                    </span>
                                                    </div>
                                                    <div
                                                    className="text-dark fw-bold h5 mb-0"
                                                    style={{ marginTop: "-6px" }}
                                                    >
                                                    <span style={{ fontSize: 14 }}>{Humanize(resume.ht)}DA</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i
                                                    className="fas fa-money-bill-wave fa-2x"
                                                    data-bs-toggle="tooltip"
                                                    style={{
                                                        color: "var(--bs-secondary-border-subtle)",
                                                        fontSize: 28,
                                                        marginTop: 4
                                                    }}
                                                    title="Ceci est votre solde de CV que vous pouvez à tout moment déposer sur votre compte et utiliser pour acheter les pronostics de votre choix"
                                                    />
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-3 mb-4">
                                            <div className="card shadow border-start-primary py-2">
                                            <div className="card-body" style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                <div className="row align-items-center no-gutters">
                                                <div className="col me-2">
                                                    <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                                                    <span style={{ fontSize: 12, color: "var(--bs-primary)" }}>
                                                        TVA 
                                                    </span>
                                                    </div>
                                                    <div
                                                    className="text-dark fw-bold h5 mb-0"
                                                    style={{ marginTop: "-6px" }}
                                                    >
                                                    <span style={{ fontSize: 14 }}>{Humanize(resume.tva)}%</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i
                                                    className="fas fa-percentage fa-2x"
                                                    data-bs-toggle="tooltip"
                                                    style={{
                                                        color: "var(--bs-secondary-border-subtle)",
                                                        fontSize: 28,
                                                        marginTop: 4
                                                    }}
                                                    title="Ceci est votre solde de CV que vous pouvez à tout moment déposer sur votre compte et utiliser pour acheter les pronostics de votre choix"
                                                    />
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-3 mb-4">
                                            <div className="card shadow border-start-primary py-2">
                                            <div className="card-body" style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                <div className="row align-items-center no-gutters">
                                                <div className="col me-2">
                                                    <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                                                    <span style={{ fontSize: 12, color: "var(--bs-primary)" }}>
                                                        Montant (EN TTC)
                                                    </span>
                                                    </div>
                                                    <div
                                                    className="text-dark fw-bold h5 mb-0"
                                                    style={{ marginTop: "-6px" }}
                                                    >
                                                    <span style={{ fontSize: 14 }}>{Humanize(resume.ttc)}DA</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i
                                                    className="fas fa-money-bill-wave fa-2x"
                                                    data-bs-toggle="tooltip"
                                                    style={{
                                                        color: "var(--bs-secondary-border-subtle)",
                                                        fontSize: 28,
                                                        marginTop: 4
                                                    }}
                                                    title="Ceci est votre solde de CR que vous pouvez retirer à tout moment de votre compte lorsque vous atteignez un plafond de retrait minimum de 20 €"
                                                    />
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>





                                  </div>
                                  <div className="row d-xxl-flex justify-content-xxl-center">
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                          <div className="btn-group" role="group">
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={addD}>
                                                  <i className="fas fa-plus" style={{marginRight: 5}}/>

                                                  Ajouter un dqe
                                              </button>
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={searchD}>
                                                  <i className="fas fa-search" style={{marginRight: 5}}/>
                                                  Rechercher
                                              </button>

                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      className="ag-theme-alpine mt-4"
                                      style={{ height: 500,width:"100%" }}

                                  >
                                    <AgGridReact ref={gridRef}
                                           rowData={data} columnDefs={fields}
                                           gridOptions={gridOptions}
                                           onRowClicked={handleRowClick}
                                           suppressContextMenu={true}


                                    />

                                  </div>
                                  <div className="row">
                                      <div className="col-md-6 align-self-center"/>
                                      <div className="col-md-6"/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <footer className="bg-white sticky-footer">
                      <div className="container my-auto">
                          <div className="text-center my-auto copyright"/>
                      </div>
                  </footer>
              </div>
          </div>

      </>
  );
};


export default DQE;
