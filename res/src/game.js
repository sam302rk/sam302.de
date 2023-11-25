// yep, i called the variable that. I'm deeply sorry.
let clickaridoos = 0

const splashes = {
    '-2': 'no.',
    '-1': 'How did we get here?',
    '0': 'Clickaridoos shall not be ZERO.',
    '1': 'You can\'t actually see this one. :3',
    '2': 'I use arch btw.',
    '3': 'You found a secret. Continue for more.',
    '5': 'Keep going!',
    '12': 'If you found this, message me on social media. :)',
    '16': 'You are doing well!',
    '32': 'Go on!',
    '40': 'Keep exploring. There\'s so much more.',
    '64': 'The square root of 8',
    '69': 'Nice!',
    '128': 'Continue for a treat!',
    '302': 'For those who don\'t think of snakes when they hear Python',
    '322': 'Oh no. It\'s you again.',
    '403': 'Error 403: Forbidden cookie.',
    '404': 'Error 404: C\'mon really?',
    '420': 'Smoke weed everyday!',
    '1024': 'You are a maniac!',
    '1025': 'But wait! There\'s more!',
    '2001': 'A space odyssey',
    '2006': 'Happy Birthyear!',
    '2048': 'It\'s like that mobile game!',
    '2306': 'Happy Birthday!',
    '6969': 'TROLLOLOLOLOL',
    '7000': 'WTF.',
    '8000': 'Dude, stop.',
    '9000': 'Your arm must hurt so badly right now...',
    '9999': 'Bro.',
    '10000': 'Now you\'re to deep into it, keep going!',
    '100000': 'You do realize, that you don\'t have to do this, right?',
    '1000000': 'Do you have hobbies?',
    '10000000': 'You used the developer console, right? ...RIGHT?',
    '100000000': 'T-Series was first.',
    '2147483647': 'The end is never the end is never the end is... STACK OVERFLOW.',
    '9223372036854775999': 'Farlands or bust!',
    '9223372036854776000': 'You used the developer console, didn\'t you?'
}

document.querySelectorAll('#navbar button').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn)
        document.location = btn.value
    })
})

document.getElementById('pic').src = `/res/img/${constants.lname}.png`
//if (constants.pronouns.startsWith('she')) document.getElementById('pic').classList.add('trans')

document.getElementById('pic').addEventListener('click', async () => {
    logger.debug('Click on my profile picture!')

    var audio = new Audio(`/res/audio/click${rand(1, 3)}.wav`)
    audio.volume = audio.volume / 4
    audio.play()

    clickaridoos += 1
    if (clickaridoos >= 3) document.title = splashes[clickaridoos] || `${clickaridoos} Cookies!`
})