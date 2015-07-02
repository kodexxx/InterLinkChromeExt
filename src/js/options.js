$(document).ready(function(){
	var fieldsList = ["ip", "username", "password"];
	fieldsList.forEach(function(item, i, fieldsList) {
		$("#" + item).val(localStorage.getItem(item));
	});
	$("#save").click(function(){
		fieldsList.forEach(function(item, i, fieldsList) {
			localStorage.setItem(item, $("#" + item).val());
		});
		$(".alert").fadeIn(100);
		setTimeout(function(){
			$(".alert").fadeOut(100);
		}, 1000);
		chrome.extension.getBackgroundPage().window.location.reload();
	});
});