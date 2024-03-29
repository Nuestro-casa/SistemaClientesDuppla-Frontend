import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";



// creación de contexto global para auth-memoria central
export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
   
    const navigate = useNavigate();

    const [token, setToken] = useState(null);

    const [loanding, setLoanding] = useState(true);


    useEffect(() => {
        const recovereToken = localStorage.getItem("token");
        if (recovereToken) {
            setToken(JSON.parse(recovereToken));
        }
        setLoanding(false);

    }, []);

//ejemplo de operador ternario condicion ? true : false
    const login = (tokenUser, email,estado) => {

        localStorage.setItem('token', JSON.stringify(tokenUser));
        localStorage.setItem('email', JSON.stringify(email)); 
        localStorage.setItem('estado', JSON.stringify(estado));      
        

        if (tokenUser) {
           // console.log('ver si entra el', tokenUser);
           // se verifica que el token sea el correcto
            const options = {
                method: 'POST',
                headers: {
                  Authorization: 'Bearer ' + tokenUser,
                }
              };
              
              fetch('https://sistema-duppla-backend.herokuapp.com/users/check', options)
                .then(response => response.json())
                .then(response => {
                    setToken({ token: tokenUser }
                        
                        );
                    
                    //console.log(response);
                    if(tokenUser == "undefined"){
                        navigate('/login');
                        localStorage.removeItem('token');
                    }
                    else if(estado == true){
                        navigate('/inicio')
                    }
                    else{
                        navigate('/home')
                    }        
                })
                .catch(err => {                
                    
                    console.error(err)                
                    navigate('/login')
                });
        } else {
            navigate('/login')
        }
    };

    const logout = () => {
        //console.log('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('estado');
        setToken(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider
            value={{ authenticated: !!token, token, loanding, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}
