<?php
header("Access-Control-Allow-Origin: *");

$data = null;
include("conn.php");

if ($conn->connect_error) {
    $data = ["result" => "error", "message" => "Unable to connect"];
} else {
    extract($_POST);

    $sql = "INSERT INTO comments (user_email, comic_id, text) VALUES (?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sis", $user_email, $comic_id, $comment);
    $stmt->execute();

    $row_num = $stmt->affected_rows;
    if($row_num>0){
        $data = ["result" => "success", "comid_id" => $comic_id];
    }
    else{
        $data = ["result" =>"error", "message" => "Insert Failed!"];
    }
}
echo json_encode($data);
$conn->close();
