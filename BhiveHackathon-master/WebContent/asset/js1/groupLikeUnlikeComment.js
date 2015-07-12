$(document).ready(function() {
	//alert("like");
	debugger;


	$("#group_comment_link").unbind();
	$("#group_wallposts_collection").on("click","#group_like_link",function(event) {
		
		debugger;
		var element = $(this).parents(".single_groupwallpost");
		var hiddenBox = element.find("#like_wp_groupid");
		var link = element.find("#group_like_link");
		var status = element.find("#group_like_image");


		$.ajax({
			type : 'POST',
			url : 'grouplikePost.action?grpwallPostId='+$(hiddenBox).val(),
			success : function(data) {
				
				$(link).html("Unlike");
				$(link).attr('id','group_unlike_link');
				$(status).after("&nbsp;You, ");
			}
		});

	});

	$("#group_wallposts_collection").on("click","#group_unlike_link",function(event) {
		debugger;
		var element = $(this).parents(".single_groupwallpost");
		var hiddenBox = element.find("#like_wp_groupid");
		var link = element.find("#group_unlike_link");
		var status = element.find("#group_like_image");
		var likesDiv = element.find("#group_likes");
		var str = $(likesDiv).text().replace('You','');
		var img = element.find("#group_like_image");


		$.ajax({
			type : 'POST',
			url : 'groupunlikePost.action?grpwallPostId='+$(hiddenBox).val(),
			success : function(data) {

				$(link).html("Like");
				$(link).attr('id','group_like_link');
				//$(likesDiv).html(str);
				//$(likesDiv).prepend(img);
				//$(likesDiv).prepend("&nbsp;&nbsp;");
			}
		});
		var temp = "";
		alert("inside liek unlike");
		debugger;
		$.ajax({
			type : 'POST',
			url : 'loadGroupLikes.action?grpwallPostId='+$(hiddenBox).val(),
			success: function(data1){
				
				if(data1.likesList.length==0){
					
					temp = " like this";
				}
				$.each(data1.likesList, function(index, value1){
					
					
					if(data1.likesList.length>1){
						temp = ' &nbsp;<a href="#" style="color:#6D84B4; ">'+value1.fullName+'</a>' + '&nbsp; and &nbsp;<a class="group_likes_others" href="#likes_list_others" data-toggle="modal" data-target="#myModal">'+(data1.likesList.length-1)+' &nbsp; others</a> like this';
						
					}
					else{
						temp = temp + ' <a href="#" style="color:#6D84B4; ">'+value1.fullName+'</a>'+" like this";
						
					}
					return false;
				});
				
				
				$(likesDiv).html(temp);
				$(likesDiv).prepend(img);
				$(likesDiv).prepend("&nbsp;&nbsp;");
				

			}
		});

	});
	$(".single_groupwallpost").on("click","#group_comment_link",function(event) {
		debugger;
		var element = $(this).parents(".single_groupwallpost");
		var commentTextBox = element.find("#comment_group_wp_text");
		$(commentTextBox).focus();

	});
	
	
});