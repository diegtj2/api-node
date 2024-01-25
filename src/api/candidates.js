const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

const Candidates = mongoose.model('Candidates', {
    name: String,
    skills: [],
    createDate: Date
})

app.get("/candidates/skills", async (req, res) => {
    const filter = {};
    if (req.query.skills) {
        filter.skills = { $in: req.query.skills };
    }
    const candidates = await Candidates.find(filter)

    if (!candidates?.length) {
        return res.status(404).send();
    }

    return res.status(200).send(candidates)
})

app.post("/candidates", async (req, res) => {
    const candidate = new Candidates({
        name: req.body.name,
        skills: req.body.skills,
        createDate: new Date()
    });

    if (!candidate.name) {
        return res.status(400).send("Nome é obrigatório")
    }

    candidate.skills = candidate.skills.filter(s => s !== '');
    if (!candidate.skills?.length) {
        return res.status(400).send("Skills são obrigatórias")
    }

    await candidate.save()
    return res.status(201).send(candidate)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://diegtj2:PAOLaFT1lBBT1Z7F@candidates-api.elrqazd.mongodb.net/?retryWrites=true&w=majority')
    console.log('App runnig')
    console.log('CORS-enabled web server listening on port', port)
})