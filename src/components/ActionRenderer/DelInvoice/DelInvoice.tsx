import * as React from "react";
import { useRef } from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate, useSearchParams} from "react-router-dom";
import {displayAlertMessage, Variant} from "../../Slices/AlertMessageSlices";
import ReactToPrint, {useReactToPrint} from 'react-to-print';
import InvoicePrinter from "./InvoicePrinter/InvoicePrinter";
import { showAddEnc } from "../../Slices/AddModalSlices";
import AddEnc from "../../AddEnc/AddEnc";
type DelInvoiceProps = {
 data:any;
 refresh:(params:any)=>void,
};
const DelInvoice: React.FC<DelInvoiceProps> = (props) => {
    const dispatch=useDispatch();

    const componentRef = useRef<any>();
    const [searchParams] = useSearchParams();
    const Delete = async() => {
       const rowData:any =  props.data;
       if(rowData){
           await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api_gc/delinvoice/`, {
               headers: {
                  Authorization: `Token ${Cookies.get("token")}`,
                  'Content-Type': 'application/json',
                },
               data:{id:[rowData['id']]},

            })
            .then(response => {
                const paramsArray = Array.from(searchParams.entries());
                const queryString = paramsArray.reduce((acc, [key, value], index) => {
                  if (index === 0) {
                    return `?${key}=${encodeURIComponent(value)}`;
                  } else {
                    return `${acc}&${key}=${encodeURIComponent(value)}`;
                  }
                }, '');

                props.refresh(queryString);
                dispatch(displayAlertMessage({variant: Variant.SUCCESS, message: "Facture Annulée"}))

            })
            .catch(error => {
            });
       }

    }


   
    const navigate=useNavigate();
     
     const handlePrint = ()=>{
      const rowData:any =  props.data;
      if(rowData){
        const val : string = encodeURIComponent(String(rowData['id']));
        navigate(`p_facture/${encodeURIComponent(val)}`, )
        
      }
     }

     const encaisser = ()=>{
      const rowData:any =  props.data;
       if(rowData){
         dispatch(showAddEnc(rowData['id']));
        }
      }
    return (
    <>
      
      <div className="row" style={{cursor:"pointer"}}>
  <div className="col-md-12" style={{ width: 50 }}>
    <svg
      onClick={Delete}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-32 0 512 512"
      width="1em"
      height="1em"
      fill="currentColor"
      style={{ fontSize: 20, color: "var(--bs-secondary-color)" }}
    >
      {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
      <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
    </svg>
  </div>
  <div className="col-md-12" style={{ width: 50 }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      fill="currentColor"
      style={{ fontSize: 20, color: "var(--bs-secondary-color)" }}
      onClick={handlePrint}
    >
      {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
      <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z" />
    </svg>
  </div>

  <div className="col-md-12" style={{ width: 50 }}>
  
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 576 576" width="1em" height="1em" fill="currentColor"
    style={{ fontSize: 25, color: "var(--bs-secondary-color)" }}
    onClick={encaisser}>
    <path d="M48.66 79.13C128.4 100.9 208.2 80.59 288 60.25C375 38.08 462 15.9 549 48.38C565.9 54.69 576 71.62 576 89.66V399.5C576 423.4 550.4 439.2 527.3 432.9C447.6 411.1 367.8 431.4 288 451.7C200.1 473.9 113.1 496.1 26.97 463.6C10.06 457.3 0 440.4 0 422.3V112.5C0 88.59 25.61 72.83 48.66 79.13L48.66 79.13zM287.1 352C332.2 352 368 309 368 255.1C368 202.1 332.2 159.1 287.1 159.1C243.8 159.1 207.1 202.1 207.1 255.1C207.1 309 243.8 352 287.1 352zM63.1 416H127.1C127.1 380.7 99.35 352 63.1 352V416zM63.1 143.1V207.1C99.35 207.1 127.1 179.3 127.1 143.1H63.1zM512 303.1C476.7 303.1 448 332.7 448 368H512V303.1zM448 95.1C448 131.3 476.7 159.1 512 159.1V95.1H448z"></path>
  </svg>
  </div>




</div>


  </>);
};

export default DelInvoice;
