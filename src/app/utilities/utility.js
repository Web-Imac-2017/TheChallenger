
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

	/*JsonToMap(json){
		var output = {};
		for(var i=0; i<list.length; i++)
		{
		    for(var key in list[i])
		    {
		        if(list[i].hasOwnProperty(key))
		        {
		            if(typeof output[key] == 'undefined')
		            {
		                output[key] = [];
		            }
		            output[key].push(list[i][key]);
		        }
		    }
		}
	}*/

}

module.exports = utility;