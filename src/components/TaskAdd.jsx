import axios from 'axios'
import React, { useState } from 'react'

const TaskAdd = () => {
    const [data, setData] = useState({
        token: sessionStorage.getItem("token"),
        tname: ""
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

        axios.post("http://localhost:3001/task", data)
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
                        placeholder="Add Task name......."
                        onChange={inputHandeler}
                        value={data.tname}
                        name="tname"
                    />
                </div>
            </form>
            <button type="button" class="btn btn-outline-success" onClick={check}>Add</button>
        </div>
    )
}

export default TaskAdd