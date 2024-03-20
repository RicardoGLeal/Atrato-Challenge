import React from "react";
import "../Card.css"; 

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { NotificationManager } from "react-notifications";

const Card = (props) => {
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(true);
  const [status, setStatus] = useState(props.status);

  // Navega a la ruta /edit para editar el usuario.
  const handleEditUser = () => {
    navigate("/edit", { state: { props } });
  };

  // Elimina el usuario del archivo json.
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/data/${props.id}`);
      setVisible(false);
      NotificationManager.success("Usuario eliminado exitosamente");
    } catch (error) {
      NotificationManager.error("Error eliminando el usuario", error);
    }
  };

  // Formatea la fecha de nacimiento.
  const formatDate = (date) => {
    const fechaObj = new Date(date);
    const mes = ("0" + (fechaObj.getMonth() + 1)).slice(-2);
    const anio = fechaObj.getFullYear().toString().substr(-2);
    return `${mes}/${anio}`;
  };

  return isVisible ? (
    <div className="card">
      <div className="card-content">
        <div className="header-column1">
          <h2 className="card-subtitle">ID: {props.id}</h2>

          <h1 className="card-title">
            {props.name} {props.fLastName} {props.sLastName}
          </h1>
        </div>
        <div className="header-column2">
          <button className="blue-box">{props.status}</button>
        </div>
      </div>

      <div className="card-content" style={{ marginBottom: "2rem" }}>
        <div class="content-column1">
          <h2 className="card-subtitle">MAIL</h2>
          <p className="card-field">{props.mail}</p>
          <h2 className="card-subtitle">FECHA DE NACIMIENTO</h2>
          <p className="card-field">{props.birthday}</p>
          <h2 className="card-subtitle">TELÉFONO</h2>
          <p className="card-field">{props.phone}</p>
          <h2 className="card-subtitle">ANALISTA ASIGNADO</h2>
          <p className="card-field">{props.assignedAnalyst}</p>
        </div>
        <div class="content-column2">
          <h2 className="card-subtitle">FULL NAME</h2>
          <p className="card-field">
            {props.name} {props.fLastName} {props.sLastName}
          </p>
          <h2 className="card-subtitle">CARD NUMBER</h2>
          <p className="card-field">{props.cardInfo.number}</p>
          <div className="card-content">
            <div className="creditCard-element">
              <h2 className="card-subtitle">CVV</h2>
              <p className="card-field">{props.cardInfo.cvv}</p>
            </div>
            <div className="creditCard-element">
              <h2 className="card-subtitle">PIN</h2>
              <p className="card-field">{props.cardInfo.pin}</p>
            </div>
            <div className="creditCard-element">
              <h2 className="card-subtitle">EXP</h2>
              <p className="card-field">
                {formatDate(props.cardInfo.expiration)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <h2
          className="card-subtitle"
          style={{ cursor: "pointer", marginRight: "10px" }}
          onClick={() => handleEditUser()}
        >
          EDITAR
        </h2>
        <h2
          className="card-subtitle"
          style={{ cursor: "pointer" }}
          onClick={() => handleDeleteUser()}
        >
          BORRAR
        </h2>
      </div>
    </div>
  ) : null;
};

export default Card;
