import { browserHistory } from "react-router";
function requete(url, callback) {
    fetch(url, {credentials: "same-origin"})
        .then(function(response){
            if (response.status !== 200) {
                console.log('Error loading JSON Code: ' + response.status);
                return;
            }
            response.json().then(function(data) {
                callback(data);
            });
        })
        .catch(function (error) {
            console.error("Request error :"+error.message);
        });
}


function requetePostSubmit(url, data, callback) {
    var form = new FormData();
    for(let key in data) {
        if(data.hasOwnProperty(key)) {
            let obj = data[key];
            form.append(key, obj);
        }
    }
    fetch(url, {
        method: 'POST',
        body: form
    })
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Error loading JSON Code: ' + response.status);
                return;
            }
            response.json().then(function(data) {
                console.log(url);
                console.log(data);
                callback(data);
            });
        })
        .catch(function(error) {
            console.error("Request error : " + error.message);
        });
}

function changePage(page){
    let url = window.location.href;
    let path =  url.split("#")[0];
    const newPath = path + "#"+page;
    window.history.pushState("", "", newPath);
    location.reload();
}

const utility = {
    query(url, callback){
        requete(url, callback);
    },

    queryPost(url, data, callback) {
        requetePostSubmit(url, data, callback);
    },

    getPublicPath(){
        return "./data/";
    },

    isConnected(callback){
        requete("api/user/id/", function(data){
            if(data.code == 0){
                changePage("/");
            }
            callback(data.id);
        });
    },
    //definition des types de fichiers
    IMAGE      : "1",
    YOUTUBE    : "2",
    SOUNDCLOUD : "3",
    TEXT       : "4",
    LINK       : "5"
}

module.exports = utility;
