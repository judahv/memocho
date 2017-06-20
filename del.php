<?php
//開発中はエラー表示
ini_set( 'display_errors', 1 );

$data = json_decode(file_get_contents('php://input'),true);

//値がセットされていなければ終了
if (!isset($data['id'])) { exit; }

$id = $data['id'];

//print $title;

$filename = "data.json";
$json = @file_get_contents($filename);
$records = json_decode($json, true);
for($i = 0; $i < count($records); $i++){
	if($records[$i]['id'] === $id){
		unset($records[$i]);
	}
}
$new_records = array_values($records);
$out_json = json_encode($new_records);
$put = @file_put_contents($filename, $out_json, LOCK_EX);

if($put){
	//echo json_encode(array( 'note', 'sccuess' ));
	print 'sccuess';
}else{//ファイルに書き込めなかった場合エラー
	//echo json_encode(array( 'note', 'error_put' ));
	print 'error';
}


?>