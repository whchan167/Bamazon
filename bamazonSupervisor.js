//require mysql and inquirer npm
var mysql = require("mysql");
var inquirer = require("inquirer");

//build the connection between mysql database and javascript
var connection = mysql.createConnection({
	host: "127.0.0.1",
	port: 3306,

	//username
	user: "root",

	//password
	password: "",
	database: "Bamazon_DB"
});

//Display all sale items available
connection.connect(function(err){
	if (err) throw err;
	departTable();
	setTimeout(runMenu, 1000);
});

function departTable(){
	//query all data from the departments table in mysql
connection.query("SELECT * FROM departments", function(err, res){
	console.log("------------------------------------");
	//log available items and display id number, product name and price of the item
	console.log(" department_id||department_name||over_head_costs||total_sales||total_profits||");
	for (var i = 0; i < res.length; i++) {
	console.log("  " + res[i].department_id + " | " + res[i].department_name + " | " + res[i].over_head_costs + " | " + res[i].total_sales + " | " + res[i].total_profits);
	}
	console.log("------------------------------------");
});
};

//Display menu options
function runMenu(){
	inquirer.prompt(
	{name: "Menu",
	 type: "list",
	 message: "Menu Options for Supervisor!",
	 choices: ["View Product Sales by Department", "Create New Department", "End Menu"]
	}).then(function(answer){
		switch (answer.Menu){
			case "View Product Sales by Department":
			prodDep();
			break;

			case "Create New Department":
			createDep();
			break;

			case "End Menu":
			connection.end();
			break;
		}
	});
};

function prodDep(){
	connection.query("SELECT * FROM departments", function(err, res){
		console.log(res)

	});
	setTimeout(runMenu, 1000);
};

function createDep(){
	inquirer.prompt([
	{
	 name: "depName",
	 type: "input",
	 message: "What is the new department would you like to add?"
	},
	{
	 name: "overhead",
	 type: "input",
	 message: "How much is the department's overhead cost?",
	 validate: function(value){
	  	if (isNaN(value) === false){
	  		return true;
	  	} return false; 
		}
	}
	]).then(function(answer){
		var query = "INSERT INTO departments SET ?";
		var prompt = {department_name: answer.depName, over_head_costs: answer.overhead}
		connection.query(query, prompt, function(err, res){
			console.log("New department is creating. Please wait......");
		});
		setTimeout(runMenu, 1000*30);
	});
}



