import React from 'react'

import NavbarLand from './NavbarLand'
let land = require("../images/4584.jpg")

const Home = () => {

  return (

    <div>
      <NavbarLand/>
      <div className="container mt-5">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-5 pt-5">
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-5">
                <img src={land}
              
                  class="img-fluid" alt="Sample image" />
              </div>

              <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-center">
                <h1 class="display-1 mb-2">Welcome to ICTAK </h1>
                <h1 class="display-5 mb-2"> Clock-In System</h1>
                <p class="lead mt-5">
                  Track your time with ease using our intuitive time tracking website. Stay productive and organized, and never miss a deadline again. start managing your time like a pro."
                </p>


              </div>
            </div>
            {/* <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-5">

              </div>
            </div> */}

          </div>
        </div>
      </div>
   
    </div>
  )
}

export default Home