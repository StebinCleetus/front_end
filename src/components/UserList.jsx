import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserList = () => {
  useEffect(
    () => {
      getUserlist();
    }, []
  )
  var [userList, setuserList] = useState([]);

  const getUserlist = () => {

    var data = {
      token: sessionStorage.getItem("token")
    };
    console.log(data);
    axios.post("http://localhost:3001/employee", data)
      .then(
        (response) => {
          setuserList(response.data);
          console.log(userList);
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
      <button className='btn btn-outline-success  btn-sm' onClick={getUserlist}>Update</button>
      <div className="container pt-4">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col xxl-12">
            <div className="row">

              {userList.map((value, index) => {
                return <div className="col col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col xxl-3">
                  <div class="card text-bg-light mb-3" >
                    <div class="card-body">
                      <h5 class="card-title">{value.userName}</h5>
                      <p class="card-text">{value.email}</p>
                      <p class="card-text">{value.role}</p>
                    </div>
                  </div>
                </div>
              })}

            </div>



          </div>
        </div>
      </div>









      {/* <ol class="list-group list-group-numbered">
        {userList.map((value, index) => {
          return <li class="list-group-item">{value.userName} </li>

        })}
      </ol> */}
    </div>
  )
}

export default UserList