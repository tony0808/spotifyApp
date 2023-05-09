const domain = "http://localhost:3000/";

function clearResponseTextDiv(div_id) {
    const playlistInfoDiv = document.getElementById(div_id);
    playlistInfoDiv.innerHTML = "";
}

function getPlaylistCount() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        clearResponseTextDiv('playlist-response-div');
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                const responseObj = JSON.parse(xhttp.responseText);
                const count = responseObj.count;

                const countElement = document.createElement('div');
                countElement.textContent = `You have ${count} playlists in your library.`;

                countElement.style.fontFamily = 'Arial, sans-serif';
                countElement.style.fontSize = '24px';
                countElement.style.color = '#333';
                countElement.style.padding = '20px';

                const responseContainer = document.getElementById('playlist-response-div');
                responseContainer.appendChild(countElement);
            }
            else {

            }
        }
    };
    xhttp.open("GET", domain + "app/playlists/count");
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send();
    return false;
}

function getPlaylistsList() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            clearResponseTextDiv('playlist-response-div');
            if (xhttp.status === 200) {
                const responseObj = JSON.parse(xhttp.responseText);
                const playlists = responseObj.playlists;

                const playlistDiv = document.createElement('div');
                playlistDiv.setAttribute('class', 'playlist-container');

                playlists.forEach((playlist) => {
                    const playlistName = document.createElement('p');
                    playlistName.setAttribute('class', 'playlist-name');
                    playlistName.innerText = playlist.name;

                    const playlistId = document.createElement('p');
                    playlistId.setAttribute('class', 'playlist-id');
                    playlistId.innerText = playlist.id;

                    const playlistInfo = document.createElement('div');
                    playlistInfo.setAttribute('class', 'playlist-info');
                    playlistInfo.appendChild(playlistName);
                    playlistInfo.appendChild(playlistId);

                    playlistDiv.appendChild(playlistInfo);
                });

                const responseContainer = document.getElementById('playlist-response-div');
                responseContainer.appendChild(playlistDiv);
            }
            else {

            }
        }
    };
    xhttp.open("GET", domain + "app/playlists/list");
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send();
    return false;
}

function getTrackCount() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        clearResponseTextDiv('track-response-div');
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                const responseObj = JSON.parse(xhttp.responseText);
                const count = responseObj.count;

                const countElement = document.createElement('div');
                countElement.textContent = `You have ${count} tracks in your library.`;

                countElement.style.fontFamily = 'Arial, sans-serif';
                countElement.style.fontSize = '24px';
                countElement.style.color = '#333';
                countElement.style.padding = '20px';

                const responseContainer = document.getElementById('track-response-div');
                responseContainer.appendChild(countElement);
            }
            else {

            }
        }
    };
    xhttp.open("GET", domain + "app/tracks/count");
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send();
    return false;
}