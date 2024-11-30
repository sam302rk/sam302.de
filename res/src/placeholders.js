const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})

const constants = {
    'name': "Sam",
    'lname': "sam",
    'pronouns': "she/her",
    'year': new Date().getFullYear(),
    'url': document.URL
}

let selectedLanguage = params.lang || params.language || navigator.language || navigator.userLanguage || 'de'
for (let lang in i18n) if(lang.toString().includes(selectedLanguage)) selectedLanguage = lang.toString()

async function replacePlaceholders(inputString) {
    return await inputString.replace(/%\S*%/g, match => {
        const query = match.replace(/%/g, '')
        return getLocalizedString(query, selectedLanguage, 0) || constants[query] || params[query] || match
    }) 
}

function getLocalizedString(query, language, idx) {
    if (idx == 2) return undefined
    if (!i18n[selectedLanguage]) return getLocalizedString(query, 'en-US', idx+1)
    if (!i18n[selectedLanguage][query]) return getLocalizedString(query, 'en-US', idx+1)
    return i18n[selectedLanguage][query]
}

for (const node of document.getElementsByClassName('const')) {
    (async () => {
        node.innerHTML = await replacePlaceholders(node.innerHTML)
    })()
}