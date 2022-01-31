var global_user;

function login_card_display(){
    //ログインのためのカードを出してくる
    document.getElementById("login_card_div").style.display = "block";
}
function login_card_display_back(){
    //ログインのためのカードを消す
    document.getElementById("login_card_div").style.display = "none";
}


//google
function google_click(){
    //ログインの動き
    //console.log("google ログインします");
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithRedirect(provider).then(user =>{
            // Get the user's ID token as it is needed to exchange for a session cookie.
            return user.getIdToken();/*.then(idToken => {
                // Session login endpoint is queried and the session cookie is set.
                // CSRF protection should be taken into account.
                // ...
                const csrfToken = getCookie('csrfToken')
                return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
            });*/
        });
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
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
    firebase.auth().getRedirectResult().then(function(result) {
        //console.log(result);
        if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
        //console.log(token);
        }
        // The signed-in user info.
        global_user = result.user;
        //console.log(global_user);
        //console.log(result.user);
        if(global_user != null){
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
    console.log("ログイン成功", userinfo);
}

