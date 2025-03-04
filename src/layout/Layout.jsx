import React from 'react';
import Home from './Home';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
           <div className='min-h-screen'>
           <Outlet></Outlet>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;