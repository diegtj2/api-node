import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function CreateCandidate() {
  const [values, setValues] = useState(['']);
  const [valueName, setValueName] = useState(['']);

  function handleChange(event, index) {
    const updatedValues = [...values];
    updatedValues[index] = event.target.value;
    setValues(updatedValues);
  }

  const handleChangeName = (event) => {
    setValueName(event.target.value);
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

  function create() {
    const data = {
        name: valueName,
        skills: values
    }

    axios.post('http://localhost:5000/candidates/', data)
      .then(response => {
        console.log(response);
        alert('Candidato inserido com sucesso!')
      })
      .catch(error => {
        if (error?.response) {
          alert(error.response.data);
        } else {
          console.error(error);
        }
      });
  }

  return (
    <div>
        <h4>Cadastrar Candidatos</h4>
        <input placeholder='Nome' className='input-name' type="text" value={valueName} onChange={handleChangeName} />
            {values.map((value, index) => (
            <div >
                <input
                    className='input-skill'
                    placeholder='Skill'
                    key={index}
                    type="text"
                    value={value}
                    onChange={(event) => handleChange(event, index)}
                />
                <button class="btn-plus" onClick={addInput}> + </button>
                <button className='btn-plus' onClick={removeInput}> x </button>
            </div>
        ))}
        <button className="btn" onClick={create}>Cadastrar</button>
    </div>
  );
}

export default CreateCandidate;