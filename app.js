const express = require("express");
const app = express();
const competitionRouter = require("./server/routes/competitionRouter");

app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("/api/competition", competitionRouter);

app.use((req, res) => res.status(404).send("Not found"));

app.listen(8000, () => console.log("Server started on port 8000..."));
