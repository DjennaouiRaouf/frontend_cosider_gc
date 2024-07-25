import {forwardRef,useRef, useEffect, useState} from 'react';
import "./InvoicePrinter.css"
import {Humanize} from "../../../Utils/Utils";
import axios from "axios";
import Cookies from "js-cookie";
import logo_cc from "./logo_cc.png";
import {useParams, useSearchParams} from "react-router-dom";

interface InvoicePrinterProps {
  //
}

const InvoicePrinter: React.FC<InvoicePrinterProps> = (props) => {

    const componentRef:any= useRef();
    const [facture,setFacture]=useState<any>({});
    const { fid } = useParams();
    const getData = async()=>{
        const id_inv:string=encodeURIComponent(String(fid));
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/print_f/?id=${id_inv}`, {
            headers: {
               Authorization: `Token ${Cookies.get("token")}`,
               'Content-Type': 'application/json',
             },
           
         })
         .then(response => {
            setFacture(response.data)
         
         
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
              Facture N°&nbsp; {facture.num_f}
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
              {facture.rev}
            </h6>
          </div>
        </div>
        <div
          className="row"
          style={{ borderTopWidth: 1, borderTopStyle: "solid" }}
        >
          <div className="col" style={{ paddingTop: 20 }}>
            <h6 className="text-center" style={{ fontSize: 12 }}>
              Réf :&nbsp; &nbsp;{facture.ref}
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
        style={{ width: "50%", borderRightWidth: 0, borderRightStyle: "solid" }}
      >
        <div className="text-start" style={{ width: "100%" }}>
          <label className="form-label">Unité :&nbsp;</label>
          <label className="form-label" style={{ width: "89%" }}>
            {facture.unite}
          </label>
          <label className="form-label" style={{ marginTop: 0 }}>
            Capital Social :&nbsp;{facture.cap}
          </label>
          <br/>
          <label className="form-label" style={{ marginTop: 0 }}>
            N° RC :&nbsp; {facture.rc || '/'}
          </label>
          <br/>
          <label className="form-label" style={{ marginTop: 0 }}>
            N° IF :&nbsp;{facture.nif || '/'}
          </label>
          <br/>
          <label className="form-label" style={{ width:'100%', marginTop: 0 }}>
            AI :&nbsp; {facture.cai || '/'}
          </label>
          <br/>
          <label className="form-label" style={{ marginTop: 0 }}>
            N° Convention :&nbsp; {facture.contrat}
          </label>
          <br/>
          
        </div>
      </div>
      <div
        className="col-auto col-sm-4 d-lg-flex justify-content-lg-center"
        style={{ width: "50%", borderRightWidth: 0, borderRightStyle: "solid" }}
      >
        <div className="text-start" style={{ width: "100%" }}>
          <label className="form-label">Date Facture :&nbsp;</label>
          <label className="form-label" style={{ width: "78%" }}>
            {facture.date}
          </label>
          <br/>
          <label className="form-label" style={{ marginTop: 0 }}>
            Client :&nbsp; {facture.client}
          </label>
          <br/>
          <label className="form-label" style={{ marginTop: 0 }}>
            N° RC :&nbsp; {facture.n_rc|| '/'}
          </label>
          <br/>
          <label className="form-label" style={{ marginTop: 0 }}>
            N° IF :&nbsp; {facture.n_if|| '/'}
          </label>
          <br/>
          <label className="form-label" style={{ marginTop: 0 }}>
            AI :&nbsp; {facture.ai || '/'}
          </label>
        </div>
      </div>
    </div>
    <div style={{ margin:5, overflow: "hidden" }}>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>
              <br />
              <strong>Réf.Produit</strong>
            </th>
            <th>
              <br />
              <strong>Libellé</strong>
            </th>
            <th>UM</th>
            <th>QTE</th>
            <th>PU . HT</th>
            <th>T. Ligne HT</th>
          </tr>
        </thead>
        <tbody>
        {facture?.details?.map((item:any, index:any) => (
            <tr key={index}>
            <td>{item.ref_prod}</td>
            <td>{item.libelle}</td>
            <td>{item.UM}</td>
            <td>{item.qte}</td>
            <td>{Humanize(item.pu_ht)}</td>
            
            <td>{Humanize(item.t_ligne_ht)}</td>
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
              <strong>TVA :&nbsp;&nbsp;{facture.tva}</strong>
            </label>
          </div>
        </div>
        <div className="row" style={{ height: 26 }}>
          <div className="col">
            <label className="col-form-label">
              <strong>Rabais :&nbsp;&nbsp;{facture.rabais}</strong>
            </label>
          </div>
        </div>
        <div className="row" style={{ height: 26 }}>
          <div className="col">
            <label className="col-form-label">
              <strong>RG :&nbsp;&nbsp;{facture.rg}</strong>
            </label>
          </div>
        </div>
        <div className="row" style={{ height: 26 }}>
          <div className="col">
            <label className="col-form-label">
              <strong>Montant RG :&nbsp;{facture.mrg}</strong>
            </label>
          </div>
        </div>
       
       
        <div className="row" style={{ height: 26 }}>
          <div className="col">
            <label className="col-form-label">
              <strong>Montant en HT :&nbsp;{facture.mht}</strong>
            </label>
          </div>
        </div>
       
       
        <div className="row" style={{ height: 26 }}>
          <div className="col">
            <label className="col-form-label">
              <strong>Montant en TTC :&nbsp;{facture.mttc}</strong>
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

export default InvoicePrinter;

