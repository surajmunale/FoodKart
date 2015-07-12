

$(document).ready(
 function invite()
	{

		$.ajax({

			type : 'POST',
			url : 'loadFriendstoInvite',
			success : function(data) {
				
				 var i = 1;
				temp='';
				$
						.each(
								data.friendlist,
								function(
										index,
										value) {
									 {
										temp += '<input id="selectFriend" type="checkbox" value="'+value.profile_id+'" style="position:relative;float:left;"/>&nbsp;<img src="'+value.profile_pic+'" height="20px" width="20px" style="position:relative;float:left;"/><h5 style="position:relative;float:left;">'
												+ value.fname
												+ ' '
												+ value.lname
												+ '</h5><br/><br/>';
										i++;
									} /* else {
										temp += '<input id="selectFriend" type="checkbox" value="'+value.profile_id+'" style="position:relative;float:left;"/>&nbsp;<img src="'+value.profile_pic+'" height="20px" width="20px" style="position:relative;float:left;"/><h5 style="position:relative;float:left;">'
												+ value.fname
												+ ' '
												+ value.lname
												+ '</h5><br/>';
										i++;

									} */
								
								});

				temp += '';
				 $("#invitemodal").find('.modal-body').css({
		              width:'1500px', //probably not needed
		              height:'100%', //probably not needed  
		             
		       });
				$(
						"#invitemodal-body")
						.html(temp);
				 $("#invitemodal").modal("show"); 
				
				
			},
			 error: function (xhr, ajaxOptions, thrownError) {
			        alert(xhr.status);
			        alert(thrownError);
			      }
		
				
				

			
		});
	});	

 function show() {  $("#mymodal").modal("show");  }
$(document).ready(
 function saveInvited() {
		var idString = "";
		var count = 0;

		$('#selectFriend:checked').each(function() {
			if (count != 0) {
				idString += "," + $(this).val();

			} else
				idString += $(this).val();

			count++;
		});
		count += " Friends Invited";

		// $("#inviteBtn").hide();
		$("#invitedCount").append(count);
		$("#hiddenField").val(idString);
		$("#invitemodal").hide();
		$("#inviteBtn").hide(); 

	});
