var global_team = {};
//とりあえずログイン時にチームを取得して、挿入する流れにする
var get_flag = true;
//ダンジョンの探索を押したときにdungeonのデータを取ってきてそうにゅうする流れを執り行う関数
function get_teams(){
    if(get_flag){
        firebase.firestore().collection("teams").limit(10).get().then(function(teams){
            get_flag = false;
            //loop
            global_team = teams;
            console.log("team 数", teams.size);
            teams.forEach(function(team){
                //teamごとに挿入していく処理
                console.log(team.data(), team.id);
                //global変数に代入
                global_team[team.id] = team.data();
                //cardエリアに表示
                insert_ateam(team.data(), team.id);
            });
        }).catch(function(error){
            console.log("error", error);
        });
    }else{
        //console.log()
        return 
    }
}

function insert_ateam(team_data, team_id){
    var card_container = document.getElementById("card_container");

    //var task_div ='<div id="' + task_id + '" style="width: 100%; display: flex" onclick="task_onclick(this)"><div style="padding: 8px; width: 64px; box-sizing: border-box;"><button class="mdc-icon-button material-icons" onclick="window.event.cancelBubble = true;task_check_back(this)">check</button></div><div style="width: calc(100% - 54px)"><p class="todo_first" style="margin:18px 10% 0px 0px"></p><p class="todo_second" style="margin:0px 10% 0px 0px; font-size:0.8em; color:#666666"></p>'+ third_div +'</div></div>';
    var team_div = '<div id="' + team_id + '" class="mdc-card team_card" onclick="detail_team(this)"><div class="mdc-card__media mdc-card__media--16-9 team_image"></div><div class="mdc-card__content team_info_container"><p class="team_name_oncard"></p><p class="team_exp_oncard"></p></div></div>';

    //var tasks_container = document.getElementById("to_do_items_finished");
    var team_promise = new Promise(function(resolve, reject){
        card_container.insertAdjacentHTML("afterbegin", team_div);
        resolve();
    }).then(function(){
        var queryid = "#" + team_id; 
        //メンバー画像
        var insert_images = array_cara(team_data.list);
        //var images_area = document.querySelector('#choiced_wrapper');
        //console.log(insert_images);
        $(queryid).find(".team_image").css('background-image', insert_images);
        //ここでtextContentいれる
        $(queryid).find(".team_name_oncard").text(team_data.name);
        $(queryid).find(".team_exp_oncard").text(team_data.text);
    });
    return team_promise;
}