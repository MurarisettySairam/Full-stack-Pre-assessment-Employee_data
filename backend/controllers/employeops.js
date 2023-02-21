const Employee = require("../models/userdata")

exports.createUser = async (req,res)=>{
    try{
        var employees = await Employee.create(req.body)
        res.json({employees})
    }catch(error){
        res.json({error})
    }
 }
 exports.findAllEmployees = async(req,res)=>{
    try{
       var employees = await Employee.findById(req.params.id);
       res.json({employees}) 
    }catch(error){
        res.status(404).json({"Message": "Extracting Failed!"})
    }
 }

 exports.deleteEmployees = async (req, res)=>{
     try{
       const employees =  await Employee.findById(req.params.id)
       await employees.remove()
       res.json({data: "Deletion Successful"+employees.id})
    } catch {
        res.status(404).send({error: "Form not found"})
    }
    }

exports.updateEmployees = async(req,res)=>{
    try{
        var {id:employeeID} = req.params;
        var employees = await Employee.findByIdAndUpdate({_id:employeeID},req.body,{
            new:true, runValidators:true
        }); 
        if(!employees){
           return  res.status(404).json({msg:"Employee Not found!"})
        }
        res.status(200).json(employees)
       }catch(error){
        res.status(404).json({msg:error}) 
       }
}