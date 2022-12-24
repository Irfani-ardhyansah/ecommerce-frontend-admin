import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import './Sidebar.css'
import { MdCategory, MdSupervisorAccount, MdProductionQuantityLimits, MdCardGiftcard, MdDonutSmall, MdDashboard } from 'react-icons/md';


const SidebarComponent = () => {
    const location = useLocation();
    return (
        <Sidebar
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: '#E6DDC4',
            },
            }}
        >
        <Menu     
            menuItemStyles={{
                button: ({ active, disabled, hover }) => {
                    return {
                        backgroundColor: active ? 'rgba(128, 194, 199, 0.35)' : undefined
                    };
                },
            }}
        >
            {/* <SubMenu label="Charts">
                <MenuItem> Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
            </SubMenu> */}
            <div className="header-sidebar">
                <h4> <MdDonutSmall /></h4>
            </div>
            <hr />
            <MenuItem routerLink={<Link to="/dashboard" />} active={location.pathname == '/dashboard'}> <MdDashboard /> Dashboard </MenuItem>
            <MenuItem routerLink={<Link to="/user" />} active={location.pathname == '/user'}> <MdSupervisorAccount /> User </MenuItem>
            <MenuItem routerLink={<Link to="/category" />} active={location.pathname == '/category'}> <MdCategory /> Category </MenuItem>
            <MenuItem routerLink={<Link to="/product" />} active={location.pathname == '/product'}> <MdProductionQuantityLimits /> Product </MenuItem>
            <MenuItem routerLink={<Link to="/order" />} active={location.pathname == '/order'}> <MdCardGiftcard /> Order </MenuItem>
        </Menu>
    </Sidebar>
    )
}

export default SidebarComponent