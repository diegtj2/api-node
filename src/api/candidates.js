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
    skills: []
        
})

app.get("/:skills", async (req, res) => {
    const candidates = await Candidates.find({skills: req.params.skills})
    return res.send(candidates)
})

app.post("/", async (req, res) =>{
    
    const candidate = new Candidates({
        name: req.body.name,
        skills: req.body.skills    
    })

    await candidate.save()
    return res.send(candidate)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://diegtj2:PAOLaFT1lBBT1Z7F@candidates-api.elrqazd.mongodb.net/?retryWrites=true&w=majority')
    console.log('App runnig')
    console.log('CORS-enabled web server listening on port', port)
})