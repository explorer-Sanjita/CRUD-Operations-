import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const handleDelete = (id) => {
      axios.delete('http://localhost:3001/deleteUser/'+id)
      .then(res => {
        console.log(res)
        window.location.reload()
        navigate('/')
    })
    .catch(err => console.log(err))
}

useEffect(() => {
  axios.get('http://localhost:3001/') // Assuming the endpoint is '/users'
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))
}, []);

return (
<div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
  <div className="w-50 bg-white rounded p-3">
  <Link to="/create" className="btn btn-success btn-sm">
      Add +
    </Link>
    <table className="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Animal</th>
                <th>Disease</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
              users.map((user) => {
                // eslint-disable-next-line react/jsx-key
                return <tr>
                  <td>{user.name}</td>
                  <td>{user.animal}</td>
                  <td>{user.disease}</td>
                  <td>
                  <Link to={`/update/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                    <button className="btn btn-sm btn-danger" onClick={(e) => handleDelete(user._id)}>Delete</button></td>
                </tr>
              })
            }
        </tbody>

    </table>
  </div>
</div>
);

  }


export default Users;
