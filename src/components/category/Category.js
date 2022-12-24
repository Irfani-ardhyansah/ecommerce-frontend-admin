import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import NavComponent from '../Navbar'
import SidebarComponent from '../Sidebar'
import axios from 'axios';
import '../Card.css'
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Swal from "sweetalert2";

const Category = () => {
    const [categoryList, setCategoryList]   = useState([])
    const [modalShow, setModalShow]         = useState(false)
    const [name, setName]                   = useState('');
    const [description, setDescription]     = useState('');
    const [id, setId]                       = useState('')
    const [reload, setReload]               = useState(false);
    const dataLogin                         = JSON.parse(localStorage.getItem('dataLogin'));
    const config                            = {
                                                    headers: { Authorization: `Bearer ${dataLogin.token}` }
                                                };

    const handleClose = () => setModalShow(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const result = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/category`, config)

        if(result.data.status == 200) {
            setCategoryList(result.data.data)   
        }    
    }

    const sendData = async(e) => {
        e.preventDefault()

        if(id) {
            const result = await axios.put(`${process.env.REACT_APP_DOMAIN}/api/category/${id}?_method=PUT`, {
                name,
                description
            }, config)
            
            if(result.data.status == 200) {
                showSwal("Success", "Berhasil update data", "success") 
                setReload(!reload)
                handleClose()
            }
        } else {
            const result = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/category`, {
                name,
                description
            }, config)

            if(result.data.status == 200) {
                showSwal("Success", "Berhasil tambah data", "success") 
                setReload(!reload)
                handleClose()
            }
        }
    }

    const create = () => {
        setModalShow(true)
        setId('')
        setName('')
        setDescription('')
    }

    const edit = (data) => {
        setName(data.name)
        setDescription(data.description)
        setId(data.id)
        setModalShow(true)
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

    const showSwal = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: "OK",
        }); 
    }

    const destroy = async (id) => {
        const response = await axios.delete(`${process.env.REACT_APP_DOMAIN}/api/category/${id}`, config)
        if(response.data.status == 200) {
            showSwal("Success", "Berhasil hapus data", "success") 
            await setReload(!reload)
        }
    }

    useEffect(() => {
        getData()
    }, [reload])


    return (
        <>
        <div style={{ display: 'flex', height: '100vh' }}>
            <SidebarComponent />

            <div style={{width: '100%'}}>
                <NavComponent />
                <div className="ContainerBody">
                    <div className="TitleCardBody">
                        <h2>Category</h2>
                        <Button variant="info" className="btn-sm" onClick={create}>Add</Button>
                    </div>

                    <div className="CardBody">
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (categoryList.length > 0) && categoryList.map((row, key) => {
                                        return <tr>
                                            <td>{key+1}.</td>
                                            <td>{row.name}</td>
                                            <td>{row.description}</td>
                                            <td>
                                                <Button variant="secondary" className="btn-sm" onClick={() => edit(row)}>Edit</Button>{' '}
                                                <Button variant="danger" className="btn-sm" onClick={() => btnDelete(row.id)}>Hapus</Button>{' '}
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
                    <Modal.Title>Form Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendData}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="hidden" value={id} />
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={(name) && name} onChange={(e) => setName(e.target.value)} placeholder="Name..." />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={(description) && description} onChange={(e) => setDescription(e.target.value)} placeholder="Description..." />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
        </>
    )
}

export default Category