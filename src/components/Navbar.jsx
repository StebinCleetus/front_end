import React from 'react'
import { useNavigate } from 'react-router-dom'
let logo = require("../images/Logo.png")

const Navbar = () => {
    const navigate = useNavigate();
    const signout = () => {
        navigate("/");
        sessionStorage.clear();

    }
    return (

        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <img
                        src={logo}
                        height="50"
                    />
                    <ul class="navbar-nav  ms-auto">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" onClick={signout}>Signout</a>
                        </li>


                    </ul>

                </div>
            </nav>
        </>
    )
}

export default Navbar