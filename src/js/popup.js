var ip = localStorage.getItem("ip"),
	auth_user = localStorage.getItem("username"),
	auth_password = localStorage.getItem("password");

$(document).ready(function(){
	setSpeed();
	$(".button-panel").click(function(){
		window.open("http://" + ip,'_blank');
	})
});

function setSpeed() {
	var res_s = "";
	$.ajax({
		url: "http://" + ip + "/index.cgi",
		type: "POST",
		data: ({DOMAIN_ID: "", REFERRER: "http://" + ip + "/", user: auth_user, passwd: auth_password}),
		dataType: "html",
		success: function(msg, status, xhr){
			var sidA = $(".inner_menu-item:eq(0) > a", msg).attr('href').split('=')[2];
			var fd = $(".form > tbody > tr:eq(2) > td:eq(1)", msg);
			$("#uid").html($(".form > tbody > tr:eq(1) > td:eq(1) > i", msg).html().split(")")[0].split(" ")[1]);
			$("#depsit").html(fd.html().split('&nbsp;')[0] + " грн.");
			$.ajax({
				url: "http://" + ip + "/index.cgi?index=44&sid=" + sidA,
				type: "GET",
				dataType: "html",
				success: function(msg, status, xhr){
					var tr_get = $(".cel_border:eq(0) .odd > td:eq(3)", msg).html();
					var tr_send = $(".cel_border:eq(0) .odd > td:eq(4)", msg).html();
					var tr_ip = $(".cel_border:eq(0) .odd > td:eq(0)", msg).html();
					$("#st_get").html(tr_get);
					$("#st_send").html(tr_send);
					$("#ip").html(tr_ip);
					$(".loader").fadeOut("fast");
				},
				error: function(msg){
					console.error("Auth error! (");
				}
			});
		},
		error: function(msg){
			console.error("Auth error! (");
		}
	});
}
