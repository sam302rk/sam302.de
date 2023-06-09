const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})

const my_names = ["Samuel", "GamingCraft", "Sakura", "Emily"]
const pronous_list = ["he/him", "he/him", "she/her", "she/her"]

const my_name = my_names[params.name] || 'Samuel'
const my_pronouns = pronous_list[params.name] || 'he/him'

const constants = {
    'name': my_name,
    'lname': my_name.toLowerCase(),
    'pronouns': my_pronouns,
    'year': new Date().getFullYear(),
    'url': document.URL
}

function replacePlaceholders(inputString) {
    return inputString.replace(/%\S*%/g, match => {
        const query = match.replace(/%/g, '')
        return (typeof i18n !== 'undefined' ? i18n[query] : null) || constants[query] || params[query] || match
    }) 
}

document.title = replacePlaceholders(document.title)

for (const node of document.getElementsByClassName('const')) {
    node.innerHTML = replacePlaceholders(node.innerHTML)
}