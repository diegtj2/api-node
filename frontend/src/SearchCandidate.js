import React, {useState, useEffect} from 'react'
import axios from 'axios'

function SearchCandidate(){

    const [candidate, setCandidate] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:5000/')
        .then(response =>{
            setCandidate(response.data)
            console.log(response)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [])

    if(loading){
        return <div>Carregando...</div>
    }
    
    return(
        <div>
            <h1>Buscar Candidatos</h1>
            Skill:<input type="text" />
            <input type="text" />
            <button>+</button>
            <button>Buscar</button>
            
            <h1>Resultado</h1>
            <table>
                {candidate.map(candidate => (
                    <tr key={candidate._id}>
                         Nome: {candidate.name} 
                         <tr>
                            Skills: {candidate.skills.join(', ')}
                         </tr>
                         <br />
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default SearchCandidate