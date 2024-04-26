import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const profile = localStorage.getItem('profile');

    if (!profile) {
        return <Navigate to='admin/' replace />;
    }
    

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return profile ? <Outlet /> : <Navigate to="/admin" />;
}
export default AdminRoute