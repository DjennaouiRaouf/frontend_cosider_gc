import * as React from "react";
import { Nav, Navbar, NavDropdown} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Context/AuthContext/AuthContext";
import {PermissionContext} from "../Context/PermissionContext/PermissionContext";
import Avatar from 'react-avatar';
import logo from '../../images/logo.png';
import Cookies from 'js-cookie';

type NavigationBarProps = {
  //
};

const NavigationBar: React.FC<any> = () => {
        const[username,setUsername]=useState("");
    const { authenticated,setAuthenticated } = useContext(AuthContext);
    const navigate=useNavigate();
    const logout = async () => {
                await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/logout/`,{
                withCredentials:true,
                headers:{
                    Authorization: `Token ${Cookies.get("token")}`,
                }
                })
                    .then((response: any) => {
                        setAuthenticated(null);
                    })
                    .catch((error: any) => {
                    });

                setAuthenticated(null);
                Cookies.remove('role');
                Cookies.remove('token');


    };

    const whoami= async () => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/whoami/`,{
            headers:{
                Authorization: `Token ${Cookies.get("token")}`
            }

        })
            .then((response: any) => {
                setUsername(response.data.whoami);
            })
            .catch((error: any) => {

            });

    };


    useEffect(() => {
        whoami();
    });

    const link = (url:string) => {
        navigate(url);
    }



    const { permission } = useContext(PermissionContext);
  return (
      <>
      
        <style>
              {`
             @media print {
                .element-to-hide {
                display: none !important;
                }
            }
          `}
        </style>

         <Navbar expand="lg" className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light element-to-hide ">
            <div className={'container-fluid'} style={{border:"none"}}>
                <Navbar.Brand>
              <span>
                <img width={100} height={39} src={logo} />
              </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/client">Clients</Nav.Link>
                        <Nav.Link href="/contrat">Contrats</Nav.Link>
                        <Nav.Link href="/avance">Avances</Nav.Link>

                        <NavDropdown title="DQE" id="basic-nav-dropdown">
                             <NavDropdown.Item href="/dqe">DQE + avenants</NavDropdown.Item>
                            <NavDropdown.Item href="/dqe_cumule">DQE cumulé</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="/planing">Planing</Nav.Link>
                        <Nav.Link href="/bl">Bons de livraison</Nav.Link>
                        <NavDropdown title="Facturation" id="basic-nav-dropdown">
                             <NavDropdown.Item  href="/invoice">Factures</NavDropdown.Item>
                            <NavDropdown.Item href="/enc">Encaissements</NavDropdown.Item>
                            <NavDropdown.Item href="/fc">Fiche Client</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/camions">Camions</Nav.Link>


                    </Nav>
                    <Nav className="navbar-nav ms-auto">
                        <li className="nav-item dropdown no-arrow">
                            <div className="nav-item dropdown no-arrow">
                                <a
                                    className="dropdown-toggle nav-link"
                                    aria-expanded="false"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                >
                    <span className="d-none d-lg-inline me-2 text-gray-600 small">
                       {username}
                    </span>

                                    <Avatar name={username} size="32" round={true} src={""}

                                    />
                                </a>
                                <div  className="dropdown-menu shadow dropdown-menu-end animated--grow-in"
                                      data-bs-popper="none">
                                    <a className="dropdown-item" href="/profile">
                                        <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />
                                        &nbsp;Profil
                                    </a>

                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" onClick={logout}>
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />
                                        &nbsp;Déconnexion
                                    </a>
                                </div>
                            </div>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
      </>
  );
};

export default NavigationBar;
