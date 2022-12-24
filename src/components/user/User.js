import '../Card.css'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import NavComponent from '../Navbar'
import SidebarComponent from '../Sidebar'

const User = () => {
    return (
        <>
        <div style={{ display: 'flex', height: '100vh' }}>
            <SidebarComponent />

            <div style={{width: '100%'}}>
                <NavComponent />
                <div className="ContainerBody">
                    <div className="TitleCardBody">
                        <h2>User</h2>
                    </div>

                    <div className="CardBody">
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Date Register</th>
                                    <th>Order Count</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.</td>
                                    <td>Irfan Ardhyan</td>
                                    <td>Madiun</td>
                                    <td>12-12-2022</td>
                                    <td>10</td>
                                    <td>
                                        <Button variant="primary" className="btn-sm">Detail</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default User