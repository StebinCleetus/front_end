import axios from 'axios'
import React, { useState } from 'react'

const EmployeeAdd = () => {
    const [data, setData] = useState({
        token: sessionStorage.getItem("token"),
        userName:"",
        email:"",
        password:"",
        role:"user"
    })
    const inputHandeler = (event) => {
        const { value, name } = event.target
        setData(
            (previousState) => ({
                ...previousState,
                [name]: value
            })
        )
    }
    const check = () => {
// console.log(data);
        axios.post("http://localhost:3001/addemployee", data)
            .then(
                (response) => {
                    console.log(response.data.Status);
                    if (response.data.Status == "sucessfully added") {

                        alert("sucessfully added");
                    }
                    else {
                        alert("failed")
                    }

                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }
    return (
        <div>

            <form control="" class="form-group">
                <div class="row">
                    <input type="text"
                        className="username"
                        class="form__input"
                        placeholder="Add userName here....."
                        onChange={inputHandeler}
                        value={data.userName}
                        name="userName"
                    />
                </div>
                <div class="row">
                    <input type="text"
                        className="username"
                        class="form__input"
                        placeholder="Add email here....."
                        onChange={inputHandeler}
                        value={data.email}
                        name="email"
                    />
                </div>
                <div class="row">
                    <input type="text"
                        className="username"
                        class="form__input"
                        placeholder="Add password here....."
                        onChange={inputHandeler}
                        value={data.password}
                        name="password"
                    />
                </div>
            </form>
            <button type="button" class="btn btn-outline-success" onClick={check}>Add</button>
            
        </div>
    )
}

export default EmployeeAdd