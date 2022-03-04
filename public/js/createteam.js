function open_dialog_fab(){
    document.getElementById("create_team_div").style.display = "flex";
}

function open_dialog_fab_back(){
    document.getElementById("create_team_div").style.display = "none";
}

function choice_diakog(){
    //console.log("choice_membar_dialog");
    //choice_membar_dialog.open();
    document.getElementById("choice_membar_dialog").style.display = "block";
}
function choice_diakog_back(){
    //console.log("choice_membar_dialog");
    //choice_membar_dialog.open();
    document.getElementById("choice_membar_dialog").style.display = "none";
}

/*
var choice_membar_dialog = new mdc.dialog.MDCDialog(document.querySelector('#choice_membar_dialog'));
*/

function membar_tap(cara_element){
    //選択したキャラのdivに番号のdivを重ねる形でいいと思う
    // 要素の位置座標を取得
    var clientRect = cara_element.getBoundingClientRect() ;
    // 画面の左端から、要素の左端までの距離
    var x = clientRect.left ;
    // 画面の上端から、要素の上端までの距離
    var y = clientRect.top ;
    //paddingの分
    var result_y = y - 48;
    var client_w = cara_element.clientWidth;
    var client_h = cara_element.clientHeight;
    //「300px 250px」とコンソールに表示されます
    console.log(client_w + 'px ' + client_h + 'px');
    console.log(x,y);
    //oneを取得
    var one = document.getElementById("choise_one");
    one.style.left = x+"px";
    one.style.top = result_y+"px";
    one.style.width = client_w+"px";
    one.style.height = client_h+"px";
    one.style.display = "block";
}

function membar_tap_back(){
    console.log()
    //oneを取得
    document.getElementById("choise_one").style.display = "none";
}

//oneの位置調整を確実にできるようにする
//裏のinput若しくはリストを用いてキャラの番号の着脱管理を行う