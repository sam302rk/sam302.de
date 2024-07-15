import { codeToHtml } from 'https://esm.sh/shiki@1.0.0'

let generateArticlePreview =
    (title, createdAt, descr, file) => { return `<p>* <a href="/blog/?article=${file}" class="title">${title}</a> <span class="comment">// ${createdAt}</span><br>↳ ${descr}</p>` }

if (params.article) {
    document.getElementById('home').classList.add('hide')

    fetch(`/blog/articles/${params.article}.md`).then(async res => {
        document.getElementById('article').innerHTML += marked.parse(await res.text())

        document.getElementById('article').querySelectorAll("pre").forEach(async pre => {
            const code = pre.querySelector("code")

            let lang = "txt"
            code.classList.forEach(element => {
                if (element.startsWith("language-")) lang = element.replace("language-", '')
            })

            const generated = await codeToHtml(code.innerHTML, {
                lang: lang,
                theme: 'catppuccin-mocha'
            })

            let storage = document.createElement('div')
            storage.innerHTML = generated
            code.innerHTML = ""

            let count = 1
            let table = document.createElement('table')

            storage.querySelectorAll('span.line').forEach(line => {
                let tr = document.createElement('tr')
                
                let td_line = document.createElement('td')
                td_line.classList.add('line')
                td_line.innerHTML = count
                count += 1
                
                let td_code = document.createElement('td')
                td_code.classList.add('code')
                td_code.append(line)

                tr.append(td_line)
                tr.append(td_code)
                table.append(tr)
            })

            code.append(table)
        })
    })
} else {
    document.getElementById('arwin').classList.add('hide')

    fetch('/blog/articles.json').then(async res => {
        const json = await res.json()
        json.forEach(ca => {
            document.getElementById('index').innerHTML += generateArticlePreview(ca.title, new Date(ca.created_at).toLocaleString(), ca.descr, ca.file)
        })
    })
}
