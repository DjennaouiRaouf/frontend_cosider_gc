import * as React from "react";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {ColDef} from "ag-grid-community";
import numeral from "numeral";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {showAddBL} from "../Slices/AddModalSlices";
import AddBL from "../AddBL/AddBL";
import AlertMessage from "../AlertMessage/AlertMessage";
import {formatDate, Humanize} from "../Utils/Utils";
import SearchBL from "../SearchBL/SearchBL";
import {showSearchBL} from "../Slices/SearchModalSlices";
import BLOption from "../ActionRenderer/BLOption/BLOption";

const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;
   
  switch (props.column.colId) {

 
    case 'montant_creance' :
        if(value || value === 0){
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
        }else{
            return <span></span>
        }
    case 'montant_cumule' :
        if(value || value === 0){
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
        }else{
            return <span></span>
        }
        
    case 'montant_encaisse' :
        if(value || value === 0){
            return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
        }else{
            return <span></span>
        }         
    
    
    case 'date' :
      return <span>{formatDate(value)}</span>

      default:
        return <span>{value}</span>
  }

};

const Encaissements: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const[contrat,setContrat]=useState<string>('');
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const gridRef = useRef(null);
  const { cid } = useParams();
  const[resume,setResume]=useState<any>({});
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
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/getenc/?facture__contrat__numero=${contrat_id}${url.replace('?',"&")}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setData(response.data.enc);
          setResume(response.data.extra);
        })
        .catch((error:any) => {

        });


  }



  const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/enclistform/`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                    const updatedCols:any[] = [...response.data.fields
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

  return (
      <>
          <AlertMessage/>
        

          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Encaissements du Contrat N° {cid} </p>
                              </div>
                              <div className="card-body">
                                  <div className="row d-xxl-flex justify-content-xxl-center mb-4">



                                    
                                  <div className="row " >
                                        <div className="col-md-6 col-xl-3 mb-4">
                                            <div className="card shadow border-start-primary py-2">
                                            <div className="card-body" style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                <div className="row align-items-center no-gutters">
                                                <div className="col me-2">
                                                    <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                                                    <span style={{ fontSize: 12, color: "var(--bs-primary)" }}>
                                                        Montant Global Encaissé 
                                                    </span>
                                                    </div>
                                                    <div
                                                    className="text-dark fw-bold h5 mb-0"
                                                    style={{ marginTop: "-6px" }}
                                                    >
                                                    <span style={{ fontSize: 14 }}>{Humanize(resume.mge)}DA</span>
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
                                                        Montant Global En Créance
                                                    </span>
                                                    </div>
                                                    <div
                                                    className="text-dark fw-bold h5 mb-0"
                                                    style={{ marginTop: "-6px" }}
                                                    >
                                                    <span style={{ fontSize: 14 }}>{Humanize(resume.mgc)} DA</span>
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
                                       
                                    </div>



                                  </div>
                                  <div className="row d-xxl-flex justify-content-xxl-center">
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                      </div>
                                  </div>
                                  <div
                                        className="ag-theme-alpine mt-4"
                                                                                             style={{overflowY:"hidden",width:"100%"  }}

                                  >
                                    <AgGridReact  ref={gridRef}
                                                    
                                           rowData={data} columnDefs={fields}
                                           gridOptions={gridOptions}
                                           onRowClicked={handleRowClick}
                                                 groupDisplayType={"multipleColumns"}
                                                 suppressContextMenu={true}
                                                 animateRows={true}
                                                 groupSelectsChildren={true}
                                                 rowSelection="multiple"
domLayout='autoHeight'

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


export default Encaissements;


