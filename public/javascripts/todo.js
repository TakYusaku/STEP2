// ページが表示されたときToDoリストを表示する
$(function(){
  getList();
});

// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function(){
  postList();
  return false;
});

// ToDo一覧を取得して表示する
function getList(){
  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    // /todoにGETアクセスする
    $.get('todo', function(todos){
      // 取得したToDoを追加していく
      $.each(todos, function(index, todo){
        $list.append('<h1>' + '<a href="http://localhost:3000/detail" >' + todo.name + '</a>'+'</h1>');
      });
      // 一覧を表示する
      $list.fadeIn();
    });
  });


}

// フォームに入力されたToDoを追加する
function postList(){
  // フォームに入力された値を取得
  var name = $('#text').val();

  //入力項目を空にする
  $('#text').val('');

  // /todoにPOSTアクセスする
  $.post('/todo', {name: name}, function(res){
    console.log(res);
    //再度表示する
    getList();
  });
}
