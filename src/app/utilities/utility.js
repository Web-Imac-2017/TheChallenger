let utility = {
	query(url, callback){
		fetch(url)
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
	},

	getPublicPath(){
		return "./data/";
	}
}

module.exports = utility;
