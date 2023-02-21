import React from 'react'
import { useNavigate } from 'react-router-dom'
let logo = require("../images/Logo.png")

const Navbar = () => {
    const navigate = useNavigate();
    const signout=()=>  {
        navigate("/");
    }
    return (
      
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <img
                        src={logo}
                        height="50"
                    />
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
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