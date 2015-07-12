<%@page import="javax.mail.Session"%>
<%@page import="java.io.IOException"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="vani.GetConnection"%>
<%@page import="java.sql.Connection"%>
<%@page import="vani.hotelModel"%>
<%@page import="javax.servlet.http.*" %>
<%@page import="javax.servlet.*" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
<title>Hotel List</title>

	<link href="asset/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="asset/css/business-casual.css" rel="stylesheet">

    <!-- Fonts -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">

<!-- Our Css -->
<link href="/BhiveHackathone/asset/css1/jquery.cssemoticons.css" media="screen"
	rel="stylesheet" type="text/css" />
<script src="/BhiveHackathone/asset/js1/jquery.cssemoticons.js"
	type="text/javascript"></script>

<script type="text/javascript">
	function func() {
		window.location = "showCart";
	}
	<%-- 
	function getQuantity(){
		var val = document.getElementById("quantityId").value;
		document.getElementById("quantityId").value = val;
		document.getElementsByName("quantId").value = val;
		alert(val);
		alert(document.getElementsByName("quantId").value);
	}
	
	function quantJhand() {
		var val = document.getElementById("quantityId").value;
		document.getElementById("quantId").value = val ;
		'<% session.setAttribute("quantVal",'+ val +'); %>' ;
	} --%>
</script>

</head>
<body>

	<div class="brand">Food Kart</div> 
<!--     <div class="address-bar">26/C, Electronics City, Hosur Road, Electronic City</div>
    <div class="address-bar"> Bengaluru, 080 4140 7777</div>
 -->
 	<!-- Navigation -->
    <nav class="navbar navbar-default" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <!-- navbar-brand is hidden on larger screens, but visible when the menu is collapsed -->
                <a class="navbar-brand" href="index.html">Food Kart</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="index.html">Home</a>
                    </li>
                    <li>
                        <a href="vegListPopulate">Menu</a>
                    </li>
                    <li>
                        <a href="about.html">About</a>
                    </li>
                    <li>
                        <a href="contact.html">Contact&Review</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
 
 
 <div class="container">
	<div class="row">
            <div class="box">
                <div class="col-lg-12  ">

	<div class = "hotelContainer">
	
	<table class="table table-hover table-striped" bgcolor="#FFFFFF">
			<!-- <button type="button" class = "btn btn-primary" onclick="func()" style="float:right">Back to Dish List</button> -->
			<button type="button" class = "btn btn-primary" onclick="func()"  style="margin-right: 10px; float: right;">Your Cart</button>
			
		<thead>
			<tr>
        		<th>S No.</th>
        		<th>Hotel Name</th>
        		<th>Price</th>
        		<th>Rating</th>
      		</tr>
		</thead>
		<tbody>
			<s:iterator value="hotelList">
			<tr>
				<td><s:property value="sno"/></td>
				<td><s:property value="name"/></td>
				<td><s:property value="price"/></td>
				<td><s:property value="rating"/></td>
				
				<s:url action = "addInCart" var="AdditionInCart">
					<s:param name = "hid">
						<s:property value="hid"/>
					</s:param>
					<s:param name="vegId">
						<s:property value="vegId"/>			
					</s:param>
				</s:url>
				<td><s:a href="%{AdditionInCart}">Add</s:a></td>
				</s:iterator>
		</tbody>
	</table>
				<%-- <s:property value="address"/> --%>
				
			<%-- 
			<input name = "quantId" id = "quantId" type = "hidden"></input>
			--%>
			
			 
			<%-- <input type="hidden" value='<s:property value="hid"/>' id="hotel_id" />
			<input type="hidden" value='<s:property value="vegId"/>' id="veg_id" />
			<br/> --%>
		
	</div>
	</div>
	</div>
	</div>
	</div>
	<footer>
        <div class="container">
            <div>
                <div class="col-lg-12 text-center">
                    <p>Copyright &copy; Lunatics Team 2015</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- jQuery -->
    <script src="asset/js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="asset/js/bootstrap.min.js"></script>

    <!-- Script to Activate the Carousel -->
    <script>
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    })
    </script>

</body>

</html>