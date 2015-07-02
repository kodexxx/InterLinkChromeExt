var ip = localStorage.getItem("ip"),
	auth_user = localStorage.getItem("username"),
	auth_password = localStorage.getItem("password");


console.log("I ready!");
chrome.browserAction.setBadgeText({ text: "-|-" });
function get_info() {
	var result_dep;
	$.ajax({
		url: "http://" + ip + "/index.cgi",
		type: "POST",
		data: ({DOMAIN_ID: "", REFERRER: "http://" + ip + "/", user: auth_user, passwd: auth_password}),
		dataType: "html",
		success: function(msg, status, xhr){
			var fd = $(".form > tbody > tr:eq(2) > td:eq(1)", msg);
			result_dep = fd.html().split('&nbsp;')[0];

			var date = $("#statusbar > td:eq(2)", msg).html().split(' ')[1].split('-');
			var dayCount = new Date(date[0], date[1], 0).getDate();
			var days = result_dep / (100 / dayCount);

			chrome.browserAction.setBadgeText({ text: Math.floor(days).toString() });
			console.log(xhr.getAllResponseHeaders());
		},
		error: function(msg){
			console.error("Auth error! (");
		}
	});
}
function ss() {
	$.ajax({
		url: "http://" + ip + "/index.cgi",
		type: "POST",
		data: ({DOMAIN_ID: "", REFERRER: "http://" + ip + "/", user: auth_user, passwd: auth_password}),
		dataType: "html",
		success: function(msg, status, xhr){
			var sidA = $(".inner_menu-item:eq(0) > a", msg).attr('href').split('=')[2];
			$.ajax({
				url: "http://" + ip + "/index.cgi?index=44&sid=" + sidA,
				type: "GET",
				dataType: "html",
				success: function(msg, status, xhr){
					console.log(msg);
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

get_info();

setInterval(function() {get_info();}, 900000);
