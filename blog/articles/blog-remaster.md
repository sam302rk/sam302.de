Welp, it's that time of the year again. It's me again.

I have made some changes to the blog, including changes to the layout and proper code blocks.

## Code blocks

Starting off, I've implemented [Shiki](https://shiki.style/) to convert the code inside the codeblocks into HTML.

That HTML then gets stored into an virtual div to convert it into nodes.

Inside that storage I call `storage.querySelectorAll('span.line')` to loop through all lines and insert them into a table with a column for the line number and a column with the code itself.

And that's about it. Here's the end result:

```js
// This is some example JavaScript code

console.log({ str1: "", array2: [] })

document.querySelectorAll('span.line').forEach(line => parseLine(line))

function parseLine(line) {
    line.id = new Date()
}
```

```csharp
using System;

namespace de.sam302.Example;

// This is a Visual C# (my beloved) example showing off the horizontal scrolling for codeblocks
Console.WriteLine("This is a very very very very very very very very very very very very very very very very very very looooooooooooooooooooooooooooooooooong line");
```

## Paragraphs and headers

You might also noticed, that I changed the font sizes across all blog articles.

Using the [LGC Typographic Scale Calculator](https://www.layoutgridcalculator.com/type-scale/) and with [Sangelo](https://sangelo.space)'s help I generated some proper text sizes, which you might've noticed.

I'm planning to apply these font sizes to the rest of my Website, but that'll be a project for some other day.

And that's about it.

**Thanks for reading!<br>
~ Sam**