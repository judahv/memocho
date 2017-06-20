angular.module('myApp',[])
.controller('MyController',['$scope','$http',function($scope,$http){

//初期表示
listNotes();

//一覧の表示
function listNotes(){
	$http.get('data.json',{})
	.success(function(data){
	  var notes = data;
	  $scope.count = data.length;//件数
	  $scope.notes = notes;//データ
		console.log(notes);
	})
	.error(function(err){
	  $scope.count = '0';
	  $scope.notes = ['メモはありません。'];
	});
};

//一覧から詳細を表示
$scope.show = function(id){
console.log('詳細表示：'+id);
	for(var i =0;i<$scope.notes.length;i++){
		if($scope.notes[i]["id"] === id){
			$scope.detail = $scope.notes[i];
		}
	}
}

//メモの追加
$scope.add = function(){
	$http({
		method: 'POST',
		url: 'add.php',
		data: { title: $scope.add_title,
		content: $scope.add_content }
	})
	.success(function(data,status,headers,config){
		$scope.result = data;
		if(data=="error"){
			$scope.result = "メモの追加に失敗しました。";
		}else if(data=="sccuess"){
			$scope.result = "メモを追加しました。";
		}
		listNotes();
		
	})
	.error(function(data,status,headers,config){
		$scope.result = "メモの追加に失敗しました。";
	})

}

//メモの削除
$scope.del = function(id){
console.log('削除：'+id);
	$http({
		method: 'POST',
		url: 'del.php',
		data: { id: id }
	})
	.success(function(data,status,headers,config){
		$scope.result2 = data;
		if(data=="error"){
			$scope.result2 = "メモの削除に失敗しました。";
		}else if(data=="sccuess"){
			$scope.result2 = "メモを削除しました。";
		}
		listNotes();
		
	})
	.error(function(data,status,headers,config){
		$scope.result2 = "メモの削除に失敗しました。";
	})
}



}]);