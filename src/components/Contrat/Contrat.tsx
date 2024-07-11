import * as React from "react";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { ColDef } from "ag-grid-enterprise";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import numeral from "numeral";
import {Button,Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useDispatch} from "react-redux";
import {showAddAvenant, showAddContrat} from "../Slices/AddModalSlices";
import AddContrat from "../AddContrat/AddContrat";
import {showSearchContrat} from "../Slices/SearchModalSlices";
import SearchContrat from "../SearchContrat/SearchContrat";
import Badge from 'react-bootstrap/Badge';
import AddAvenant from "../AddAvenant/AddAvenant";
import {fetchFields, fetchState, showEdit} from "../Slices/EditModalSlices";

const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;
  
  const dispatch=useDispatch();
  const addAvenant = () =>{
    let id=encodeURIComponent(props.data.id)
    
    dispatch(fetchFields(`/forms/contrataddupdateform/?id=${id}`))
    dispatch(fetchState(`/forms/contrataddupdateform/?id=${id}`))
    dispatch(showEdit({id:props.data.id}))
  }

  switch (props.column.colId) {

    case 'montant_ht' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'montant_ttc' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>
    case 'avenant':
      if(value || value === 0)
      {
          return <button className="btn btn-primary btn-sm" onClick={addAvenant} data-bs-toggle="tooltip" data-bs-placement="bottom"  title={"Ajouter Avenant N° "+(value+1)} style={{background: "#df162c", borderWidth: 0}} type="button">
          {value}
        </button> 
          
      }else{
          return <span></span>
      }
      

    case 'rg':
      if(value)
      {
        return <span>{value+" %"}</span>
      }else{
        return <span></span>
      }
    case 'tva':
      if(value)
        {
          return <span>{value+" %"}</span>
        }else{
          return <span></span>
        }
    case 'rabais':
      if(value)
        {
          return <span>{value+" %"}</span>
        }else{
          return <span></span>
        }
    default:
      return <span>{value}</span>
  }

};

const Contrat: React.FC<any> = () => {
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
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/getcontract/${url}`,{
      headers: {
        //Authorization: `Token ${Cookies.get('token')}`,
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
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/contratlistform/`,{
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
      dispatch(showAddContrat())
    }
      const searchC = () => {
      dispatch(showSearchContrat())
    }

  return (
      <>
          <>
            <AddContrat refresh={()=>{getData('')}}/>
            <AddAvenant refresh={()=>{getData('')}}/>
            
            <SearchContrat/>
          </>
          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Nos Contrats</p>
                              </div>
                              <div className="card-body">

                                  <div className="row d-xxl-flex justify-content-xxl-center">
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                          <div className="btn-group" role="group">
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={addC}>
                                                  <i className="fas fa-plus" style={{marginRight: 5}}/>
                                                  Nouveau Contrat
                                              </button>
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={searchC}>
                                                  <i className="fas fa-search" style={{marginRight: 5}}/>
                                                  Rechercher
                                              </button>

                                          </div>
                                      </div>
                                  </div>
                                  <div
                                        className="ag-theme-alpine mt-4"
                                                                                             style={{overflowY:"hidden",width:"100%" }}


                                  >
                                    <AgGridReact ref={gridRef}
                                           suppressAggFuncInHeader={true}

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

export default Contrat;
