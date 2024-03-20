import React from "react";
import "../Card.css"; // Archivo CSS para los estilos de la tarjeta
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const EditView = () => {
  const navigate = useNavigate();
  const props = useLocation().state.props;

  const [status, setStatus] = useState(props.status);
  const [name, setName] = useState(props.name);
  const [fLastName, setFLastName] = useState(props.fLastName);
  const [sLastName, setSLastName] = useState(props.sLastName);
  const [email, setEmail] = useState(props.mail);
  const [birthday, setBirthday] = useState(props.birthday);
  const [phone, setPhone] = useState(props.phone);
  const [cardNumber, setCardNumber] = useState(props.cardInfo.number);
  const [cvv, setCvv] = useState(props.cardInfo.cvv);
  const [pin, setPin] = useState(props.cardInfo.pin);
  const [expiration, setExpiration] = useState(props.cardInfo.expiration);
  const [assignedAnalyst, setAssignedAnalyst] = useState(props.assignedAnalyst);

  const [response, setResponse] = useState("");

  // Formatea la fecha de nacimiento.
  const formatDate = (date) => {
    const fechaObj = new Date(date);
    const mes = ("0" + (fechaObj.getMonth() + 1)).slice(-2);
    const anio = fechaObj.getFullYear().toString().substr(-2);
    return `${mes}/${anio}`;
  };

  // Función para actualizar un registro
  const handleUpdateData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/data/${props.id}`,
        {
          id: props.id,
          name: name,
          fLastName: fLastName,
          sLastName: sLastName,
          email: email,
          birthday: birthday,
          phone: phone,
          cardInfo: {
            number: cardNumber,
            cvv: cvv,
            pin: pin,
            expiration: expiration,
          },
          assignedAnalyst: assignedAnalyst,
          status: status,
        }
      );
      console.log(response.data);
      NotificationManager.success("Registro modificado exitosamente");

      setResponse("Registro modificado exitosamente");
    } catch (error) {
      NotificationManager.error("Error modificando el registro", error);
      setResponse("Error modificando registro");
    }
  };

  // Función para obtener la información de una tarjeta
  const getCardInfo = async () => {
    try {
      const response = await axios.get("https://randommer.io/api/Card", {
        headers: {
          "X-Api-Key": "f3b80c8d2c6a478e89445e919e625fff",
        },
      });

      setCardNumber(response.data.cardNumber);
      setCvv(response.data.cvv);
      setPin(response.data.pin);
      setExpiration(formatDate(response.data.date));
      NotificationManager.success("Tarjeta generada exitosamente");
    } catch (error) {
      console.error("Error al generar tarjeta:", error);
      NotificationManager.error("Error al generar tarjeta", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <NotificationContainer />

      <div className="card">
        <h2
          className="card-subtitle"
          style={{ cursor: "pointer", marginRight: "10px" }}
          onClick={() => navigate("/")}
        >
          REGRESAR
        </h2>
        <h1 className="card-title">Editar Cliente</h1>
        <div className="card-content" style={{ marginBottom: "3rem" }}>
          <div className="creditCard-element">
            <h2 className="card-subtitle">NOMBRE</h2>
            <input
              style={{ width: "50%" }}
              className="form-field"
              type="text"
              placeholder="NOMBRE"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="creditCard-element">
            <h2 className="card-subtitle">APELLIDO PAT.</h2>
            <input
              style={{ width: "50%" }}
              className="form-field"
              type="text"
              placeholder="APELLIDO P"
              defaultValue={fLastName}
              onChange={(e) => setFLastName(e.target.value)}
            ></input>
          </div>
          <div className="creditCard-element">
            <h2 className="card-subtitle">APELLIDO MAT.</h2>
            <input
              style={{ width: "50%" }}
              className="form-field"
              type="text"
              placeholder="APELLIDO M"
              defaultValue={sLastName}
              onChange={(e) => setSLastName(e.target.value)}
            ></input>
          </div>

          <div className="header-column2">
            <div class="dropdown">
              <button class="dropbtn">{status}</button>
              <div class="dropdown-content">
                <a onClick={() => setStatus("PENDIENTE")}>PENDIENTE</a>
                <a onClick={() => setStatus("EN PROCESO")}>EN PROCESO</a>
                <a onClick={() => setStatus("COMPLETADO")}>COMPLETADO</a>
              </div>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div class="content-column1">
            <h2 className="card-subtitle" style={{ marginRight: "1rem" }}>
              EMAIL:
            </h2>
            <input
              className="form-field"
              type="text"
              placeholder="EMAIL"
              defaultValue={props.mail}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <h2 className="card-subtitle" style={{ marginRight: "1rem" }}>
              FECHA DE NACIMIENTO
            </h2>
            <input
              className="form-field"
              type="text"
              placeholder="BIRTHDAY"
              defaultValue={props.birthday}
              onChange={(e) => setBirthday(e.target.value)}
            ></input>

            <h2 className="card-subtitle" style={{ marginRight: "1rem" }}>
              TELÉFONO
            </h2>
            <input
              className="form-field"
              type="text"
              placeholder="domain.tld"
              defaultValue={props.phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>

            <h2 className="card-subtitle" style={{ marginRight: "1rem" }}>
              ANALISTA ASIGNADO
            </h2>
            <input
              className="form-field"
              type="text"
              placeholder="domain.tld"
              value={assignedAnalyst}
              onChange={(e) => setAssignedAnalyst(e.target.value)}
            ></input>
          </div>
          <div className="content-column2">
            <h2 className="card-subtitle">CARD NUMBER</h2>
            <input
              className="form-field"
              type="text"
              placeholder="domain.tld"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            ></input>
            <div className="card-content">
              <div className="creditCard-element">
                <h2 className="card-subtitle">CVV</h2>
                <input
                  style={{ width: "40%" }}
                  className="form-field"
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                ></input>
              </div>
              <div className="creditCard-element">
                <h2 className="card-subtitle">PIN</h2>
                <input
                  style={{ width: "45%" }}
                  className="form-field"
                  type="text"
                  placeholder="PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                ></input>
              </div>
              <div className="creditCard-element">
                <h2 className="card-subtitle">EXP</h2>
                <input
                  style={{ width: "50%" }}
                  className="form-field"
                  type="text"
                  placeholder="EXP"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                ></input>
              </div>
            </div>
            <p
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => getCardInfo()}
            >
              Generar nueva tarjeta
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className="blue-button" onClick={() => handleUpdateData()}>
            GUARDAR
          </button>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
};

export default EditView;
