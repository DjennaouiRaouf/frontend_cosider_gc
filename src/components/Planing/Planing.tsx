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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import {Button,Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useDispatch} from "react-redux";
import {showAddPlaning} from "../Slices/AddModalSlices";
import {fetchFields, fetchState, showEdit} from "../Slices/EditModalSlices";
import {useParams} from "react-router-dom";
import AddPlaning from "../AddPlaning/AddPlaning";
import Cookies from "js-cookie";
import DQECumule from "../DQE/DQECumule";
const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;
  
  const dispatch=useDispatch();
  
  switch (props.column.colId) {
    default:
      return <span>{value}</span>
  }

};

const Planing: React.FC<any> = () => {
  const[fields,setFields]=useState<any[]>([]);
  const[data,setData]=useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const { cid,av } = useParams();
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
      const idc :string=encodeURIComponent(String(cid));
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/getplaning/?contrat=${idc}`,{
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
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/planinglistform/`,{
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
      dispatch(showAddPlaning());
    }
      const searchC = () => {
      
    }

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    
    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {

      const file = event.target.files?.[0];
        const formData = new FormData();
        if (file) {
          formData.append('file', file);
          formData.append('contrat',String(cid));
        }
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api_gc/importplaning/`, formData, {
          headers: {
            Authorization: `Token ${Cookies.get("token")}`,
            'Content-Type': 'multipart/form-data',
          },

        })
            .then((response: any) => {
              
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
                 const paramsArray = Array.from(searchParams.entries());
                const queryString = paramsArray.reduce((acc, [key, value], index) => {
                  if (index === 0) {
                    return `?${key}=${encodeURIComponent(value)}`;
                  } else {
                    return `${acc}&${key}=${encodeURIComponent(value)}`;
                  }
                }, '');

                getData(queryString);

            })
            .catch((error: any) => {
                console.log(error)
             
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }

            });
    }
    
    const handleAddMulitplePl = () => {

      if (fileInputRef.current) {
        fileInputRef.current.click();
      }

};





    const handleTemplate = async () => {
       const contrat_id:string=encodeURIComponent(String(cid));
      try {
        // Make a GET request to the Django endpoint
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api_gc/dqecumuleplaning/?contrat_id=${contrat_id}`); // Adjust URL as necessary
  
        // Check if request was successful
        if (!response.ok) {
          throw new Error('Failed to download file');
        }
  
        // Convert blob response to Blob object
        const blob = await response.blob();
  
        // Create download link
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'exported_data.xlsx');
        document.body.appendChild(link);
        
        // Trigger download
        link.click();
  
        // Clean up
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }

    const deletePlaning = () =>{
        
    }


  return (
      <>
          <>
              <input
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                  hidden={true}
                  style={{display: 'none'}}
                  ref={(input) => (fileInputRef.current = input)}
              />
          </>
          <>
            <AddPlaning refresh={()=>getData('')}/>         
          </>
          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <div className="container-fluid">
                          <div className="card shadow">
                              <div className="card-header py-3">
                                  <p className="text-primary m-0 fw-bold">Nos Planings</p>
                              </div>
                              <div className="card-body">

                                  <div className="row d-xxl-flex justify-content-xxl-center">
                                      <div className="col d-xxl-flex justify-content-xxl-end">
                                          <div className="btn-group" role="group">
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={addC}>
                                                  <i className="fas fa-plus" style={{marginRight: 5}}/>
                                                  Nouveau Planing
                                              </button>
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={searchC}>
                                                  <i className="fas fa-search" style={{marginRight: 5}}/>
                                                  Rechercher
                                              </button>
                                              <button className="btn btn-primary" type="button"
                                                      style={{background: "#df162c", borderWidth: 0}} onClick={deletePlaning}>
                                                  <i className="fas fa-search" style={{marginRight: 5}}/>
                                                  Supprimer
                                              </button>


                                              <div className="dropdown">
  <button
    className="btn btn-primary dropdown-toggle"
    aria-expanded="false"
    data-bs-toggle="dropdown"
    type="button"
    style={{ background: "#df162c", borderWidth: 0, borderTopLeftRadius:0,borderBottomLeftRadius:0 }}
  >
    <i className="fas fa-arrow-right" />
    &nbsp;Transfer
  </button>
  <div className="dropdown-menu" style={{cursor: 'pointer'}}>
  <a className="dropdown-item" onClick={handleTemplate} >
                                                        <i className="fas fa-download" style={{marginRight: 5}}/>Format du Planing  (.xlsx)
                                                      </a>
                                              
  <a className="dropdown-item" onClick={handleAddMulitplePl } >
                                                        <i className="fas fa-upload" style={{marginRight: 5}}/>Chargement (.xlsx)
                                                      </a>
                                              

  </div>
</div>

        


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

export default Planing;
