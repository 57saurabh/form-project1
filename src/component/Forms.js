import React, { useEffect, useState } from "react";
import axios from 'axios';

function Forms() {
  const [list, setList] = useState({ name: "", email: "", phoneNo: "" });
  const [user, setUser] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);


  const getUsers = async()=>{
        const res = await axios.get('https://brainy-puce-turkey.cyclic.app/');
      console.log(res.data);
      setUser(res.data);
    }
    const postUsers = async (list) => {
      try {
        const res = await axios.post('https://brainy-puce-turkey.cyclic.app/', list);
        console.log(res.data);
    
        if (res.data && res.data._id) {
          setUser([...user, res.data]);
          setList({ name: "", email: "", phoneNo: "" });
        }
      } catch (error) {
        console.error(error);
      }
      // getUsers()
    }
    const handleDelete = async(_id)=>{
          const res = await axios.delete(`https://brainy-puce-turkey.cyclic.app/${_id}`);
        console.log(res.data);
        // setUser(res.data);
        if(res.data._id){
          const newUsers = user.filter((user)=>user._id !== _id);
          setUser(newUsers);
        }
      }
    // setSubmittedUser([...submittedUser, user])
  
  useEffect(()=>{
    // postUsers();
    getUsers();
  },[user]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (list.name.trim() === '' || list.email.trim() === '' || list.phoneNo.trim() === '') {
      alert("Please fill all the fields");
    }
      else{
        try{
          await postUsers(list);
          setSubmittedData([...submittedData, list]);
          setList({ name: "", email: "", phoneNo: "" });
        }
        catch(error){
          console.log(error);
        }
      }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setList({ ...list, [name]: value });
  };

  // const handleDelete = (index) => {
  //   setSubmittedData(submittedData.filter((_, i) => i !== index));
  // };

  return (
    <>
      <div className="row g-2  mb-3 mx-3 my-3">
        <div className="col ">
          <div className="container mb-3 mx-3 my-3">
            <h1 >Form</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="form-label">
                Name:
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={list.name}
                  onChange={handleChange}
                />
              
              <br />
              <label htmlFor="email" className="form-label">
                Email:
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  value={list.email}
                  onChange={handleChange}
                />
              
              <br />
              <label htmlFor="phoneNo" className="form-label">
                Phone No:
                </label>
                <input
                  className="form-control"
                  type="number"
                  id="phoneNo"
                  name="phoneNo"
                  value={list.phoneNo}
                  onChange={handleChange}
                />
              
              <br />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
            {/* table data */}
        <div className="col mb-3 mx-1 my-3 ">
        <div className="container-lg">
            <h1>Details</h1>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">phone No</th>
                <th scope="col">&nbsp;&nbsp;&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {/* {user.map((data, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phoneNo}</td>
                  <td>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))} */}
              {user.length>0? (user.map((data, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phoneNo}</td>
                  <td>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))):(<p>no data prest</p>)}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forms;
