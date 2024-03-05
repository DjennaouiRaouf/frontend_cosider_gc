import React, {useContext} from "react";
import {Routes as Router, Route, Navigate} from 'react-router-dom'
import LoginForm from "../../LoginForm/LoginForm";
import {AuthContext} from "../AuthContext/AuthContext";
import {PermissionContext} from "../PermissionContext/PermissionContext";
import Signup from "../../Signup/Signup";

const Routes: React.FC<any> = () => {

    const {authenticated} = useContext(AuthContext);
    const {permission, setPermission} = useContext(PermissionContext);

    return (
        <Router>
            <Route
                path="/"
                element={
                    !authenticated ? (
                        <LoginForm/>
                    ) : (
                        <Navigate to="/home"/>
                    )
                }
            />
             <Route
              path="/home"
              element={
                  authenticated ? (
                      <>
                          <p>Home</p>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
              <Route
              path="/signup"
              element={
                          <Signup/>
              }
          />

        </Router>
    );
}
  export default Routes