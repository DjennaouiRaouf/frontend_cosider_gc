import * as React from "react";
import {useDispatch} from "react-redux";
import {fetchFields, fetchState, showEditDQE} from "../../Slices/EditModalSlices";


type EditDQEProps = {
 data:any;
};
const EditDQE: React.FC<EditDQEProps> = (props) => {
    const dispatch=useDispatch();

    const EditDQE = () => {
       const rowData:any =  props.data  ;

       if(rowData){
           dispatch(fetchFields(`/forms/dqeaddform/?id=${rowData['id']}`))
           dispatch(fetchState(`/forms/dqeaddform/?id=${rowData['id']}`))
           dispatch(showEditDQE({id:rowData['id']}))
       }

    }

    return (<>
      <button
          className="btn btn-primary btn-sm"
          type="button"
          style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
          onClick={EditDQE}
          
        >
          <i className="fas fa-edit" style={{fontSize: 16, marginRight: 9}}/>
          Modifier
      </button>


  </>);
};

export default EditDQE;
