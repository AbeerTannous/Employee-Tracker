INSERT INTO department (department_name)
VALUES
('IT'),
('Finance'),
('Sales'),
('Customer Service');

INSERT INTO empoyee_role(title,salary,department_id)
VALUES
('Software Engineer',60000,1),
('Accountant',50000,2),
('Sales Manager',60000,3),
('Operator',40000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES
('Mark','Firbank',1,5),
('Virginia','Woolf',2,null),
('Charles','LeRoi',3,6),
('Dora','Carrington',4,null);