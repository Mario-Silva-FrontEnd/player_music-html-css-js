const player = {
    playNow: document.querySelector('audio'),

    cover: document.querySelector('.music-cover'),
    nameMusic: document.querySelector('.name-music'),
    nameArtist: document.querySelector('.name-artist'),

    playpause_btn: document.querySelector('.playpause'),
    prev_btn: document.querySelector('.prev'),
    next_btn: document.querySelector('.next'),

    random_btn: document.querySelector('.random'),
    repeat_btn: document.querySelector('.repeat'),

    seek: document.querySelector('.seekbar'),
    curr_time: document.querySelector('.current-time'),
    total_duration: document.querySelector('.total-duration'),


    musicList: [
        {
            name: 'Jack Hannaford 02',
            artist: 'Natalie',
            cover: 'img/Berserker.(Tamamo.Cat).600.2649390.jpg',
            audio: 'music/AUDIO Jack Hannaford 02 Natalie.mp3'
        },
        {
            name: 'Jack Hannaford 01',
            artist: 'Jake',
            cover: 'img/Berserker.(Tamamo.Cat).600.2545215.jpg',
            audio: 'music/AUDIO Jack Hannaford 01 Jake.mp3'
        },
        {
            name: 'The Endless Tale 02',
            artist: 'Peter',
            cover: 'img/Berserker.(Tamamo.Cat).600.2102030.jpg',
            audio: 'music/AUDIO The Endless Tale 02 Peter.mp3'
        }
    ],

    start(musicIndex) {
        clearInterval(updateTimer);
        reset();
        player.playNow.src = `${player.musicList[musicIndex].audio}`;
        player.cover.src = `${player.musicList[musicIndex].cover}`;
        player.nameMusic.textContent =  player.musicList[musicIndex].name;
        player.nameArtist.textContent =  player.musicList[musicIndex].artist;

        updateTimer = setInterval(setTime, 1000);
        player.playNow.addEventListener('ended', next);


    },

};



let musicIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

function reset() {
    player.seek.value = 0;
    player.curr_time.textContent = '00:00';
    player.total_duration.textContent = '00:00';
}

player.start(musicIndex);
/*  */


function play_Pause() {
    isPlaying ? pause() : play();
}

function play() {
    isPlaying = true;
    player.playNow.play();
    player.playpause_btn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
}

function pause() {
    isPlaying = false;
    player.playNow.pause();
    player.playpause_btn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';

}

/*  */
function next() {
    if (musicIndex < player.musicList.length - 1 && isRandom === false) {
        musicIndex++;
    } else if (musicIndex < player.musicList.length - 1 && isRandom === true) {
        let randomIndex = Math.floor(Math.random() * player.musicList.length);
        musicIndex = randomIndex;
    } else {
        musicIndex = 0;
    }

    player.start(musicIndex);
    play();

}

function prev() {

    if (musicIndex > 0) {
        musicIndex -= 1;

    } else {
        musicIndex = player.musicList.length - 1;
    }

    player.start(musicIndex);
    play();
}

function random() {
    let randomIn = randomNum();
    player.start(randomIn);
    play();

}

/*  */
function randomNum() {
    return Math.floor(Math.random() * player.musicList.length);
}

/* function random() {
    isRandom ? stopRandom() : startRandom();
}


function startRandom(){
isRandom = true;
player.random_btn.classList.add('randomActive');
}

function stopRandom(){
isRandom = false;
player.random_btn.classList.remove('randomActive');
} */

/*  */
function repeat() {
    player.playNow.loop ? repeatStop() : repeatStart();
}

function repeatStart() {
    player.playNow.loop = true;
    player.repeat_btn.style.color = 'white';

}

function repeatStop() {
    player.playNow.loop = false;
    player.repeat_btn.style.color = 'black';
}


/*  */
function seeker() {
    let seeker = player.playNow.duration * (player.seek.value / 100);
    player.playNow.currentTime = seeker;
}

function setTime() {
    let seekPosition = 0;
    if (!isNaN(player.playNow.duration)) {
        seekPosition = player.playNow.currentTime * (100 / player.playNow.duration);
        player.seek.value = seekPosition;

        let currMinutes = Math.floor(player.playNow.currentTime / 60);
        let currSeconds = Math.floor(player.playNow.currentTime - currMinutes * 60);

        let duraMinutes = Math.floor(player.playNow.duration / 60);
        let duraSeconds = Math.floor(player.playNow.duration - duraMinutes * 60);

        let currMinutesValue = currMinutes.toString().padStart(2, '0');
        let currSecondsValue = currSeconds.toString().padStart(2, '0');
        let duraMinutesValue = duraMinutes.toString().padStart(2, '0');
        let duraSecondsValue = duraSeconds.toString().padStart(2, '0');


        player.curr_time.textContent = currMinutesValue + ':' + currSecondsValue;
        player.total_duration.textContent = duraMinutesValue + ':' + duraSecondsValue;

    }

}

