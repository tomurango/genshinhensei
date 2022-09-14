//const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const TwitterApi = require('twitter');
var keys = require('./key');

admin.initializeApp();

const db = admin.firestore();
const client = new TwitterApi(keys.twitterAccesseToken);

/* eslint-disable */
//only blaze 定期処理 0時0分 に実行します
//exports.scheduledtaskFunction = functions.pubsub.schedule('0 0 * * *').timeZone('Asia/Tokyo').onRun((context) => { .region('asia-northeast1')を書き足した
exports.uncheckTask = functions.region('asia-northeast1').pubsub.schedule('every friday 17:00').timeZone('Asia/Tokyo').onRun((context) => {
    // チームドキュメントから未定義のものを一件取ってくる
    var promise1 = db.collectionGroup('teams').where().orderBy('tweetTimes', 'asc').limit(1).get().then(function (querySnapshot) {
        querySnapshot.forEach(function(doc) {
            tweetPost(doc.data().text);
            doc.ref.update({
                tweetTimes: admin.firestore.FieldValue.increment(1)
            });
        });
        // まずはとりあえず文字をツイートしたい
    }).catch(function(error){
        console.log("Error =>", error);
    });
    // 返り値設定
    return promise1;
});

// 参考 https://codechacha.com/ja/nodejs-twitter-api/
function tweetPost(content) {
    client.post('statuses/update', {status: content}, function(error, tweet, response) {
        if (!error) {
            console.log("tweet success: " + content);
        } else {
            console.log(error);
        }
    });
}

// TODO:自宅のwindowsでkeyの扱いがどうなってるか確認したらコミットとデプロイテストですね
// 20220908文字ツイートができるかの確認ができないからできた前提で画像のツイートのAPIを調べておく

/* ここ見たらいいかもメモ

https://qiita.com/n0bisuke/items/6b269f61152e9f336c35
GiF と画像は一緒にツイートできなそうなので、GIFがある場合とない場合で処理を分岐する感じになる
v2でできないか考えていた気がするけど、v1でできるならその方向で調べて考えていくべきかもしれない

ドキュメントも今のところ良さそうだから
twitterapiv2 を見る感じで良さそう

https://github.com/PLhery/node-twitter-api-v2
https://zenn.dev/kato_shinya/articles/how-to-create-media-tweet-with-twitter-api-v2-dart

*/
// 20220910 うまく動いてないというのがわかった