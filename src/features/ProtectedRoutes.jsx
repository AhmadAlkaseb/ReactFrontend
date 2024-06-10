import React from 'react';
import { Navigate } from 'react-router-dom';


//chrildren er en prop som er tilgængelig ved oprettelse at komponent
const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;