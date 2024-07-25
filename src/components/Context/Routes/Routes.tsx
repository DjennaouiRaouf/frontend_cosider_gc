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
import BonLivraison from "../../BonLivraison/BonLivraison";
import BLParams from "../../BonLivraison/BLParams";
import Camion from "../../Camion/Camion";
import InvoiceParams from "../../Invoice/InvoiceParams";
import Invoice from "../../Invoice/Invoice";
import Avances from "../../Avances/Avances";
import AvancesParams from "../../Avances/AvancesParams";
import DQECumuleParams from "../../DQE/DQECumuleParams";
import DQECumule from "../../DQE/DQECumule";
import PlaningParams from "../../Planing/PlaningParams";
import Planing from "../../Planing/Planing";
import InvoicePrinter from "../../ActionRenderer/DelInvoice/InvoicePrinter/InvoicePrinter";
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
              path="/planing"
              element={
                  authenticated ? (
                      <>
                          <PlaningParams/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
          <Route
              path="/planing/liste_planing/:cid"
              element={
                  authenticated ? (
                      <>
                            <NavigationBar/>
                          <Planing/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
            
              <Route
              path="/dqe_cumule"
              element={
                  authenticated ? (
                      <>
                          <DQECumuleParams/>
                            


                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
            <Route
              path="/camions"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Camion/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />
             <Route
              path="/bl"
              element={
                  authenticated ? (
                      <>
                          <BLParams/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

                    <Route
              path="/bl/liste_bl/:cid"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <BonLivraison/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />



               <Route
              path="/invoice"
              element={
                  authenticated ? (
                      <>
                          <InvoiceParams/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

                    <Route
              path="/invoice/liste_f/:cid"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Invoice/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />



                         <Route
              path="/dqe/liste_dqe/:cid/:av"
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
              path="/dqe_cumule/liste_dqe_cumule/:cid"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <DQECumule/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

              <Route
              path="/avance"
              element={
                  authenticated ? (
                      <>
                          <AvancesParams/>



                      </>
                  ) : (
                      <Navigate to="/"  />
                  )
              }
          />

               <Route
              path="/avance/liste_avance/:cid"
              element={
                  authenticated ? (
                      <>
                          <NavigationBar/>
                          <Avances/>



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
              path="/invoice/liste_f/:cid/p_facture/:fid"
              element={
                  authenticated ? (
                      <>
                        <NavigationBar/>
                        <InvoicePrinter/>



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