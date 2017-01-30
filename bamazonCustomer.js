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
});
//query all data from the table products in mysql
connection.query("SELECT * FROM products", function(err, res){
	console.log("------------------------------------");
	//log available items and display id number, product name and price of the item
	console.log("item_id |  product_name  |  price  ");
	for (var i = 0; i < res.length; i++) {
	console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | ");
	}
	console.log("------------------------------------");
	//initialize buyer's question below
	buyQuestion();
});

//creating a function to prompt two questions:
function buyQuestion(){
	inquirer.prompt([
	{ //ask user to input ID of the item 
	  name: "itemid",
	  type: "input",
	  message: "What is the ID of the item would you like to purchase?",
	  //ensure the value is a number
	  validate: function(value){
	  	if (isNaN(value) === false){
	  		return true;
	  	} return false;
	  }
	 },
	 //ask user to input the quantity needed?
	 { name: "quantity",
	  type: "input",
	  message: "How many units of this item would you like to purchase?",
	  validate: function(value){
	  	if (isNaN(value) === false){
	  		return true;
	  	} return false; 
		}
	  }

	]).then(function(answer){
		//checking inventory available based on user's input
		inventCheck(answer.itemid, answer.quantity);
	});
	};
	
//function to check inventory 
 function inventCheck(id, qty){
 	var query = "SELECT product_name, product_sales, stock_quantity, price FROM products WHERE ?"
 	connection.query(query, {item_id: id}, function(err, res){
 		//if error occurs, shows "err"
 		if (err) throw err;

 		var newstock = res[0].stock_quantity - parseInt(qty);
 		var newProSale = res[0].product_sales + parseInt(qty) * res[0].price;
 		//if stock_quantity is larger than quantity requested, tell 
 		//buyer successfully to buy the quantity needed and update inventory
 		if (res[0].stock_quantity > parseInt(qty)) {
 			updateInv(id, newstock);
 			updateSale(id, newProSale);
 			console.log("You successfully purchased " + qty + " " + res[0].product_name + "\nYour total is: " + res[0].price * qty);
 			connection.end();
 		}
 		//buyer purchase the last quantity in the inventory as a reminder; 
 		else if (res[0].stock_quantity === parseInt(qty)) {
 			updateInv(id, newstock);
 			updateSale(id, newProSale);
 			console.log("You are lucky to get last " + qty + " " + res[0].product_name + "\nYour total is: " + res[0].price * qty);
 			connection.end();
 		}
 		//tell buyer that inventory quantity is insufficient, try to buy remaining quantity if available
 		else if (res[0].stock_quantity < parseInt(qty)){
 			console.log("Insufficient quantity! Sorry, our inventory shows no " + res[0].product_name + " anymore!" + " Try to buy " + res[0].stock_quantity);
 			connection.end();
 		}

 	})
 }

//updating the SQL database to reflect remaining quantity;
 function updateInv(id, qty){
 	var query = "UPDATE products SET ? where ?"
 	connection.query(query, [{stock_quantity: qty}, {item_id: id}], function(err, res){
 	});
	};

//updating the SQL database to reflect each product sale;
 function updateSale(id, sale){
 	var query = "UPDATE products SET ? where ?"
 	connection.query(query, [{product_sales: sale}, {item_id: id}], function(err, res){
 	});
	};

//function totalSales(){
	//var query = "SELECT * FROM products";
	//connection.query(query, function(err, res){
		//for (var i=0; i<res.length; i++){
			//if (res[i].department_name === "phone"){
				//var TphoneSales += res[i].product_sales;
				//console.log(TphoneSales);
			//}
			//else if (res[i].department_name === "gaming"){
				//var TgamingSales += res[i].product.sales;
			//}
		//};
	//});





