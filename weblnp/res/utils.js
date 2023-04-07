const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})

function fetchText(url, reciever) {
    fetch(url).then(res => res.text()).then(text => reciever(text))
}

function fetchKML(url, trackReciever) {
    fetchText(url, kmltext => {
        parser = new DOMParser();
        kml = parser.parseFromString(kmltext, "text/xml");
        const track = new L.KML(kml)
        map.addLayer(track)
        trackReciever(track)
    })
}

function ifnul(inp, repl) {
    return (typeof inp === 'undefined') ? repl : inp
}

function sort(div) {
    var list = document.getElementById(div)
    var items = list.childNodes
    var sorter = []
    for (var i in items) if (items[i].nodeType == 1) sorter.push(items[i])

    sorter.sort((a, b) => {
        return a.innerHTML == b.innerHTML
            ? 0
            : (a.innerHTML > b.innerHTML ? 1 : -1)
    })

    for (i = 0; i < sorter.length; ++i) list.appendChild(sorter[i])
}