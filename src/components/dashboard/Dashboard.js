import '../Card.css'
import NavComponent from '../Navbar'
import SidebarComponent from '../Sidebar'
import { Line } from 'react-chartjs-2'
import "chart.js/auto"
import './Dashboard.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dashboard = () => {

    return (
        <>
                    <div style={{ display: 'flex', height: '100vh' }}>
            <SidebarComponent />

            <div style={{width: '100%'}}>
                <NavComponent />
                <div className="ContainerDashboardBody">
                    <Container>
                        <Row>
                            <Col>
                                <div className="ContainerDashboardTitle">
                                    <h1>Chart 1 </h1>
                                </div>
                                <div className="ContainerDashboard">
                                    <Line
                                        className="DashboardGraph"
                                        datasetIdKey='id'
                                        data={{
                                            labels: ['Jun', 'Jul', 'Aug'],
                                            datasets: [
                                            {
                                                id: 1,
                                                label: '',
                                                data: [5, 6, 7],
                                            },
                                            {
                                                id: 2,
                                                label: '',
                                                data: [3, 2, 1],
                                            },
                                            ],
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div className="ContainerDashboardTitle">
                                    <h1>Chart 2</h1>
                                </div>
                                <div className="ContainerDashboard">
                                    <Line
                                        className="DashboardGraph"
                                        datasetIdKey='id'
                                        data={{
                                            labels: ['Jun', 'Jul', 'Aug'],
                                            datasets: [
                                            {
                                                id: 1,
                                                label: '',
                                                data: [5, 6, 7],
                                            },
                                            {
                                                id: 2,
                                                label: '',
                                                data: [3, 2, 1],
                                            },
                                            ],
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard