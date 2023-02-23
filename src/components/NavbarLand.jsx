import React from 'react'
let logo = require("../images/Logo.png")

const NavbarLand = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    
                    <img
                        src={logo}
                        height="50"
                    />
                  
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav  ms-auto">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/login">Login</a>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarLand