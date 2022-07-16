//var global_team_comment = {};

function comment_to_team(){
    //ボタン無効化
    document.getElementById("team_comment_btn").disabled = true;
    //コメント取得
    var comment = document.getElementById('team_comment_inp').value;
    //登録コメント作成
    var comment_doc = {
        name: firebase.auth().currentUser.displayName,
        time: firebase.firestore.Timestamp.now(),
        uid: firebase.auth().currentUser.uid,
        icon: firebase.auth().currentUser.photoURL,
        comment: comment
    };
    //特にダイアログ等は不要でオケ感じ
    //チーム一つに対してidごとに一つのコメントのみみたいな形で試すと思う
    //db送信、取得、反映、セキュリティを実装したら完成だと思う
    firebase.firestore().collection('teams').doc(global_team_active).collection('comments').add(comment_doc).then(function(docRef){
        //inputの中身を消す
        document.getElementById('team_comment_inp').value = '';
        //ボタン削除
        document.getElementById("team_comment_btn").style.display = 'none';
        //globalの中身を更新する
        //console.log(docRef.id, comment_doc);
        global_team[global_team_active]['commentList'][docRef.id] = comment_doc;
        //見かけを反映する
        insert_comment(global_team_active, docRef.id);
    }).catch(function(error){
        console.log('error',error);
    });
}


//残ってるやることリスト
/*
firestore のセキュリティルール
コメント送信情報の実装
コメント読み込み挿入処理の実装
関連（おすすめ、新規）チーム情報の取得と実装
家らん茎しのぶ歯科のいんの実装選択可にする
*/

function insert_comment(team_id, comment_id){
    // console.log(team_id, comment_id);
    // placeholderを消してcomment_containerを表示する
    document.getElementById('team_comment_placeholder').style.display = 'none';
    document.getElementById('team_comment_container').style.display = 'block';
    // console.log(comment_data);
    var team_comment_id = team_id + "_" + comment_id + "_teamcomment"; 
    var team_comment_div = '<div class="team_comment_div" id="' + team_comment_id + '"><div class="team_comment_top"><img class="team_comment_icon" src="images/nanikaerror.jpg"><p class="team_comment_name"></p><p class="team_comment_time"></p></div><div class="team_comment_main"><p class="team_comment_text"></p></div></div>';
    var team_comment_container = document.getElementById("team_comment_container");
    var team_comment_promise = new Promise(function(resolve, reject){
        team_comment_container.insertAdjacentHTML("afterbegin", team_comment_div);
        resolve();
    });
    team_comment_promise.then(function(){
        var queryid = "#" + team_comment_id; 
        //var insert_images = array_cara(global_team[team_id]['list']);
        //var insert_images = 'url(' + global_team[team_id]['commentList'][comment_id]['icon'] + ');';
        var insert_images = global_team[team_id]['commentList'][comment_id]['icon'];
        //console.log();
        var date_text = getDate_diary(global_team[team_id]['commentList'][comment_id]['time'].toDate());
        //ここでtextContentいれる
        $(queryid).find(".team_comment_name").text(global_team[team_id]['commentList'][comment_id]['name']);
        $(queryid).find(".team_comment_text").text(global_team[team_id]['commentList'][comment_id]['comment']);
        $(queryid).find(".team_comment_time").text(date_text);
        $(queryid).find(".team_comment_icon").attr('src', insert_images);
    });
}