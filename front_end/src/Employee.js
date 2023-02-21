import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import url from "./userConnection";
import axios from "axios";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [userData, setUserData] = useState({
    name:"",
    role:"",
    gender:""
  })

  const {name, role, gender} = userData
 
  const onUserdataChnage = (e)=>{
    setUserData({...userData, [e.target.name]:e.target.value})
  }


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const role = e.target.elements.role.value;
    const gender = e.target.elements.gender.value;
    if (editId !== null) {
      setEmployeeData(
        employeeData.map((employee, index) => {
          if (index === editId) {
            return { name, role, gender };
          }
          return employee;
        })
      );
    } else {
      setEmployeeData([...employeeData, { name, role, gender }]);
    }
    handleCloseModal();
  };

  // const handleEdit = (index) => {
  //   setEditId(index);
  //   setIsModalOpen(true);
  // };

  // const handleDelete = (index) => {
  //   setEmployeeData(employeeData.filter((employee, i) => i !== index));
  // };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  

  function findAllEmployees(){
    axios.get(url.API+"employees/", {headers:{"content-Type":"application/json"}})
    .then(res=>{
      if(res.data.length>0) setEmployeeData(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  function addNewEmployee(){
    axios.post(url.API+"addNewEmployee/",{
      name:"",
      role:"",
      gender
    })
    .then(res=>{
      if(res.data.length>0) {
        setEmployeeData(res.data)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  function editEmployees(id, employeeData) {
    axios.put(url.API + 'editEmployees/' + id, employeeData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (selected === employeeData._id.current) {
        setSelected(onUserdataChnage);
      } else {
        setSelected(null);
      }
    });
  }

  const filteredData = employeeData.filter(
    employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar bg-light">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfBHyuf_bJCZp8l1H7u1JJDjkaGnv7_N1IAw&usqp=CAU" alt="Company Logo" style={{width:100}} />
        <button style={{marginLeft:"150px"}} className="btn btn-outline-success" onClick={handleOpenModal}>Create New Employee Record</button>
        <input type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} style={{ paddingLeft: "20px", paddingRight: "20px" }}></input>
      </nav>
      <div className="container">
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope= "col">Role</th>
            <th scope="col">Gender</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete Data</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((employee, index) => (
                  <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.gender}</td>
                  <td><button className="btn btn-info" onClick={() => editEmployees()}>Edit</button></td>
                  <td><button className="btn btn-danger" onClick={() => {
                  if(window.confirm("the userdata will be deleted."))
                  {
                  axios.delete(url.API+"employee/"+employeeData._id)
                  .then(()=>{
                      console.log({
                        show:true,
                        message:"The form deleted successfully!",
                        type:"secondary",
                      })
                  })
                  .catch((err)=>{
                    console.log({
                      show:true,
                      message:err.message,
                      type:"danger",
                    })
                  })
                }
              }}>Delete</button></td>
        </tr>))}
        </tbody>
      </table>
    </div>
    <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
      <h3>Create Employee Record</h3>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input style={{width:"300px"}} type="text" className="form-control" id="name" name="name" value={userData.name} onChange={onUserdataChnage} required />
      </div><br></br>
      <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input style={{width:"300px"}} type="text" className="form-control" id="role" name="role" value={userData.role} onChange={onUserdataChnage} required />
      </div><br></br>
      <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input style={{width:"300px"}} type="text" className="form-control" id="gender" name="gender" value={userData.gender} onChange={onUserdataChnage} required />
          {/* <input style={{width:"300px"}} type="text" className="form-control" id="gender" name="gender" value={userData.gender} onChange={onUserdataChnage} required /> */}
          </div><br></br>
      <button type="submit" className="btn btn-primary" onClick={addNewEmployee}>Save</button>
      <button style={{marginLeft:"20px"}} type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
      </form>
    </Modal>
  </div>
);
};

export default NavBar;
