const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const dreamTeam = [];

function selectRole(){
    inquirer.prompt([
    {
        type: 'list',
        message: 'What is the team members role?',
        name: 'role',
        choices:[
'Intern', 'Manager', 'Engineer'
        ]
    }
])
.then(function(response){

    switch (response.role) {
        case 'Manager':
            
            managerQuestions();

            break;

            case 'Engineer':
            
            engineerQuestions();
            break;

            case 'Intern':
            
            internQuestions();
            
            break;
        default:
          console.log('yo');
         
    }
   
})

}

function managerQuestions() {

    inquirer.prompt([

        {

            type: "input",
            name: "managerName",
            message: "Please enter the manager's name",

        },

        {
            type: "input",
            name: "id",
            message: "Please enter manager's ID number.",

        },

        {

            type: "input",
            name: "email",
            message: "Please enter manager's email address.",

        },

        {

            type: "input",
            name: "officeNumber",
            message: "Please enter manager's office number.",

        }

    ]).then(function(answers) {

        
        // const manager = [answers.role,answers.managerName, answers.id, answers.email, answers.officeNumber];
        const manager = new Manager(answers.managerName, answers.id, answers.email, answers.officeNumber)

        // const managerInfo = {
        //     Name: response.name,
        //     ID: response.id,
        //     Email : response.email
        // }
       
            //    console.log(managerInfo);
        dreamTeam.push(manager);
        console.log('hello');
        console.log(dreamTeam);
        anyoneElse();



    })
}

function engineerQuestions() {

    inquirer.prompt([
        {

            type: "input",
            name: "name",
            message: "Please enter the engineer's name",

        },

        {

            type: "input",
            name: "id",
            message: "Please enter your ID number."

        },

        {
            type: "input",
            name: "email",
            message: "Please enter your email address.",

        },

        {
            type: "input",
            name: "github",
            message: "Please enter your Github username.",

        },


    ]).then(function (answers) {

        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)

        // const engineer = [answers.role,answers.officeNumber, answers.name, answers.id, answers.email, answers.github];
        dreamTeam.push(engineer)
        anyoneElse();

    })
}

function internQuestions() {

    inquirer.prompt([

        {
            type: "input",
            name: "name",
            message: "Please enter your name.",

        },

        {
            type: "input",
            name: "id",
            message: "Please enter your ID number.",

        },

        {
            type: "input",
            name: "email",
            message: "Please enter your email address.",

        },

        {
            
            type: "input",
            name: "school",
            message: "Please enter the name of your school.",

        },

    ]).then(function (answers) {

        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)

        // const intern = [answers.name, answers.id, answers.email, answers.school]
        
        dreamTeam.push(intern)
        
        anyoneElse()

    })
}



function anyoneElse() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Any more team members?',
            name: 'anymore'
        }
    ]).then(function(response){

       if(response.anymore==='yes'){
        selectRole();
       }else{
        completeTeam();
       }
    })
}

function completeTeam() {

    if (!fs.existsSync(OUTPUT_DIR)) {

        fs.mkdirSync(OUTPUT_DIR)
       
    }

    fs.writeFileSync(outputPath, render(dreamTeam), "utf-8")
    console.log(dreamTeam);
}
selectRole();
