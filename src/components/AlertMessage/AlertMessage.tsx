import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/Store";
import {Alert} from "react-bootstrap";
import {hideAlertMessage} from "../Slices/AlertMessageSlices";
import './AlertMessage.css';
type AlertMessageProps = {
  //
};

const AlertMessage: React.FC<any> = () => {
  const {showAlertMessage,variant,message} = useSelector((state: RootState) => state.alertMessageReducer);

  const dispatch=useDispatch();
  const onClose = () => {
    dispatch(hideAlertMessage());
  }
  return (
      <>
          <div className="top-right-alert">
              <Alert show={showAlertMessage} variant={variant} onClose={onClose} dismissible>
                  {message}
              </Alert>
          </div>

      </>
  );
};

export default AlertMessage;
