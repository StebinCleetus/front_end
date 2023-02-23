import axios from 'axios'
import React, { useState } from 'react'
import EmployeeAdd from './EmployeeAdd'
import EmployeeView from './EmployeeView'
import Footer from './Footer'
import Navbar from './Navbar'
import ProjectAdd from './ProjectAdd'
import TaskAdd from './TaskAdd'
import UserList from './UserList'

const AdminPage = () => {

  //..............................................Variable used to hide/visible contents.......................................
  const [employee, setEmployee] = useState(true);
  const [project, setProject] = useState(false);
  const [task, settask] = useState(false);
  const [userlist, setUserlist] = useState(false);
  const [progrs, setprogrs] = useState(false);
  const [addemp, setaddemp] = useState(false);

  //..............................................Variable to store task and project..........................................
  var [projectList, setprojectList] = useState([]);
  var [taskList, settaskList] = useState([]);

  //..............................................Function used to hide/visible contents.......................................
  const ProjectFn = () => {
    setEmployee(false);
    setProject(true);
    settask(false);
    setprogrs(false);
    setUserlist(false);
    setaddemp(false);
    getDataProject();
  }
  const taskFn = () => {
    setEmployee(false);
    setProject(false);
    settask(true);
    setprogrs(false);
    setUserlist(false);
    setaddemp(false);
    getDataTask();
  }
  const employeeFn = () => {
    setEmployee(true);
    setProject(false);
    settask(false);
    setprogrs(false);
    setUserlist(false);
    setaddemp(false);
  }

  const userlistFn = () => {
    setEmployee(false);
    setProject(false);
    settask(false);
    setprogrs(false);
    setUserlist(true);
    setaddemp(false);
  }

  const progrsFn = () => {
    setEmployee(false);
    setProject(false);
    settask(false);
    setprogrs(true);
    setUserlist(false);
    setaddemp(false);
  }

  const addempFn = () => {
    setEmployee(false);
    setProject(false);
    settask(false);
    setprogrs(false);
    setUserlist(false);
    setaddemp(true);
  }
  //..............................................Function to store task and project.......................................

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
  const getDataTask = () => {
    axios.get("http://localhost:3001/task")
      .then(
        (response) => {
          settaskList(response.data)
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
      <Navbar />
      <ul className="nav nav-tabs nav-fill " style={{ backgroundColor: "#e3f2fd" }}>
        <li class="nav-item border border-info">
          <a class="nav-link " aria-current="page" href="#" onClick={employeeFn}>Employee</a>
        </li>
        <li class="nav-item border border-info">
          <a class="nav-link" href="#" onClick={ProjectFn}>Project</a>
        </li>
        <li class="nav-item border border-info">
          <a class="nav-link" href="#" onClick={taskFn}>Task</a>
        </li>

      </ul>
      <div className="container vh-100">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row mt-5">

              <div className={` ${project ? "col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6" : "d-none"}  `}>
                <h2>Add Project</h2>
                <ProjectAdd />
              </div>
              <div className={` ${project ? "col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 " : "d-none"} `}>
                <h2>Project List</h2> <button type="button" class="btn btn-outline-success  btn-sm" onClick={getDataProject} >Updated list</button>
                <ol class="list-group list-group-numbered">
                  {projectList.map((value, index) => {
                    return <li class="list-group-item">{value.pname} </li>
                  })}
                </ol>
              </div>
              
              <div className={` ${task ? "col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6" : "d-none"} `}>
                <h2>Add Task</h2>
                <TaskAdd />
              </div>
              <div className={` ${task ? "col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 " : "d-none"} `}>
                <h2>Task List</h2> <button type="button" class="btn btn-outline-success  btn-sm" onClick={getDataTask} >Updated list</button>
                <ol class="list-group list-group-numbered">
                  {taskList.map((value, index) => {
                    return <li class="list-group-item">{value.tname} </li>
                  })}
                </ol>
              </div>

              <div className={` ${employee || userlist || progrs || addemp ? "col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 " : "d-none"} `}>
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                  <button type="button" class="btn btn-outline-primary" onClick={userlistFn}>UserList</button>
                  <button type="button" class="btn btn-outline-primary" onClick={progrsFn}>Progress</button>
                  <button type="button" class="btn btn-outline-primary" onClick={addempFn}>AddEmp</button>
                </div>

              </div>
              <div className={` ${addemp ? "col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6" : "d-none"} `}>
                <h2>Add Employee</h2>
                <EmployeeAdd />
              </div>

              <div className={` ${progrs ? "col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" : "d-none"} `}>
                <h2>Employees progress</h2>
                <EmployeeView />
              </div>

              <div className={` ${userlist ? "col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" : "d-none"} `}>
                <h2>User List</h2>
                <UserList />
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default AdminPage