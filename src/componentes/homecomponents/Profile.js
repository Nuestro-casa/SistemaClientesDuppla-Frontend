import React, { useContext, useEffect, useState } from "react";
import Iperfil from "../../img/iconoperfil.png";
import Idata from "../../img/imgdata.png";
import Icerrarsesion from "../../img/imgcerrarsesion.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Contextauth";
import swal from 'sweetalert';




function profile() {

    // trae la función  salida, que se declaro en el contexto para implementar aquí

    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };

    // Consumo de datos desde el API

    const [data, setData] = useState({});

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        const email = localStorage.getItem('email');
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{ "email": '+email+'}'
        };
        fetch('https://sistema-duppla-backend.herokuapp.com/users/getUser', options)
            .then(response => response.json())
            .then(response => setData(response))
            .catch(err => console.error(err));

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);



    //formateo de los datos de valor inmueble duppla
    const number = data.ingresos;
    const numberr = data.cuota_inicial;
    const formatter = new Intl.NumberFormat('es-ES', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const formattedNumber = formatter.format(number);
    const formattedNumberr = formatter.format(numberr);


    const handleNotification  = () => {

        swal({
           
            text: "Se redireccionará a WhatsApp",
            icon: "info",
            button: "Cerrar",
            timer: 5000,
        });


    };
    return (
        <div className="container-profile container-fluid">
            <div className="arrow-return container sm">
                <Link to='/home' className="links ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" fill="currentColor" className=" bi bi-arrow-left-short arrow-return" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                    </svg>
                </Link>
            </div>
            <div className="title-register container sm ">
                <h1> <b>Perfil</b>
                </h1>
            </div>
            {/*Sesión de perfil */}
            <div className="profile-data container-fluid">
                <div className="">
                    <div className="row ">
                        <div className="col-4">
                            <img src={Iperfil} className="img-fluid  img-user-img" alt="perfil" />
                        </div>
                        <div className="col-8 ">
                            <div className="card-body"><br />
                                <h5 className="text-white text.amp "> {data.nombre}</h5>
                                <p className=" text-white ">{data.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Sección de datos- hay que traerlos de salesforce*/}
            <div className="user-data-card container-fluid">
                <div className="tarjetas-datos-usuario d-grid " id="cardComponet">
                    <div className="card-seccion">
                        <div className="row ">
                            <div className="col-4">
                                <img src={Idata} className=" img-data-perfil" alt="" />
                            </div>
                            <div className="col-4">
                                <div className="card-body">
                                    <p className=""> <small className="text-muted">Cédula</small><br /></p>
                                    <p className=""><b>{data.cedula}</b></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="tarjetas-datos-usuario d-grid" id="cardComponet">
                    <div className="card-seccion">
                        <div className="row ">
                            <div className="col-4">
                                <img src={Idata} className="img-data-perfil" alt="" />
                            </div>
                            <div className="col-4">
                                <div className="card-body">
                                    <p className=""> <small className="text-muted">Teléfono</small><br /></p>
                                    <p className=""><b>{data.celular}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tarjetas-datos-usuario d-grid" id="cardComponet">
                    <div className="card-seccion">
                        <div className="row ">
                            <div className="col-4">
                                <img src={Idata} className="img-data-perfil" alt="" />
                            </div>
                            <div className="col-4">
                                <div className="card-body">
                                    <p className=""> <small className="text-muted">Correo</small><br /></p>
                                    <p className=""><b>{data.email}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tarjetas-datos-usuario d-grid" id="cardComponet">
                    <div className="card-seccion">
                        <div className="row ">
                            <div className="col-4">
                                <img src={Idata} className="img-data-perfil" alt="" />
                            </div>
                            <div className="col-4">
                                <div className="card-body">
                                    <p className=""> <small className="text-muted">Ingreso</small><br /></p>
                                    <p className=""><b>{formattedNumber}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tarjetas-datos-usuario d-grid" id="cardComponet">
                    <div className="card-seccion">
                        <div className="row ">
                            <div className="col-4">
                                <img src={Idata} className="img-data-perfil" alt="" />
                            </div>
                            <div className="col-4">
                                <div className="card-body">
                                    <p className=""> <small className="text-muted">Ocupación</small><br /></p>
                                    <p className=""><b>{data.profecion}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tarjetas-datos-usuario d-grid" id="cardComponet">
                    <div className="card-seccion">
                        <div className="row ">
                            <div className="col-4">
                                <img src={Idata} className="img-data-perfil" alt="" />
                            </div>
                            <div className="col-6">
                                <div className="card-body">
                                    <p className=""> <small className="text-muted">Ingresos adicionales</small><br /></p>
                                    <p className=""><b>No</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tarjetas-datos-usuario d-grid" id="cardComponet">
                    <div className="card-seccion">
                        <div className="row ">
                            <div className="col-4">
                                <img src={Idata} className="img-data-perfil" alt="" />
                            </div>
                            <div className="col-4">
                                <div className="card-body">
                                    <p className=""> <small className="text-muted">Ahorro</small><br /></p>
                                    <p className=""><b>{formattedNumberr}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/*componente calendario*/}
            <div className="centrado  container-sm" id="btnIniciarSesion">
                <a className="links"   href="https://api.whatsapp.com/send?phone=573152559261">
                    <button type="button" id="" className="btn btn-prueba text-white" onClick={handleNotification} width="400px" height="46px" >
                        QUIERO EDITAR MIS DATOS
                    </button>
                </a>
            </div>

            {/*componente cerrar sesión*/}
            <div className="row centrado" onClick={handleLogout}>
                <div className="col-2 btn input-group btn-prueba-blanco centrado-btn " width="400px" height="68px" >
                        <img src={Icerrarsesion} className="img-cerrar" alt="" />
                    <button type="button" id="" className="btn  btn-cerrar " >
                        <b>CERRAR SESIÓN</b>
                    </button>


                </div>

            </div>
        </div>
    );
}


export default profile;