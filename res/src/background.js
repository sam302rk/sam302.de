document.getElementById('body').style.backgroundImage = `url('/res/img/wallpapers/export${rand(1, 4)}.png')`

const onscroll = async () => {
    const height = document.body.offsetHeight
    const width = document.body.offsetWidth
    const scrollPx = getScrollPercent() * (height-width+64)
    document.getElementById('body').style.backgroundPositionY = `${scrollPx}px`
}

onscroll()
window.onscroll = onscroll