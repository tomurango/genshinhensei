function detail_team(thecard_ele){
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
    //txt挿入
}

function detail_team_back(){
    document.getElementById("detail_team_div").style.display = "none";
}
