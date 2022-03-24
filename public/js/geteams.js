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
            });
        }).catch(function(error){
            console.log("error", error);
        });
    }else{
        //console.log()
        return 
    }
}