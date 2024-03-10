import * as React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/Store";
import {hideAddDQE} from "../Slices/AddModalSlices";
import Cookies from "js-cookie";
import axios from "axios";
import {Transform} from "../Utils/Utils";
import {AgGridReact} from "ag-grid-react";
import numeral from "numeral";
import 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {ColDef} from "ag-grid-community";


const InfoRenderer: React.FC<any> = (props) => {
  const { value } = props;

  switch (props.column.colId) {

    case 'prix_unitaire' :
      return <span>{numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')+' DA'}</span>

    default:
      return <span>{value}</span>
  }

};
const AddDQE: React.FC<any> = () => {
     const [validated, setValidated] = useState(false);
    const { showAddDQEForm } = useSelector((state: RootState) => state.addDataModalReducer);

    const dispatch = useDispatch();
    const [fields,setFields]=useState<any[]>([]);
    const [defaultState,setDefaultState]=useState<any>({});
    const [formData, setFormData] = useState<any>({});
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

    const handleSelectChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleInputChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };




    const getFields = async() => {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/dqeaddform/`,{

            headers: {
                Authorization: `Token ${Cookies.get("token")}`,
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {
                setFields(response.data.fields);
                setDefaultState(response.data.state)
                setFormData(response.data.state)


            })
            .catch((error:any) => {

            });

    }

 const handleSubmit = async(e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formDataObject= Transform(formData)
        console.log(selectedRow)


        if (form.checkValidity()) {
            setValidated(false)

            /*
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api_gc/adddqe/`,Transform(formData),{
                headers: {
                    Authorization: `Token ${Cookies.get("token")}`,
                    'Content-Type': 'application/json',

                },

            })
                .then((response:any) => {

                    setFormData(defaultState);

                })
                .catch((error:any) => {
                });

             */





        }
        else {

            setValidated(true)
        }


    }
    useEffect(() => {

        getFields();



    },[]);
    const handleClose = () => {
        dispatch(hideAddDQE())

    }
    const handleChange = (ref:any, op:any) => {
        if(op.length ===1 ){
            setFormData({
                ...formData,
                [ref]: op,
            });

        }else {
            setFormData({
                ...formData,
                [ref]: [],
            })
        }


    };
    const [selectedRow, setSelectedRow] = useState<any[]>([]);
    const gridRef = useRef(null);

    const defaultColDefs: ColDef = {
    sortable: true,
    resizable: true,
    minWidth: 200,
    autoHeight: true, wrapText: true,
    cellStyle: {textAlign: 'start', border: "none"},

  };

        const gridOptions:any = {
    pagination: true,
    defaultColDef:defaultColDefs,
    rowSelection:'single',
    multiSortKey:'ctrl',
    animateRows:true,
  components: {
      InfoRenderer: InfoRenderer,
    },


    localeText: {
      // Default pagination text
      page: 'Page',
      to: 'à',
      of: 'sur',
      nextPage: 'Suivant',
      lastPage: 'Dernier',
      firstPage: 'Premier',
      previousPage: 'Precedent',


      loadingOoo: 'Chargement...',
      noRowsToShow: 'Pas de Données',

      // Add more custom texts as needed
    },
  };
        const[data,setData]=useState<any[]>([]);
        const[cols,setCols]=useState<any[]>([])

  const getCols = async(url:string) => {

      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/forms/pprodlistform/`,{
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response:any) => {

                 setCols(response.data.fields)



            })
            .catch((error:any) => {

            });

    }
 const getData = async() => {
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api_gc/getpprod/?unite=${formData['unite'][0]?.value||''}&produit=${formData['produit'][0]?.value || ''}`,{
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
        'Content-Type': 'application/json',

      },
    })
        .then((response:any) => {

          setData(response.data);



        })
        .catch((error:any) => {

        });


  }


     useEffect(() => {
        getCols('');
    },[]);
     const handleRowClick = (event: any) => {
        setSelectedRow(event.data);
        console.log(event.data)

  };


  return (
      <>
         <Modal show={showAddDQEForm} onHide={handleClose} size={"xl"}>
              <Form
                      noValidate validated={validated} onSubmit={handleSubmit} >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un DQE</Modal.Title>
        </Modal.Header>
                  <Modal.Body>
                      <div className="container-fluid">
                          <div className="card shadow mb-3 bg-body-tertiary ">
                              <div className="card-body bg-body-tertiary ">


                                  <div className="row" style={{marginBottom: 25, textAlign: "left"}}>
                                      {fields.map((field: any, index: any) => (
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
                                                      field.type === "PrimaryKeyRelatedField" ?
                                                          <>
                                                              <Typeahead

                                                                  labelKey={"label"}
                                                                  onChange={(o) => handleChange(field.name, o)}
                                                                  id={field.name}
                                                                  inputProps={{required: field.required}}

                                                                  selected={formData[field.name] || []}
                                                                  options={field.queryset}

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
                                                                  onChange={(e) => handleSelectChange(e)}>

                                                                  {opt.map((item, index) => (
                                                                      <option key={index}
                                                                              value={String(item.value)}>{item.label}</option>
                                                                  ))}

                                                              </Form.Control>


                                                              : field.type === 'DateField' ?
                                                                  <Form.Control
                                                                      name={field.name}
                                                                      required={field.required}
                                                                      className="w-100"
                                                                      type="date"
                                                                      value={formData[field.name] || ''}
                                                                      onChange={(e) => handleInputChange(e)}
                                                                  />
                                                                  : field.type === 'IntegerField' || field.type === 'DecimalField' ?
                                                                      <Form.Control
                                                                          name={field.name}
                                                                          required={field.required}
                                                                          className="w-100"
                                                                          type="number"
                                                                          value={formData[field.name] || 0}

                                                                          onChange={(e) => handleInputChange(e)}
                                                                      />

                                                                      :
                                                                      <Form.Control
                                                                          name={field.name}
                                                                          required={field.required}
                                                                          className="w-100"
                                                                          type="text"
                                                                          value={formData[field.name] || ''}
                                                                          onChange={(e) => handleInputChange(e)}
                                                                      />


                                                  }

                                              </div>
                                          </div>
                                      ))}

                                  </div>
                        <Button variant="primary" style={{background: "#df162c", borderWidth: 0}} onClick={getData}>
                          Rechercher les prix
                        </Button>
                              </div>
                          </div>

                          <div
                              id="dataTable"
                              className="table-responsive table mt-2 ag-theme-alpine"
                              role="grid"
                              aria-describedby="dataTable_info"
                              style={{height: 500}}

                          >
                              <AgGridReact ref={gridRef}
                                           rowData={data} columnDefs={cols}
                                           gridOptions={gridOptions}
                                           onRowClicked={handleRowClick}
                              />
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

export default AddDQE;
