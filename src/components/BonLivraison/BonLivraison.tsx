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
import {displayAlertMessage, Variant} from "../Slices/AlertMessageSlices";
const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {


    case 'montant' :
        return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'montant_cumule' :
        return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>


    case 'date' :
      return <span>{formatDate(value)}</span>

      default:
        return <span>{value}</span>
  }

};

const BonLivraison: React.FC<any> = () => {
    
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
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/getbl/?contrat=${contrat_id}${url.replace('?',"&")}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {
          setData(response.data.bl);
          setResume(response.data.extra)
        })
        .catch((error:any) => {

        });


  }



  const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/bllistform/`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                    const updatedCols:any[] = [...response.data.fields,
                     
                        {
                             headerName:' ',
                            cellRenderer:BLOption,
                             minWidth: 50,
                              cellRendererParams:{
                                refresh:getData,

                              }

                        }


                    ];

                 setFields(updatedCols)



            })
            .catch((error:any) => {

            });

    }


    const [gridApi, setGridApi] = useState<any>(null);
    const onGridReady = (params:any) => {
        setGridApi(params.api);
      };
       const handleRowClick = (event: any) => {
        const selected = gridApi.getSelectedRows();
        setSelectedRows(selected)

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
    const addBL = () => {
         dispatch(showAddBL())

    }
      const searchBL = () => {
        dispatch(showSearchBL())
    }

    const rmBL = async() => {
        console.log(selectedRows.length)
        if(selectedRows.length){
            const pks: any[] = []
            selectedRows.forEach(obj => {
                pks.push(obj['id'])
            });
            const pkList: any = {}
            pkList['id'] = pks;
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api_gc/delbl/`, {
                headers: {
                   Authorization: `Token ${Cookies.get("token")}`,
                   'Content-Type': 'application/json',
                 },
                data:pkList,
    
             })
             .then(response => {
                    getData('');
                    setSelectedRows([]);
                    console.log(response)
                    dispatch(displayAlertMessage({variant:Variant.SUCCESS,message:'Bon de livraison Annulé'}))


             })
             .catch(error => {
                getData('');
                setSelectedRows([]);
                dispatch(displayAlertMessage({variant:Variant.DANGER,message:JSON.stringify(error.response.data,null,2)}))
             });
        }else{
            dispatch(displayAlertMessage({variant:Variant.DANGER,message:"Vous n'avez pas selectionné les BL à supprimer"}))
        }
        
    }

  return (
      <>
          <AlertMessage/>
            <AddBL refresh={()=>{getData('')}}/>
            <SearchBL/>

          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Bon de livraison du Contrat N° {cid} </p>
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
                                                        Montant Global (BL) 
                                                    </span>
                                                    </div>
                                                    <div
                                                    className="text-dark fw-bold h5 mb-0"
                                                    style={{ marginTop: "-6px" }}
                                                    >
                                                    <span style={{ fontSize: 14 }}>{Humanize(resume.mg)}DA</span>
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
                                                        Solde 
                                                    </span>
                                                    </div>
                                                    <div
                                                    className="text-dark fw-bold h5 mb-0"
                                                    style={{ marginTop: "-6px" }}
                                                    >
                                                    <span style={{ fontSize: 14 }}>{Humanize(resume.solde)} DA</span>
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
                                                        Ecart 
                                                    </span>
                                                    </div>
                                                    <div
                                                    className="text-dark fw-bold h5 mb-0"
                                                    style={{ marginTop: "-6px" }}
                                                    >
                                                        { resume.ecart < 0 ?
                                                            
                                                            <span style={{ fontSize: 14 ,color : "#df162c" }}>
                                                                <i
                                                                    className="fas fa-exclamation-triangle"
                                                                    style={{ color: "#df162c", fontSize: 16, marginRight:5}}
                                                                    />

                                                                {Humanize(resume.ecart)} DA</span>
                                                            :
                                                            <span style={{ fontSize: 14 }}>{Humanize(resume.ecart)} DA</span>
                                                            
                                                        }
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
                                    { resume.ecart < 0 &&
                                                            
                                    <div className="col-md-6 col-xl-3 mb-4">
                                            <div className="card shadow border-start-primary py-2">
                                            <div className="card-body" style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                <div className="row align-items-center no-gutters">
                                                <div className="col me-2">
                                                    <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                                                    <span style={{ fontSize: 12, color: "var(--bs-primary)" }}>
                                                        Date Dépassement 
                                                    </span>
                                                    </div>
                                                    <div
                                                    className="text-dark fw-bold h5 mb-0"
                                                    style={{ marginTop: "-6px" }}
                                                    >
                                                    <span style={{ fontSize: 14 ,color : "#df162c" }}>
                                                        <i
                                                            className="fas fa-exclamation-triangle"
                                                            style={{ color: "#df162c", fontSize: 16, marginRight:5}}
                                                        />

                                                        {resume.date || 'JJ-MM-AAAA'}</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i
                                                    className="fas fa-calendar-alt fa-2x"
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
                                        }








                                  </div>
                                  <div className="row d-xxl-flex justify-content-xxl-center">
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                          <div className="btn-group" role="group">
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={addBL}>
                                                  <i className="fas fa-plus" style={{marginRight: 5}}/>
                                                  Ajouter un Bon de livraison
                                              </button>
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}}
                                                      onClick={rmBL}>
                                                  <i className="fas fa-trash" style={{marginRight: 5}}/>
                                                  Annuler
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                                  <div
                                        className="ag-theme-alpine mt-4"
                                                                                             style={{overflowY:"hidden",width:"100%" ,position: 'relative', zIndex: 1 }}

                                  >
                                    <AgGridReact ref={gridRef} onGridReady={onGridReady}
                                
                                    domLayout='autoHeight'
                                    suppressContextMenu={true}
                                           rowData={data} columnDefs={fields}
                                           gridOptions={gridOptions}
                                           onRowClicked={handleRowClick}
                                                    rowSelection="multiple"

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


export default BonLivraison;


