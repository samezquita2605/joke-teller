const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing joke to voiceRSS API
function tellMe (joke) {
    VoiceRSS.speech({
        key: '55df077ce6604c11a0866b8e47de1bfa',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //text-to/speech
        tellMe(joke);
        //Disable button
        toggleButton();
    } catch (error) {
        //catch errors
        console.log('whoops', error);
    }
}

//Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);