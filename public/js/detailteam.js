//チームにコメントするためのglobal変数
var global_team_active;

//detailを開くための関数
function detail_team(thecard_ele){
    //IDに関してotherから来た時にも対応する
    // 自動生成のdocIdは英数字だって https://t28.dev/auto-id-of-cloud-firestore/
    // '_'が含まれるかどうか確認。
    if (thecard_ele.id.indexOf('_') !== -1) {
        // alert('含まれています。');
        //activeteamの定義
        global_team_active = thecard_ele.id.split('_')[0];
    }else{
        //activeteamの定義
        global_team_active = thecard_ele.id;
    }

    //dialog表示
    document.getElementById("detail_team_div").style.display = "block";
    //console.log(thecard_ele.id, global_team[thecard_ele.id]);
    var choise_team = global_team[global_team_active].list;
    var choise_name = global_team[global_team_active].name;
    var choise_exp = global_team[global_team_active].text;
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
    //関連をからにする
    document.getElementById('team_others_container').innerHTML = '';
    //dialog表示
    document.getElementById("detail_team_div").style.display = "block";

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


    // console.log('関連チームを取ってくる　後に表示する');
    var have_global = getTeamIdsfromGlobal();
    var result = [];
    // 関連チーム最新を2件取ってくる
    // 不等号の絞り込みとorderbyの並べ替えは別の情報に対して行えないのでとりあえずorderbyを消すことにした .orderBy("time", "desc")
    // https://zenn.dev/kasaji/articles/firestore-limitations
    firebase.firestore().collection("teams").where(firebase.firestore.FieldPath.documentId(), 'not-in', have_global).limit(2).get().then(function(teams){
        //teamごとに挿入していく処理
        teams.forEach(function(team){
            //global変数に代入
            global_team[team.id] = team.data();
            // コメント用の配列を作成
            global_team[team.id]['commentList'] = [];
            //result配列に入れる
            result.push(team.id);
        });
        //取得した結果をもとにその他チーム情報を表示する
        OtherTeamsRoop(result);
        /*
        // 第一段階で取得した情報も含めてフィルタリング
        var have_global = getTeamIdsfromGlobal();
        //メンバーをひとり以上含む最新2件を取ってくる
        firebase.firestore().collection("teams").where(firebase.firestore.FieldPath.documentId(), 'not-in', have_global).where("list", 'array-contains-any', global_team[thecard_ele.id]).limit(2).get().then(function(teams){
            //teamごとに挿入していく処理
            teams.forEach(function(team){
                //global変数に代入
                global_team[team.id] = team.data();
                //result配列に入れる
                result.push(team.id);
            });
            //取得した結果をもとにその他チーム情報を表示する
            displayOtherTeams(result);
        });
        */
    }).catch(function(error){
        console.log('error', error);
    });

    // すでに持ってるコメントの確認
    var arr = global_team[global_team_active]['commetList'];
    var alredy_comment_list = function(arr) {
        if (!arr) return [];
    
        var keys = [];
        for (var key in arr) keys.push(key);
    
        return keys;
    };
    //コメントの取得と挿入を行う非同期関数 最新から5件 まだ取得してないコメント限定
    try{
        firebase.firestore().collection("teams").doc(global_team_active).collection('comments').where(firebase.firestore.FieldPath.documentId(), 'not-in', []).limit(5).get().then(function(comments){
            console.log(comments);
            //commentごとに挿入していく処理
            comments.forEach(function(comment){
                //commentを挿入していく
                global_team[global_team_active]['commentList'][comment.id] = comment.data();
                insert_comment(team_id, comment_id);
            });
        }).catch(function(error){
            console.log('error', error);
        });
    }catch(error){
        // 1回目はnon empty arrayのエラーになるので
        firebase.firestore().collection("teams").doc(global_team_active).collection('comments').limit(5).get().then(function(comments){
            console.log(comments);
            //commentごとに挿入していく処理
            comments.forEach(function(comment){
                //commentを挿入していく
                global_team[global_team_active]['commentList'][comment.id] = comment.data();
                insert_comment(team_id, comment_id);
            });
        }).catch(function(error){
            console.log(error, 'error');
        });
    }
}

function getTeamIdsfromGlobal(){
    result = [];
    // global_team
    for (let key in global_team) {
        // alert('key:' + key + ' value:' + global_team[key]);
        result.push(key);
    }
    //console.log(result);
    return result;
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

function OtherTeamsRoop(beforeHandTeams){
    //console.log(beforeHandTeams);
    //ここの表示を書き進める
    var teamsDefaultNum = 4;
    // firstroop
    for (const elem of beforeHandTeams) {
        //console.log(elem);
        teamsDefaultNum --;
        if (teamsDefaultNum<0) {
            break;
        }
        insertOtherTeam(elem);
    }
    // secondroop
    for (const item in global_team) {
        if (teamsDefaultNum<0) {
            break;
        }
        if (item == global_team_active) {
            continue;
        }else{
            //チームをotherに入れてく
            teamsDefaultNum --;
            insertOtherTeam(item);
        }
        //console.log(item, arr[item]) //キーとバリューを出力
    }

}

function insertOtherTeam(team_id){
    //global_adv_other[id] = data;
    // ここ角
    /*
    var other_team_div = '<div id="+ team_id +" class="other_info">
    <div class="other_thumbnail"></div>
    <div class="other_explain">
      <p class="other_name">ここにチーム名が入りまーす！</p>
      <p class="other_time">７時間前</p>
    </div>
  </div>';
    */
    var other_id = team_id + "_otherteam"; 
    var other_team_div = '<div id="' + other_id + '" class="other_info" onclick="detail_team(this)"><div class="other_thumbnail"></div><div class="other_explain"><p class="other_name"></p><p class="other_time"></p></div></div>';
    var other_team_container = document.getElementById("team_others_container");
    var other_team_promise = new Promise(function(resolve, reject){
        other_team_container.insertAdjacentHTML("afterbegin", other_team_div);
        resolve();
    });
    other_team_promise.then(function(){
        var queryid = "#" + team_id + "_otherteam"; 
        var insert_images = array_cara(global_team[team_id]['list']);
        //console.log();
        var date_text = getDate_diary(global_team[team_id]['time'].toDate());
        //ここでtextContentいれる
        $(queryid).find(".other_name").text(global_team[team_id]['name']);
        //$(queryid).find(".other_username").text(global_team[team_id]['name']);
        $(queryid).find(".other_time").text(date_text);
        $(queryid).find(".other_thumbnail").css('background-image', insert_images);
        //console.log(insert_images);
        /*
        $(queryid).find(".adv_link").css('color',data.colorCode);
        $(queryid).find(".adv_link").attr("href", data.advUrl);
        */
       /*
        $(queryid).find(".other_thumbnail").css({
            backgroundImage: 'url("'+ '' +'")' // "" で括っていないとIEでは表示されない
        });
        */
    });
}

//dateオブジェクトから日付文字列を返します
function getDate_diary(date) {
    var year  = date.getFullYear();
    var month = date.getMonth() + 1;
    var day   = date.getDate();
    var hour  = date.getHours();
    var minute= date.getMinutes();
    return String(year) + "年" + String(month) + "月" + String(day) + "日" + String(hour) + "時" + String(minute) + "分";
}