import axios from 'axios'
import React, { useState } from 'react'
import "./Loginpage.css"
import NavbarLand from './NavbarLand'
import { useNavigate } from "react-router-dom";




const LoginPage = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const readValues = () => {
        console.log(data);
        axios.post("http://localhost:3001/signin", data)
            .then(
                (response) => {
                    console.log(response.data.status)
                    if (response.data.status === "Sucess") {
                        let token = response.data.token;
                        let email = response.data.data[0].email;
                        let id = response.data.data[0]._id;
                        let userName= response.data.data[0].userName;

                        sessionStorage.setItem("token", token);
                        sessionStorage.setItem("email", email);
                        sessionStorage.setItem("_id", id);
                        sessionStorage.setItem("userName", userName);
                       

                        if (response.data.data[0].role === "admin") {

                            navigate("/admin");


                        } else {
                            navigate("/employee");
                        }
                    } else {
                        alert(response.data.data)
                    }

                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            )

    }

    const inputHandeler = (event) => {
        const { value, name } = event.target
        setData(
            (previousState) => ({
                ...previousState,
                [name]: value
            })
        )

    }
    const navigate = useNavigate();

    return (
        <div>
            <NavbarLand />


            <div class="container-fluid">
                <div class="row main-content bg-success text-center">
                    <div class="col-md-4 text-center company__info">
                        <span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
                        <h4 class="company_title">ICTAK</h4>
                        <h6>Clock-in System</h6>
                    </div>
                    <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
                        <div class="container-fluid">
                            <div class="row pt-2">
                                <h2>Log In</h2>
                            </div>
                            <div class="row">
                                <form control="" class="form-group">
                                    <div class="row">
                                        <input type="text"
                                            className="email"
                                            class="form__input"
                                            placeholder="email"
                                            onChange={inputHandeler}
                                            value={data.email}
                                            name="email"
                                        />
                                    </div>
                                    <div class="row">
                                        <span class="fa fa-lock"></span>
                                        <input type="password"
                                            className="password"
                                            class="form__input"
                                            placeholder="Password"
                                            onChange={inputHandeler}
                                            value={data.password}
                                            name="password" />
                                    </div>

                                    <div class="row d-grid gap-2 col-6 mx-auto">
                                        <input value="Submit" class="btn" onClick={readValues} />
                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default LoginPage