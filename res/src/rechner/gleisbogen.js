const ById = (id) => document.getElementById(id)
const ValueOf = (id) => document.getElementById(id).value
const SetById = (id, text) => document.getElementById(id).innerHTML = text
const GetValue = (key) => {
    for (const val of values) {
        if (val.key == key) return val.value()
    }
}

const DISPLAY_PRECISION = 1000 // thousands

let values = [
    {
        __readable: 'Kurvenüberhöhung',
        key: 'u',
        unit: 'mm',
        value: () => ValueOf('u')
    },
    {
        __readable: 'Bogenhalbmesser',
        key: 'R',
        unit: 'm',
        value: () => ValueOf('R')
    },

    {
        __readable: 'Spurweite',
        key: 'S',
        unit: 'mm',
        value: () => ValueOf('S')
    },
    {
        __readable: 'Überhöhungsfehlbetrag',
        key: 'u_f',
        unit: 'mm',
        value: () => ValueOf('u_f')
    },
    {
        __readable: 'Gleisabstand',
        key: 'd',
        unit: 'm',
        value: () => ValueOf('d')
    },
    {
        __readable: 'Höhe des Fahrdrahts',
        key: 'd_fd',
        unit: 'm',
        value: () => ValueOf('d_fd')
    },

    {
        __readable: 'Höhenunterschied zum Nachbargleis (y-Achse)',
        key: 'd_h',
        unit: 'mm',
        value: () => GetValue('d') * (GetValue('u') / GetValue('R'))
    },
    {
        __readable: 'Versatz der Oberleitung (x-Achse)',
        key: 'd_fdv',
        unit: 'mm',
        value: () => GetValue('d_fd') * (GetValue('u') / GetValue('R'))
    },
    {
        __readable: 'Höchstgeschwindigkeit',
        key: 'V_max',
        unit: 'km/h',
        value: () => Math.sqrt((GetValue('R') / 11.8) * (GetValue('u') + GetValue('u_f')))
    },
]

function updateEquations(do_promise) {
    for (const v of values) {
        
        let key = v.key
        const split = v.key.split('_')
        if (split.length > 1) key = split.join('_{') + '}'

        let value = Math.round((v.value() + Number.EPSILON) * DISPLAY_PRECISION) / DISPLAY_PRECISION
        if (value == 0) value = v.value() // It's bad code design, i know.

        console.log(`${key} == ${value}`)
        SetById(v.key + '_descr', `\\( ${key} = ${value} ${v.unit} \\)`)
    }

    if (do_promise) MathJax.typesetPromise()
}

for (const inp of document.querySelectorAll('input')) {
    console.log(inp.id)
    inp.addEventListener('change', updateEquations)
}

updateEquations(false)