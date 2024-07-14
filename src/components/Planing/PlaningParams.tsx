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


const PlaningParams: React.FC<any> = () => {
    const [display, setDisplay] = useState(true);
     const [selectedAvenant, setSelectedAvenant] = useState<string[]>([]);
    const [selectedContrat, setSelectedContrat] = useState<string[]>([]);

     const [avenant,setAvenant]=useState<string[]>([]);
    const [contrat,setContrat]=useState<string[]>([]);

    const navigate=useNavigate();
    const hide = () => setDisplay(false);
  const show = () => setDisplay(true);
  const valider = () => {
    hide();
    const val:string=selectedContrat[0]
    const val2:string=selectedAvenant[0]
    navigate(`liste_planing/${encodeURIComponent(val)}/${encodeURIComponent(val2)}`, )

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

  const getAvenant = async(c:string) => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/avenant/?num=${encodeURIComponent(c)}`,{
         headers: {
             'Content-Type': 'application/json',

         },
     })
         .then((response:any) => {
            setAvenant(response.data)




         })
         .catch((error:any) => {
            setAvenant([])
         });


}


    const handleChange = (selected:any) => {
    setSelectedAvenant(selected);


  };
    const handleChange2 = (selected:any) => {
    setSelectedContrat(selected);
    getAvenant(selected[0])


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
              <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                      <strong>
                          N° d'avenant
                      </strong>
                  </label>
                  <>
                      <Typeahead
                          id={'contrat_id'}
                           
                          onChange={handleChange}
                          options={avenant}
                          selected={selectedAvenant}
                          placeholder="Choisir un Avenant"

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


export default PlaningParams;
