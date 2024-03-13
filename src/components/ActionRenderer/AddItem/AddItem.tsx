import * as React from "react";
import {useDispatch} from "react-redux";
import {showAddBLItem} from "../../Slices/AddModalSlices";
import AddItemBL from "../../AddItemBL/AddItemBL";

type AddItemProps = {
 data:any;
};

const AddItem: React.FC<AddItemProps> = (props) => {
    const dispatch=useDispatch();

    const addItems = () => {
       const rowData:any =  props.data  ;
       dispatch(showAddBLItem({id:rowData['id']}))
    }
    return (<>
        <AddItemBL/>
      <button
          className="btn btn-primary btn-sm"
          type="button"
          style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
          onClick={addItems}
          
        >
          <i className="fas fa-cart-plus" style={{fontSize: 16, marginRight: 9}}/>
          Ajouter un produit
      </button>


  </>);
};

export default AddItem;
