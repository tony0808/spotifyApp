const domain = "http://localhost:3000/";

function clearResponseTextDiv(div_id) {
    const playlistInfoDiv = document.getElementById(div_id);
    playlistInfoDiv.innerHTML = "";
}

function clearPlaylistButtonHighlight() {
    const buttons = document.querySelectorAll('#manage-playlists-main button');
    buttons.forEach(button => {
        button.style.backgroundColor = 'transparent';
    });
}

function clearTrackButtonHighlight() {
    const buttons = document.querySelectorAll('#manage-tracks-main button');
    buttons.forEach(button => {
        button.style.backgroundColor = 'transparent';
    });
}

function highLighButton(btn_id) {
    const myButton = document.getElementById(btn_id);
    myButton.style.backgroundColor = '#FFC107';
}

function getPlaylistCount(btn_id) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            clearPlaylistButtonHighlight()
            clearResponseTextDiv('playlist-response-div');
            highLighButton(btn_id);
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

function getPlaylistsList(btn_id) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            clearPlaylistButtonHighlight()
            clearResponseTextDiv('playlist-response-div');
            highLighButton(btn_id);
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

function gePlaylistIdTrackForm(btn_id) {
    clearPlaylistButtonHighlight()
    highLighButton(btn_id);
    fetch('/app/playlists/playlist_id_track_form')
        .then(response => response.text())
        .then(html => {
            document.getElementById("playlist-response-div").innerHTML = html;
        });
}

function gePlaylistIdGenreForm(btn_id) {
    clearPlaylistButtonHighlight()
    highLighButton(btn_id);
    fetch('/app/playlists/playlist_id_genre_form')
        .then(response => response.text())
        .then(html => {
            document.getElementById("playlist-response-div").innerHTML = html;
        });
}

function getTrackCount(btn_id) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            clearResponseTextDiv('track-dynamic-div');
            clearTrackButtonHighlight();
            highLighButton(btn_id);
            if (xhttp.status === 200) {
                const responseObj = JSON.parse(xhttp.responseText);
                const count = responseObj.count;

                const countElement = document.createElement('div');
                countElement.textContent = `You have ${count} tracks in your library.`;

                countElement.style.fontFamily = 'Arial, sans-serif';
                countElement.style.fontSize = '24px';
                countElement.style.color = '#333';
                countElement.style.padding = '20px';

                const responseContainer = document.getElementById('track-dynamic-div');
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

function getTrackGenres() {
    const xhttp = new XMLHttpRequest();
    const trackId = document.getElementById('track-id').value;
    xhttp.onreadystatechange = function () {
        clearResponseTextDiv('track-dynamic-div');
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                const genres = JSON.parse(xhttp.responseText);
                console.log(genres);
                const trackDynamicDiv = document.getElementById('track-dynamic-div');
                const genresList = document.createElement('ul');
                genresList.id = 'genre-list';
                genresList.classList.add('genre-list');
                genres.genres.forEach((genre) => {
                    const genreItem = document.createElement('li');
                    genreItem.textContent = genre;
                    genreItem.classList.add('genre-item');
                    genresList.appendChild(genreItem);
                });
                trackDynamicDiv.appendChild(genresList);
            }
            else {

            }
        }
    };
    xhttp.open("GET", domain + "app/tracks/genres/" + trackId);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send();
    return false;
}

function geTrackIdForm(btn_id) {
    clearTrackButtonHighlight();
    highLighButton(btn_id);
    fetch('/app/tracks/track_id_form')
        .then(response => response.text())
        .then(html => {
            document.getElementById("track-dynamic-div").innerHTML = html;
        });
}

function getPlaylistTracks() {
    const xhttp = new XMLHttpRequest();
    const playlistId = document.getElementById('playlist-id').value;
    xhttp.onreadystatechange = function () {
        clearResponseTextDiv('playlist-response-div');
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                const tracks = JSON.parse(xhttp.responseText).tracks;
                const table = document.createElement('table');
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');
                // Create table headers
                const headers = ['Created At', 'ID', 'Name', 'Duration (ms)'];
                const headerRow = document.createElement('tr');
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    const textNode = document.createTextNode(headerText);
                    th.appendChild(textNode);
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Create table rows
                tracks.forEach(track => {
                    const tr = document.createElement('tr');
                    const createdAtTd = document.createElement('td');
                    const created_at = track.created_at.substring(0, 10);
                    createdAtTd.innerText = created_at;
                    const idTd = document.createElement('td');
                    idTd.innerText = track.id;
                    const nameTd = document.createElement('td');
                    nameTd.innerText = track.name;
                    const durationTd = document.createElement('td');
                    durationTd.innerText = track.duration_ms;

                    tr.appendChild(createdAtTd);
                    tr.appendChild(idTd);
                    tr.appendChild(nameTd);
                    tr.appendChild(durationTd);
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);

                // Add table to div with id "playlist-response-div"
                const playlistResponseDiv = document.getElementById('playlist-response-div');
                playlistResponseDiv.appendChild(table);
            }
            else {

            }
        }
    };
    xhttp.open("GET", domain + "app/playlists/" + playlistId + '/tracks');
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send();
    return false;
}

function getPlaylistGenres() {
    const xhttp = new XMLHttpRequest();
    const playlistId = document.getElementById('playlist-id').value;
    xhttp.onreadystatechange = function () {
        clearResponseTextDiv('playlist-response-div');
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                const genres = JSON.parse(xhttp.responseText)
                const playlistDynamicDiv = document.getElementById('playlist-response-div');
                const genresList = document.createElement('ul');
                genresList.id = 'genre-list';
                genresList.classList.add('genre-list');
                genres.genres.forEach((genre) => {
                    const genreItem = document.createElement('li');
                    genreItem.textContent = genre;
                    genreItem.classList.add('genre-item');
                    genresList.appendChild(genreItem);
                });
                playlistDynamicDiv.appendChild(genresList);
            }
            else {

            }
        }
    };
    xhttp.open("GET", domain + "app/playlists/" + playlistId + '/genres');
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send();
    return false;
}