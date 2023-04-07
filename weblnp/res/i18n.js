const languages = {
    "en-US": {
        "search.placeholder": "City...",
        "search.results": "--- Search results ---",
        "options.title": "--- City options ---",
        "options.layer.default": "Choose a layer...",
        "options.save": "Save"
    },
    "de-DE": {
        "search.placeholder": "Stadt...",
        "search.results": "--- Suchergebnisse ---",
        "options.title": "--- Stadtoptionen ---",
        "options.layer.default": "Wähle eine Ebene...",
        "options.save": "Übernehmen"
    }
}

const selectedLanguage = params.language || navigator.language || navigator.userLanguage || 'en-US'

function tryTranslation(input) {
    return languages[selectedLanguage][input] || languages['en-US'][input] || input
}

for (const node of document.getElementsByClassName('i18n')) {
    node.innerHTML = tryTranslation(node.innerHTML)
}

for (const node of document.getElementsByClassName('i18n_placeholder')) {
    node.placeholder = tryTranslation(node.placeholder)
}