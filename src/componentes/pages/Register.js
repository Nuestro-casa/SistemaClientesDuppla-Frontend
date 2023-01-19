import React, { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serialize } from 'cookie';




function Register() {

    /*Usa el estado para enviar al home */
    const navigate = useNavigate();

    /*const [prueba, setPrueba] = useState('false');*/

    /*Datos enviados a través del servicio*/
    const [datos, setDatos] = useState({
        email: '',
        password: ''
    });
    /*eventos del input*/
    /*const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');*/

    /*Función manejo de cambios en los inputs, maneja un evento e*/

    const handleInputChance = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })

    }

    
    /*let { name, value } = e.target;
    let newDatos = { ...datos, [name]: value };
    setDatos(newDatos);*/


    /*Propiedad del paquete  de cookie para volver el token una cookie*/

    {/*const serialized = serialize('datosUsuarioDuppla', token,{

    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'? true : false,
    samesite: 'lax',
    maxAge: 1000 * 60 * 60 ,
    path: '/register'

    }

    });
     const [token, setToken] = useState(serialized);  
      useEffect(() => {
          if (token ) {
             console.log(token);

          }else{
             alert('Usuario o contraseña incorrecta');
  
          }
      }, [token, navigate]);*/}




    /*Función para enviar los datos al servidor*/
    /*const handleToken= (e) => {
        e.preventDefault();
        console.log(datos);
        axios.post('https://sistemas-clientes-duppla.herokuapp.com/users/login', datos)
          .then(res => {
                console.log(res.data);

           })**/



    {/*} useEffect(() => {

        const loggedUserJSON = localStorage.setItem("tokenUser", JSON.stringify(user));
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setDatos(user);
        }
    },[]);
*/}


    /*Función que maneja el envio de la información del formulario */

    const handleSubmit = async (e) => {
        e.preventDefault();


        // deberia validar que si el correo no es valido, no pase o de error
        if (datos.email === "" || datos.email === null || datos.password === "" || datos.password === null) {
            alert('El correo  o contraseña no puede estar vacio');
        } else {
            console.log(datos);
            const options = {
                method: 'POST',
                url: 'https://sistemas-clientes-duppla.herokuapp.com/users/login',
                headers: { 'Content-Type': 'application/json' },
                data: { email: datos.email, password: datos.password }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                console.log(response.status);
                if (!response.data.status === 200) {

                    console.log('error de login');
                } else {
                    if (!datos.email === response.status && datos.password === response.status) {
                        // validar que sea igual a 200 response.status === 200  si es va a home de lo contraio error
                        alert('error');
                    } else {
                        localStorage.setItem('tokenUser', response.data.token);
                        navigate('/home');
                        setDatos('');
                    }
                }
            }).catch(function (error) {
                console.error(error);
            });
        };
    };




    return (

        <div className="register" id="formAuthLogin">
            <div className="container-register">
                <div className="arrow-return">
                    <Link to='/login'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                        </svg>
                    </Link>
                </div>
                <div className="title-register">
                    <h2> <b>Iniciar Sesión</b>
                    </h2>
                </div>
                <div className="form-register">
                    <form onSubmit={handleSubmit} >
                        <div className="mb-3">
                            <input type="email"
                                name='email'
                                onChange={handleInputChance}
                                value={datos.email}
                                className="form-control input-register"
                                id="exampleInputEmail1"
                                placeholder="Correo electrónico"
                                aria-describedby="emailHelp"
                                required />

                        </div>
                        <div className="mb-3">

                            <input type="password"
                                name='password'
                                onChange={handleInputChance}
                                value={datos.password}
                                className="form-control input-register"
                                placeholder="Contraseña"
                                id="exampleInputPassword1" />

                        </div>
                        <button type="submit"
                            className="btn btn-primary centrado-btn">SIGUIENTE</button>
                    </form>


                </div>



            </div>

        </div>


    );

};




export default Register;