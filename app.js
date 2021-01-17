const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// empty array for team member to be added
const newTeam = [];

// all employers will be asked the same set of questions
const askAllEmployees = [
  {
    type: "input",
    name: "name",
    message: "Please enter the name of the employee :",
  },
  {
    type: "input",
    name: "id",
    message: "Please enter the employee's id number :",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter the employee's email :",
    validate: input => {
      const emailValidation = input.match(/\S+@\S+\.\S+/);
      if (emailValidation) return true;
      else {
        return "Please enter a valid email address "
      }

    },
  },
];
const managerQuestions = [
  ...askAllEmployees,
  {
    type: "input",
    name: "officeNumber",
    message: "Please enter your office number",
  },
];
const engineerQuestions = [
  ...askAllEmployees,
  {
    type: "input",
    name: "github",
    message: "Please enter your github profile",
  },
];
const internQuestions = [
  ...askAllEmployees,
  {
    type: "input",
    name: "school",
    message: "Please enter your school name",
  },
];
const newEmployeeRole = [
  {
    type: "list",
    message: "Would you like to add a member to the team ?",
    name: "role",
    choices: ["Manager", "Engineer", "Intern", "No more members"],
  },
];

// all teams start with a manager as a minimum
inquirer.prompt(managerQuestions).then(function (response) {
  const manager = new Manager(
    response.name,
    response.id,
    response.email,
    response.officeNumber
  );
  newTeam.push(manager);
  addNewMember();
});

//ask if any more team members are to be created 
function addNewMember() {
  inquirer.prompt(...newEmployeeRole).then((response) => {
    if (response.role === "Engineer") {
      newEngineer();
    } else if (response.role === "Intern") {
      newIntern();
    } else (response.role === "No more members"); {
      createTeam();
    }
  });
}

//create new job roles using the classes to creat a new instance 
function newEngineer() {
  inquirer.prompt(engineerQuestions).then(function (response) {
    const engineer = new Engineer(
      response.name,
      response.id,
      response.email,
      response.github
    );
    newTeam.push(engineer);
    addNewMember();
  });
}
function newIntern() {
  inquirer.prompt(internQuestions).then(function (response) {
    const intern = new Intern(
      response.name,
      response.id,
      response.email,
      response.school
    );
    newTeam.push(intern);
    addNewMember();
  });
}


//  creates the file using fs synchronously

function createTeam() {
  if (fs.existsSync(OUTPUT_DIR) === false) {
    fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFileSync(outputPath, render(newTeam))

}



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
