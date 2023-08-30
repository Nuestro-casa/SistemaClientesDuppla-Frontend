import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import './../custumer/Payment.css'
import numeral, { options } from 'numeral';
import IconUbicacion from '../../src/img/Iconubicacion.svg'
import swal from 'sweetalert';
import { Box, Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';





function Payment() {


    // Uso de estados para el endpoint de la API
    const [dataCustumer, setDataCustumer] = useState({});
    const [formattedDataCustumer, setFormattedDataCustumer] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem('email');
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{ "email": ' + email + '}'
        };

        fetch('https://sistema-duppla-backend.herokuapp.com/users/homeCustomer', options)
            .then(response => response.json())
            .then(response => {
                setDataCustumer(response)
                setFormattedDataCustumer(numeral(dataCustumer).format('0,0.00'))
            })

            .catch(err => console.error(err));
    }, []);

    // Uso de estados para el endpoint de la API de manera global en el componente
    const pagoMinimo = dataCustumer.pagoMinimo;
    const formatoSugerido = pagoMinimo + (pagoMinimo * 0.17);
    const gastos = dataCustumer.gastos;
    const administracion = dataCustumer.administracion;


    //función que formatea el número
    const formatNumber = (number) => {
        const formatter = new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        return formatter.format(number);
    };
    const formatter = new Intl.NumberFormat('es-ES', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    const formatterPagoMinimo = formatter.format(pagoMinimo);
    const formatoSug = formatter.format(formatoSugerido);


    {/* Función que crea el link de ago que redirecciona a Paloma*/ }

    const [valoresApi, setValoresApi] = useState({
        comercio: "duppla",
        precio: dataCustumer.inmuebleValor,
        descripcion: dataCustumer.inmuebleName,
    });

    /* Funcion que crea el enlace para pago en paloma */
    const generarEnlace = () => {
        const enlaceBase = "https://www.pay.palomma.com/?";
        const { comercio } = valoresApi;

        let precio, descripcion;

        if (selectedOption === "option1") {
            precio = pagoMinimo;
            descripcion = dataCustumer.inmuebleName;
        } else if (selectedOption === "option2") {
            precio = pagoMinimo + (pagoMinimo * 0.17);
            descripcion = dataCustumer.inmuebleName;
        } else {
            // borrar los punto y comas cuando se ingresa el monto
            precio = paymentValue.replace(/[.,]/g, "");
            descripcion = dataCustumer.inmuebleName;
        }

        const enlaceModificado = `${enlaceBase}comercio=${comercio}&precio=${precio}&descripcion=${descripcion}`;
        setValoresApi({ comercio, precio, descripcion });
        setPaymentURL(enlaceModificado);

        return enlaceModificado;
    };


    // estados para el formulario

    const [selectedOption, setSelectedOption] = useState();
    const [paymentURL, setPaymentURL] = useState();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);//estado para el botón
    const [paymentValue, setPaymentValue] = useState("");//para el input number

    // se usa para crear el enlace de pago
    useEffect(() => {
        if (paymentURL) {
            window.location.href = paymentURL;
        }
    }, [paymentURL]);

    // cambio del estado en los input del formulario
    function handleOptionChange(event) {
        event.preventDefault();
        setSelectedOption(event.target.value);
        setIsButtonDisabled(false);
    }

    // Función que controla el input del formulario
    function handlePayment(e) {
        e.preventDefault();
        let enlace;
        if (selectedOption === 'option1' || selectedOption === 'option2') {
            const enlace = generarEnlace();
            window.location.href = enlace;
            /*   if (selectedOption === "option1") {
                  enlace = generarEnlace();
                  window.location.href = paymentURL;
              } else if (selectedOption === "option2") {
                  enlace = generarEnlace(); */
        } else {
            const valor = paymentValue.replace(/[.,]/g, "");
            const precio = parseFloat(valor);

            const sumaValores = gastos + administracion;
            const cambioValores = numeral(sumaValores).format('0,0')
            //validación de digitos 5, 6, 7, 8, 9
            console.log('precio', precio);
            console.log('sumaValores', sumaValores);
            const mensajeAlert = "El valor mínimo a pagar es $" + cambioValores + "";
            if (precio <= sumaValores) {
                swal({
                    text: mensajeAlert,
                    icon: "info",
                    button: "Cerrar",
                    timer: 5000,
                });
                return;
            }

            // Aquí puedes realizar alguna acción con el enlace generado
            enlace = generarEnlace(precio);
        }
    }


    // cambio de icono de ubicación en la barra de pago
    const stateChangeU = () => {
        switch (selectedOption) {
            case "option1":
                return <div className=''>
                    <img src={IconUbicacion} className="icon2" alt="" height="24px" width="24px" />
                </div>
            case "option2":
                return <div className=''>
                    <img src={IconUbicacion} className="icon4" alt="" height="24px" width="24px" />
                </div>
            case "option3":
                //función para cambiar el icono de ubicación estado del input text paymentValue
                return <div className=''>
                    {handleInputPrueba()}
                </div>

            default: return <img src={IconUbicacion} className="icon0" alt="" height="24px" width="24px" />;
        }
    }

    /* Función para la gráfica según la ubicación de la viñeta  */
    const handleInputPrueba = () => {
        const valor = paymentValue.replace(/[.,]/g, "");
        const precio = parseFloat(valor);
        const sumaValores = gastos + administracion;
        const precioSugerido = Math.floor(pagoMinimo + (pagoMinimo * 0.17));
        const precioPagoMinimo = Math.floor(pagoMinimo);

        if (valor.length < 5) {
            return (
                <div className='icon0'>
                    <img src={IconUbicacion} className="" alt="" height="24px" width="24px" />
                </div>
            );
        } if (precio <= sumaValores) {
            return (
                <div className='icon1'>
                    <img src={IconUbicacion} alt="" height="24px" width="24px" />
                </div>
            );
        } else if (precio === precioPagoMinimo) {
            return (
                <div className='icon2'>
                    <img src={IconUbicacion} alt="" height="24px" width="24px" />
                </div>
            );
        } else if (precio < precioPagoMinimo) {
            return (
                <div className='icon1'>
                    <img src={IconUbicacion} alt="" height="24px" width="24px" />
                </div>
            );

        } else if (precio === precioSugerido) {
            return (
                <div className='icon4'>
                    <img src={IconUbicacion} alt="" height="24px" width="24px" />
                </div>
            );
        } else if (precio < precioSugerido) {
            return (
                <div className='icon3'>
                    <img src={IconUbicacion} alt="" height="24px" width="24px" />
                </div>
            );

        } else {
            return (
                <div className='icon5'>
                    <img src={IconUbicacion} alt="" height="24px" width="24px" />
                </div>
            );
        }
    };

    /* redondea decimales */
    const roundToTwoDecimals = (value) => {
        return Math.round(value * 100) / 100;
    };


    return (
        <div className='payment'>
            <div className="">
                <div className="arrow-return">
                    <Link to='/inicio'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56px" height="56px" fill="#0A3323" className=" arrow-return bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fillrule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                        </svg>
                    </Link>
                </div>
            </div>
            <div className="title-register-payment ">
                <h1> <b>Seleccione el monto a pagar</b>
                </h1>
            </div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center',
                textAlign: 'start',
            }}>
                <CssBaseline />
                <Container maxWidth="xl" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    mb: 4,
                }}
                    className=''>
                    <Grid container justifyContent="center" alignItems="center" sx={{
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'center',

                    }}>
                        <Grid item sx={12} sm={12} md={12} lg={12} >

                            <form onSubmit={handlePayment}>
                                <RadioGroup
                                    name="flexRadioDefault"
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                >

                                    <Grid container justifyContent="center" alignItems="center" sx={{
                                        mt: 2
                                    }}>
                                        <Grid item sx={10} sm={10} md={10} lg={10} >

                                            <Grid container justifyContent="center" alignItems="center" className={`Container-cards-payment-customer-mui ${selectedOption === 'option1' ? 'selected' : ''}`} sx={{
                                                mt: 2,
                                            }}>
                                                <Grid item sx={6} sm={6} md={6} lg={6} >
                                                    <FormControlLabel
                                                        value="option1"
                                                        control={<Radio />}
                                                        label="Pago mínimo"
                                                        checked={selectedOption === "option1"}
                                                    />
                                                </Grid>
                                                <Grid item sx={6} sm={6} md={6} lg={6} >
                                                    <div className=" space-value">
                                                        <p className="card-text text-end more space-value">$ {formatterPagoMinimo}</p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item sx={10} sm={10} md={10} lg={10} >
                                            <Grid container justifyContent="center" alignItems="center" className={`Container-cards-payment-customer-mui ${selectedOption === 'option2' ? 'selected' : ''}`} sx={{
                                                mt: 2,
                                            }}>
                                                <Grid item sx={6} sm={6} md={6} lg={6} >
                                                    <FormControlLabel
                                                        value="option2"
                                                        control={<Radio />}
                                                        checked={selectedOption === "option2"}
                                                        label="Pago sugerido"
                                                    />
                                                </Grid>
                                                <Grid item sx={6} sm={6} md={6} lg={6} >
                                                    <div className=" space-value">
                                                        <p className="card-text text-end more space-value">$ {formatoSug}</p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={10} sm={10} md={10} lg={10} >
                                            <Grid container
                                                className={`Container-cards-payment-c ${selectedOption === 'option3' ? 'selected' : ''}`} sx={{
                                                    mt: 2,
                                                }}>
                                                <Grid item sx={5} sm={5} md={6} lg={6} >
                                                    <FormControlLabel
                                                        value="option3"
                                                        control={<Radio />}
                                                        checked={selectedOption === "option3"}
                                                        label="Otro valor"
                                                    />

                                                </Grid>
                                                <Grid item sx={5} sm={5} md={6} lg={6} >
                                                    {selectedOption === 'option3' && (

                                                        <TextField
                                                            id="paymentValue"
                                                            label="Ingrese otro valor"
                                                            name="otrovalornumero"
                                                            value={numeral(paymentValue).format('0,0')}// Vincula el valor del input text al estado paymentValue
                                                            placeholder="$"
                                                            maxLength={11}
                                                            onChange={(event) => setPaymentValue(event.target.value)}
                                                            sx={{
                                                                mt: 4,
                                                                minWidth: '180px',
                                                            }}

                                                        />

                                                    )}
                                                </Grid>
                                                <Grid item sx={10} sm={10} md={10} lg={10} >

                                                    <p className='font-text-payment'>
                                                        Este valor abonará a tu cuenta, si el valor a pagar es mayor al pago mínimo, el excedente se abonará a tu participación.
                                                    </p>

                                                </Grid>

                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </RadioGroup>
                            </form>
                        </Grid>
                        <Grid item sx={10} sm={10} md={10} lg={10}>
                            <div className='centrado'>

                                <div>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isButtonDisabled || (selectedOption === 'option3' && paymentValue === '')}
                                        className={`btn-payment-custumer  ${isButtonDisabled ? "disabled" : "enabled"}`}
                                        onClick={handlePayment}
                                        onChange={handleInputPrueba}
                                      sx={{
                                          mt:2
                                      }} 
                                    >
                                        Continuar
                                    </Button>

                                </div>
                            </div>

                            {/*  <Button
                                type="submit"
                                variant="contained"
                                disabled={isButtonDisabled || (selectedOption === 'option3' && paymentValue === '')}
                                className={`btn btn-payment-custumer centrado-btn ${isButtonDisabled ? "disabled" : "enabled"}`}
                                onClick={handlePayment}
                                onChange={handleInputPrueba}
                                sx={{
                                    maxWidth: '400px',
                                    minWidth: '280px',
                                }}
                            >
                                Continuar
                            </Button> */}
                        </Grid>


                    </Grid>

                    <div className='d-grid  Container-cards-payment-bar '>
                        {/*Sección viñeta de ubicación en la barra */}
                        {stateChangeU()}

                        {/*Sección de colores de la barra */}
                        <div className="card-docs-grafic-payment ">
                            <div className="col-3 row prueba-inicio-espacio-uno cimiento">
                                <div className="col-3 ">
                                    <p className="cimiento"></p>
                                </div>
                            </div >
                            <div className="col-6 row prueba-inicio-espacio-dos verde">
                                <div className="col-3">
                                </div>
                            </div >
                            <div className="col-3 row prueba-inicio-espacio-tres azul">
                                <div className="col-3">
                                </div>
                            </div >
                        </div>
                        <div className="col-12 row">
                            <div className=' col-3 row text-range-one'>
                                <p className='number-range-payment-grafic'>15%</p>
                            </div>
                            <div className=' col-3 row text-range-two'>
                                <p className='number-range-payment-grafic'>30%</p>
                            </div>
                            <div className=' col-3 row text-range-tree'>
                                <p className='number-range-payment-grafic'>+30%</p>
                            </div>
                        </div>

                        <div className="msj-payment ">
                            <p className='font-text-payment '>
                                Este porcentaje está pensado a una proyección de 5 años de acuerdo con el modelo de negocio.
                            </p>
                        </div>
                    </div>

                </Container>
            </Box>











            {/*Sección de btn-radio */}
            {/*  { <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center',
                textAlign: 'start',
            }}>
                <CssBaseline />
 <Container maxWidth="xl" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            mb: 4,

                        }}
                            className=''>
                            <Grid container justifyContent="center" alignItems="center" sx={{
                                mt: 1,
                            }}>
                                <Grid item sx={12} sm={12} md={12} lg={12} >
                                    <Grid container justifyContent="center" alignItems="center" sx={{
                                        mt: 3
                                    }}>
                                        <Grid item sx={6} sm={6} md={6} lg={6} >
                                            <FormControl>
                                                <RadioGroup
                                                    aria-label="Pago mínimo"
                                                    name="pagoMinimo"
                                                    value={selectedOption}
                                                    onChange={handleOptionChange}
                                                >

                                                    <FormControlLabel value="option1" control={<Radio />} label="Pago mínimo" />
                                                </RadioGroup>
                                            </FormControl>

                                        </Grid>
                                        <Grid item sx={5} sm={6} md={6} lg={6} >

                                            <div className=" space-value">
                                                <p className="card-text text-end more space-value">$ {formatterPagoMinimo}</p>
                                            </div>

                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Container> */}

            {/*            <form onSubmit={handleOptionChange}>



                <div className={`Container-cards-payment-customer ${selectedOption === 'option1' ? 'selected' : ''}`}>

                    <Container maxWidth="xl" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        mb: 4,

                    }}
                        className=''>
                        <Grid container justifyContent="center" alignItems="center" sx={{
                            mt: 1,
                        }}>
                            <Grid item sx={12} sm={12} md={12} lg={12} >
                                <Grid container justifyContent="center" alignItems="center" sx={{
                                    mt: 3
                                }}>
                                    <Grid item sx={6} sm={6} md={6} lg={6} >
                                        <FormControl>
                                            <RadioGroup
                                                aria-label="Pago mínimo"
                                                name="pagoMinimo"
                                                value={selectedOption}
                                                onChange={handleOptionChange}
                                            >

                                                <FormControlLabel value="option1" control={<Radio />} label="Pago mínimo" />
                                            </RadioGroup>
                                        </FormControl>

                                    </Grid>
                                    <Grid item sx={5} sm={6} md={6} lg={6} >

                                        <div className=" space-value">
                                            <p className="card-text text-end more space-value">$ {formatterPagoMinimo}</p>
                                        </div>

                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Container> */}


            {/* <div className="card-seccion input-group"  >
                            <div className="row ">
                                <div className="col-6">
                                    <div className="form-check">
                                        <input className="form-check-input"
                                            type="radio"
                                            value="option1"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault1"
                                            checked={selectedOption === "option1"}
                                            onChange={handleOptionChange} />
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Pago mínimo
                                        </label>
                                    </div>
                                </div>
                                <div className="col-6 ">
                                    <div className="card-body space-value">
                                        <p className="card-text text-end more space-value">$ {formatterPagoMinimo}</p>
                                    </div>
                                </div>

                                
                            </div>
                        </div> */}
            {/*                     </div>
                    <div className={`Container-cards-payment-customer ${selectedOption === 'option2' ? 'selected' : ''}`} id="cardComponet">

                        <Container maxWidth="xl" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            mb: 4,

                        }}
                            className=''>
                            <Grid container justifyContent="center" alignItems="center" sx={{
                                mt: 1,
                            }}>
                                <Grid item sx={12} sm={12} md={12} lg={12} >
                                    <Grid container justifyContent="center" alignItems="center" sx={{
                                        mt: 3
                                    }}>
                                        <Grid item sx={6} sm={6} md={6} lg={6} >
                                            <FormControl>
                                                <RadioGroup
                                                    aria-label="Pago sugerido"
                                                    name="pagoSugerido"
                                                    value={selectedOption}
                                                    onChange={handleOptionChange}
                                                >

                                                    <FormControlLabel value="option2" control={<Radio />} label="Pago sugerido" />
                                                </RadioGroup>
                                            </FormControl>

                                        </Grid>
                                        <Grid item sx={5} sm={6} md={6} lg={6} >

                                            <div className=" space-value">
                                                <p className="card-text text-end more space-value">$ {formatoSug}</p>
                                            </div>

                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Container> */}



            {/* <div className="card-seccion"  >
                            <div className="row ">
                                <div className="col-6">
                                    <div className="form-check">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault2"
                                            value="option2"
                                            checked={selectedOption === "option2"}
                                            onChange={handleOptionChange} />
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            Pago sugerido
                                        </label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card-body">
                                        <p className="card-text text-end more space-value">$ {formatoSug}</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
            {/*          </div>

                    <div id='inputData' className={`Container-cards-payment-c ${selectedOption === 'option3' ? 'selected' : ''}`}>


                        <Container maxWidth="xl" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            mb: 4,

                        }}
                            className=''>
                            <Grid container justifyContent="center" alignItems="center" sx={{
                                mt: 1,
                            }}>
                                <Grid item sx={12} sm={12} md={12} lg={12} >
                                    <Grid container justifyContent="center" alignItems="center" sx={{
                                        mt: 3
                                    }}>
                                        <Grid item sx={6} sm={6} md={6} lg={6} >
                                            <FormControl>
                                                <RadioGroup
                                                    aria-label="Otro valor"
                                                    name="otroValor"
                                                    value={selectedOption}
                                                    onChange={handleOptionChange}
                                                >

                                                    <FormControlLabel value="option3" control={<Radio />} label="Otro valor" />
                                                </RadioGroup>
                                            </FormControl>

                                        </Grid>
                                        <Grid item sx={5} sm={6} md={6} lg={6} >
                                            <div className="">
                                                <input
                                                    type="text"
                                                    id="paymentBtn"
                                                    name="otrovalornumero"
                                                    value={numeral(paymentValue).format('0,0')}
                                                    onChange={(event) => setPaymentValue(event.target.value)}
                                                    className="form-control-custumer input-pago"
                                                    placeholder="$"
                                                    maxLength={11}
                                                />
                                            </div>


                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item sx={12} sm={12} md={12} lg={12}  >
                                    <div className="msj-payment  margin-mui">
                                        <p className="font-text-payment">
                                            Este valor abonará a tu cuenta, si el valor a pagar es mayor al pago mínimo, el excedente se abonará a tu participación.
                                        </p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>

 */}



            {/*  <div className="card-seccion "  >
                            <div className="row ">
                                <div className="col-6">
                                    <div className="form-check">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault2"
                                            value="option3"
                                            checked={selectedOption === "option3"}
                                            onChange={handleOptionChange} />
                                        <label className="form-check-label space-value-input" htmlFor="flexRadioDefault3">
                                            Otro valor
                                        </label>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <input type="text"
                                        id='paymentBtn'
                                        name="otrovalornumero"
                                        value={numeral(paymentValue).format('0,0')}// Vincula el valor del input text al estado paymentValue
                                        //value={paymentValue}
                                        onChange={(event) => setPaymentValue(event.target.value)}


                                        className="form-control-custumer  input-pago"
                                        placeholder="$"
                                        maxLength={11}
                                    />
                                </div>
                                <br />
                                <br />
                                <br />

                                <div className="msj-payment">
                                    <p className='font-text-payment '>
                                        Este valor abonará a tu cuenta, si el valor a pagar es mayor al pago mínimo, el excedente se abonara a tu participación.
                                    </p>
                                </div>
                            </div>
                        </div> */}
            {/*    </div>


                    <div className="row centrado" >
                        <button type="submit"
                            onClick={handlePayment}
                            disabled={isButtonDisabled}
                            className={` btn btn-payment-custumer centrado-btn  ${isButtonDisabled ? "disabled" : "enabled"} `}
                            width="360px" height="68px"
                            onChange={handleInputPrueba}
                        >Continuar</button>

                    </div>
                </form> */}
            {/* 
      <div className='d-grid  Container-cards-payment-bar '> 
          
        {/* </Box>} */}

        </div >

    )
}

export default Payment;