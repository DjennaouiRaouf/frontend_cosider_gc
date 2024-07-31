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
import contrat from "../Contrat/Contrat";


const InvoiceParams: React.FC<any> = () => {
    const [display, setDisplay] = useState(true);
    const [selectedContrat, setSelectedContrat] = useState<string[]>([]);
    const [contrat,setContrat]=useState<string[]>([]);

    const navigate=useNavigate();
    const hide = () => setDisplay(false);
  const show = () => setDisplay(true);
  const valider = () => {
    hide();
    const val:string=selectedContrat[0]
    navigate(`liste_f/${encodeURIComponent(val)}`, )

  }

  const getContrat = async() => {
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/contractkeys/`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                
                 setContrat(response.data)

            })
            .catch((error:any) => {
                setContrat([])
            });


  }

 

 
    const handleChange2 = (selected:any) => {
    setSelectedContrat(selected);
 

  };

 useEffect(() => {
        getContrat();
    },[]);


  return (
      <>
      <Modal
        show={display}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Saisir le N° Contrat + N° d'avenant</Modal.Title>
        </Modal.Header>
          <Modal.Body>
              <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                      <strong>
                          N° Contrat
                      </strong>
                  </label>
                  <>
                      <Typeahead
                          id={'contrat_id'}

                          onChange={handleChange2}
                          options={contrat}
                          selected={selectedContrat}
                          placeholder="Choisir un Contrat"

                      />
                  </>
              </div>
 
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


export default InvoiceParams;
