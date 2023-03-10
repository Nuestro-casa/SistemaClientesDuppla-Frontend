import { loadGapiInsideDOM } from 'gapi-script';
import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import Ioferta from "../../img/Ioferta.png";
import Idefaultoffer from "../../img/Idefaultoffer.png";
import swal from 'sweetalert';




function Offer() {

  // Estado consumo de la api con oferta
  const [oferta, setOferta] = useState({});

  useEffect(() => {
    const email = localStorage.getItem('email');

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ "email": ' + email + '}'
    };

    fetch('https://sistema-duppla-backend.herokuapp.com/ofertas/getOferta', options)
      .then(response => response.json())

      .then(response => {
        //console.log( 'prueba' + JSON.stringify(response.Oferta_URL__c));
        setOferta(response)
      })
      .catch(err => console.error(err));

  }, []);

  const offerUrl = oferta.Oferta_URL__c;


  // Estado de la función aceptar
  const [progress, setProgress] = useState(false);

  // Función en botón aceptar
  const handleProgress = () => {

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"id":"1","email": "pgutierrez@duppla.co"}'
    };

    fetch('https://sistema-duppla-backend.herokuapp.com/ofertas/accept', options)
      .then(response => response)
      .then(response => setProgress(response))
      .catch(err => console.error(err));


    swal({
      title: "Se acepto correctamente la oferta",
      icon: "success",
      button: "Cerrar",
      timer: 5000,
    });

  }




  return (
    <div className="container-fluid">
      <div className="container-offer">
        <div className="">
          <div className="arrow-return">
            <Link to='/home'>
              <svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" fill="currentColor" className=" arrow-return bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="title-register">
          <h1> <b>Oferta</b>
          </h1>
        </div>


        <div className='container-fluid '>

          {offerUrl ?
            <div className="  offer-container-link  " id="btnIniciarSesion">
              <div>
                <p className='text-offer-link'><b>Da clic en botón para ver la oferta</b></p>
              </div>
              <div className='centrado'>
                <a className="links text-white"
                  href={offerUrl} 
                  >
                   
                  <button type="button" className="btn btn-prueba text-center links text-white" width="400px" height="46px" >
                    Oferta
                  </button>
                </a>
              </div>

            </div> : <div className='img-offer-conatiner '>
              <img src={Idefaultoffer} className="container fluid" alt="..." />
            </div>}

        </div>



      
        <br />
        <br />
        {/*Sección botones oferta */}
        <div className="d-flex justify-content-center align-items-center container-sm">
          <div>
            <Link to='/home'>
              <button type="button" className="btn btn-outline-primary btn-d-aceptar" >CANCELAR</button>
            </Link>
          </div><br />
          <div className="">
            <button type="button" className="btn btn-outline-primary btn-d-cancel" onClick={handleProgress} >ACEPTAR</button>
          </div>
        </div>

      </div>
    </div>
  );

}

export default Offer;