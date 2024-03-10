import React, {useContext} from "react";
import {Routes as Router, Route, Navigate} from 'react-router-dom'
import LoginForm from "../../LoginForm/LoginForm";
import {AuthContext} from "../AuthContext/AuthContext";
import {PermissionContext} from "../PermissionContext/PermissionContext";
import Signup from "../../Signup/Signup";
import Contrat from "../../Contrat/Contrat";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Client from "../../Client/Client";
import DQE from "../../DQE/DQE";
import DQEParams from "../../DQE/DQEParams";

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
                        <Navigate to="/contrat"/>
                    )
                }
            />


             <Route
              path="/contrat"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Contrat/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
               <Route
              path="/dqe"
              element={
                  authenticated ? (
                      <>
                          <DQEParams/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />


                         <Route
              path="/dqe/liste/:cid"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <DQE/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

              <Route
              path="/client"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Client/>



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