import './Login.css'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const navigate          = useNavigate()
    const [email, setEmail] = useState('')
    const [pass, setPass]   = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const sendData = async (e) => {
        const dataLogin = {'email' : e.email, 'password' : e.pass}
        const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/login`, dataLogin)

        if(response.status == 200) {
            localStorage.setItem('dataLogin', JSON.stringify(response.data.data));
            navigate('/dashboard')
        }
    }

    return(
        <div className="loginContainer">

            <div className="loginBody">
                <div className="loginTitleCardBody">
                    <h1>Login</h1>
                </div>
                <div className="loginContainerBody">
                    <Form onSubmit={handleSubmit(sendData)}>
                        <Container>
                            <Row>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="hidden" />
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email..." name="email" isInvalid={!!errors.email} {...register("email", { required: true })} onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Email is null...</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password..." isInvalid={!!errors.pass} {...register("pass", { required: true })}  onChange={(e) => setPass(e.target.value)}/>
                                    <Form.Control.Feedback type="invalid">Password is null...</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <div style={{display: 'flex', justifyContent: 'end' }}>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>

                        </Container>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login