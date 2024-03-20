import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import logo from "../ColorLogo.png";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetData(); // Llamamos a la función para obtener los datos de la API
    setLoading(false); // Cambiamos el estado de loading a false
  }, []);

  // Función para obtener los datos de la API
  const handleGetData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/data");
      setData(response.data);
      NotificationManager.success("Datos obtenidos exitosamente");
    } catch (error) {
      console.error("error fetching data: ", error);
      NotificationManager.error("Error obteniendo datos", error);
    }
  };

  // Función para navegar a la ruta /new
  const newClient = () => {
    navigate("/new", { state: { isNewClient: true } });
  };

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <NotificationContainer />

          <img
            src={logo}
            alt="Logo"
            border="0"
            style={{ width: "250px", margin: "2rem" }}
          />
          <button className="blue-button" onClick={() => newClient()}>
            NUEVO CLIENTE
          </button>

          {data.map((record) => (
            <div style={{ alignContent: "center" }} key={record.id}>
              <Card
                id={record.id}
                name={record.name}
                fLastName={record.fLastName}
                sLastName={record.sLastName}
                mail={record.email}
                birthday={record.birthday}
                phone={record.phone}
                cardCVV={record.cardInfo.cvv}
                cardInfo={record.cardInfo}
                assignedAnalyst={record.assignedAnalyst}
                status={record.status}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
