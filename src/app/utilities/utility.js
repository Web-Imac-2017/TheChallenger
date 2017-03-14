import { browserHistory } from "react-router";
function requete(url, callback) {
	fetch(url, {credentials: "same-origin"})
		.then(function(response){
			if (response.status !== 200) {  
		      	console.log('Error loading JSON Code: ' + response.status);  
		    	return;  
		    }
			response.json().then(function(data) {  
				console.log(url)
				console.log(data)
		    	callback(data);  
		    });
		})
		.catch(function (error) {
	    console.error("Request error :"+error.message);
	});
}

function changePage(page){
	let url = window.location.href;
	let path =  url.split("#")[0];
	const newPath = path + "#"+page;
	console.log("REDIRECTION PATH "+newPath);
	window.history.pushState("", "", newPath);
	location.reload();
}

const utility = {
	query(url, callback){
		requete(url, callback);
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
	}
}

module.exports = utility;
