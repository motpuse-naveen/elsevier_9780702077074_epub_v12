function mathmlImg() {
	var ps = document.getElementsByTagName('p');
	var divs = document.getElementsByTagName('div');
	for(var i =0; i < ps.length; i++) {
		var p1 = ps[i];
		if(p1.className === 'hiddenClass') {
			p1.className = 'showClass';	            
		}
	}
		for(var i=0; i < divs.length; i++) {
		var s1 = divs[i];
		if(s1.className === 'showClass') {
				s1.className = 'hiddenClass';            
		}
	}
}

function zoom_image_2nd(img){
    var imgWdt = img.clientWidth;
    var parentWdt = img.parentElement.clientWidth;
    var percWidth = imgWdt/parentWdt*100;
	percWidth = Number(percWidth.toFixed(2));
	if(percWidth>95){
		percWidth = 100;
	}
	var zlevel = img.getAttribute("zlevel")
	var orgperc = img.getAttribute("orgperc")
	var newWidth = getDoubbledWidth(percWidth, orgperc, zlevel)
	if(orgperc==null || orgperc == undefined){
		orgperc = percWidth;
	}
	//document.getElementById("naveenm").innerHTML = "zlevel: " + zlevel + ", orgperc: " + orgperc + ", percWidth: " + percWidth + ", newWidth:" +newWidth;
	if(zlevel == null || zlevel == undefined || zlevel=="0"){
		img.setAttribute("orgperc", percWidth);
		img.style.transition = "width 0.5s ease";
		img.style.width = newWidth + "%";
		img.setAttribute("zlevel", "1");
	}
	else if(zlevel=="1"){
		if(percWidth<100){
			img.style.transition = "width 0.5s ease";
			img.style.width = newWidth + "%";
			img.setAttribute("zlevel", "2");
		}
		else{
			img.style.transition = "width 0.5s ease";
			img.style.width = orgperc + "%";
			img.setAttribute("zlevel", "0");
		}
	}
	else if(zlevel=="2"){
		img.style.transition = "width 0.5s ease";
		img.style.width = orgperc + "%";
		img.setAttribute("zlevel", "0");
	}
}
function zoom_image(img){
    var imgWdt = img.clientWidth;
    var parentWdt = img.parentElement.clientWidth;
    var percWidth = imgWdt/parentWdt*100;
	percWidth = Number(percWidth.toFixed(2));
	var zlevel = img.getAttribute("zlevel")
	var orgperc = img.getAttribute("orgperc")
	var newWidth = getNewWidth(percWidth)
	if(orgperc==null || orgperc == undefined){
		orgperc = percWidth;
	}
	//document.getElementById("naveenm").innerHTML = "zlevel: " + zlevel + ", orgperc: " + orgperc + ", percWidth: " + percWidth + ", newWidth:" +newWidth;
	if(zlevel == null || zlevel == undefined || zlevel=="0"){
		/*imageElms.forEach(element => {
			var orgpercwidth = element.getAttribute("orgperc")
			if(orgpercwidth!=null && orgpercwidth!=undefined){
				element.style.width = orgpercwidth + "%";
			}
		});*/
		img.setAttribute("orgperc", percWidth);
		img.style.transition = "width 0.5s ease";
		img.style.width = newWidth + "%";
		img.setAttribute("zlevel", "1");
	}
	else if(zlevel=="1"){
		img.style.transition = "width 0.5s ease";
		img.style.width = orgperc + "%";
		img.setAttribute("zlevel", "0");
	}
}

function getNewWidth(imgWdt){
	return imgWdt * 2;
}
function getDoubbledWidth(percWidth, oriWdt){
	if(oriWdt == null || oriWdt == undefined){
		oriWdt = percWidth;
	}
	var newWidth = Number((Number(percWidth) + Number(oriWdt)).toFixed(0))
	if(newWidth>100){
		newWidth = 100;
	}
	return newWidth;
}
var imageElms = document.querySelectorAll("figure img");
imageElms.forEach(element => {
	element.addEventListener("click", function(){
		zoom_image(this)
	});
});

setTimeout(function(){
	imageElms.forEach(element => {
		var imgWdt = element.clientWidth;
		var parentWdt = element.parentElement.clientWidth;
		var percWidth = imgWdt/parentWdt*100;
		if(percWidth>0){
			element.style.width = percWidth + "%";
			element.style.transition = "width 0.5s ease";
		}
	});
},500)