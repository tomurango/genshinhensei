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
    //選択したキャラの状態によってメンバーを編成する
    //console.log(cara_element.id);
    //
    //document.getElementById(cara_element.id).style
    //選択したキャラのdivに番号のdivを重ねる形でいいと思う
}