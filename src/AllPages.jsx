import React from 'react';
import Home from './layout/Home';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Error from './layout/Error';
import Layout from './layout/Layout';
import CustomMap from './map/CustomMap';

// context-provider-start------------------------------------------------------
import ThemeContextProvider from './contextProvider/ThemeContextProvider';
import AuthContextProvider from './contextProvider/AuthContextProvider';
// context-provider-end------------------------------------------------------
export {Home,Navbar,Footer,Error,Layout,CustomMap,ThemeContextProvider,AuthContextProvider}

const AllPages = () => {
    return (
        <div>
            
        </div>
    );
};

export default AllPages;