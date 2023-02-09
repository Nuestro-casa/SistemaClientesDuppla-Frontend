import { loadGapiInsideDOM } from 'gapi-script';
import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import Ioferta from "../../img/Ioferta.png";
import swal from 'sweetalert';




function Offer() {


  const [progress, setProgress] = useState(false);

  // GET request using fetch inside useEffect React hook
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"id":"1"}'
  };

  fetch('https://sistemas-clientes-duppla.herokuapp.com/ofertas/accept', options)
    .then(response => response)
    .then(response => setProgress(response))
    .catch(err => console.error(err));

  // empty dependency array means this effect will only run once (like componentDidMount in classes)


  const handleProgress = () => {

    setProgress(true);
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
        <div className='visualizacion-pdf'>
          {/*Carrusel de imagenes preuba para el movil*/}
          <div className="carousel-item active">
            <img src={Ioferta} className="d-block w-100" alt="..." />
          </div>
          <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0" className="active" aria-current="true"
                aria-label="Slide 1"></button>
              <button type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={Ioferta} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={Ioferta} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={Ioferta} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button"
              data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button"
              data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div><br />
        </div>
        <div className="d-flex justify-content-center align-items-center container-sm">
          <div>


            <Link to='/home'>
              <button type="button" class="btn btn-outline-primary btn-d-aceptar" >CANCELAR</button>
            </Link>
          </div><br />
          <div className="">
            <button type="button" class="btn btn-outline-primary btn-d-cancel" onClick={handleProgress} >ACEPTAR</button>
          </div>
        </div>

      </div>
    </div>
  );

  }

export default Offer;