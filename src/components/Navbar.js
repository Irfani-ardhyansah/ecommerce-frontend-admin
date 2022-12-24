import './Navbar.css'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import {useProSidebar } from 'react-pro-sidebar'
import { MdMenu, MdOutlineLogout } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom'

const NavComponent = () => {
    const { collapseSidebar }   = useProSidebar();
    const navigate              = useNavigate()

    const btnLogout = () => {
        confirmAlert({
            title: 'Confirm to logout',
                buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                                        localStorage.clear()
                                        navigate('/')
                                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <button style={{ border: 'none', backgroundColor: '#eaeaea', borderRadius: '3px', marginRight: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => collapseSidebar()}><MdMenu /></button>
                <Navbar.Brand><Link to='/dashboard' style={{textDecoration: 'none', color: 'white', "&:hover":{backgroundColor: 'none'}}}> Admin Itel  </Link></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <button style={{ border: 'none', backgroundColor: '#eaeaea', borderRadius: '3px', marginLeft: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => btnLogout()}><MdOutlineLogout /> </button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavComponent