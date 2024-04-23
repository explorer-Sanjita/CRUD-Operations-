import React, {useEffect, useState} from "react";
import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";

function UpdateUser(){
    const {id} = useParams()

    const [name, setName] = useState()
    const [animal, setAnimal] = useState()
    const [disease, setDisease] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/'+id) // Assuming the endpoint is '/users'
          .then(res => {console.log(res)
            setName(res.data.name)
            setAnimal(res.data.animal)
            setDisease(res.data.disease)
        })
          .catch(err => console.log(err))
      }, []);


    const Update = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/updateUser/'+id, {name, animal, disease})
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Animal</label>
            <input
              type="text"
              placeholder="Enter Animal"
              className="form-control"
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Disease</label>
            <input
              type="text"
              placeholder="Enter Disease"
              className="form-control"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
    )
}

export default UpdateUser;