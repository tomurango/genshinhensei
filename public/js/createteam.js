function open_dialog_fab(){
    document.getElementById("create_team_div").style.display = "flex";
}

function open_dialog_fab_back(){
    document.getElementById("create_team_div").style.display = "none";
}

function choice_diakog(){
    //console.log("choice_membar_dialog");
    choice_membar_dialog.open();
}


var choice_membar_dialog = new mdc.dialog.MDCDialog(document.querySelector('#choice_membar_dialog'));
