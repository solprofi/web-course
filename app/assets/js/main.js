// let acousticArray = JSON.parse(acousticJson);
// let electricArray = JSON.parse(electricJson);
// let bassArray = JSON.parse(bassJson);
let soundArray;
const soundExtension = '.wav';

let currentMode = 'Standart';
let currentGuitarType = window.location.pathname.slice(1).split('.').shift();

let currentHowlStringSounds = [];
let currentSoundNameList;

let guitarButtonList = [];
let STRINGNUMBER;
let previousActive = 0;
let folderPath;

function init() {
    updateSounds();
    for (i = 0; i < STRINGNUMBER; i++) {
        assignButton(i);
    }
}


function assignButton(i) {
    guitarButtonList.push(document.getElementById("switch-" + i.toString()));
    guitarButtonList[i].addEventListener('click',  function () {
        playString(i);
    });
}
function playString(stringNumber) {
    currentHowlStringSounds[stringNumber].play();
}

function changeMode(modeName) {
    currentMode = modeName;
}

function handleModeChange(mode, id) {
    changeMode(mode);
    updateSounds();
    updateUI(id);
}

function updateSounds() {
    switch (currentGuitarType) {
        case 'acoustic':
            folderPath = 'assets/sounds/acoustic_wav/';
            soundArray = JSON.parse(acousticJson);
            currentSoundNameList = soundArray[currentMode];
            STRINGNUMBER = 6;
            break;
        case 'bass':
            folderPath = 'assets/sounds/bass_wav/';
            soundArray = JSON.parse(bassJson);
            currentSoundNameList = soundArray[currentMode];
            STRINGNUMBER = 4;
            break;
        case 'electric':
            folderPath = 'assets/sounds/electric_wav/';
            soundArray = JSON.parse(electricJson);
            currentSoundNameList = soundArray[currentMode];
            STRINGNUMBER = 6;
            break;
    }

    for (i = 0; i < STRINGNUMBER; i++) {
        currentHowlStringSounds[i] = new Howl({
            src: [folderPath + currentSoundNameList[i] + soundExtension]
        });
    }
}

function updateUI(id) {
    if( id !== previousActive ) {
        document.getElementById(`tuning-${previousActive}`).classList.remove('tunes-list__item_active');
        document.getElementById(`tuning-${id}`).classList.add('tunes-list__item_active');
        document.getElementById(`tuning-${previousActive}`).childNodes[1].classList.remove('tunes-list__name_active');
        document.getElementById(`tuning-${id}`).childNodes[1].classList.add('tunes-list__name_active');

        previousActive = id;
    }

}

init();