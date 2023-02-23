const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})

const constants = {
    'year': new Date().getFullYear(),
    'url': window.location,
    'path': window.location.pathname
}

if (params.debug != 'true') logger.debug('Debug mode disabled! Enable with "debug=true".')

for (const node of document.getElementsByClassName('const')) {
    node.innerHTML = node.innerHTML.replace(/%\S*%/g, match => {
        return constants[match.replace(/%/g, '')] || match
    })
}