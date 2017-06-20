<?php
//開発中はエラー表示
ini_set( 'display_errors', 1 );

$data = json_decode(file_get_contents('php://input'),true);

//値がセットされていなければ終了
if (!isset($data['title'])) { exit; }

$title = $data['title'];
$content = $data['content'];

//print $title;

$filename = "data.json";
$json = @file_get_contents($filename);
$records = json_decode($json, true);
$i = count($records) + 1;
$now = date("Y/m/d H:i:s");
$new_records = array('id' => $i,'title' => $title,'content' => $content,'date' => $now);
array_push($records,$new_records);

$out_json = json_encode($records);
$put = @file_put_contents($filename, $out_json, LOCK_EX);

if($put){
	//echo json_encode(array( 'note', 'sccuess' ));
	print 'sccuess';
}else{//ファイルに書き込めなかった場合エラー
	//echo json_encode(array( 'note', 'error_put' ));
	print 'error';
}


?>