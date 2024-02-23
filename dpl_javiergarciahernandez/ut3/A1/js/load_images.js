function load_images(){
    let bw = document.getElementById("bor-width").value;
    let dw = document.getElementById("img-size").value;
    let bc = document.getElementById("bor-color").value;
    let focus = document.getElementById("focus").value;
    let blur = document.getElementById("blur").value;
    const container = document.getElementById("img-container");
    if (container.hasChildNodes()){
	    container.childNodes.forEach(node => {
		    node.src = `http://images.pc28.es/img/${node.id}.jpg?dw=${dw}&bw=${bw}&bc=${bc}&sharpen=${focus}&blur=${blur}`;
	    });
    } else {
    	for (let i = 1; i <= 20; i++){
        	let img = document.createElement("img");
	        let img_index = `${i}`.padStart(2, '0');
	        img.id = 'image' + img_index;
	        img.src= `http://images.pc28.es/img/${img.id}.jpg?dw=${dw}&bw=${bw}&bc=${bc}&sharpen=${focus}&blur=${blur}`;
	        container.appendChild(img);
	    }
	    let title = document.getElementById("img-title");
	    title.style.visibility = "visible";
    }
}
