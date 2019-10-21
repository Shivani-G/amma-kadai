<?php
	 
	// Importing DBConfig.php file.
	include 'db_config_test.php';
	 
	// Creating connection.
	$conn = new mysqli($HostName,$HostUser,$HostPass,$DatabaseName);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	 
	// Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);
	// Populate User email and password from JSON $obj array
	$email = $obj['email'];
	$password = $obj['password'];
	
	//Checking if User exists
	$sql = "SELECT customer_id, name, email, mobile FROM customers WHERE email='$email'";
	$result = $conn->query($sql);

	if ($result->num_rows >0) {
		$row[] = $result->fetch_assoc();

		// Create respone with necessary user info
		$user = (object) [
			'name' => $row[0]['name'],
			'email' => $row[0]['email'],
			'mobile' => $row[0]['mobile'],
			'id' => $row[0]['customer_id']
		];
		// var_dump($user);
		$json = json_encode($user); 

		echo $json;
	}
	else{
		$InvalidMSG = 'Invalid Username or Password Please Try Again' ;
		$InvalidMSGJSon = json_encode($InvalidMSG);
		
	 	echo $InvalidMSGJSon ;
	}
	 
	$conn->close();
?>