function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getScrollPercent() {
    const h = document.documentElement, b = document.body, st = 'scrollTop', sh = 'scrollHeight'
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight)
}

// Twemoji integration
twemoji.parse(document.body, {
        ext: '.svg', size: 'svg',
        base: '/res/emojis/'
})

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}