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
	runMenu();
});
fun
	
function runMenu(){
	inquirer.prompt(
	{ name: "menu",
	  type: "list",
	  message: "Choose the menu options!",
	  choices: ["View Products for Sale", "View Low Inventory",
	  			"Add to Inventory", "Add New Product", "End Menu"]
	}).then(function(answer){
		switch(answer.menu){
		  case "View Products for Sale":
		  viewitem();
		  break;

		  case "View Low Inventory":
		  viewLowInv();
		  break;

		  case "Add to Inventory":
		  addInv();
		  break;

		  case "Add New Product":
		  additem();
		  break;

		  case "End Menu":
		  connection.end();
		  break;
		}
	});
	};

function viewitem(){
		viewitem1();
		setTimeout(runMenu, 1000);
};

function viewitem1(){
//query all data from the table products in mysql
connection.query("SELECT * FROM products", function(err, res){
	console.log("------------------------------------");
	//log available items and display id number, product name and price of the item
	console.log("item_id| product_name |  price |  quantity |");
	for (var i = 0; i < res.length; i++) {
	console.log(res[i].item_id + "    | " + res[i].product_name + "   | " + res[i].price + "  | " + res[i].stock_quantity + " | ");
	}
	console.log("------------------------------------");
});
};

function viewLowInv(){
//query all items with inventory count lower than five
var query = "SELECT stock_quantity, product_name FROM products";
connection.query(query, function(err, res){
	console.log("Please review a list of items for inventory replenishment:")
	//loop through the stock_quantity to check count
	//if inventory count is lower than five, list all items for manager to order
	for (var i=0; i<res.length; i++){
		if (res[i].stock_quantity < 5){
			console.log(res[i].product_name);
		};
	};
	setTimeout(runMenu, 1000);
});
};

function addInv(){
	viewitem1();
	setTimeout(addInvInq, 1000);
}

function addInvInq(){
	inquirer.prompt([
	{ //ask manager to input item_id corresponding to the product
	  name: "itemid",
	  type: "input",
	  message: "What is the item_id corresponding to the product you need to add more?",
	  validate: function(value){
	  	if (isNaN(value) === false){
	  		return true;
	  	} return false; 
		}
	 },
	 //ask manager to input the quantity needed to add more
	 { name: "quantity",
	  type: "input",
	  message: "How many units of this item would you like to add more?",
	  validate: function(value){
	  	if (isNaN(value) === false){
	  		return true;
	  	} return false; 
		}
	  }
	]).then(function(answer){
	//connect products tablet
	var query1 = "SELECT item_id, stock_quantity, product_name FROM products WHERE ?"
	connection.query(query1, {item_id: answer.itemid}, function(err, res){
	//add quantity in the present inventary
	var newqty = res[0].stock_quantity + parseInt(answer.quantity);
	updateInv(answer.itemid, newqty);
 		console.log("You add new quantity in the inventory successfully! ");
 		console.log("Total quantity of " + res[0].product_name + " in the inventory is " + newqty);
		});
	});
	setTimeout(runMenu, 1000*15);
	};

//updating the SQL database to reflect remaining quantity;
 function updateInv(id, qty){
 	var query = "UPDATE products SET ? where ?"
 	connection.query(query, [{stock_quantity: qty}, {item_id: id}], function(err, res){
 	});
	};

function additem(){
	inquirer.prompt([
	{name: "itemName",
	 type: "input",
	 message: "What is the name of new product would you like to add?"
	},
	{name: "departName",
	 type: "input",
	 message: "Which category of department would you like to put into?"
	},
	{name: "price",
	 type: "input",
	 message: "What is the sale price of this item?",
	 validate: function(value){
	  	if (isNaN(value) === false){
	  		return true;
	  	} return false; 
		}
	},
	{name: "stockqty",
	 type: "input",
	 message: "How many of this product is available in the store inventory?",
	 validate: function(value){
	  	if (isNaN(value) === false){
	  		return true;
	  	} return false; 
		}
	}
	]).then(function(answer){
		var query = "INSERT INTO products SET ?";
		var item = {item_id: answer.itemid, product_name: answer.itemName, department_name: answer.departName,
					price: answer.price, stock_quantity: answer.stockqty}
		connection.query(query, item, function(err, res){
			console.log("Your new product has successfully been added in the list of inventory");
			console.log("View Products for Sale on the main menu to confirm update!")
			console.log("updating! Please wait.......")
		})
		setTimeout(runMenu, 1000*50);
	});

};


