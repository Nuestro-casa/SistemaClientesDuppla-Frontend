import React from "react";
import Iduppla from "../../img/Iduppla.png"
import { Link } from "react-router-dom";


function SingIn() {

    return (
        <div className=".container-fluid">
            <div className=" centrado">
                <div className="container-sing ">
                    <div className="img-logotipo centrado">
                        <img src={Iduppla} 
                        className="rounded justify-content-center" 
                        alt="Simbolo duppla" />
                    </div>
                    <div className="centrado-btn centrado">
                        <button  litype="button" 
                        className="btn btn-primary btn-registro text-center"
                         width="400px" height="52px">
                          <Link to='/password' className="links text-white">REGISTRO DE CONTRASEÑA</Link>  
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SingIn;