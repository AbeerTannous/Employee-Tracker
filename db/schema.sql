DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30)
);

CREATE TABLE empoyee_role(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER
  /*CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL*/
);

CREATE TABLE employee(
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
   first_name VARCHAR(30),
   last_name VARCHAR(30),
   role_id INTEGER,
   CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES empoyee_role(id) ON DELETE SET NULL,
   manager_id INTEGER
  
);