import * as React from "react";
import {Galleria} from "primereact/galleria";
import {useEffect, useState} from "react";
import axios from "axios";

type LoginFormProps = {
  //
};

const LoginForm: React.FC<any> = () => {
  const[images,setImages]=useState<any>({})
  const getImages = async() => {

    console.log(`${process.env.REACT_APP_API_BASE_URL}/api_gc/getimg/`)
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/getimg/`,{
            headers: {

                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
              console.log(response.data)
                setImages(response.data)

            })
            .catch((error:any) => {

            });

    
  }
     const itemTemplate = (item:any) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    };
    useEffect(() => {
        getImages();

    },[]);
  return (
      <>
    <div
        className="d-flex d-xl-flex align-items-center align-items-xl-center"
        style={{width: "100%", height: "100%"}}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div
                        className="flex-grow-1 bg-login-image"
                    >

                       <Galleria value={images} style={{ maxWidth: '640px' }} showThumbnails={false} showIndicators item={itemTemplate} />
                    </div>

                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Connexion</h4>
                      </div>
                      <form className="user">
                        <div className="mb-3">
                          <input
                              id="exampleInputEmail"
                              className="form-control form-control-user"
                              type="email"
                              aria-describedby="emailHelp"
                              placeholder="Nom d'utilisateur"
                              name="email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                              id="exampleInputPassword"
                              className="form-control form-control-user"
                              type="password"
                              placeholder="Password"
                              name="Mot de pass"
                          />
                        </div>
                        <div className="mb-3">
                          <div className="custom-control custom-checkbox small"/>
                        </div>
                        <button
                            className="btn btn-primary d-block btn-user w-100"
                            type="submit"
                            style={{background: "#01703E"}}
                        >
                          Connexion
                        </button>
                        <hr/>
                        <hr/>
                      </form>
                      <div className="text-center">
                        <a
                            className="small"
                            href="forgot-password.html"
                            style={{color: "#01703E"}}
                        >
                          Créer un nouveau compte&nbsp;
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>);
};

export default LoginForm;
