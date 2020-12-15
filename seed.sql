-- reference from Week 12 Activity 14

DROP DATABASE IF EXISTS tracker_DB;
CREATE database tracker_DB;

USE tracker_DB;

CREATE TABLE department (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  departmant_id INT(10)
);

CREATE TABLE employee (
  id INT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT
);

SELECT * FROM department;

