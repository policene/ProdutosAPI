const express = require("express");
const productRoutes = require("./src/routes/productRoute");
const db = require("./src/db");

const app = express();



app.use(express.json());
app.use("/produtos", productRoutes);

app.listen(3000, () => console.log("Servidor iniciado na porta 3000."));