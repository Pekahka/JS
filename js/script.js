const MUSIC_PLAYER = document.querySelector('.music-player');
const COVER = MUSIC_PLAYER.querySelector('.music-player__cover');
const COVER_IMG = COVER.querySelector('img');
const AUDIO_PLAYLIST = MUSIC_PLAYER.querySelector('.audio-playlist');
const AUDIO_PLAYLIST_BUTTON = AUDIO_PLAYLIST.querySelector('.audio-playlist__button');
const AUDIO = MUSIC_PLAYER.querySelector('.music-player__audio');
const AUDIO_NAME = MUSIC_PLAYER.querySelector('.audio-info__name');
const AUDIO_ARTIST = MUSIC_PLAYER.querySelector('.audio-info__artist');
const BACWARD_BTN = document.getElementById('backward');
const PLAY_BTN = document.getElementById('play');
const FORWARD_BTN = document.getElementById('forward');
const AUDIO_PROGRESS = MUSIC_PLAYER.querySelector('.audio-progress__track');
const AUDIO_TRACK_CURRENT = MUSIC_PLAYER.querySelector('.audio-progress__current');
const AUDIO_TRACK_DURATION = MUSIC_PLAYER.querySelector('.audio-progress__duration');
const AUDIO_PROGRESS_PLAY = AUDIO_PROGRESS.querySelector('span');
const REQUEST_URL = 'data.json';

let audioIndex = 0;




async function getData(url) {
    const RESPONSE = await fetch(url);
    const AUDIO_DATA = await RESPONSE.json();
    return AUDIO_DATA;
}

getData(REQUEST_URL).then(data => {
    renderData(data);
});

const renderData = data => {
    getAudio(data.audio[audioIndex]);
    PLAY_BTN.addEventListener('click', () => {
        const IS_PLAYING = MUSIC_PLAYER.classList.contains('music-player--play');

        if (IS_PLAYING) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    BACWARD_BTN.addEventListener('click', () => {
        audioIndex--;
        if (audioIndex < 0) {
            audioIndex = data.audio.length - 1;
        }
        getAudio(data.audio[audioIndex]);
        AUDIO_PROGRESS_PLAY.style .width = `0%`;

        playAudio();
    });

    FORWARD_BTN.addEventListener('click', () => {
        audioIndex++;
        if (audioIndex > data.audio.length-1) {
            audioIndex = 0;
        }
        getAudio(data.audio[audioIndex]);
        AUDIO_PROGRESS_PLAY.style .width = `0%`;

        playAudio();
    });

    AUDIO.addEventListener('ended', () => {
        audioIndex++;
        if (audioIndex > data.audio.length-1) {
            audioIndex = 0;
        }
        getAudio(data.audio[audioIndex]);
        playAudio();
    });

    AUDIO.addEventListener('timeupdate', (e) => {
        const AUDIO_DURATION = e.target.duration;
        const AUDIO_CURRENT_TIME = e.target.currentTime;
        const AUDIO_PROGRESS_PERCENT = (AUDIO_CURRENT_TIME / AUDIO_DURATION) * 100;
        AUDIO_PROGRESS_PLAY.style .width = `${AUDIO_PROGRESS_PERCENT}%`;
        const CONVERTED_DURATION_TIME = formatTime(AUDIO_DURATION);
        const CONVERTED_CURRENT_TIME = formatTime(AUDIO_CURRENT_TIME);
        AUDIO_TRACK_CURRENT.textContent = `${CONVERTED_CURRENT_TIME}`;
        AUDIO_TRACK_DURATION.textContent = `${CONVERTED_DURATION_TIME}`;
    });

    AUDIO_PROGRESS.addEventListener('click', (e) => {
        const AUDIO_PROGRESS_WIDTH = e.target.clientWidth;
        const CLICK_X = e.offsetX;
        const AUDIO_DURATION = AUDIO.duration;
        AUDIO.currentTime = (CLICK_X / AUDIO_PROGRESS_WIDTH) * AUDIO_DURATION;
        const IS_PLAYING = MUSIC_PLAYER.classList.contains('music-player--play');

        if (!IS_PLAYING) {
            playAudio();
        }
    }); 

    AUDIO_PLAYLIST_BUTTON.addEventListener('click', (e) => {

        if (AUDIO_PLAYLIST.classList.contains('audio-playlist--active')) {
            AUDIO_PLAYLIST.classList.remove('audio-playlist--active')

            // removeLi = document.querySelectorAll('.audio-list');
            // for (let i = 0; i < removeLi.length; i++) {
            //     removeLi[i].remove();
            // }
        } else {
            AUDIO_PLAYLIST.classList.add('audio-playlist--active');
            
            // for (let i = 0; i < data.audio.length; i++) {
            //     audioIndex = i;
            //     let myElementToAppendTo = document.querySelector('.audio-playlist__list');
            //     let li = document.createElement('li');
            //     li.className = 'audio-list'
            //     let h4 = document.createElement('h4');
            //     let spn = document.createElement('span');
            //     myElementToAppendTo.appendChild(li);
            //     li.appendChild(h4);
            //     li.appendChild(spn);
            //     h4.innerText = `${AUDIO_ARTIST.textContent} - ${AUDIO_NAME.textContent}`;
            //     spn.innerText = `${AUDIO_TRACK_DURATION.textContent}`; 
                
                             
            // }
            
    }});

    // for (let i = 0; i < data.audio.length; i++) {
        
    //     let myElementToAppendTo = document.querySelector('.audio-playlist__list');
    //     let li = document.createElement('li');
    //     li.className = 'audio-list'
    //     let h4 = document.createElement('h4');
    //     let spn = document.createElement('span');
    //     myElementToAppendTo.appendChild(li);
    //     li.appendChild(h4);
    //     li.appendChild(spn);
    //     h4.innerText = `${AUDIO_ARTIST.textContent} - ${AUDIO_NAME.textContent}`;
    //     spn.innerText = `${AUDIO_TRACK_DURATION.textContent}`; 
        
                     
    // }
    
    console.log(AUDIO_TRACK_DURATION);

    let myElementToAppendTo = document.querySelector('.audio-playlist__list'); 
    for (const song of data.audio) {
        
        let li = document.createElement('li');
        let h4 = document.createElement('h4');
        // let spn = document.createElement('span');
        // spn.className = 'audio-progress__duration';
        const AUDIO_DURATION = AUDIO.duration;
        const CONVERTED_DURATION_TIME = formatTime(AUDIO_DURATION);
        AUDIO_TRACK_DURATION.textContent = `${CONVERTED_DURATION_TIME}`;
        h4.innerText = `${song.audioArtist} - ${song.audioName}`;
        // spn.innerText = `${AUDIO_TRACK_DURATION.textContent}`; 
        
        li.appendChild(h4);
        // li.appendChild(spn);
        
        myElementToAppendTo.appendChild(li);
    }

    
}

function getAudio(data) {
    AUDIO_NAME.textContent = data.audioName;
    AUDIO_ARTIST.textContent = data.audioArtist;
    AUDIO.src = data.audioFile;
    COVER_IMG.src = data.audioCover;
    document.querySelector('.music-player').style.backgroundColor = data.backGround;
    PLAY_BTN.style.backgroundColor = data.buttonGround;
    FORWARD_BTN.style.backgroundColor = data.buttonGround;
    BACWARD_BTN.style.backgroundColor = data.buttonGround;

}

function playAudio() {
    MUSIC_PLAYER.classList.add('music-player--play');
    PLAY_BTN.querySelector('i.fas').classList.remove('fa-play');
    PLAY_BTN.querySelector('i.fas').classList.add('fa-pause');
    AUDIO.play();
}

function pauseAudio() {
    MUSIC_PLAYER.classList.remove('music-player--play');
    PLAY_BTN.querySelector('i.fas').classList.add('fa-play');
    PLAY_BTN.querySelector('i.fas').classList.remove('fa-pause');
    AUDIO.pause();
}

function formatTime(time) {
    let minutes = 0| (time / 60);
    let seconds = 0| (time % 60);

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return `${minutes}:${seconds}`;
}