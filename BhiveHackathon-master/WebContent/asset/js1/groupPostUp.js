//for new group wall post
$(document).ready(
		function() {
			/*$(".text1").emoticonize();
			$(".comments_div").emoticonize();
			$(".comments_div").on("keypress",	function(e) {
				if (e.which == 13) {
					var f = $(this);
					var x = f.find('#comment_wp_text');
					var y = f.find('#comment_wp_id');
					var z = f.find("#comments_collection");
					$.ajax({
						type : 'POST',
						url : '/Facebook_Ours/module3/commentWallPost.action?wallPostId='+$(y).val()+ "&commentText="+ $(x).val(),
						success : function(data) {
							var temp = '<div id="comment"><img src="'+data.profilePicture+'" width="32px" height="32px" align="left" />'
								+ '<a href="/Facebook/module02/loadProfilePage?profileId='+data.profileId+'" id="full_name_comment">&nbsp;&nbsp;'
								+ data.fullName
								+ '</a>&nbsp;'
								+ '<font size="2.5">'
								+ data.commentText
								+ '</font> <br></div>';
							$(z).append(temp);
							$(x).val("");
							$(".comments_div").emoticonize();
						}

					});
				}
			});*/

			$("#groupPostButton").click(function(event){
				alert("HHHH");
				debugger;
				$.ajax({
					type : 'POST',
					url : '/Facebook_Ours/addGroupWallPost.action?wallPostText='+ $("#newGroupPostText").val()+'&groupId='+$("#post_to_Groupid").val(),
					success : function(data) {
						var temp = "<div class=\"single_groupwallpost\"><div id=\"wallpost_body\">";
						temp += "<a href=\"/Facebook_Ours/loadProfilePage.action?profileId="+data.postFrom+"\" id=\"full_name\"><img height=\"40px\" width=\"40px\" align=\"left\" src="+data.postFromPicture+" /></a>";
						temp += "&nbsp;&nbsp;<a href=\"/Facebook_Ours/loadProfilePage?profileId="+data.postFrom+"\" id=\"full_name\">"
							+ data.postFromName+ "</a> ";
						
						temp += '<br><div style="float: right;margin-right: 2%"><ul type="none"><li class="dropdown"><a href="#" class="dropdown-toggle"';
						temp +=	'data-toggle="dropdown"><img src="/Facebook_Ours/asset/images/caret.png" height="10px" width="10px"></img></a><ul class="dropdown-menu"><li><a href="#" id="delete_Grouppost">Delete</a></li></ul></li></ul></div>';
						temp += "<br> <br> <font size=\"2.7\"><div class=\"text1\">"
							+ data.wallPostText
							+ "</font> <br><br>";
						temp += '<div class="grouplikes_container"><div class="group_like_comment_button" style="padding-bottom: 1%;">'+
						'<input type="hidden" value="'+data.wallPostId+'" id="like_wp_groupid" />';
						temp += '<div class="clickable" id="group_like_link" style="float: left;">Like</div>';
						temp += '<div id="intermediate" style="float: left;">&nbsp;*&nbsp;</div>';
						temp += '<div class="clickable" id="group_comment_link" style="float: left;">Comment</div></div>';
						temp +='<div id="likes" style="position: absolute; float: left; font-size: 12px; padding-top: 4%;">&nbsp;&nbsp;'+
						'<img alt="Like" src="/Facebook_Ours/asset/images/like_icon.png" height="13" width="15" id="group_like_image">';
						temp += ' like this</div></div></div></div><br>';
						temp +='<div class="group_comments_div"><br>';
						temp += '<center><div style="height: 1px; width: 96%; background-color: #e3e3e3; margin-bottom: 5px; margin-top: 5px;"></div></center>';
						temp += '<div id="group_comments_collection"></div><div class="group_comment_form">'
							+ '<s:property value="#session.user.getProfilePic()"/>'
							+ '<img width="32px" height="32px" align="left" src="'+data.postFromPicture+'"  />&nbsp;&nbsp;'
							+ '<input type="hidden" value='+data.wallPostId+' id="comment_group_wp_id"/>'
							+ '<input style="height: 27px;" type="text" name="commentText" id="comment_group_wp_text" placeholder="Write a comment..." size="79" required="true"/></div>';
						temp += '</div>';
						$("#group_wallposts_collection").prepend(temp).children(':first').hide().fadeIn(1000);
						$("#newGroupPostText").val("");
						$(".text1").emoticonize();

					}
				});
			});
		});