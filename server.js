const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');





// Database connection 
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Ast200611125',
        database:'employee_db'
    
    },
    console.log('connected to employee_db database!')
);


// prompt the user to choose option
const promptList = () =>{

   return inquirer.prompt([
   {
    type:'list',
    name: 'choices',
    message:'choose from the menu',
    choices:['View all departments', 
             'View all roles', 
             'View all employees', 
             'Add a department', 
             'Add a role', 
             'Add an employee', 
             'Update an employee role'
            ]

    
    }
   ])
   .then((answers) => {
       console.log(answers);
       const {choices} = answers;
       if (choices === "View all departments") {
        viewDepartment() ;
       }
       if  (choices === "View all roles"){
           viewRoles();
          
       }
       if  (choices === "View all employees"){
        viewEmployee();
       
       }
       if  (choices === "Add a department"){
        addDepartment();
       }
       if  (choices === "Add a role"){
        addRole();
       }
       if  (choices === "Add an employee"){
        addEmpolyee();
       }
       if  (choices === "Update an employee role"){
        updatEmployee();
       }
   })

}
promptList();
// function to show all departments 
const viewDepartment =() =>{

    db.query(`SELECT * FROM department`,(err,rows)=>{
        if (err){
            console.log(err);
        }
        console.table(rows);
    });
 promptList();
}
// function to show all roles 
const viewRoles =() =>{

    db.query(`SELECT * FROM empoyee_role`,(err,rows)=>{
        if (err){
            console.log(err);
        }
        console.table(rows);
    });
    promptList();

}
// function to show all the employees
const viewEmployee =() =>{

    db.query(`SELECT * FROM employee`,(err,rows)=>{
        if (err){
            console.log(err);
        }
        console.table(rows);
    });
    promptList();
}
// function to add department 
const addDepartment =()=>{
    inquirer.prompt([
        {
            type: 'input', 
            name: 'department',
            message: "Enter name of the department"
        }
    ]).then(answer =>{
       const sql= `INSERT INTO department (department_name) VALUES(?)`;
       const params = answer.department;
        db.query(sql,params,(err,result) =>{

            if (err){
                console.log(err);
            }
               console.log(result);
               viewDepartment();
        });
    });
}
// function to add role 
const addRole =()=>{
    inquirer.prompt([
        {
            type: 'input', 
            name: 'title',
            message: "Enter role "
        },
        {
            type: 'input', 
            name: 'salary',
            message: "Enter the salary"
        },
        {
            type: 'list', 
            name: 'department',
            message: "choose department",
            choices:['IT','Finance','Sales','Customer Service']
        }

    ])
    .then(answer =>{
        var dept = 0
        switch (answer.department){
            case "IT":
                 dept = 1;
                break;
            case "Finance":
                 dept = 2;
                 break;
            case "Sales":
                 dept = 3;
                break; 
           case "Customer Service":
                dept = 4;
                break; 
        } 
       const sql= `INSERT INTO empoyee_role (title,salary,department_id) VALUES(?,?,?)`;

       const params =[ answer.title,answer.salary,dept];
        db.query(sql,params,(err,result) =>{

            if (err){
                console.log(err);
            }
               console.log(result);
               viewRoles();
        });
    });
}
// function to add employee 
const addEmpolyee =()=>{
    inquirer.prompt([
    {
        type: 'input', 
        name: 'first',
        message: "Enter Employee first name "
    },
    {
        type: 'input', 
        name: 'last',
        message: "Enter Employee last name "
    },
    {
        type: 'input', 
        name: 'role',
        message: "Enter Employee role id  "
    },
    {
        type: 'input', 
        name: 'manager',
        message: " Enter Manager id"
    }

    ]) .then(answer =>{
        const sql= `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)`;
        const params =[ answer.first,answer.last,answer.role,answer.manager];
        db.query(sql,params,(err,result) =>{

            if (err){
                console.log(err);
            }
               console.table(result);
               viewEmployee();
        });

    });
}
// function to update employee
const updatEmployee=()=>{
    const empSql =`SELECT * FROM employee`;
   db.query(empSql,(err,result) =>{
        if (err){
            console.log(err);
        }
        const employees = result.map(({ id, first_name, last_name }) => ({ name: first_name , last_name, value: id }));
        inquirer.prompt([
            {
                type: 'list', 
                name: 'employees',
                message: "Select employee",
                choices:employees
            }
        ]) 
         
    .then(answer=>{
        const employee = answer.employee;
        const params = [];
        params.push(employee);
        const roleSql= `SELECT * FROM empoyee_role`;
        db.query(empSql,(err,result) =>{
            if (err){
                console.log(err);
            }
          const roles = result.map(({ id, title }) => ({ name: title, value: id }));
          inquirer.prompt([
            {
                type: 'list', 
                name: 'roles',
                message: "Select role",
                choices:roles
            }
         ]) .then(answer=>{
              const role = answer.roles;
              params.push(role);
             
              const sql =`UPDATE employee SET role_id = ? WHERE id = ?`;
              db.query(sql,params,(err,result) =>{
                if (err){
                    console.log(err);
                }
                console.table(result);
                viewEmployee();

            });
        })  
    })
 })
})
}