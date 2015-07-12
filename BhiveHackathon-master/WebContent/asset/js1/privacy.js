function updatePrivacy(privacy,wallPostId){
	//alert(wallPostId)
	//var settingID = 
	$.ajax({
		url: 'updateWallPrivacy?privacy='+privacy+'&wallpostId='+wallPostId,
		type: 'POST',
		success: function(data){
			document.getElementById(wallPostId).innerHTML = privacy;
		}
	});
}

function getReport(){
	alert("Q1");
	/*$.ajax({
		url: 'generateReport',
		type: 'POST',
		success: function(data){
			//document.getElementById(wallPostId).innerHTML = privacy;
		}
	});
	*/
	
}