var global_user;

function login_card_display(){
    //ログインのためのカードを出してくる
    document.getElementById("login_card_div").style.display = "block";
}
function login_card_display_back(){
    //ログインのためのカードを消す
    document.getElementById("login_card_div").style.display = "none";
}

function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iPad|iPhone|iPod/.test(userAgent);
}

function google_click(){
    var provider = new firebase.auth.GoogleAuthProvider();
    //firebase.auth().signInWithRedirect(provider);
    if (isMobile()) {
        // モバイルデバイスの場合
        firebase.auth().signInWithRedirect(provider);
    } else {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            console.log(user);
            //ログインが成功したという処理
            signedin_collect(user);
            login_card_display_back();
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
}

//ログアウト
function log_out(){
    firebase.auth().signOut().then(()=>{
        //console.log("ログアウトしました");
        location.reload();
    })
    .catch( (error)=>{
        console.log(`ログアウト時にエラーが発生しました (${error})`);
    });
}

$(document).ready(function(){
    //chart js のグラフが表示されない問題の解決のための検証
    firebase.auth().getRedirectResult().then((result) => {
        //ログインの有無にかかわらずチームは取ってきて挿入するイメージ（後に分岐の可能性はある）
        get_teams();
        
        // The signed-in user info.
        global_user = result.user;
        if(result.user){
            // User is signed in.
            console.log("User is signed in");
            signedin_collect(result.user);
        }else{
            //ログインしてないときはこっちの処理でログインしてるかどうかを試みる
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    console.log("User is signed in");
                    signedin_collect(user);
                } else {
                    // No user is signed in.
                    console.log("No user is signed in");
                    //ログイン用のfabを表示する
                    document.getElementById("to_login_fab").style.display = "flex";
                }
            });
        }
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
    });
});


//ログインが成功したという処理
function signedin_collect(userinfo){
    //document.getElementById("non_user").style.display = "none";
    //document.getElementById("yes_user").style.display = "block";
    signed_intab(userinfo);
    //ログインカード内のボタンを表示する
    document.getElementById("logout_button").style.display = "inline-block";
    //投稿用のfabを表示する
    document.getElementById("open_dialog_fab").style.display = "flex";
    //ログイン用のfabを非表示する
    document.getElementById("to_login_fab").style.display = "none";
}

//tabの見た目を変える
function signed_intab(userinfo){
    document.getElementById("usericon").src = userinfo.photoURL;
    document.getElementById("login_icon").style.display = "block";
    document.getElementById("login_button").style.display = "none";
}

