// yep, i called the variable that. I'm deeply sorry.
let clickaridoos = 0

const splashes = {
    '-4': 'stop it.',
    '-2': 'no.',
    '-1': 'How did we get here?',
    '0': 'Clickaridoos shall not be ZERO.',
    '1': 'You can\'t actually see this one. :3',
    '2': 'I use arch btw.',
    '3': 'You found a secret. Continue for more.',
    '5': 'Keep going!',
    '10': 'If you found this, message me on social media. :)',
    '20': 'You are doing well!',
    '30': 'Go on!',
    '40': 'Keep exploring. There\'s so much more.',
    '50': 'This is only the beginning!',
    '64': '8² Cookies!',
    '69': '69 Nice!',
    '80': 'And still, there is more.',
    '100': 'Continue for a treat!',
    '160': 'Vmax 160 for live! <3',
    '180': 'You did an one-eighty c:',
    '204': 'D-204 ab Zwanzisch, Richtig.',
    '302': 'For those who don\'t think of snakes when they hear Python',
    '322': 'Oh no. It\'s you again.',
    '360': 'And back at the start again.. nah jk',
    '403': 'Error 403: Forbidden cookie.',
    '404': 'Error 404: C\'mon really?',
    '420': 'Wer den 420 nicht ehrt, ist dem 425 nichts wert!',
    '425': 'Quitschieeeeeee',
    '426': 'Mini-Quitschieee <3',
    '450': 'Hochfluff, Mittelfluff und Schrott!',
    '463': 'Mireo is Love. Mireo is Live.',
    '1024': 'You are a maniac!',
    '1025': 'But wait! There\'s more!',
    '1440': 'Hamsterbacke!',
    '1996': 'R.I.P. Deutsche Bundesbahn, Welcome KVV!',
    '2001': 'A Space Odyssey',
    '2006': 'Happy Birthyear!',
    '2048': 'It\'s like that mobile game!',
    '2306': 'Happy Birthday!',
    '4711': 'Jo, Fahrdienst?',
    '6969': '6969 heh nice.',
    '7000': 'WTF.',
    '8000': 'Dude, stop.',
    '9000': 'Your arm must hurt so badly right now...',
    '9999': 'Bro.',
    '10000': 'Now you\'re to deep into it, keep going!',
    '100000': 'You do realize, that you don\'t have to do this, right?',
    '696969': '696969 Nice³',
    '1000000': 'Do you have hobbies?',
    '10000000': 'You used the developer console, right? ...RIGHT?',
    '23062006': 'Happy birthday!',
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

document.getElementById('pic').addEventListener('click', async () => {
    logger.debug('Click on my profile picture!')

    var audio = new Audio(`/res/audio/click${rand(1, 3)}.wav`)
    audio.volume = audio.volume / 4
    audio.play()

    clickaridoos += 1
    if (clickaridoos >= 3) document.title = splashes[clickaridoos] || `${clickaridoos} Cookies!`
})