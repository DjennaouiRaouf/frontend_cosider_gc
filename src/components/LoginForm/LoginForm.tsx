import * as React from "react";
import {RefObject, useContext, useEffect, useRef, useState} from "react";
import {Button, Carousel, Form} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext/AuthContext";
import {PermissionContext} from "../Context/PermissionContext/PermissionContext";
import { InputText } from "primereact/inputtext";
import {ProgressSpinner} from "primereact/progressspinner";
import {Toast} from "primereact/toast";

const LoginForm: React.FC<any> = () => {
  const [pics,setPics]=useState<any[]>([]);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });





  const { authenticated,setAuthenticated } = useContext(AuthContext);
  const { permission,setPermission } = useContext(PermissionContext);
  const navigate=useNavigate();
  const toastTopRight: RefObject<Toast>  = useRef(null);
  const getImages = async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/getimg/`,{
      headers:{
        "Content-Type":"application/json",
      }
    })
        .then((response) => {
          setPics(response.data);

        })
        .catch((error) => {

        });

  }




  const authentification = async(e: any) => {

    e.preventDefault();
    const fd = new FormData();
    fd.append('username', formData.username);
    fd.append('password', formData.password);
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api_gc/login/`,fd,{
      withCredentials:true,
    })
        .then((response:any) => {
          setAuthenticated(Cookies.get('token'));
          const role:string[]=String(Cookies.get('role')).split('|');

          setPermission(role)
          toastTopRight.current?.show({ severity: 'success', summary: 'Succés', detail: 'Utilisateur ajouté' });







        })
        .catch((error:any) => {
         toastTopRight.current?.show({ severity: 'error', summary: 'Erreur', detail: JSON.stringify(error.response.data, null, 2) });

        });



  }



  const handleInputChange = (e: any): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getImages();


  },[]);

  const redirect = () => {
    navigate('/home');
  }
  return (


  <>
    <Toast ref={toastTopRight} position="top-right" onHide={redirect}/>

    <div className="col-xl-10 col-xxl-8 container px-4 py-5" style={{
      borderRadius: "8px",
      position: "absolute",
      left: 0,
      right: 0,
      top: "50%",
          transform: "translateY(-50%)",
          msTransform: "translateY(-50%)",
          WebkitTransform: "translateY(-50%)",
          OTransform: "translateY(-50%)"

        }}>
          <h1  style={{ textAlign: "center" }}>Gestion Commeriale</h1>
          <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start" >
              <Carousel className=" d-block" controls={false} interval={2000} fade={true} indicators={true} style={{borderWidth: "1px",borderRadius: "8px"}}>
                {pics.map((item,index) => (
                    <Carousel.Item key={index}  style={{borderWidth: "1px",borderRadius: "8px"}}>
                      <img
                          src={item.src}
                          alt={""}
                          height={400}
                          className="d-block w-100"
                          style={{borderWidth: "1px",borderRadius: "8px"}}
                      />

                    </Carousel.Item>
                ))}
              </Carousel>

            </div>

            <div className="col-md-10 col-lg-5 mx-auto">

              <Form className="bg-body-tertiary p-4 p-md-5 border rounded-3 w-100"
                    noValidate validated={validated}
                    onSubmit={authentification}>
                <div className="form-floating mb-5 mt-5">
                  <span className="p-float-label">
                      <InputText className="w-100 form-control" name="username" value={formData.username}
                                 onChange={(e) => handleInputChange(e)}/>
                      <label htmlFor="username">Nom d'utilisateur</label>
                  </span>
                </div>
                <div className="form-floating mb-5">
                  <span className="p-float-label">
                      <InputText className="w-100 form-control" name="password" type='password'
                                 value={formData.password}
                                 onChange={(e) => handleInputChange(e)}/>
                      <label htmlFor="username">Mot de passe</label>
                  </span>
                </div>

                <Button type="submit" className="w-100 " style={{background: "#df162c", borderWidth: 0}}>
                  Connexion</Button>
                <hr className="my-4"/>
                <div className="container d-sm-flex justify-content-sm-center w-100">
                  <a href="/signup" >Créer un nouveau compte</a>
                </div>

              </Form>
            </div>
          </div>
        </div>
      </>


  );
};

export default LoginForm;