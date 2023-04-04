var map = L.map('map').setView([50.69, 9.77], 6.2)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> and Ebou'
}).addTo(map)

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

let index = {}
let layers = []

fetchText('kml/index.json', rawIndex => {
    index = JSON.parse(rawIndex)

    let results = ''
    index.cities.forEach(city => {
        results += generateCityResult(city, undefined, undefined)
    })
    overwriteResults(results)
})

const template1 = (name, readable) => `<div class="hvrc" id="${name}_main"><span class="hvr">-> </span><a onclick="citySearchResultClick('${name}', 'main')">${readable}</a></div>`
const template2 = (name, add, readable) => `<div class="hvrc" id="${name}_${add}"><span class="hvr">-> </span><a onclick="citySearchResultClick('${name}', '${add}')">${readable} (${add})</a></div>`

function ifnul(inp, repl) {
    return (typeof inp === 'undefined') ? repl : inp
}

document.getElementById('citysearch_input').addEventListener('input', () => {
    let results = ''
    const input = document.getElementById('citysearch_input').value
    const regex = new RegExp(`^${input}`, 'i')

    let matchingCities = index.cities.filter(city => {
        let result = regex.test(city)
        return result
    })

    matchingCities.forEach(city => {
        results += generateCityResult(city, regex, input)
    })

    overwriteResults(results)
})

function generateCityResult(city, regex, input) {
    let readable = city.replace(ifnul(regex, ''), `<b>${ifnul(input, '')}</b>`)


    if (index.cityData[city]) {
        let cityData = index.cityData[city]

        let result = ''

        cityData.variants.forEach(variant => {
            result += template2(city, variant, readable)
        })

        cityData.years.forEach(year => {
            result += template2(city, year, readable)
        })

        return result
    }

    return template1(city, readable)
}

function citySearchResultClick(name, year) {

    document.getElementById(`${name}_${year}`).classList.add('active')

    layers.forEach(layer => {
        map.removeLayer(layer.layer)
        document.getElementById(`${layer.name}_${layer.add}`).classList.remove('active')
        layers.pop(layer)
    })

    fetchKML(`kml/${name}/${year}.kml`, r => {
        layers.push({layer: r, name: name, add: year})
        map.addLayer(r)
    })
}

function overwriteResults(content) {
    document.getElementById('citysearch_results').innerHTML = content
    sort('citysearch_results')
}

function sort(div) {
    var list = document.getElementById(div);

    var items = list.childNodes;
    var itemsArr = [];
    for (var i in items) {
        if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
            itemsArr.push(items[i]);
        }
    }

    itemsArr.sort(function (a, b) {
        return a.innerHTML == b.innerHTML
            ? 0
            : (a.innerHTML > b.innerHTML ? 1 : -1);
    });

    for (i = 0; i < itemsArr.length; ++i) {
        list.appendChild(itemsArr[i]);
    }
}