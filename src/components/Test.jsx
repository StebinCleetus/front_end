import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
  var [projectList, setprojectList] = useState([]);
  useEffect(
    () => {
      getDataProject();

    }, []
  )
  const getDataProject = () => {
    axios.get("http://localhost:3001/project")
      .then(
        (response) => {
          setprojectList(response.data)
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      )
  }
  const [data, setData] = useState({
    tproject: "",
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

  const check=()=>{
    console.log(data);
  }
  return (
    <div>
      <select onChange={inputHandeler}>
        {projectList.map((value, index) => {
          return <option name="tproject" value={value.pname}>{value.pname}</option>
        })}

      </select>
      <button onClick={check}>press</button>
    </div>
  )
}

export default Test


