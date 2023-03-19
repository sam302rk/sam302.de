let generateArticlePreview =
    (title, createdAt, descr, file) => { return `<p>* <a href="/blog/?a=${file}">${title}</a> <span class="comment">// ${createdAt}</span><br>↳ ${descr}</p>` }

if (params.a) {
    document.getElementById('home').classList.add('hide')

    fetch(`/blog/articles/${params.a}.md`).then(async res => {
        document.getElementById('article').innerHTML += marked.parse(await res.text())
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
