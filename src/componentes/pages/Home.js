import React from "react";
import Idocumento from "../../img/iconodocumentos.png"
import Iinmueble from "../../img/iconoinmueble.png"
import Iperfil from "../../img/iconoperfil.png"
import BarraProgreso from "../../img/barraprogreso.png"
import { Link, Navigate } from "react-router-dom";






function Home() {   


  return (
    <div className="container-home">
      {/*Contenedor de perfil */}
      <div className="profile ">       
        <div className="col-4 ">
          <img src={Iperfil}
            className="img-fluid rounded-start img-user"
            alt="perfil" />
        </div><hr/>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title text-white" >Nombre Usuario</h5>
            <p className="text-orange">Fecha</p>
          </div>
          <Link to='/profile' className="link-styles">Abrir</Link>
        </div>
      </div>
      {/*Contenedor de oferta */}
      <div className="Container-cards-seccion d-grid" id="cardComponet">
        <div className="card-seccion"   >
          <div className="row ">
            <div className="col-4">
              <img src={Idocumento} className="img-fluid rounded-start img-user warning font-medium-2 mr-2" alt="" />
            </div>

            <div className="col-4">
              <h4 className="card-title"><b>Ultima oferta</b></h4><br />
              <Link to='/offer' className="link-style">Abrir</Link>
            </div>
            <div className="col-4">
              <div className="card-body">
                <p className="card-text"> Hoy 13/01/2022</p><br />
                <p className="card-text"> Por aprobar.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/*Contenedor de inmueble */}
      <div className="Container-cards-seccion d-grid" id="cardComponet">
        <div className="card-seccion"   >
          <div className="row ">
            <div className="col-4">
              <img src={Iinmueble} className="img-fluid rounded-start img-user warning font-medium-2 mr-2" alt="" />
            </div>

            <div className="col-4">
              <h4 className="card-title"><b>Inmueble</b></h4><br />
              <Link to='/property' className="link-style">Abrir</Link>
            </div>
            <div className="col-4">
              <div className="card-body">
                <p className="card-text"> Hoy 13/01/2022</p><br />
                <p className="card-text"> Por aprobar.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/*Menú documentos*/}
      <div className="card-docs  ">
        <div className="card-body col-8">
          <b>Menú documentos</b>
        </div>
        <div className="col-2 outline">
          <Link to='/documents'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAAgFJREFUeF7t2z1KxEAYxvH/XkAQPIKgYGMvinoiSys/Kks7jyOK1hZroeARRMUbyMAGRNzsJEPeeQae1BOS/OaZN5PZ2Rk+egVm9ukXMNCKhBjIQGVFxAlygpygMgEnqMzPNcgJcoLKBJygMj/XIOEErQNfZf07/dm1EnQDHAEHwPv0jzn+CjWAroGTxS2/qiNFA10Bp3/6UxopEugcuFgSdlmkKKCUmpSevkMSKQIo1ZtUd3IOOaQIoBdgO0dn0Wa+eMN9DjhnsqYRQBvAI7A14CmegUOgOlIEUHJpFikKqFmkSKAmkaKBmkOqAdQh3QE76oW7FlBySV/zD+pINYFKkPaB7wHpG920NtBYpCfgOAJJAUgaSQVIFkkJSBJJDUgOSRGoQ7oFdge8fiYp3KpAa8C9gf6PhwxOuj21BKXZtcTQ6vpOCWjMp8ckded3sFWAJHFUhtgYnLQkG/I9VjtBY3HC1qtrAsnj1BxiaRHfC2ZLZsFN/cIRPcSawokeYs3hRAI1iRMF1CxOFNAbsDlg2SJNAtP2vI8B50zWNKJID93+sqewaSH6YzUHSW5vUNQQ6zrjDLhcMhYkcaKB0vW8iTOjWnobcAaSN5JnIPmvCBlI8k0i5kHyCH03aKAV3WcgA5WNcCfICXKCygScoDI/1yAnyAkqE3CCyvxcg1b4/QBf035JQzfVwQAAAABJRU5ErkJggg=="
            className="arrow-menu" />
          </Link>
        </div>
      </div>

      {/*componente de estados*/}

      <div className="card-estados">
        <div className="card-body col-12">
          <img src={BarraProgreso} className="img-estados" alt="" />
        </div>
      </div>

      {/*Próxima reunión*/}
      <div className="card-docs ">
        <div className="card-body col-6">
          Proxima reunión
        </div>
        <div className="col-6">
          <p className="danger-text"> 01-12-2023 8:00 a.m.</p>
        </div>
      </div>

      {/*componente calendario*/}
      <div className="centrado-btn " id="btnIniciarSesion">
        <Link to='/Calendar'>
          <button type="button" id="" className="btn btn-primary btn-registro text-center" width="400px" height="46px" >
            Agendar una cita
          </button>
        </Link>
      </div>
      {/*componente  soporte*/}
      <div className="btn btn-ingreso-google centrado-btn" width="400px" height="48px" >
        <Link to=''>
          <div><b>Tengo algún problema</b></div>
        </Link>
      </div>

    </div>










  );
}


export default Home;
