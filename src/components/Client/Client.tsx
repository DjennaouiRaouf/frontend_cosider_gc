import * as React from "react";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {ColDef} from "ag-grid-community";
import numeral from "numeral";
import {Button,Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useDispatch} from "react-redux";
import {showAddClient} from "../Slices/AddModalSlices";
import Cookies from "js-cookie";
import {showSearchClient} from "../Slices/SearchModalSlices";
import AddClient from "../AddClient/AddClient";
import SearchClient from "../SearchClient/SearchClient";



const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

    case 'montant_ht' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'montant_ttc' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'rg':
      return <span>{value+" %"}</span>
    case 'tva':
      return <span>{value+" %"}</span>
    case 'rabais':
      return <span>{value+" %"}</span>
    default:
      return <span>{value}</span>
  }

};

const Client: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const gridRef = useRef(null);

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
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/getclient/${url}`,{
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
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/clientlistform/`,{
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
    const addC = () => {
      dispatch(showAddClient())
    }
      const searchC = () => {
      dispatch(showSearchClient())
    }


  return (
      <>
          <>
              <AddClient refresh={()=>{getData('')}}/>
              <SearchClient/>
          </>
          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Nos Clients</p>
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
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={addC}>
                                                  Nouveau Client
                                              </button>
                                              <button className="btn btn-primary" type="button"style={{background: "#df162c", borderWidth: 0}} onClick={searchC}>
                                                  Rechercher
                                              </button>
                                              <div className="dropdown btn-group" role="group">
                                                  <button
                                                      className="btn btn-primary dropdown-toggle"
                                                      aria-expanded="false"
                                                      data-bs-toggle="dropdown"
                                                      type="button"
                                                  >
                                                      Dropdown{" "}
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

export default Client;
