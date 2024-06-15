const ById = (id) => document.getElementById(id)

const vehicleData = [
    {
        vehicle: "GT6N/M/S(-ZR) / GT8N",
        href: "https://de.wikipedia.org/wiki/GTxN/M/S",
        width: 2.3,
        buffer: [ 8 ]
    },
    {
        vehicle: "Stadtbahnwagen Typ M/N",
        href: "https://de.wikipedia.org/wiki/Stadtbahnwagen_Typ_M/N",
        width: 2.3,
        buffer: [ 8, 8 ]
    },
    {
        vehicle: "Stadtbahnwagen Typ B",
        href: "https://de.wikipedia.org/wiki/Stadtbahnwagen_Typ_B",
        width: 2.65,
        buffer: [ 8, 24 ]
    },
    {
        vehicle: "DueWag GT8S(U)",
        href: "https://de.wikipedia.org/wiki/Typ_Mannheim",
        width: 2.4,
        buffer: [ 8, 24 ]
    },
    {
        vehicle: "DueWag Gelenktriebwagen",
        href: "https://de.wikipedia.org/wiki/Duewag-Gelenkwagen",
        width: 2.35,
        buffer: [ 8 ]
    },
    {
        vehicle: "Stadtbahn Karlsruhe",
        href: "https://de.wikipedia.org/wiki/Stadtbahn_Karlsruhe",
        width: 2.35,
        buffer: [ 8, 28 ]
    },
]

const bufferTable = (a, b) =>
`<tr>
    <td>Ohne Trittstufen</td>
    <td>${a} cm</td>
</tr>
<tr>
    <td>Mit Trittstufen</td>
    <td>${b} cm</td>
</tr>`

for (const vehicle of vehicleData) {
    let tr = document.createElement('tr')
    let td = [ document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td') ]

    td[0].innerHTML = `<a href="${vehicle.href}">${vehicle.vehicle}</a>`
    td[1].innerHTML = `${vehicle.width} m`
    td[2].innerHTML = `${vehicle.buffer[0]} cm`
    td[3].innerHTML = (vehicle.buffer.length == 2) ? `${vehicle.buffer[1]} cm` : '—'

    for (const d of td) {
        tr.appendChild(d)
    }

    ById('max-fz-breiten-table').append(tr)
}

ById('calculate').addEventListener('click', () => {
    ById('result').value = (ById('fz-breite').value / 2) + (ById('sicherheitsabstand').value / 100)
})