const inquirer = require("inquirer");
const Employee = require("./Employee");

class Engineer extends Employee {

    constructor(name, id, email, githubName) {

        super(name, id, email)
        this.github = githubName;

    }

    getGithub() {


        return this.github;
    }

    getRole() {
        return "Engineer";
    };


}

module.exports = Engineer;