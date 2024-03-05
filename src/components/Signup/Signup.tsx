import * as React from "react";
import {Button, Form} from "react-bootstrap";
import { InputText } from 'primereact/inputtext';
import {RefObject, useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Toast} from "primereact/toast";
import {ProgressSpinner} from "primereact/progressspinner";
type SignupProps = {
  //
};

const Signup: React.FC<any> = () => {
    const [fields,setFields]=useState<any[]>([]);
    const [defaultState,setDefaultState]=useState<any>({});
    const [formData, setFormData] = useState<any>({});
    const [confirmepassword,setConfirmepassword]=useState('');
    const navigate=useNavigate();
    const toastTopRight: RefObject<Toast>  = useRef(null);
    const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/signupform/`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                setFields(response.data.fields);



            })
            .catch((error:any) => {

            });

    }
       const getDefaultState = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/signupformds/`,{
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response:any) => {
                setDefaultState(response.data.state);
                setFormData(response.data.state);

            })
            .catch((error:any) => {

            });

    }
    const handleInputChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };



      const handleSubmit = async(e:any) => {
        e.preventDefault();
        const form = e.currentTarget;
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api_gc/adduser/`,formData,{
                headers: {
                    'Content-Type': 'application/json',
                },

            })
                .then((response:any) => {

                    setFormData(defaultState);
                    setConfirmepassword('');
                    toastTopRight.current?.show({ severity: 'success', summary: 'Succés', detail: 'Utilisateur ajouté' });




                })
                .catch((error:any) => {
                    setFormData(defaultState);
                    setConfirmepassword('');

                    toastTopRight.current?.show({ severity: 'error', summary: 'Erreur', detail: JSON.stringify(error.response.data, null, 2) });


                });

      }
      const redirect = () => {
        navigate('/')
      }
    useEffect(() => {
        getFields();
        getDefaultState();
    },[]);
  return (
       <>
       { fields.length === 0 &&
          <>
            <div className="container"style={{
                height:300,
                overflow:'hidden',
      position: "absolute",
      left: 0,
      right: 0,
      top: "50%",
          transform: "translateY(-50%)",
          msTransform: "translateY(-50%)",
          WebkitTransform: "translateY(-50%)",
          OTransform: "translateY(-50%)"

        }}>
              <ProgressSpinner style={{width: '100%', height: '200px'}} strokeWidth="1" fill="var(--surface-ground)"
                               animationDuration=".5s"/>
            </div>
          </>
       }
           {
               fields.length > 0 &&
               <>
          <Toast ref={toastTopRight} position="top-right" onHide={redirect}/>
        <div className="container-fluid" style={{marginTop: "20px", width: "100%"}}>

          <div className=" mb-3" style={{border: "none", background: "transparent"}}>
            <div className="card-body">
              <Form className="bg-body-tertiary p-4 p-md-5 border rounded-3" onSubmit={handleSubmit}>

                <div className="row" style={{marginBottom: 25, textAlign: "left"}}>
                  <div
                      className="col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2"
                      style={{display: "inline", textAlign: "center", marginBottom: 25}}
                  >
                    <div
                        style={{
                          height: "150px",
                          background: `url(${null}) center / auto no-repeat`,

                        }}
                    />
                    <br/>
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 col-xxl-10 align-self-center">
                    <div className="row">
                      <div className="row">
                        <div className="col-md-12 text-start">
                          <div className="mb-5">
                            <h1 className="text-center">{'Creer un compte'}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {fields.map((field, index) => (
                      <div className="col-md-6 text-start" key={index}>
                        <div className="mb-4 " >

                          <Form.Group className="w-100" >
                            {
                              field.name === "password" ?

                                  <span className="p-float-label">
                                          <InputText name={field.name}
                                                     className="w-100 form-control"
                                                     type="password"
                                                     value={formData[field.name]|| ''}
                                                     onChange={(e) => handleInputChange(e)}/>
                                          <label htmlFor={field.label}>{field.label}</label>
                                  </span>
                                  :
                                  field.name === "confirmepassword" ?

                                      <span className="p-float-label">
                                          <InputText  name={"confirmepassword"}
                                                     className="w-100 form-control"
                                                     type="password"
                                                     value={confirmepassword}
                                                     onChange={(e) => handleInputChange(e)}/>
                                          <label htmlFor={field.label}>{field.label}</label>
                                      </span>
                                      :

                                      <span className="p-float-label">
                                          <InputText name={field.name}
                                                     className="w-100 form-control"
                                                     type="text"
                                                     value={formData[field.name]|| ''}
                                                     onChange={(e) => handleInputChange(e)}/>
                                          <label htmlFor={field.label}>{field.label}</label>
                                      </span>


                            }


                          </Form.Group>


                        </div>
                      </div>


                  ))}
                </div>
                <ul style={{width: '50%'}}>

                  <li className="text-start">
                                        <span style={{color: "var(--body-quiet-color)"}}>
                                          Votre mot de passe ne peut pas trop ressembler à vos autres informations
                                          personnelles.
                                        </span>
                  </li>
                  <li className="text-start">
                    Votre mot de passe doit contenir au minimum 8 caractères
                  </li>
                  <li className="text-start">
                                        <span style={{color: "var(--body-quiet-color)"}}>
                                          Votre mot de passe ne peut pas être un mot de passe couramment utilisé.
                                        </span>
                  </li>
                  <li className="text-start">
                                        <span style={{color: "var(--body-quiet-color)"}}>
                                          Votre mot de passe ne peut pas être entièrement numérique.
                                        </span>
                  </li>

                </ul>
                <div
                    className="col-md-12"
                    style={{textAlign: "right", marginTop: 5}}>

                  <Button type="submit" style={{borderWidth: 0, background: "#d7142a"}}>
                    <i className="fas fa-plus" style={{marginRight: "10px"}}></i> Creer
                  </Button>

                </div>
              </Form>
            </div>
          </div>
        </div>

      </>

           }
           </>
  );
}

export default Signup;
