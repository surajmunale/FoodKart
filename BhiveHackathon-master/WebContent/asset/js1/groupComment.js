//for new wall post
$(window).load(
		
		function() {
			//alert("inside comment");
			//$(".text1").emoticonize();
			//$(".group_comments_div").emoticonize();
			$(".group_comments_div").on("keypress",".group_comment_form",function(e) {

				if (e.which == 13) {
					alert("in");
					var f = $(this).parents(".group_comments_div");
					var x = f.find('#comment_group_wp_text');
					var y = f.find('#comment_group_wp_id');
					var z = f.find("#group_comments_collection");
					//var com_id = f.find("#single_comm_id")
					//alert(com_id.val())
					$.ajax({
						type : 'POST',
						
						url : 'commentGroupWallPost.action?wallPostId='+$(y).val()+ "&commentText="+ $(x).val(),/*+ "&comment_id="+ $(com_id).val()*/
						success : function(data) {
	
							var temp = '<div id="groupcomment" class="eachComment">'
								+'<input type="hidden" value="'+data.comment_id
								+'" id="single_comm_id" />'
								+'<img src="'+data.profilePicture+'" width="32px" height="32px" align="left" />'
								+ '<a href="loadProfilePage?profileId='+data.profileId+'" id="group_full_name_comment">&nbsp;&nbsp;'
								+ data.fullName + " : " + " "
								+ '</a>&nbsp;'
								+ '<font size="2.5"><input id="groupcomment" readonly type="text" style="width: 451px;" value= "'
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
							$(".group_comments_div").emoticonize();
						}

					});
				}
			});

			$(".eachComment").on("click", "#editComment", function(event) {
				debugger;
				var element = $(this).parents(".eachComment");
				var prev=element.find('#groupcomment');
				prev.removeAttr("readonly");
				prev.focus();
			});
			$("#group_wallposts_collection").on("click","#delete_comment",function(e){
				debugger;
				var parent = $(this).parents("#groupcomment");
				var comment_id = parent.find("#single_comm_id");
				//alert(comment_id.val())
				$.ajax({
					url: 'GroupdeleteComment.action?comment_id='+$(comment_id).val(),
					type: 'POST',
					success: function(data){
						$(parent).fadeOut(1000);
					}
				
				});
			
				e.preventDefault();

			});

			//On enter, updates new comment
			$(".eachComment").on("keydown", "#groupcomment", function(event) {
				
				debugger;
				var keypressed = event.keyCode || event.which;
			    if (keypressed == 13) {
			    
				var element = $(this).parents(".eachComment");
				var commentText=element.find('#groupcomment');
				var commentId=element.find("#single_comm_id");
				//alert("New comment is "+ commentText.val()+"with id "+commentId.val());
				//prev.removeAttr("readonly");
				//alert((commentId).val())
				$.ajax({
					
		 				type : 'POST',
		 				url : 'editGroupComment.action?comment_id='+$(commentId).val()+'&&commentText='+$(commentText).val(),
		 				success : function(data) {
		 					alert()
		 					//Load likes
		 					//element.find('#comment').addAttr("readonly");
		 					$(commentText).attr('readonly','true');;
		 					}
		 			});
				
			    }});

			
		});