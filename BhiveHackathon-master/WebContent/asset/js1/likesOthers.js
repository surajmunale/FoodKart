$(document).ready(function(){
	$("#wallposts_collection").on("click",".likes_others", function(e){
		debugger;
		
		/* 	var parent = $(this).parents("#wallposts_collection");
			var likesListDiv = parent.find("#likes_list_others"); */
		var parent1 = $(this).parents(".single_wallpost");
		var hiddenBox = parent1.find("#like_wp_id");
		var url = 'loadLikes.action?wallPostId='+$(hiddenBox).val();
		$("#likes_list_others").html("");
		$("#loader_likes").show();
		$("#loader_likes").delay(1000).hide(1);

		$.ajax({
			
			type : 'POST',
			url : url,
			success: function(data){
				var temp = "";


				$.each(data.likesList, function(index, value){
				
					temp += '<a href="/Facebook/module02/loadProfileAction?profileId='+value.profileId+'"><img src="'+value.profilePic+'" height="50px" width="50px" style="float:left;position:relative;"></a>';
					temp += '&nbsp;&nbsp;<a href="/Facebook/module02/loadProfilePage?profileId='+value.profileId+'"><p style="font-weight:bold; width:50%;float:left;position:relative;">&nbsp;&nbsp;'+value.fullName+'</p></a>';
					temp += "<br><br><hr>";

				});

				$("#likes_list_others").html(temp);

			}
		});



	});
});