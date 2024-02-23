window.onload = function() {
    document.addEventListener('keydown', leftSlide);
    document.getElementById('left').addEventListener('click', leftSlide);
    document.addEventListener('keydown', rightSlide);
    document.getElementById('right').addEventListener('click', rightSlide);
    for (let i = 0; i < document.images.length; i++) {
        document.images.item(i).addEventListener('click', focusImg);
    }

}

function focusImg(e) {
    let main_img = document.images.item(0);
    let new_main_src = e.target.src;
    e.target.src = main_img.src;
    main_img.src = new_main_src;
}

function leftSlide(e) {
    if (e.key === 'ArrowLeft' || e.type === 'click') {
        let sources = [];
        for (let i = 0; i < document.images.length; i++) {
            sources.push(document.images.item(i).src);
        }
        let main_src = sources.shift();
        sources.push(main_src);
        sources.forEach((element, i) => {
            document.images.item(i).src = element;
        });
    }
}

// function leftSlideBis() {
//     let sources = [];
//     for (let i = 0; i < document.images.length; i++) {
//         sources.push(document.images.item(i).src);
//     }
//     let main_src = sources.shift();
//     sources.push(main_src);
//     sources.forEach((element, i) => {
//         document.images.item(i).src = element;
//     });
// }

function rightSlide(e) { 
    if (e.key === 'ArrowRight' || e.type === 'click') {
        let sources = [];
        for (let i = 0; i < document.images.length; i++) {
            sources.push(document.images.item(i).src);
        }
        let new_main_src = sources.pop();
        sources.unshift(new_main_src);
        sources.forEach((element, i) => {
            document.images.item(i).src = element;
        });
    }
}

// function rightSlideBis() { 
//     let sources = [];
//     for (let i = 0; i < document.images.length; i++) {
//         sources.push(document.images.item(i).src);
//     }
//     let new_main_src = sources.pop();
//     sources.unshift(new_main_src);
//     sources.forEach((element, i) => {
//         document.images.item(i).src = element;
//     });
// }