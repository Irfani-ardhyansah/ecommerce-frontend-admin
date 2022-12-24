import './App.css';
import Category from './components/category/Category';
import Login from './components/login/Login'
import Product from './components/product/Product'
import Order from './components/order/Order'
import User from './components/user/User'
import Dashboard from './components/dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoutes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';

function App() {
  return (
    <BrowserRouter>
      <ProSidebarProvider>
        <Routes>
          <Route path="/" exact element={<Login />} />  
          {/* Route to protect unathenticated user   */}
          <Route exact path='/' element={<ProtectedRoute/>}>
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/user" exact element={<User />} />
            <Route path="/category" exact element={<Category />} />
            <Route path="/product" exact element={<Product />} />
            <Route path="/order" exact element={<Order />} />
          </Route>
        </Routes>
      </ProSidebarProvider>
    </BrowserRouter>
  );
}

export default App;
