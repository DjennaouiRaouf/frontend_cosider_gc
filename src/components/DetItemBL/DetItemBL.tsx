import * as React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/Store";
import {hideDetBLItem} from "../Slices/ShowModalSlices";
import {AgGridReact} from "ag-grid-react";
import {useRef} from "react";
import {useParams} from "react-router-dom";
import {ColDef} from "ag-grid-community";
import numeral from "numeral";

type DetItemBLProps = {
  //
};
const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

    case 'montant_precedent' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

    case 'montant_mois' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

    case 'montant_cumule' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

    default:
      return <span>{value}</span>
  }

};
const DetItemBL: React.FC<any> = () => {
   const { showDetBLItemForm } = useSelector((state: RootState) => state.showDataModalReducer);

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(hideDetBLItem())
    }
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
  return (
      <>
         <Modal show={showDetBLItemForm.shown} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Detail du Bon de livraison N° {showDetBLItemForm.id}</Modal.Title>
        </Modal.Header>
             <Modal.Body>
                 <div
                     className="ag-theme-alpine mt-4"
                     style={{height: 500, width: "100%"}}

                 >
                     <AgGridReact ref={gridRef}
                                  rowData={showDetBLItemForm.data} columnDefs={showDetBLItemForm.field}
                                  gridOptions={gridOptions}



                     /></div>
             </Modal.Body>

         </Modal>
      </>
);
};

export default DetItemBL;
