/*
//URLs para probar:
//https://www.eldia.es/rss/section/12502
//https://feeds.bbci.co.uk/mundo/rss.xml
//https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada
*/

document.addEventListener('DOMContentLoaded', () => {
    let addRSSButton = document.getElementById('crearRSS');
    let deleteRSSButton = document.getElementById('borrarRSS');
    let rssOptions = document.getElementById('campoSelect');
    // iterating localStorage retrieving the saved RSS feeds
    let check_length = 0;
    for ( let key in localStorage ) {
        if ( localStorage.length <= check_length ) { 
            break; 
        } else {
            rssOptions.innerHTML += `<option value="${key}">${key}</option>`;
            check_length += 1;
        }
    }
    addRSSButton.addEventListener('click', addOption);
    deleteRSSButton.addEventListener('click', deleteRSS);
    rssOptions.addEventListener('change', renderRSS);
    // Renders selected feed
    renderRSS();

    function addOption() {
        let new_option_name = prompt('Por favor, introduzca el nombre:');
        // check if there is no saved RSS feed with the new name
        if ( localStorage.getItem(new_option_name) === null ) {
            let new_option_url = prompt('Por favor, introduzca la url:');
            localStorage.setItem(new_option_name, new_option_url);
            rssOptions.innerHTML += `<option value="${new_option_name}">${new_option_name}</option>`;
            rssOptions.value = new_option_name;
            renderRSS();
        } else {
            alert('There is already a feed with that name!');
        }
    }
    
    function deleteRSS() {
        try {
            localStorage.removeItem(rssOptions.options[rssOptions.selectedIndex].value);
            rssOptions.options[rssOptions.selectedIndex].remove();
            renderRSS();
        } catch {
            alert('No existe el elemento a eliminar.');
        }
    }
    
    function renderRSS() {
        // check if there are feeds to render
        if (localStorage.length != 0) {
            let url = localStorage.getItem(rssOptions.options[rssOptions.selectedIndex].value);
            fetch(`server.php?url=${url}`)
            .then(response => response.json())
            .then(data => {
                gvar = data;
                contents =`<h1>${data.channel.title}</h1>
                        <h3>${data.channel.description}</h3>`;
                for ( let i = 0; i < data.channel.item.length; i++ ) {
                        contents += `<br/><h2>${data.channel.item[i].title}</h2>
                                    <h3>${data.channel.item[i].description}</h3>
                                    <a href="${data.channel.item[i].link}">${data.channel.item[i].link}</a>`       
                    }
                document.getElementById('noticias').innerHTML = contents;
                }
            )
            .catch(error => alert(error));
        } else { 
            // if there are no feeds, render none
            document.getElementById('noticias').innerHTML = '';
        }
    }
});

