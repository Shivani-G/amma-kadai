<?php
	 
	echo "wah";
	// Importing DBConfig.php file.
	include 'db_config.php';
	 
	// Creating connection.

	$conn = new mysqli($HostName,$HostUser,$HostPass,$DatabaseName);
	if ($conn->connect_error) {
		echo "Failed to connect to db";
		die("Connection failed: " . $conn->connect_error);
	} 
	echo "Connected successfully";
	 
	// Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);
	// Populate User email and password from JSON $obj array
	$email = $obj['email'];
	$password = $obj['password'];
	
	//Checking if User exists
	$sql = "SELECT item_id, main_menu_id, item_name, price, food_type FROM menu WHERE is_active=1";
	$result = $conn->query($sql);

	$mainMenu = array();
	$extraItems = array();

	if ($result->num_rows >0) {
		while($row = $result->fetch_assoc()){
			// Add meal to menu
			if($row[main_menu_id] <> 0){
				$meal = (object) [
					'name' => $row['item_name'],
					'price' => $row['price'],
					'veg' => $row['food_type'] == 'pv' ? true : false,
					'id' => $row['item_id'],
					'extras' => array();
				];
				array_push($mainMenu, $meal);
			}
			else{
				$meal = (object) [
					'name' => $row['item_name'],
					'price' => $row['price'],
					'id' => $row['item_id']
				];	
				$extraItems += array($row['main_menu_id'] => $meal);
			}
		}


		var_dump($mainMenu);
		var_dump($extraItems);
		$json = json_encode($mainMenu); 

		echo $json;
	}
	else{
		$InvalidMSG = 'Invalid Username or Password Please Try Again' ;
		$InvalidMSGJSon = json_encode($InvalidMSG);
		
	 	echo $InvalidMSGJSon ;
	}
	
	$conn->close();
?>