const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const employeeCRUD = require("./controllers/employeops");
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/admindata", {
    useNewUrlParser: true
})
.then(() => {
    app.get('/findAllEmployees', employeeCRUD.findAllEmployees)

    app.post('/addNewEmployee', employeeCRUD.createUser)

    app.patch('/editEmployees/:id', employeeCRUD.updateEmployees)

    app.delete('/deleteEmployees/:id', employeeCRUD.deleteEmployees)
})
.catch(() => {
    console.log("Database connection failed!");
})

app.listen(3001, () => {
    console.log("Server listening on 3001")
})