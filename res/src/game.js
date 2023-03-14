let ctx = document.getElementById('game').getContext('2d')
let gameEnabled = false
let gameLoop
let currentTick = 0
let entities = []

const gameConstants = {
    width: 1280,
    height: 720,
    framerate: 12,
    audioPath: '/res/audio/'
}


document.getElementById('pic').addEventListener('click', async() => {
    logger.debug('Click on my profile picture!')

    var audio = new Audio(`${gameConstants.audioPath}/click${rand(1, 3)}.wav`)
    audio.volume = audio.volume / 4
    audio.play()

    if (!gameEnabled) { // Freshly enabled
        document.getElementById('body').classList.add('gamerun')
        gameLoop = setInterval(tick, 1000 / gameConstants.framerate)
    }

    gameEnabled = true

    spawnEnemy()
})

function tick() {
    currentTick += 1
    logger.debug(`Game tick #${currentTick}!`)
    ctx.fillStyle = "#fff"
    
    console.log(entities)

    for (let e in entities) {
        ctx.fillRect(e.x-8, e.y-8, 16, 16)
    }
}

function spawnEnemy() {
    entities.push({
        x: rand(16, gameConstants.width - 16),
        y: rand(16, gameConstants.height - 16),
        id: rand(1, 6)
    })
}

function stopGame() {
    document.getElementById('body').classList.remove('gamerun')
    clearInterval(gameLoop)
    gameEnabled = false
}