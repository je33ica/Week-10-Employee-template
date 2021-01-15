const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { notDeepEqual } = require("assert");

// start - create newTeam starts with 
// add manager - (adds office num )
//                 + employeeQuestions -> create HTMl manager
//                 
//                 then adds team member
//                 or not

// adds team member
//                 + employeeQuestions  
//                 adds different q's depending on role
//                 create HTML role
//                 then adds team member
//                 or not              

function addFirstManager() {
    inquirer.prompt([
        {
            type: "Input",
            name: "officeNumber",
            message: "As a manger, what is your office number?",
        },
        {
            employeeQuestions()
        },
    ])
}


function askAllEmployees() {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter your name",
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email adress",
        },
        {
            type: "input",
            name: "id",
            message: "Please enter your ID",
        },
        function addNewMember() {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Would you like to add a member to the team ?",
                    name: "role",
                    choices: [
                        "Manager",
                        "Engineer",
                        "Intern",
                        "No more members"

                    ]
                },
            ])
        }
    ])

}
.when((response) => {
    if (response.role === "Manager") {
        managerQuestions();
    }
    else if (response.role === "Engineer") {
        engineerQuestions();
    }
    else if (response.role === "Intern") {
        internQuestions();
    }
    else (response.role === "No more members"); {

    }
});
function managerQuestions() {

    inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter your office number",
        },])
        .then(res)
}

function engineerQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "Please enter your gihub profile",
        },])
}

function internQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "Please enter your school name",
        },])
}


// function addNewMember(){
//     inquirer.prompt(employeeQuestions)
//     .when((response) => {
//         switch response.role === "Manager":
//             managerQuestions
//            break

//         switch (value.role === "Engineer"){
//             (engineerQuestions)

//         else (value.role === "Intern"){
//             return (console.log(internQuestions));
//         }}
//         )
// }

// var inquirer = require("inquirer");
// inquirer
//   .prompt([
//     /* Pass your questions in here */
//   ])
//   .then((answers) => {
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
