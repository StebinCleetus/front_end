import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EmployeeView = () => {

  useEffect(
    () => {
      getEmployeeProgress();
    }, []
  )

  var [progressList, setprogressList] = useState([]);

  const getEmployeeProgress = () => {
    axios.get("http://localhost:3001/progress")
      .then(
        (response) => {
          setprogressList(response.data.data);
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      )

  }


  return (
    <div >
      <table class="table table-striped table-hover  table-info border text-center">
        <thead>
          <tr>
            <th scope="col">Mail</th>
            <th scope="col">Project</th>
            <th scope="col">Task</th>
            <th scope="col">Job Description</th>
            <th scope="col">Mode of Work</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>

          </tr>
        </thead>
        <tbody>
          {progressList.map((value, index) => {

            return <tr>
              <td>{value.empmail}</td>
              <td>{value.tproject}</td>
              <td>{value.ttask}</td>
              <td>{value.tdes}</td>
              <td>{value.tmeth}</td>
              <td>{value.tstart}</td>
              <td>{value.tend}</td>



            </tr>
          })}


        </tbody>
      </table>
    </div >
  )
}

export default EmployeeView