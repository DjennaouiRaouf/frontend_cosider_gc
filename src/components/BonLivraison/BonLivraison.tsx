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

const BonLivraison: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const[contrat,setContrat]=useState<string>('');
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const gridRef = useRef(null);
  const { cid } = useParams();

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
          setData(response.data);
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

                 setFields(response.data.fields)



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
    const addBL = () => {
         dispatch(showAddBL())

    }
      const searchBL = () => {

    }


  return (
      <>
            <AddBL refresh={()=>{getData('')}}/>
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
                                      <div className="col-md-6 col-xxl-3">
                                          <div className="card shadow border-start-success py-2">
                                              <div className="card-body">
                                                  <div className="row align-items-center no-gutters">
                                                      <div className="col me-2">
                                                          <div
                                                              className="text-uppercase text-success fw-bold text-xs mb-1">
                                                              <span>Earnings (annual)</span>
                                                          </div>
                                                          <div className="text-dark fw-bold h5 mb-0">
                                                              <span>$215,000</span>
                                                          </div>
                                                      </div>
                                                      <div className="col-auto">
                                                          <i className="fas fa-dollar-sign fa-2x text-gray-300"/>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 col-xxl-2">
                                          <div className="card shadow border-start-success py-2">
                                              <div className="card-body">
                                                  <div className="row align-items-center no-gutters">
                                                      <div className="col me-2">
                                                          <div
                                                              className="text-uppercase text-success fw-bold text-xs mb-1">
                                                              <span>Earnings (annual)</span>
                                                          </div>
                                                          <div className="text-dark fw-bold h5 mb-0">
                                                              <span>$215,000</span>
                                                          </div>
                                                      </div>
                                                      <div className="col-auto">
                                                          <i className="fas fa-dollar-sign fa-2x text-gray-300"/>
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
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={addBL}>
                                                  Ajouter un Bon de livraison
                                              </button>
                                              <button className="btn btn-primary" type="button"style={{background: "#df162c", borderWidth: 0}} onClick={searchBL}>
                                                  Rechercher
                                              </button>
                                              <div className="dropdown btn-group" role="group" >
                                                  <button
                                                      className="btn btn-primary dropdown-toggle" style={{background: "#df162c", borderWidth: 0}}
                                                      aria-expanded="false"
                                                      data-bs-toggle="dropdown"
                                                      type="button"
                                                  >
                                                      Imprimer{" "}
                                                  </button>
                                                  <div className="dropdown-menu">
                                                      <a className="dropdown-item" href="#">
                                                          First Item
                                                      </a>
                                                      <a className="dropdown-item" href="#">
                                                          Second Item
                                                      </a>
                                                      <a className="dropdown-item" href="#">
                                                          Third Item
                                                      </a>
                                                  </div>
                                              </div>

                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      id="dataTable"
                                      className="table-responsive table mt-2 ag-theme-alpine"
                                      role="grid"
                                      aria-describedby="dataTable_info"
                                      style={{ height: 500 }}

                                  >
                                    <AgGridReact ref={gridRef}
                                           rowData={data} columnDefs={fields}
                                           gridOptions={gridOptions}
                                           onRowClicked={handleRowClick}


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


