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
    'year': new Date().getFullYear()
}

if (params.debug != 'true') logger.debug('Debug mode disabled! Enable with "debug=true".')

document.getElementById('pic').src = `/res/img/${constants.lname}.png`
if (constants.pronouns.startsWith('she')) document.getElementById('pic').classList.add('trans')

document.title = `${my_name}302`

for (const node of document.getElementsByClassName('const')) {
    node.innerHTML = node.innerHTML.replace(/%\S*%/g, match => {
        return constants[match.replace(/%/g, '')] || match
    })
}

// min and max included 
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}