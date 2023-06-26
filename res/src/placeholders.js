const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})

const my_names = ["Sam", "Sakura"]
const pronous_list = ["she/her", "she/her"]

const my_name = my_names[params.name] || 'Sam'
const my_pronouns = pronous_list[params.name] || 'she/her'

const constants = {
    'name': my_name,
    'lname': my_name.toLowerCase(),
    'pronouns': my_pronouns,
    'year': new Date().getFullYear(),
    'url': document.URL
}

let selectedLanguage = params.lang || params.language || navigator.language || navigator.userLanguage || 'en'
logger.debug(selectedLanguage)
for (let lang in i18n) if(lang.toString().includes(selectedLanguage)) selectedLanguage = lang.toString()

function replacePlaceholders(inputString) {
    return inputString.replace(/%\S*%/g, match => {
        const query = match.replace(/%/g, '')
        return ((typeof i18n !== 'undefined') ? i18n[selectedLanguage][query] : null) || constants[query] || params[query] || match
    }) 
}

document.title = replacePlaceholders(document.title)

for (const node of document.getElementsByClassName('const')) {
    node.innerHTML = replacePlaceholders(node.innerHTML)
}