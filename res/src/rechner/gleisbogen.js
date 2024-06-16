const ById = (id) => document.getElementById(id)
const ValueOf = (id) => Number(document.getElementById(id).value)
const SetById = (id, text) => document.getElementById(id).innerHTML = text
const GetValue = (key) => {
    for (const val of values) {
        if (val.key == key) return val.value()
    }
}

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
        value: () => GetValue('d') * (GetValue('u') / GetValue('S'))
    },
    {
        __readable: 'Versatz der Oberleitung (x-Achse)',
        key: 'd_fdv',
        unit: 'm',
        value: () => GetValue('d_fd') * (GetValue('u') / GetValue('S'))
    },
    {
        __readable: 'Höchstgeschwindigkeit',
        key: 'V_max',
        unit: 'km/h',
        value: () => {
            console.log(`R=${typeof GetValue('R')}; u=${typeof GetValue('u')}; u_f=${typeof GetValue('u_f')}`)
            // =sqrt((30/11,8)*(10+153))
            return Math.sqrt((GetValue('R') / 11.8) * (GetValue('u') + GetValue('u_f')))
        }
    },
]

function updateEquations(do_promise) {
    for (const v of values) {
        
        let key = v.key
        const split = v.key.split('_')
        if (split.length > 1) key = split.join('_{') + '}'
        value = v.value()
        SetById(v.key + '_descr', `\\( ${key} = ${value} ${v.unit} \\)`)
    }

    if (do_promise) MathJax.typesetPromise()
}

for (const inp of document.querySelectorAll('input')) {
    console.log(inp.id)
    inp.addEventListener('change', updateEquations)
}

updateEquations(false)