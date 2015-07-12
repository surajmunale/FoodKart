//for new wall post
$(document).ready(
	
		function() {

			$(".text1").emoticonize();
			$(".comments_div").emoticonize();
			$(".comments_div").on("keypress",".comment_form",function(e) {

				if (e.which == 13) {
					var f = $(this).parents(".comments_div");
					var x = f.find('#comment_wp_text');
					var y = f.find('#comment_wp_id');
					var z = f.find("#comments_collection");
					//var com_id = f.find("#single_comm_id")
					//alert(com_id.val())
					$.ajax({
						type : 'POST',
						url : 'commentWallPost.action?wallPostId='+$(y).val()+ "&commentText="+ $(x).val(),/*+ "&comment_id="+ $(com_id).val()*/
						success : function(data) {
	
							var temp = '<div id="comment" class="eachComment">'
								+'<input type="hidden" value="'+data.comment_id
								+'" id="single_comm_id" />'
								+'<img src="'+data.profilePicture+'" width="32px" height="32px" align="left" />'
								+ '<a href="loadProfilePage?profileId='+data.profileId+'" id="full_name_comment">&nbsp;&nbsp;'
								+ data.fullName + " : " + " "
								+ '</a>&nbsp;'
								+ '<font size="2.5"><input id="comment" readonly type="text" style="width: 451px;" value= "'
								+ data.commentText
								+ '"/></font>'
								+'<div style="float: right; margin-right: 2%">'
								+'<ul type="none">'
								+'<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">'
								+'<img src="/Facebook_Ours/asset/images/caret.png" height="10px" width="10px"></img></a>'
								+'<ul class="dropdown-menu">'
								+'<li><a href="#" id="delete_comment">Delete</a></li>'
								+'<li><a id="editComment">Edit</a></li>'
								+'</ul></li>'
								+'</ul></div>'
								+ '<br></div>';
							$(z).append(temp);
							$(x).val("");
							$(".comments_div").emoticonize();
						}

					});
				}
			});

			$(".eachComment").on("click", "#editComment", function(event) {
				debugger;
				var element = $(this).parents(".eachComment");
				var prev=element.find('#comment');
				prev.removeAttr("readonly");
				prev.focus();
			});
			$("#wallposts_collection").on("click","#delete_comment",function(e){
				debugger;
				var parent = $(this).parents("#comment");
				var comment_id = parent.find("#single_comm_id");
				//alert(comment_id.val())
				$.ajax({
					url: 'home_deleteComment.action?comment_id='+$(comment_id).val(),
					type: 'POST',
					success: function(data){
						$(parent).fadeOut(1000);
					}
				
				});
			
				e.preventDefault();

			});

			//On enter, updates new comment
			$(".eachComment").on("keydown", "#comment", function(event) {
				
				debugger;
				var keypressed = event.keyCode || event.which;
			    if (keypressed == 13) {
			    
				var element = $(this).parents(".eachComment");
				var commentText=element.find('#comment');
				var commentId=element.find("#single_comm_id");
				//alert("New comment is "+ commentText.val()+"with id "+commentId.val());
				//prev.removeAttr("readonly");
				//alert((commentId).val())
				$.ajax({
					
		 				type : 'POST',
		 				url : 'editComment.action?comment_id='+$(commentId).val()+'&&commentText='+$(commentText).val(),
		 				success : function(data) {
		 					alert()
		 					//Load likes
		 					//element.find('#comment').addAttr("readonly");
		 					$(commentText).attr('readonly','true');;
		 					}
		 			});
				
			    }});

			/*$("#newButton").click(function(event){
				debugger;
				$.ajax({
					type : 'POST',
					url : '/Facebook/module06/addWallPost.action?wallPostText='+ $("#newWallPostText").val()+'&postToId='+$("#post_to_id").val(),
					success : function(data) {
						var temp = "<div class=\"single_wallpost\"><div id=\"wallpost_body\">";
						temp += "<a href=\"/Facebook/module02/loadProfilePage?profileId="+data.postFrom+"\" id=\"full_name\"><img height=\"40px\" width=\"40px\" align=\"left\" src="+data.postFromPicture+" /></a>";
						temp += "&nbsp;&nbsp;<a href=\"/Facebook/module02/loadProfilePage?profileId="+data.postFrom+"\" id=\"full_name\">"
							+ data.postFromName+ "</a> ";
						if(data.postFrom != data.postTo){
							temp+="&nbsp;<img src=\"/Facebook/asset/images/right-normal.png\" width=\"5px\" height=\"7px\">&nbsp;<a href=\"/Facebook/module02/loadProfilePage?profileId="+data.postTo+"\" id=\"full_name\">"+data.postToName+"</a>";
						}
						temp += '<br><div style="float: right;margin-right: 2%"><ul type="none"><li class="dropdown"><a href="#" class="dropdown-toggle"';
						temp +=	'data-toggle="dropdown"><img src="/Facebook/asset/images/caret.png" height="10px" width="10px"></img></a><ul class="dropdown-menu"><li><a href="#" id="delete_post">Delete</a></li></ul></li></ul></div>';
						temp += "<br> <br> <font size=\"2.7\"><div class=\"text1\">"
							+ data.wallPostText
							+ "</font> <br><br>";
						temp += '<div class="likes_container"><div class="like_comment_button" style="padding-bottom: 1%;">'+
						'<input type="hidden" value="'+data.wallPostId+'" id="like_wp_id" />';
						temp += '<div class="clickable" id="like_link" style="float: left;">Like</div>';
						temp += '<div id="intermediate" style="float: left;">&nbsp;*&nbsp;</div>';
						temp += '<div class="clickable" id="comment_link" style="float: left;">Comment</div></div>';
						temp +='<div id="likes" style="position: absolute; float: left; font-size: 12px; padding-top: 4%;">&nbsp;&nbsp;'+
						'<img alt="Like" src="/Facebook/asset/images/like_icon.png" height="13" width="15" id="like_image">';
						temp += 'like this</div></div></div></div><br>';
						temp +='<div class="comments_div"><br>';
						temp += '<center><div style="height: 1px; width: 96%; background-color: #e3e3e3; margin-bottom: 5px; margin-top: 5px;"></div></center>';
						temp += '<div id="comments_collection"></div><div class="comment_form">'
							+ '<img src=\'<s:property value="#session.user.getProfilePic()"/>\' width="32px" height="32px" align="left" />&nbsp;&nbsp;'
							+ '<input type="hidden" value='+data.wallPostId+' id="comment_wp_id"/>'
							+ '<input style="height: 27px;" type="text" name="commentText" id="comment_wp_text" placeholder="Write a comment.." size="79" required="true"/></div>';
						temp += '</div>';
						$("#wallposts_collection").prepend(temp).children(':first').hide().fadeIn(1000);
						$("#newWallPostText").val("");
						$(".text1").emoticonize();

					}

				});
			});*/
		});