// reference from Week 12 Activity 14

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Password123",
  database: "tracker_DB"
});



connection.connect(function(err) {
  if (err) throw err;
  tracker();
});

function tracker() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View department",
        "View role",
        "View employee",
        "Update employee role"
      ]
    }) // Code that still needs work VVVVVVV
    .then(function(answer) {
      switch (answer.action) {
      case "Add department":
        addDepartment();
        break;

      case "Add role":
        addRole();
        break;

      case "Add employee":
        addEmployee();
        break;

      case "View department":
        viewDepartment();
        break;

      case "View role":
        viewRole();
        break;

      case "View employee":
        viewEmployee();
      break;

      case "Update employee role":
        //updateEmployeeRole();
      break;
      }
    });
}

function addDepartment(){ 
  inquirer
    .prompt({
        name: "department",
        type: "input",
        message: "Department:",
    }).then(function (answer){
      var query = "INSERT INTO department SET ?";
      connection.query(query, { department: answer.department }, function(err, res) {
        if (err) throw err;  
        console.log(`${answer.department} added as a department.`);
        tracker();
      });
    })
};
function addRole(){ 
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Title: ",
      },
      {
        name: "salary",
        type: "input",
        message: "Salary:",
      },
      {
        name: "departmentId",
        type: "input",
        message: "Department ID:",
      },
    ]).then(function (answer){
      var query = "INSERT INTO role SET ?";
      connection.query(query, 
        { 
          title: answer.title,
          salary: answer.salary,
          departmentId: answer.departmentId
        }, 
        function(err, res) {
          if (err) throw err;
          console.log(
            "Role added. Title: " + answer.title + 
            " || Salary: " + answer.salary + 
            " || Department ID: " + answer.departmentId
           );
        tracker();
      });
    })
};
function addEmployee(){
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "First Name: ",
      },
      {
        name: "lastName",
        type: "input",
        message: "Last Name:",
      },
      {
        name: "roleId",
        type: "input",
        message: "Role ID:",
      },
      {
        name: "managerId",
        type: "input",
        message: "Manager ID:",
      },
    ]).then(function (answer){
      var query = "INSERT INTO role SET ?";
      connection.query(query, 
        { 
          firstName: answer.firstName,
          lastName: answer.lastName,
          roleId: answer.roleId,
          managerId: answer.managerId
        }, 
        function(err, res) {
          if (err) throw err;
          console.log(
            "Employee added. First name: " + answer.firstName + 
            " || Last name: " + answer.lastName + 
            " || Role ID: " + answer.roleId +
            " || Manager ID: " + answer.managerId
           );
        tracker();
      });
    })
};

function viewDepartment(){
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;  
    console.table(res);
    tracker();
  });
};

function viewRole(){
  const query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
      console.table(res);
    tracker();
  });
};

function viewEmployee(){
  const query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;  
    console.table(res);
    tracker();
  });
};

function updateEmployeeRole(){ // Select from employee list???
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: "Choose Employee:",
    }).then(function (answer){
      const query = "UPDATE products SET ? WHERE ?"
      connection.query(query, 
        [
          {
            highest_bid: answer.bid
          },
          {
            id: chosenItem.id
          }
  ]), function(err, res) {
    if (err) throw err;
  console.log("Update")
};

tracker();
