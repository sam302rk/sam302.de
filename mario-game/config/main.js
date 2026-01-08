if (document.getElementById('json').innerText === '') {
    fetch('../config.json').then(async resp => {
        if (!resp.ok) return
        document.getElementById('json').innerHTML = await resp.text()
    })
}

document.getElementById('launch').addEventListener('click', () => {
    console.log(document.getElementById('json').value)
    const data = btoa(document.getElementById('json').value)
    window.location.assign(`../?${data}`)
})

document.getElementById('launch_dbg').addEventListener('click', () => {
    console.log(document.getElementById('json').value)
    const data = btoa(document.getElementById('json').value)
    if (confirm('Are you sure, that you want to run this configuration in *DEBUG MODE*?')) {
        window.location.assign(`../?${data}#debug`)
    }
})