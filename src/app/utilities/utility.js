
var utility = {
	getJSON(url, obj){
		//var url = document.domain+url;
		console.log("URL = "+url);
		fetch(url)
			.then(function(response){
				if (response.status !== 200) {  
			      	console.log('Error loading JSON Code: ' + response.status);  
			    	return;  
			    }
				response.json().then(function(data) {  
			    	obj.callback(data);  
			    });
			})
			.catch(function (error) {
		    console.error("Request error :"+error.message);
		});
	},

	getPublicPath(){
	}

}

module.exports = utility;