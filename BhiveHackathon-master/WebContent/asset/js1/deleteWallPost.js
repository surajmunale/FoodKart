/**
 * 
 */
$(document).ready(function(){
	$("#wallposts_collection").on("click","#delete_post",function(e){
		debugger;
		var parent = $(this).parents(".single_wallpost");
		var likesIdForWallPostId = parent.find(".likes_container");
		var wallPostId = likesIdForWallPostId.find("#like_wp_id");
		
		$.ajax({
			url: '/Facebook_Ours/deleteWallPost?wallPostId='+$(wallPostId).val(),
			type: 'POST',
			success: function(data){
				$(parent).fadeOut(1000);
			}
		});
		e.preventDefault();

	});
});