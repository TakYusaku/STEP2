$(function(){
  getList();
});

// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form1').submit(function(){
  postList();
  return false;
});

// ToDo一覧を取得して表示する
function getList(){
  // すでに表示されている一覧を非表示にして削除する
  var $p_list = $('.p_list');
  $p_list.fadeOut(function(){
    $p_list.children().remove();

      $p_list.fadeIn();
    });
  });


}

// フォームに入力されたToDoを追加する
function postList(){
  // フォームに入力された値を取得
  var name = $('#text').val();
  var limitDate = new Date($('#limit').val());

  //入力項目を空にする
  $('#text').val('');
   $('#limit').val('');
/*
  // /todoにPOSTアクセスする
  $.post('/todo', {name: name}, function(res){
    console.log(res);*/
    //再度表示する
    getList();
  });
}
