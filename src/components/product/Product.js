import '../Card.css'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavComponent from '../Navbar'
import SidebarComponent from '../Sidebar'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import moment from 'moment'

const Product = () => {
    const [categories, setCategory]         = useState({})
    const [products, setProduct]            = useState({})
    const [modalShow, setModalShow]         = useState(false)
    const [modalShowDisc, setModalShowDisc] = useState(false)
    const [createDisc, setCreateDisc]       = useState('none')
    const [statusDisc, setStatusdisc]       = useState('block')
    const [reload, setReload]               = useState(false)
    const [id, setId]                       = useState('')
    const dataLogin                         = JSON.parse(localStorage.getItem('dataLogin'))
    const config                            = {
                                                    headers: { Authorization: `Bearer ${dataLogin.token}` }
                                                };
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        reset: reset2,
        formState: { errors: errors2 }
      } = useForm({
        mode: "onBlur",
      });

    const handleClose = () => setModalShow(false)    
    const handleCloseDisc = () => setModalShowDisc(false)    

    useEffect(() => {
        getData()
        getCategory()
    }, [])

    const getCategory = async () => {
        const result = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/category`, config)

        if(result.status == 200) {
            setCategory(result.data.data)
        }
    }

    const getData = async () => {
        const result = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/product`, config)

        if(result.status == 200) {
            setProduct(result.data.data)
        }
    }

    const create = () => {
        reset({
            name: '',
            description: '',
            price: '',
            stock: ''
        })
        setId('')
        setModalShow(true)
    }

    const sendData = async (e) => {
        let dataProduct = {'category_id' : e.category, 'name' : e.name, 'description' : e.description, 'price' : e.price, 'stock' : e.stock}
        if(id) {
            const result = await axios.put(`${process.env.REACT_APP_DOMAIN}/api/product/${id}?_method=PUT`, dataProduct, config)
            if(result.data.status == 200) {
                showSwal("Success", "Berhasil update data", "success") 
                setReload(!reload)
                handleClose()
            }
        } else {
            const result = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/product`, dataProduct, config)
            if(result.data.status == 200) {
                showSwal("Success", "Berhasil tambah data", "success") 
                setReload(!reload)
                handleClose()
            }
        }
    }

    const edit = (data) => {
        reset({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category: data.category_id
        })
        setId(data.id)
        setModalShow(true)
    }   

    const showSwal = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: "OK",
        }); 
    }

    const btnDelete = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => destroy(id)
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    const destroy = async (id) => {
        const response = await axios.delete(`${process.env.REACT_APP_DOMAIN}/api/product/${id}`, config)
        if(response.data.status == 200) {
            showSwal("Success", "Berhasil hapus data", "success") 
            await setReload(!reload)
        }
    }

    useEffect(() => {
        getData()
    }, [reload])

    const toSwitch = (val) => val === 1 ? true : false;

    const updateStatus = async (id) => {
        const result = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/product/${id}/status`, config)
        if(result.status == 200) {
            showSwal("Success", "Berhasil update status", "success")
            await setReload(!reload)
        }
    }

    const btnDisc = async (id, disc) => {
        setStatusdisc('block')
        setId(id)
        setModalShowDisc(!modalShowDisc)
        if(disc) {
            reset2({
                start_at: disc.start_at,
                end_at: disc.end_at,
                priceDisc: disc.price,
            })
            setCreateDisc('block')
        } else {
            reset2({
                start_at: '',
                end_at: '',
                priceDisc: '',
            })
            setCreateDisc('none')
        }
    }

    const updateStatusDisc = (e) => {
        if(e.target.checked) {
            setStatusdisc('block')
        } else {
            setStatusdisc('none')
        }
    } 

    const sendDataDiscount = async (e) => {
        const start_at  = moment(e.start_at).format('YYYY-MM-DD hh:mm:ss');
        const end_at    = moment(e.end_at).format('YYYY-MM-DD hh:mm:ss');
        let dataDisc = {'start_at' : start_at, 'end_at' : end_at, 'price' : e.priceDisc, 'status' : e.status}
        const result = await axios.put(`${process.env.REACT_APP_DOMAIN}/api/product/${id}/discount?_method=PUT`, dataDisc, config)
        if(result.data.status == 200) {
            showSwal("Success", "Berhasil mengubah data discount", "success") 
            setReload(!reload)
            handleCloseDisc()
        }
        }

    return (
        <>
            <div style={{ display: 'flex', height: '100vh' }}>
                <SidebarComponent />

                <div style={{width: '100%'}}>
                    <NavComponent />
                    <div className="ContainerBody">
                        <div className="TitleCardBody">
                            <h2>Product</h2>
                            <Button variant="info" onClick={create} className="btn-sm">Add</Button>
                        </div>

                        <div className="CardBody">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   
                                        (products.length > 0) && products.map((row, key) => {   
                                            return <tr style={{verticalAlign: 'middle'}}>
                                                <td>{key+1}.</td>
                                                <td>
                                                    {row.name}
                                                </td>
                                                <td>{row.stock}</td>
                                                <td>
                                                    {
                                                        row.discount == null ? 
                                                            `Rp. ${row.price}` : 
                                                            <span style={{textDecoration:'line-through'}}>Rp. {row.price}</span>
                                                    } 
                                                        <br />
                                                    {row.discount && (
                                                        <span style={{color: 'red'}}>Rp. {row.discount.price}</span>
                                                    )}
                                                </td>
                                                <td>      
                                                    {
                                                    row.status == 1 ? 
                                                        <Badge bg="success">
                                                            Active
                                                        </Badge>
                                                    :
                                                        <Badge bg="secondary">
                                                            Inactive
                                                        </Badge>
                                                    }
                                                    <Form.Check type="switch" defaultChecked={toSwitch(row.status)} onClick={() => updateStatus(row.id)}/>
                                                </td>
                                                    <td>
                                                        <Button variant="secondary" className="btn-sm" onClick={() => edit(row)}>Edit</Button>{' '}
                                                        <Button variant="danger" className="btn-sm" onClick={() => btnDelete(row.id)}>Hapus</Button>{' '}
                                                        <Button variant="outline-secondary" className="btn-sm" onClick={() => btnDisc(row.id, row.discount)}>Disc</Button>{' '}
                                                    </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <Modal show={modalShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form key={1} onSubmit={handleSubmit(sendData)}>
                        <Container>
                            <Row>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="hidden" value={id} />
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select isInvalid={!!errors.category} {...register("category", { required: true })}>
                                        <option disabled>Pilih Category</option>
                                        {
                                            (categories.length > 0) && categories.map((row, key) =>
                                                <option value={row.id}>{row.name}</option>
                                            )
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Category is null...</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." name="name" isInvalid={!!errors.name} {...register("name", { required: true })} />
                                    <Form.Control.Feedback type="invalid">Name is null...</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Description..." name="description" isInvalid={!!errors.description} {...register("description", { required: true })} />
                                    <Form.Control.Feedback type="invalid">Description is null...</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Stock</Form.Label>
                                        <Form.Control type="number" placeholder="Stock..." name="stock" isInvalid={!!errors.stock} {...register("stock", { required: true })}  />
                                        <Form.Control.Feedback type="invalid">Stock is null...</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" placeholder="Price..." name="price" isInvalid={!!errors.price} {...register("price", { required: true })}  />
                                        <Form.Control.Feedback type="invalid">Price is null...</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type="file" name="file"  isInvalid={!!errors.file} {...register("file")} />
                                        <Form.Control.Feedback type="invalid">Image is null...</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>

                        </Container>
                    </Form>
                </Modal.Body>
                </Modal>

                <Modal show={modalShowDisc} onHide={handleCloseDisc}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Discount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form key={2} onSubmit={handleSubmit2(sendDataDiscount)}>
                        <Container>
                            <Row style={{display: statusDisc}}>
                                <Col lg="11">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Start At</Form.Label>
                                        <Form.Control type="datetime-local" {...register2("start_at")}/>
                                    </Form.Group>
                                </Col>
                                <Col lg="11">
                                    <Form.Group className="mb-3">
                                        <Form.Label>End At</Form.Label>
                                        <Form.Control type="datetime-local" {...register2("end_at")}/>
                                    </Form.Group>   
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="9" style={{display: statusDisc}}>
                                <Form.Group className="mb-3">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" placeholder="Price..." {...register2("priceDisc")}/>
                                    </Form.Group>
                                </Col>
                                <Col lg="3">
                                <Form.Group className="mb-3" style={{display: createDisc}}>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Check type="switch" defaultChecked={true} onClick={ updateStatusDisc } {...register2("status")}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>

                        </Container>
                    </Form>
                </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default Product