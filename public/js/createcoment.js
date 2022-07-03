var global_team_comment = {};

function comment_to_team(){
    console.log('コメント送信');
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
        //見かけを反映する

        //globalの中身を更新する
        console.log(docRef.id, docRef.data(), comment_doc);
        global_team_comment[docRef.id] = comment_doc;
        //
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

function insert_comment(){

}