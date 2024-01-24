const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");


const app = express()
app.use(express.json())
const port = 5000

const Candidates = mongoose.model('Candidates', {
    name: String,
    skills: []
        
})

app.get("/", async (req, res) => {
    const candidates = await Candidates.find()
    return res.send(candidates)
})

app.delete("/:id", async(req, res) => {
    const candidate = await Candidates.findByIdAndDelete(req.params.id)
    return res.send(candidate)
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
})