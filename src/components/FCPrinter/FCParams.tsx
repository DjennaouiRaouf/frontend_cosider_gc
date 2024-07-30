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
import {Button,Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useDispatch} from "react-redux";



const FCParams: React.FC<any> = () => {
    const [display, setDisplay] = useState(true);
     const [selectedOption, setSelectedOption] = useState<string[]>([]);
    const [options,setOptions]=useState<string[]>([]);
    const navigate=useNavigate();
    const[minDate,setMinDate]=useState<any>(null);
    const[maxDate,setMaxDate]=useState<any>(null);
    const[du,setDu]=useState<any>(null);
    const[au,setAu]=useState<any>(null);
    
    const hide = () => setDisplay(false);
  const show = () => setDisplay(true);
  const valider = () => {
    hide();
    const val:string=selectedOption[0]
     navigate(`${encodeURIComponent(val)}/${encodeURIComponent(du)}/${encodeURIComponent(au)}`, )

  }


            
  const getContrats = async() => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/contractkeys/`,{
         headers: {
             'Content-Type': 'application/json',

         },
     })
         .then((response:any) => {

              setOptions(response.data)



         })
         .catch((error:any) => {

         });


  }

    const handleChange = async(selected:any) => {
    setSelectedOption(selected);
    const cid:string=encodeURIComponent(selected[0]);
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/dateinv/?cid=${cid}`,{
      headers: {
          'Content-Type': 'application/json',

      },
  })
      .then((response:any) => {

          setMinDate(response.data.min_date)
          setMaxDate(response.data.max_date)


      })
      .catch((error:any) => {

      });



  };
  const setFromDate=(e:any)=>{
    setDu(e.target.value);
  }
  
  const setToDate=(e:any)=>{
    setAu(e.target.value);
  }

 useEffect(() => {
        getContrats();
    },[]);


  return (
      <>
      <Modal
        show={display}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Saisir le numero du contrat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3">
                                          <label className="form-label" htmlFor="username">
                                              <strong>
                                                  Numero du Contrat
                                              </strong>
                                          </label>
                                                                <>
                                                                    <Typeahead
                                                                        id={'contrat_id'}
                                                                         onChange={handleChange}
                                                                          options={options}
                                                                          selected={selectedOption}
                                                                          placeholder="Choisir un contrat"

                                                                    />
                                                                </>
        </div>
        {
          selectedOption[0] &&
          <>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                                                      <strong>
                                                          Du
                                                      </strong>
                                                  </label>
                  <input className="form-control" type="date"    min={minDate} max={maxDate} 
                  onChange={(e:any)=>setFromDate(e)}/>
                </div>
            
                <div className="mb-3">
                <label className="form-label" htmlFor="username">
                                                      <strong>
                                                          Au
                                                      </strong>
                                                  </label>
                  <input className="form-control" type="date"   min={minDate} max={maxDate} 
                  onChange={(e:any)=>setToDate(e)}/>
                </div>
  
          </>
        }    
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{background: "#df162c", borderWidth: 0}} onClick={valider}>
            Envoyer
          </Button>
        </Modal.Footer>
      </Modal>


      </>
  );
};


export default FCParams;
