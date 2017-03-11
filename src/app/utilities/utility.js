const utility = {
	query(url, callback){
		/*if(url === undefined)
			return;*/
		fetch(url)
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
	},

	getPublicPath(){
		return "./data/";
	}, 

	isConnected(callback){
		this.query("api/user/id/", function(data){
			if(data.code == 0)
				callback(false);
			callback(data.id);
		});
	}
}

module.exports = utility;
