import React from "react";
import "../Card.css"; // Archivo CSS para los estilos de la tarjeta
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const CreateView = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState("PENDIENTE");
  const [name, setName] = useState("");
  const [fLastName, setFLastName] = useState("");
  const [sLastName, setSLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [pin, setPin] = useState("");
  const [expiration, setExpiration] = useState("");
  const [assignedAnalyst, setAssignedAnalyst] = useState("");
  const [response, setResponse] = useState("");

  const formatDate = (date) => {
    const fechaObj = new Date(date);
    const mes = ("0" + (fechaObj.getMonth() + 1)).slice(-2);
    const anio = fechaObj.getFullYear().toString().substr(-2);
    return `${mes}/${anio}`;
  };

  // Función para crear un nuevo registro
  const handleCreateClient = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/api/data/`, {
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
      });
      console.log(response.data);
      setResponse("Registro creado exitosamente");
      NotificationManager.success("Registro creado exitosamente");
    } catch (error) {
      NotificationManager.error("Error creando registro", error);
      setResponse("Error creando registro");
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
      NotificationManager.error("Error al generar tarjeta", error);
      console.error("Error al generar tarjeta:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="card">
        <NotificationContainer />

        <h2
          className="card-subtitle"
          style={{ cursor: "pointer", marginRight: "10px" }}
          onClick={() => navigate("/")}
        >
          REGRESAR
        </h2>
        <h1 className="card-title">Crear Cliente</h1>

        <div className="card-content" style={{ marginBottom: "3rem" }}>
          <div className="creditCard-element">
            <h2 className="card-subtitle">NOMBRE</h2>
            <input
              style={{ width: "50%" }}
              className="form-field"
              type="text"
              placeholder="NOMBRE"
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
              placeholder="usuario@atratopago.com"
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <h2 className="card-subtitle" style={{ marginRight: "1rem" }}>
              FECHA DE NACIMIENTO
            </h2>
            <input
              className="form-field"
              type="text"
              placeholder="YYYY-MM-DD"
              onChange={(e) => setBirthday(e.target.value)}
            ></input>

            <h2 className="card-subtitle" style={{ marginRight: "1rem" }}>
              TELÉFONO
            </h2>
            <input
              className="form-field"
              type="text"
              placeholder="00000000"
              onChange={(e) => setPhone(e.target.value)}
            ></input>

            <h2 className="card-subtitle" style={{ marginRight: "1rem" }}>
              ANALISTA ASIGNADO
            </h2>
            <input
              className="form-field"
              type="text"
              placeholder="ANALISTA ASIGNADO"
              value={assignedAnalyst}
              onChange={(e) => setAssignedAnalyst(e.target.value)}
            ></input>
          </div>
          <div className="content-column2">
            <h2 className="card-subtitle">CARD NUMBER</h2>
            <input
              className="form-field"
              type="text"
              placeholder="000000000000"
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
          <button className="blue-button" onClick={() => handleCreateClient()}>
            CREAR
          </button>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
};

export default CreateView;
