import * as React from "react";
import {useDispatch} from "react-redux";


type PrintBLProps = {
 data:any;
};
const PrintBL: React.FC<PrintBLProps> = (props) => {
    const dispatch=useDispatch();

    const print = () => {
       const rowData:any =  props.data  ;
    }

    return (<>
      <button
          className="btn btn-primary btn-sm"
          type="button"
          style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
          onClick={print}
          
        >
          <i className="fa fa-print" style={{fontSize: 16, marginRight: 9}}/>
          Imprimer
      </button>


  </>);
};

export default PrintBL;
