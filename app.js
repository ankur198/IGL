const express = require("express");

const data = require("./dbConnection");

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/api/date", function(req, res) {
    res.send(Date.now().toString());
});

app.get("/api/requests", async function(req, res) {
    res.json(await data.getAllRequest());
});
app.post("/api/requests", async function(req, res) {
    console.log(req.body)
    let x = await data.getSearchedRequest(req.body);
    //console.log(x);
    res.json(x)
});

app.get("/api/requests/:id/status/:status", async function(req, res) {
    //console.log(req.params);
    await data.updateRequestStatus(req.params.status, req.params.id);
    res.status(200);
    res.send("OK");
});

app.get("/api/requests/locations", async function(req, res) {
    res.send(await data.getAllLocations());
});

app.listen(5000, () => console.log("goto http://localhost:5000/"));
