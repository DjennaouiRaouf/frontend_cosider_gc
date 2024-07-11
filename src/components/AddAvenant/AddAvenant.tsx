import * as React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/Store";
import {hideEdit} from "../Slices/EditModalSlices";
import Cookies from "js-cookie";
import axios from "axios";
import {Transform} from "../Utils/Utils";

type AddAvenantProps = {
  refresh:()=>void,
};

const AddAvenant: React.FC<AddAvenantProps> = ({refresh}) => {
    const [validated, setValidated] = useState(false);
    const { showEditForm } = useSelector((state: RootState) => state.editDataModalReducer);
    const dispatch = useDispatch();
    const [fields,setFields]=useState<any[]>([]);
    
    const [formData, setFormData] = useState<any>(showEditForm.state);
    const opt:any[] = [
        {
            value: false,
            label: 'Non',
        },
        {
            value: true,
            label: 'Oui',
        },

    ];

    useEffect(() => {
        setFormData(showEditForm.state);
      }, [showEditForm]);

    const handleSelectChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleInputChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };





 const handleSubmit = async(e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity()) {
            setValidated(false)

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api_gc/addcontract/`,Transform(formData),{
                headers: {
                    Authorization: `Token ${Cookies.get("token")}`,
                    'Content-Type': 'application/json',

                },

            })
                .then((response:any) => {

                  
                    handleClose();
                    refresh();

                })
                .catch((error:any) => {
                });






        }
        else {

            setValidated(true)
        }


    }
    const handleClose = () => {
        dispatch(hideEdit())

    }
    const handleChange = (ref:any, op:any) => {
        if(op.length ===1 ){
            setFormData({
                ...formData,
                [ref]: op,
            })
        }else {
            setFormData({
                ...formData,
                [ref]: [],
            })
        }


    };

    

  return (
      <>
         <Modal show={showEditForm.shown} onHide={handleClose} size={"xl"}>
              <Form
                      noValidate validated={validated} onSubmit={handleSubmit} >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Avenant</Modal.Title>
        </Modal.Header>
          <Modal.Body>
              <div className="container-fluid">
                  <div className="card shadow mb-3 bg-body-tertiary ">
                      <div className="card-body bg-body-tertiary ">


                              <div className="row" style={{marginBottom: 25, textAlign: "left"}}>
                                  {showEditForm.fields.map((field:any,index:any) => (
                                  <div className="col-md-6 text-start" key={index}>
                                      <div className="mb-3">
                                          <label className="form-label" htmlFor="username">
                                              <strong>
                                                  {field.label + " "}
                                                  {field.required ?
                                                      <span style={{
                                                          color: "rgb(255,0,0)",
                                                          fontSize: 18,
                                                          fontWeight: "bold"
                                                      }}>
                                                                  *
                                                            </span> :
                                                      <span style={{
                                                          color: "rgb(255,0,0)",
                                                          fontSize: 18,
                                                          fontWeight: "bold"
                                                      }}>

                                                                </span>
                                                  }
                                              </strong>
                                          </label>
 {
                                                            field.type === "PrimaryKeyRelatedField"?
                                                                <>
                                                                    <Typeahead

                                                                         labelKey={"label"}
                                                                    onChange={(o) => handleChange(field.name, o)}
                                                                    id={field.name}
                                                                         inputProps={{ required: field.required }}

                                                                    selected={formData[field.name] || []}
                                                                    options={field.queryset}
                                                                    disabled={field.disabled}
                                                                    />
                                                                </>


                                                                :
                                                                field.type === 'BooleanField' ?

                                                                    <Form.Control
                                                                        as="select"
                                                                        name={field.name}
                                                                        required={field.required}
                                                                        className="w-100"
                                                                        value={formData[field.name]}
                                                                        disabled={field.disabled}
                                                                        
                                                                        onChange={(e)=>handleSelectChange(e)}>
                                                                        
                                                                        {opt.map((item,index) => (
                                                                            <option key={index} value={String(item.value)}>{item.label}</option>
                                                                        ))}

                                                                    </Form.Control>


                                                                    : field.type === 'DateField' ?
                                                                        <Form.Control
                                                                            name={field.name}
                                                                            required={field.required}
                                                                            className="w-100"
                                                                            type="date"
                                                                            value={formData[field.name]||''}
                                                                            onChange={(e)=>handleInputChange(e)}
                                                                            disabled={field.disabled}
                                                                        
                                                                        />
                                                                        : field.type === 'IntegerField' || field.type ==='DecimalField'  ?
                                                                            <Form.Control
                                                                                name={field.name}
                                                                                required={field.required}
                                                                                className="w-100"
                                                                                type="number"
                                                                                value={formData[field.name] || 0}
                                                                                step={0.01}
                                                                                onChange={(e)=>handleInputChange(e)}
                                                                                disabled={field.disabled}
                                                                        
                                                                                />

                                                                            :
                                                                            <Form.Control
                                                                                name={field.name}
                                                                                required={field.required}
                                                                                className="w-100"
                                                                                type="text"
                                                                                value={formData[field.name]||''}
                                                                                onChange={(e)=>handleInputChange(e)}
                                                                                disabled={field.disabled}
                                                                                />



                                                        }

                                      </div>
                                  </div>
                                      ))}

                                      </div>

                                      </div>
                                      </div>
                                      </div>


                                      </Modal.Body>
                                      <Modal.Footer>

                                      <Button variant="primary" style={{background: "#df162c", borderWidth: 0}} type={"submit"}>
                  Ajouter
              </Button>
          </Modal.Footer>
                  </Form>
      </Modal>
  </>
  );
};

export default AddAvenant;
