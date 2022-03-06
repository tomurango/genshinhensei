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
var choice_membar_list = [];
function membar_tap(cara_element){
    //4キャラ選ばれてたらreturn
    if(choice_membar_list.length == 4){
        return 
    }
    //リストにキャラを追加
    choice_membar_list.push(cara_element.id);
    //console.log(choice_membar_list);
    var num = choice_membar_list.length - 1;
    num_box_dis(cara_element.id, num);
}

function membar_tap_back(del_num){
    choice_membar_list.splice(del_num, 1);
    //console.log(choice_membar_list);
    //除外したものを削除する
    if(del_num == 0){
        //oneを削除
        document.getElementById("choise_one").style.display = "none";
        document.getElementById("choise_two").style.display = "none";
        document.getElementById("choise_three").style.display = "none";
        document.getElementById("choise_four").style.display = "none";
    }else if(del_num == 1){
        //twoを削除
        document.getElementById("choise_two").style.display = "none";
        document.getElementById("choise_three").style.display = "none";
        document.getElementById("choise_four").style.display = "none";
    }else if(del_num == 2){
        //threeを削除
        document.getElementById("choise_three").style.display = "none";
        document.getElementById("choise_four").style.display = "none";
    }else{
        //fourを削除
        document.getElementById("choise_four").style.display = "none";
    }
    //numboxの再配置を行う
    var repeat = choice_membar_list.length
    for (let i = 0; i < repeat; i++) {
        num_box_dis(choice_membar_list[i], i);
    }
}

//指定したキャラのidと番号でboxの配置を行う
function num_box_dis(mem_id, num){
    //console.log("num_box_dis", mem_id, num)
    var cara_element =document.getElementById(mem_id);
    var query_id = "#" + mem_id;
    var $e = $(query_id);
    var clientRect = cara_element.getBoundingClientRect() ;
    // ページの左端から、要素の左端までの距離
    var x = window.pageXOffset + clientRect.left ;
    // 親要素の左上を (0,0) とした相対座標
    var y = $e.position().top//padding 分の引き算
    // 幅と高さ
    var client_w = cara_element.clientWidth;
    var client_h = cara_element.clientHeight;
    //numboxを指定する
    if(num == 0){
        //oneを取得
        var num_box = document.getElementById("choise_one");
    }else if(num == 1){
        //twoを取得
        var num_box = document.getElementById("choise_two");
    }else if(num == 2){
        //threeを取得
        var num_box = document.getElementById("choise_three");
    }else{
        //fourを取得
        var num_box = document.getElementById("choise_four");
    }
    num_box.style.left = x+"px";
    num_box.style.top = y+"px";
    num_box.style.width = client_w+"px";
    num_box.style.height = client_h+"px";
    num_box.style.display = "block";
}