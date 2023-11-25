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
        return ((typeof i18n !== 'undefined') ? i18n[selectedLanguage][query] : null) || constants[query] || params[query] || match
    }) 
}

for (const node of document.getElementsByClassName('const')) {
    (async () => {
        node.innerHTML = await replacePlaceholders(node.innerHTML)
    })()
}