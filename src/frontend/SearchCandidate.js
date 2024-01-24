import React, {useState, useEffect} from 'react'
import axios from 'axios'

function SearchCandidate(){

    const [candidate, setCandidate] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:5000/')
        .then(response =>{
            setCandidate(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    if(loading){
        return <div>Carregando...</div>
    }
    
    return(
        <div>
            {candidate.map(candidate => (
               <p key={candidate.id}> {candidate.name} </p>
            ))}
        </div>
    )
}

export default SearchCandidate