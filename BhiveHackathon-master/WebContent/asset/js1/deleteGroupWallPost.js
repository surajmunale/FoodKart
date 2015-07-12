/**
 * 
 */
$(document).ready(function(){
	$("#group_wallposts_collection").on("click","#delete_Grouppost",function(e){
		debugger;
		var parent = $(this).parents(".single_groupwallpost");
		var wallPostId = parent.find("#like_wp_groupid");
		
		$.ajax({
			url: '/Facebook_Ours/deleteGroupWallPost?wallPostId='+$(wallPostId).val(),
			type: 'POST',
			success: function(data){
				$(parent).fadeOut(1000);
			}
		});
		e.preventDefault();

	});
});