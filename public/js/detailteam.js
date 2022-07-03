//チームにコメントするためのglobal変数
var global_team_active;

//detailを開くための関数
function detail_team(thecard_ele){
    //activeteamの定義
    global_team_active=thecard_ele.id;
    //dialog表示
    document.getElementById("detail_team_div").style.display = "block";
    //console.log(thecard_ele.id, global_team[thecard_ele.id]);
    var choise_team = global_team[thecard_ele.id].list;
    var choise_name = global_team[thecard_ele.id].name;
    var choise_exp = global_team[thecard_ele.id].text;
    //image挿入
    //var queryid = "#" + thecard_ele.id; 
    //メンバー画像
    var insert_images = array_cara(choise_team);
    //var images_area = document.querySelector('#choiced_wrapper');
    //console.log(insert_images);
    $("#detail_team_div").find("#detail_team_imgcont").css('background-image', insert_images);
    //ここでtextContentいれる
    $("#detail_team_div").find("#detail_team_name").text(choise_name);
    $("#detail_team_div").find("#detail_team_exp").text(choise_exp);


    //inputタグのイベント設定
    //フォーカスで表示
    //入力でactivateする感じに変更する
    var $team_comment_inp = $('#team_comment_inp');
    $team_comment_inp.focus(function() {
        //ログインしてなかったらログイン誘導する
        if(firebase.auth().currentUser){
            //ログインしてるのでボタンを表示
            document.getElementById("team_comment_btn").style.display = 'inline-block';
        }else{
            //ログインしてないのでログインのダイアログを表示する
            login_card_display();
        }
    });
    //focus切れて、ボタンがないなら非表示にする
    $team_comment_inp.blur(function() {
        //入力があったらボタン表示なしなら非表示
        if(!$team_comment_inp.val()){
            //ボタン削除
            document.getElementById("team_comment_btn").style.display = 'none';
            //console.log("ボタン消滅");
        }
    });
    //inputイベントの作成
    $team_comment_inp.on('input', function(event) {
        //console.log($team_comment_inp.val());
        //入力があったらボタン有効化そうでないなら無効化
        if($team_comment_inp.val()){
            //ボタン有効化
            document.getElementById("team_comment_btn").disabled = false;
            //console.log("ボタン有効化");
        }else{
            //ボタン無効化
            document.getElementById("team_comment_btn").disabled = true;
            //console.log("ボタン無効化");
        }
    });


    //コメントの取得と挿入を行う非同期関数かな？
    


    //関連チームの取得と挿入を行う


}

/* 入力した内容は取り消されるdialogを出す */
var comment_alert_dialog = new mdc.dialog.MDCDialog(document.querySelector('#comment_alert_dialog'));
function detail_team_back(){
    //inputタグの取得
    var $team_comment_inp = $('#team_comment_inp');
    //コメント入力の有無で処理を分岐する
    if($team_comment_inp.val()){
        //入力があったので削除していいかの確認処理を行う
        comment_alert_dialog.open();
    }else{
        //入力が特にないのでそのまま整頓処理を続行
        //表示を消します
        document.getElementById("detail_team_div").style.display = "none";
        //focus blur on イベントの削除（重複を避けるため）
        $team_comment_inp.off('focus');
        $team_comment_inp.off('blur');
        $team_comment_inp.off('input');
        //ボタン削除
        document.getElementById("team_comment_btn").style.display = 'none';
        //ボタン無効化
        document.getElementById("team_comment_btn").disabled = true;
        //global_team_activeの無効化
        global_team_active='';
    }
}

function detail_team_back_withcom(){
    //inputタグの取得
    var $team_comment_inp = $('#team_comment_inp');
    //表示を消します
    document.getElementById("detail_team_div").style.display = "none";
    //focus blur on イベントの削除（重複を避けるため）
    $team_comment_inp.off('focus');
    $team_comment_inp.off('blur');
    $team_comment_inp.off('input');
    //ボタン削除
    document.getElementById("team_comment_btn").style.display = 'none';
    //ボタン無効化
    document.getElementById("team_comment_btn").disabled = true;
    //入力値を空欄にする
    document.getElementById('team_comment_inp').value = '';
    //global_team_activeの無効化
    global_team_active='';
    //画像とかのチーム情報もリセットする

}
