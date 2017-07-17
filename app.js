$(document).ready(function(){
	$('#postIt').on('click',function(){
		var pos = getLocation();
	});
});
function getLocation() {
    if (navigator.geolocation) {
        var position = navigator.geolocation.getCurrentPosition(geoSucess);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
    return position;
}

function geoSucess(position){
	console.log(position);
	var name = $('#locName').val();
	var data = {"location":name,"long":position.coords.longitude,"lat":position.coords.latitude};
	$.ajax({
			type:"POST",
			url:"/locations",
			data:JSON.stringify(data),
			contentType: 'application/json',
			success:function(data){
				alert(data);
			}
	});
}
