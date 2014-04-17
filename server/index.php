<?php
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/posts/', 'getPosts');
$app->get('/posts/:id', 'getSinglepost');
$app->get('/posts/:id/comments', 'getComments');
// $app->get('/posts/:id/addcoment', 'addComent');
// $app->get('/posts/:id/delete', 'deletePost');
// $app->get('/posts/:id/edite', 'editPost');

$app->run();

function getPosts() {

    $sql = "SELECT tbl_post.id, tbl_post.title, tbl_post.content, if(temp.Count >= 1,temp.Count,0) as comments
            FROM tbl_post
            LEFT JOIN
            (SELECT tbl_post.id, COUNT(tbl_comment.id) AS Count
            FROM tbl_post
            LEFT JOIN tbl_comment ON tbl_comment.post_id = tbl_post.id
            GROUP BY tbl_post.id) temp ON temp.Id = tbl_post.id
            ";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $post_list = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        foreach ($post_list as $key => $value) {
           $post_list[$key]->content = preg_replace('/\s[^\s]+$/', '', substr($post_list[$key]->content, 0, 50));
        }
        sendAnsver($post_list);        
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getSinglepost($id = null){
    if ($id != null) {
        $sql = "SELECT `id`, `title`, `content` FROM `tbl_post` WHERE id=:id";
        try {
            $db = getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $posts = $stmt->fetchObject();
            $db = null;
            sendAnsver($posts);        
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }else{
        getPosts();
    }
}

function getComments($id){
    $sql = "SELECT `id`, `content`, `status`, `create_time`, `author`, `email`, `url`, `post_id` FROM `tbl_comment` WHERE post_id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $comments = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        $comments= $comments?$comments:0;
        sendAnsver($comments);        
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


function sendAnsver($message){
    // Include support for JSONP requests
    if (!isset($_GET['callback'])) {
        echo json_encode($message);
    } else {
        echo $_GET['callback'] . '(' . json_encode($message) . ');';
    }
}

function getConnection() {
    $dbhost="127.0.0.1";
    $dbuser="testblog";
    $dbpass="nEwM8SU6PRffVrem";
    $dbname="testblog";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);  
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}