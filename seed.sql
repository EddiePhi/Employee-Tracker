-- reference from Week 12 Activity 14

DROP DATABASE IF EXISTS tracker_DB;
CREATE database tracker_DB;

USE tracker_DB;

CREATE TABLE department (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT(10) NOT NULL
);

CREATE TABLE employee (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(10) NOT NULL,
  manager_id INT(10) NOT NULL
);

INSERT INTO department (name)
VALUES  ("Engineering"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Jr. Engineer", 70000.00, 1), ("Sr. Sales Rep", 80000.00, 2), ("Sr. Engineer", 90000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tim", "T", 1, 2), ("Jim", "J", 1, 3), ("Kim", "K", 2, 4 ), ("Slim", "S", 2, 5), ("Prim", "P", 3, 6);

