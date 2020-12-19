// reference from Week 12 Activity 14

const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
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
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Delete employee",
        "End application"
      ]
    })
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

      case "View departments":
        viewDepartment();
        break;

      case "View roles":
        viewRole();
        break;

      case "View employees":
        viewEmployee();
      break;

      case "Update employee role":
        updateEmployeeRole();
      break;

      case "Delete employee":
        deleteEmployee();
      break;

      case "End application":
        console.log("Ending application. Thanks!");
        connection.end();
      break;
      };
    })
    .catch((err) => console.error(err))
}

//Reference to work by LanChi Pham: https://github.com/lpham2525/employeetracker/blob/master/server.js
function addDepartment(){ 
  inquirer
    .prompt({
        name: "newDepartment",
        type: "input",
        message: "Department name:",
    }).then(function (answer){
      const query = "INSERT INTO department SET ?";
      connection.query(query, 
        { 
          name: answer.newDepartment 
        }, 
        function(data) {
        console.log("Department added.");
        tracker();
      });
    })
    .catch((err) => console.error(err))
};

function addRole(){ 
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Title of Role: ",
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
      const query = "INSERT INTO role SET ?";
      connection.query(query, 
        { 
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId
        }, 
        function(err, data) {
          if (err) throw err;
          console.log("Role added.");
          tracker();
      });
    });
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
      const query = "INSERT INTO employee SET ?";
      connection.query(query, 
        { 
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId
        }, 
        function(err, data) {
          if (err) throw err;
          console.log("Employee added.");
          tracker();
      });
    })
};

function viewDepartment(){
  const query = "SELECT * FROM department";
  connection.query(query, function(err, data) {
    if (err) throw err;  
    console.table(data);
    tracker();
  });
};

function viewRole(){
  const query = "SELECT * FROM role";
  connection.query(query, function(err, data) {
    if (err) throw err;
      console.table(data);
    tracker();
  });
};

function viewEmployee(){
  const query = "SELECT * FROM employee";
  connection.query(query, function(err, data) {
    if (err) throw err;  
    console.table(data);
    tracker();
  });
};

function updateEmployeeRole(){ // Week 12 Activity 10
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
    inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        choices: function() {
          const choiceArray = [];
          for (let i = 0; i < results.length; i++) {
            let fullName = results[i].first_name + " " + results[i].last_name
            choiceArray.push(fullName);
          }
          return choiceArray;
        },
        message: "Choose employee:",
      },
      {
        name: "newRole",
        type: "input",
        message: "Updated Role:",
      },
    ]).then(function (answer){
      function currentId(){
        for (let i = 0; i < results.length; i++) {
          if(answer.choice === results[i].first_name + " " + results[i].last_name){
            return results[i].id;
          };
        };
      };
      const query = "UPDATE employee SET ? WHERE ?"
      connection.query(query, 
        [
          {
            role_id: answer.newRole
          },
          {
            id: currentId()
          }
        ], function(err, data) {
          if (err) throw err;
          console.log("Update successful.");
          tracker();
        });
    });
  });
};

function deleteEmployee(){
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;  
    inquirer
      .prompt(
        [
          {
            name: "choice",
            type: "list",
            choices: function() {
              const choiceArray = [];
              for (let i = 0; i < results.length; i++) {
                let fullName = results[i].first_name + " " + results[i].last_name
                choiceArray.push(fullName);
              }
              return choiceArray;
            },
            message: "Choose employee:",
          },
        ])
      .then((answer) => {
        function currentId(){
          for (let i = 0; i < results.length; i++) {
            if(answer.choice === results[i].first_name + " " + results[i].last_name){
              return results[i].id;
            };
          };
        };
        const query = "DELETE FROM employee WHERE ?"
        connection.query(query, 
          [
            {
              id: currentId()
            }
          ], function(err, data) {
            if (err) throw err;
            console.log("Delete successful.");
            tracker();
          });
      });
  });
};
