import * as React from "react";
import {useDispatch} from "react-redux";


type EditDQEProps = {
 data:any;
};
const EditDQE: React.FC<EditDQEProps> = (props) => {
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
          <i className="fas fa-edit" style={{fontSize: 16, marginRight: 9}}/>
          Modifier
      </button>


  </>);
};

export default EditDQE;
