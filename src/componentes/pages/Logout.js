import {useContext, useCallback} from "react";
import { Navigate } from "react-router-dom";




function Logout() {
 
 localStorage.removeItem('tokenUser');


return Navigate('/login');

    
}


export default Logout;