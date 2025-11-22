
import React from 'react'
import { UseAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const PrivateRouter = ({children}) => {
    const {currentUser, loadings} = UseAuth();
    if(loadings) {
      return <div>Loading . . .</div>
    }
    if(currentUser){
        return children;
    }
  return (
    <Navigate to="/login" />
  );
}

export default PrivateRouter;
