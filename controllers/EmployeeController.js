// const { response } = require('express');
const Employee = require('../models/Employee');

//show all employee
const index = (req, res, next) => {
    Employee.find()
    .then(response => {
        res.json({response})
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// find single employee
const show = (req, res, next) => {
    let { employeeID } = req.body
    Employee.findById(employeeID)
    .then(response => {
        res.json({response})
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })  
    })
}

// add employee
const store = (req, res, next) => {
    let employee = new Employee({
        name : req.body.name,
        designation : req.body.designation,
        email : req.body.email,
        phone : req.body.phone,
        age : req.body.age
    })
    employee.save()
    .then(response => {
        res.json({message: 'Employee Added Successfully!'})
    })
    .catch(error => {
        res.json({message: 'An error Occured!'})
    })
}

// update employee by id
const update = (req, res, next) => {
    let { employeeID } = req.body

    let updateData = {
        name : req.body.name,
        designation : req.body.designation,
        email : req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    Employee.findByIdAndUpdate(employeeID, {$set: updateData})
    .then(()=>{
        res.json({message: 'Employee updated successfully!'})
    })
    .catch(error => {
        res.json({message: 'An error Occured!'})
    })
}

//delete an employee
const destroy = (req, res, next) => {
    let {employeeID} = req.body

    Employee.findByIdAndRemove(employeeID)
    .then(()=>{
        res.json({message: 'Employee Deleted successfully!'})
    })
    .catch(error => {
        res.json({message: 'An error Occured!'})
    })
}

module.exports = {
    index, show, store, update, destroy
}