const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    name:{
        type:String
    },
    role:{
        type:String
    },
    male:{
        type:String
        
    },
    female:{
        type:String
        
    }
})

const Employee = mongoose.model("Employee", employeeSchema)
module.exports = Employee;