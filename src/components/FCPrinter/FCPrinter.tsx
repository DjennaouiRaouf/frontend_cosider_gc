import {forwardRef,useRef, useEffect, useState} from 'react';
import "./FCPrinter.css"
import { Humanize } from '../Utils/Utils';
import axios from "axios";
import Cookies from "js-cookie";
import logo_cc from "./logo_cc.png";
import {useParams, useSearchParams} from "react-router-dom";

interface FCPrinterProps {
  //
}

const FCPrinter: React.FC<FCPrinterProps> = (props) => {

    const componentRef:any= useRef();
    
    const [facture,setFacture]=useState<any[]>([]);
    const [extra,setExtra]=useState<any>({});

    const { cid,du,au } = useParams();
    const getData = async()=>{
        const c:string=encodeURIComponent(String(cid));
        const d:string=encodeURIComponent(String(du));
        const a:string=encodeURIComponent(String(au));

        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/printenc/?contrat__numero=${c}&date_op_after=${du}&date_op_before=${au}`, {
            headers: {
               Authorization: `Token ${Cookies.get("token")}`,
               'Content-Type': 'application/json',
             },
           
         })
         .then(response => {
            setFacture(response.data.fc)
            setExtra(response.data.extra)
         
         })
         .catch(error => {

         });
         


    }

    useEffect(() => {
       getData();
      }, []);

    
  
      return (
      
      <>


  <div
    ref={componentRef}
    className="container-fluid "
    style={{
      width: "21cm",
      borderWidth: 1,
      borderStyle: "solid",
      fontSize: 12,
      paddingRight: 0,
      paddingLeft: 0,
      overflow: "hidden",
      marginTop: 0
    }}
  >
    <div
      className="row"
      style={{
        marginBottom: 10,
        marginRight: 0,
        marginLeft: 0,
        marginTop: 0,
        height: "117.4px",
        width: "initial",
        fontSize: 12,
        borderWidth: 5,
        borderStyle: "solid",
        borderTopWidth: 0,
        borderTopStyle: "solid",
        borderRightWidth: 0,
        borderRightStyle: "solid",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderLeftWidth: 0,
        borderLeftStyle: "solid"
      }}
    >
      <div 
        className="col-auto col-sm-4 d-lg-flex justify-content-lg-center"
        style={{ borderRightWidth: 1, borderRightStyle: "solid" }}
      >
        <img
          src={logo_cc}
          style={{ width: "6.5cm", height: "3cm" }}
          width={265}
          height={113}
        />
      </div>
      <div
        className="col-auto col-sm-4"
        style={{ borderRightWidth: 1, borderRightStyle: "solid" }}
      >
        <div className="row">
          <div className="col text-center">
            <h6 className="text-center" style={{ fontSize: 12 }}>
              MANUEL D'ORGANISATION
            </h6>
            <h6 className="text-center" style={{ fontSize: 12 }}>
              ENREGISTEMENT
            </h6>
          </div>
        </div>
        <div
          className="row"
          style={{ borderTopWidth: 1, borderTopStyle: "solid" }}
        >
          <div className="col" style={{ paddingTop: 20 }}>
            <h6 className="text-center" style={{ fontSize: 12 }}>
              Fiche Client
            </h6>
          </div>
        </div>
      </div>
      <div className="col-auto col-sm-4" style={{ borderRightWidth: 0 }}>
        <div className="row">
          <div className="col text-center">
            <h6 className="text-center" style={{ fontSize: 12 }}>
              INDICE DE REVISION :&nbsp;
            </h6>
            <h6 className="text-center" style={{ fontSize: 12 }}>
              {extra.rev}
            </h6>
          </div>
        </div>
        <div
          className="row"
          style={{ borderTopWidth: 1, borderTopStyle: "solid" }}
        >
          <div className="col" style={{ paddingTop: 20 }}>
            <h6 className="text-center" style={{ fontSize: 12 }}>
              Réf :&nbsp; &nbsp;{extra.ref}
            </h6>
          </div>
        </div>
        <div />
      </div>
    </div>
    <div
      className="row"
      style={{
        marginBottom: 10,
        marginRight: 0,
        marginLeft: 0,
        marginTop: 0,
        height: "157.4px",
        width: "initial",
        fontSize: 12,
        borderWidth: 5,
        borderStyle: "solid",
        borderTopWidth: 0,
        borderTopStyle: "solid",
        borderRightWidth: 0,
        borderRightStyle: "solid",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderLeftWidth: 0,
        borderLeftStyle: "solid"
      }}
    >
      <div
        className="col-auto col-sm-4 d-lg-flex justify-content-lg-center"
        style={{ width: "100%", borderRightWidth: 0, borderRightStyle: "solid" }}
      >
        <div className="text-start" style={{ width: "100%" }}>
          <label className="form-label">Unité :&nbsp;</label>
          <label className="form-label" style={{ width: "89%" }}>
            {extra.unite}
          </label>
          <label className="form-label" style={{ marginTop: 0 }}>
            Code Client :&nbsp;{extra.code_client}
          </label>
          <br/>
          <label className="form-label" style={{ marginTop: 0 }}>
            Raison Sociale :&nbsp; { extra.rs}
          </label>
          <br/>
          <label className="form-label" style={{ marginTop: 0 }}>
            Adresse :&nbsp; { extra.adresse}
          </label>
          <br/>
          <label className="form-label" style={{ marginTop: 0 }}>
            N° IF :&nbsp;{ extra.nif}
          </label>
          <br/>
          <label className="form-label" style={{ width:'100%', marginTop: 0 }}>
            N° RC :&nbsp; { extra.nrc}
          </label>
          <br/>
          
        </div>
      </div>
      
    </div>
    <div style={{ margin:5, overflow: "hidden" }}>
    
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
          <th>
              <strong>N°.Facture</strong>
            </th>
            <th>
              <strong>Date Op</strong>
            </th>
            <th>
              <strong>Facturation</strong>
            </th>
            <th><strong>Encaissement</strong></th>
            <th><strong>Creances</strong></th>
          </tr>
        </thead>
        <tbody>
        {facture?.map((item:any, index:any) => (
          <tr key={index}>
            <td>{item.id.split('_')[1]}</td>
            <td>{item.date}</td>
            <td>{Humanize(item.montant_facture_ttc)}</td>
            
            { item.enc.length > 0 ?
                <td>
                  <table>
                    <tbody>
                    {item.enc?.map((item2:any, index2:any) => (
                      <tr key={index2}>
                      <td>{Humanize(item2.montant_encaisse)}</td>
                    </tr>
                    ))}
                    </tbody>
                  </table>
                </td>:
                <td>{Humanize(0)}</td>
            }
            
            { item.enc.length > 0 ?
                <td>
                <table>
                  <tbody>
                  {item.enc?.map((item3:any, index3:any) => (
                    <tr key={index3}>
                    <td>{Humanize(item3.montant_creance)}</td>
                  </tr>
                  ))}
                  </tbody>
                </table>
                </td>:
                <td>{Humanize(item.montant_facture_ttc)}</td>
            }    
          
          </tr>

             
        ))}
          
        </tbody>
      </table>
    </div>
    <div
      className="row text-end"
      style={{
        pageBreakInside: "avoid",
        borderWidth: 1,
        marginRight:'0.5mm',
        marginLeft:'0.5mm',
        borderStyle: "solid",
        borderRightStyle: "none",
        borderBottomStyle: "none",
        borderLeftStyle: "none"
      }}
    >
      <div className="col">
        <div className="row" style={{ height: 26 }}>
          <div className="col">
            <label className="col-form-label">
              <strong>Total Facturé :&nbsp;&nbsp;{Humanize(extra.tf)} DA &nbsp;</strong>
            </label>
          </div>
        </div>
        <div className="row" style={{ height: 26 }}>
          <div className="col">
            <label className="col-form-label">
              <strong>Total Encaissé :&nbsp;&nbsp;{Humanize(extra.te)} DA &nbsp;</strong>
            </label>
          </div>
        </div>
        <div className="row" style={{ height: 26 }}>
          <div className="col">
            <label className="col-form-label">
              <strong>Solde :&nbsp;&nbsp;{Humanize(extra.solde)} DA &nbsp;</strong>
            </label>
          </div>
        </div>

       
       
      </div>
    </div>






  
  
  
  </div>
    <style>
          
              {`
                @media print {
                @page {
                  size: A4 portrait;
                  
              }
              }   
          `}

    </style>


      
</>
  )
};

export default FCPrinter;

