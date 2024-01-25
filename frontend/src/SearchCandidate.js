import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function SearchCandidate() {
  const [candidate, setCandidate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(['']);

  function handleChange(event, index) {
    const updatedValues = [...values];
    updatedValues[index] = event.target.value;
    setValues(updatedValues);
  }

  function addInput() {
    setValues([...values, '']);
  }

  function removeInput() {
    if (values.length > 1) {
      const updatedValues = [...values];
      updatedValues.pop();
      setValues(updatedValues);
    }
  }

  function searchBySkill() {
    setLoading(true);
    let skillQuery = `skills=${values.join('&skills=')}`;
    axios.get(`http://localhost:5000/candidates/skills?${skillQuery}`)
      .then(response => {
        setCandidate(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <div>
      <h4>Buscar Candidatos</h4>
      {values.map((value, index) => (
        <div key={index}>
          <input
            className='input-skill'
            placeholder='Skill'
            type="text"
            value={value}
            onChange={(event) => handleChange(event, index)}
          />
        <button className='btn-plus' onClick={addInput}> + </button>
        <button className='btn-plus' onClick={removeInput}> x </button>
        </div>
      ))}
      <button className='btn' onClick={searchBySkill}>Buscar</button>

      {loading && <p>Carregando...</p>}

      {candidate.length > 0 && (
        <div>
          <h4>Resultado</h4>
          <div>
              {candidate.map(candidateItem => (
                <div>
                    <div className='div-table'>
                        Nome: {candidateItem.name}
                    </div>
                    <div className='div-table'>
                        Skills: {candidateItem.skills.join(', ')}
                    </div>
                    <br />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchCandidate;