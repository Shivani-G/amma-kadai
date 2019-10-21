<?php
	 
	// Importing DBConfig.php file.
	include 'db_config.php';

	// Response to be sent
	$user = new stdClass();
	$errMessage = "";
	$successful = false;
	 
	// Creating connection.

	$conn = new mysqli($HostName,$HostUser,$HostPass,$DatabaseName);
	if ($conn->connect_error) {
		$errMessage = "Failed to connect to db";
		die("Connection failed: " . $conn->connect_error);
	} 
	else {
		// Getting the received JSON into $json variable.
		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);

		// Populate User email and password from JSON $obj array
		$email = $obj['email'];
		$password = $obj['password'];

		//Get User
		$sql = "SELECT customer_id, name, email, mobile, password, city FROM customers WHERE email='$email'";
		$result = $conn->query($sql);

		if ($result->num_rows >0 ) {	
			$row = $result->fetch_assoc();
			// var_dump($row);
			if($row['password'] === $password){
				// Create respone with necessary user info
				$user = (object) [
					'name' => $row['name'],
					'email' => $row['email'],
					'mobile' => $row['mobile'],
					'id' => $row['customer_id'],
					'city' => $row['city']
				];

				$successful = true;
			}
			else{
				$errMessage = 'Invalid Password. Please Try Again';		
			}
		}
		else {
			$errMessage = 'Invalid Username. Please Try Again';
		}
	}

	$responseEntity = (object) [
		'successful' => $successful,
		'response' => $user,
		'errorMessage' => $errMessage
	];
	$json = json_encode($responseEntity); 
	echo $json;

	$conn->close();
?>