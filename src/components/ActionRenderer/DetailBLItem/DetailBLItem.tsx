import * as React from "react";
import {useDispatch} from "react-redux";
import {fetchBLItemData, fetchBLItemFields, showDetBLItem} from "../../Slices/ShowModalSlices";
import AddItemBL from "../../AddItemBL/AddItemBL";
import DetItemBL from "../../DetItemBL/DetItemBL";


type DetailBLItemProps = {
 data:any;
};
const DetailBLItem: React.FC<DetailBLItemProps> = (props) => {
    const dispatch=useDispatch();

    const detItems = () => {
       const rowData:any =  props.data  ;
        dispatch(fetchBLItemData(`/api_gc/getitembl/?bl=${rowData['id']}` ));
        dispatch(fetchBLItemFields(`/forms/detblitemlistform/` ));
        dispatch(showDetBLItem({id:rowData['id']}))

    }

    return (<>
      <DetItemBL/>
      <button
          className="btn btn-primary btn-sm"
          type="button"
          style={{background: "#df162c", borderColor: "#df162c", margin: 0}}
          onClick={detItems}
          
        >
          <i className="fas fa-list" style={{fontSize: 16, marginRight: 9}}/>
          Detail
      </button>


  </>);
};

export default DetailBLItem;
