<?php
$username = $_POST['user'];
$emailAddress = $_POST['emailAddress'];
$pass = $_POST['pass'];

if(!empty($username) || !empty($emailAddress) || !empty($pass)){
    $host = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbname = "fixrtest";

    //create connection
    $conn = newsqli($host, $dbUsername, $dbPassword, $dbname);

    if(mysqli_connect_error()){
        die('Connect Error('.mysqli_connect_errno().')'. mysqli_connect_error());
    }else{
        $SELECT = "SELECT emailAddress From register Where emailAddress = ? Limit 1";
        $INSERT = "INSERT Into register (username,pass,emailAddress) values(?,?,?)";

        //Prepare statement
        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $emailAddress);
        $stmt->execute();
        $stmt->bind_result($emailAddress);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        if($rnum==0){
            $stmt->close();
            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("sss",$username, $emailAddress, $pass);
            $stmt->execute();
            echo "New record inserted successfully";
        } else {
        echo "Someone already used that email";
        }
        $stmt->close();
        $conn->close();
    }

} else {
    echo "All field are required";
    die();
}

?>