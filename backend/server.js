const express = require("express");
const fs = require('fs').promises;
const path = require('path');
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5001;

const filePath = path.join(__dirname, "../data/data.json");

app.use(cors()); //habilitamos cors.
app.use(express.json()); //middleware para parsear JSON en solicitudes.

app.listen(5001, () => {
  console.log(`Server started on port ${PORT}`);
});

// Ruta para obtener todos los registros
app.get('/api/data', async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch(error) {
    console.error("Error reading data", error);
    res.status(500).json({ error: "Error reading data" });   
  }
});

// Ruta para obtener un registro por ID
app.get('/api/data/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const data = await fs.readFile(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch(error) {
    console.error("Error reading data", error);
    res.status(500).json({ error: "Error reading data" });   
  }
});

// Ruta para crear un nuevo registro
app.post("/api/data", async (req,res) => {
  try {
    const newClient = req.body;
    const parsedData = JSON.parse(await fs.readFile(filePath, "utf8"));

    // Calcula un nuevo ID para el registro
    const newId = parsedData.length > 0
      ? Math.max(...parsedData.map((item) => item.id)) + 1
      : 1; 
    newClient.id = newId;
    console.log(newClient);

    const newData = [...parsedData, newClient];
    
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
    res.json(newClient);

  } catch(error) {
    console.error("Error creating data", error);
    res.status(500).send("error creating data");
  }
});

// Ruta para actualizar un registro
app.put(`/api/data/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await fs.readFile(filePath, "utf8");
    dataParsed = JSON.parse(data);
    const index = dataParsed.findIndex(record => record.id == id);

    if(index === -1) {
      return res.status(404).send("Record not found");
    }

    const newData = req.body;
    dataParsed[index] = newData;

    await fs.writeFile(filePath, JSON.stringify(dataParsed));

    // Envía una respuesta con los datos actualizados
    res.json(newData);

  } catch (error) {
    // Si hay un error, envía un mensaje de error
    res.status(500).send("Error updating data: " + error.message);
  }
});

// Ruta para crear un nuevo registro
app.post('/api/data', async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    dataParsed = JSON.parse(data);
    const newData = req.body;
    dataParsed.push(newData);
    await fs.writeFile(filePath, JSON.stringify(dataParsed));
    res.json(newData);
  } catch(error) {
    res.status(500).send("error creating data");
  }
});

// Ruta para eliminar un registro
app.delete(`/api/data/:id`, async(req,res) => {
  try {
    const id = req.params.id;
    const data = await fs.readFile(filePath, "utf8");
    dataParsed = JSON.parse(data);
    const index = dataParsed.findIndex(record => record.id == id);

    if(index === -1) {
      return res.status(404).send("Record not found");
    }

    dataParsed.splice(index, 1);

    await fs.writeFile(filePath, JSON.stringify(dataParsed));

    // Envía una respuesta con los datos actualizados
    res.json(dataParsed);

  } catch(error) {
    res.status(500).send("error deleting data" + error);
  }
});
