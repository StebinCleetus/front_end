import axios from 'axios';
import React, { useEffect, useState } from 'react'
import moment from "moment";

//.................................................Api Input(Form_Data)....................................................
const TimeTracker = () => {

    const [data, setData] = useState({
        empmail: sessionStorage.getItem("email"),
        tproject: "Academic",
        ttask: "Training",
        tdes: "",
        tmeth: "Work from Office",
        tstart: " ",
        tend: " "
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
    //..........................................Timer Variable......................................................
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(moment.duration(0));
    //..........................................project & task fetch from DB.........................................
    var [projectList, setprojectList] = useState([]);
    var [taskList, settaskList] = useState([]);
    useEffect(
        () => {
            //timer data
            let interval;

            if (isRunning) {
                interval = setInterval(() => {
                    setElapsedTime(moment.duration(moment().diff(startTime)));
                }, 1000);
            }
            //...................
            getDataProject();
            getDataTask();
            getEmployeeProgress();

            return () => clearInterval(interval);
        }, [isRunning, startTime]);

    //........................timer functions Start......................................................
    const handleStart = () => {
        setIsRunning(true);
        setStartTime(moment());
        startfn();
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleResume = () => {
        setIsRunning(true);
        setStartTime(moment().subtract(elapsedTime));
    };

    const handleStop = () => {
        setIsRunning(false);
        setStartTime(null);
        setElapsedTime(moment.duration(0));
        stopfn();
    };


    //........................timer function ends...........................................................



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


    //..........................................project & task fetch from DB ends.........................................
    const startfn = () => {

        console.log(data);
        axios.post("http://localhost:3001/timetracker", data)
            .then(
                (response) => {
                    console.log(response);
                    let tempid = response.data.data._id;
                    let time = response.data.tstart;
                    sessionStorage.setItem("time", time);
                    sessionStorage.setItem("tempid", tempid);
                    console.log(tempid);
                    console.log(time);
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    //...................... stop function.............................................................
    const stopfn = () => {

        console.log(data);
        let tempid = sessionStorage.getItem("tempid");
        axios.put("http://localhost:3001/timetracker/" + tempid)
            .then(
                (response) => {
                    console.log(response.data)
                    if (response.data.Status === "sucessfully added") {
                        alert("Program Completed");
                    } else {
                        alert("Error occured.");
                    }

                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )

        // axios.post("http://localhost:3001/timetrackerupdate/"+tempid,data)
        //     .then(
        //         (response) => {
        //             console.log(response);

        //         }
        //     )
        //     .catch(
        //         (err) => {
        //             console.log(err);
        //         }
        //     )


        getEmployeeProgress();
    }
    //................................employee progresss.....................................
    const getEmployeeProgress = () => {
        let tempemail = sessionStorage.getItem("email")
        axios.get("http://localhost:3001/progress/" + tempemail)
            .then(
                (response) => {
                    setprogressList(response.data.data)
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )
    }
    var [progressList, setprogressList] = useState([]);
    //temp data






    //................................employee progresss ends.....................................

    return (
        <div>
            <h1 class="display-6 text-center p-5">Master your time with our website. Welcome {sessionStorage.getItem("userName")}..!</h1>

            <div className="container">
                <div className="row pt-3 ">


                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 g-3">
                        <div className="row bg-info bg-opacity-10 border border-info  rounded-end mb-5 ">
                            <h4 class="m-2">Add your works</h4>
                            <div className="col col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 p-4">
                                <select name="tproject" onChange={inputHandeler} class="form-select" aria-label="Default select example">
                                    {projectList.map((value, index) => {
                                        return <option value={value.pname}>{value.pname}</option>
                                    })}
                                </select>

                            </div>
                            <div className="col col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2  p-4">
                                <select name="ttask" onChange={inputHandeler} class="form-select" aria-label="Default select example">
                                    {taskList.map((value, index) => {
                                        return <option value={value.tname}>{value.tname}</option>
                                    })}
                                </select>

                            </div>
                            <div className="col col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2  p-4">
                                <input type="text"
                                    class="form-control"
                                    id="description"
                                    placeholder="Job Description"
                                    name="tdes"
                                    value={data.tdes}
                                    onChange={inputHandeler} />

                            </div>
                            <div className="col col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2  p-4">

                                <select name="tmeth" onChange={inputHandeler} class="form-select" aria-label="Default select example">
                                    <option value="Work from Office">Work from Office</option>
                                    <option value="Work from Home">Work from Home</option>
                                </select>

                            </div>
                            <div className="col col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 ">
                                <div class="btn-group " role="group" aria-label="Basic mixed styles example">

                                    <h4 className='ms-3 pt-4'>{elapsedTime.hours()}:{elapsedTime.minutes()}:{elapsedTime.seconds()}</h4>
                                    <div class="btn-group ps-3 " role="group" aria-label="Basic mixed styles example">
                                        {!isRunning && (
                                            <button type="button" class="btn btn-danger" onClick={handleStart}>Start</button>
                                        )}
                                        {isRunning && (
                                            <button type="button" class="btn btn-danger" onClick={handlePause}>Pause</button>
                                        )}
                                        {!isRunning && startTime && (
                                            <button type="button" class="btn btn-danger" onClick={handleResume}>Resume</button>
                                        )}
                                        {startTime && (
                                            <button type="button" class="btn btn-danger" onClick={handleStop}>Stop</button>
                                        )}
                                    </div>

                                    {/* <button type="button" class="btn btn-danger" onClick={startfn}>Start</button> */}
                                    {/* <button type="button" class="btn btn-warning">Pause</button> */}
                                    {/* <button type="button" class="btn btn-success" onClick={stopfn}>stop</button> */}

                                </div>

                            </div>

                        </div>
                        <h4 class="m-2"> Your works</h4>
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2">
                                <table class="table table-striped table-hover  table-info border text-center">
                                    <thead>
                                        <tr>

                                            <th scope="col">Project</th>
                                            <th scope="col">Task</th>
                                            <th scope="col">Job Description</th>
                                            <th scope="col">Mode of Work</th>
                                            <th scope="col">End</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {progressList.map((value, index) => {

                                            return <tr>

                                                <td>{value.tproject}</td>
                                                <td>{value.ttask}</td>
                                                <td>{value.tdes}</td>
                                                <td>{value.tmeth}</td>
                                                <td>{value.tend}</td>



                                            </tr>
                                        })}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    {data.map((value, index) => {
                                        return <li><a class="dropdown-item" href="#">{value.pname}</a></li>
                                    }

                                    )}
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav> */}

        </div>
    )
}

export default TimeTracker