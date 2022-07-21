/*
MIT License

Copyright (c) [2022] [TheProtonDev]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const alphabet_and_special_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ./\\?, ";
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const splitLines = str => str.split(/\r?\n/);

function parseMarkdown(markdownCode) {
    let isHeader1 = markdownCode.slice(0, 2) === '# ' && alphabet_and_special_chars.search(markdownCode[1]) !== -1
    let isHeader2 = markdownCode.slice(0, 3) === '## ' && alphabet_and_special_chars.search(markdownCode[2]) !== -1
    let isPlaintext = alphabet_and_special_chars.search(markdownCode[0]) !== -1
    let isEmptyLine = markdownCode === ""
    let finalParser = {
        "header1": isHeader1,
        "header2": isHeader2,
        "isPlaintext": isPlaintext,
        "isEmptyLine": isEmptyLine
    }
    console.log(finalParser)
    switch (true) {
        case (finalParser.header1):
            return `<h1>${markdownCode.slice(2, markdownCode.length)}</h1>`
        case (finalParser.header2):
            return `<h2>${markdownCode.slice(2, markdownCode.length)}</h2>`
        case (finalParser.isPlaintext):
            return `${markdownCode} <br>`
        case (finalParser.isEmptyLine):
            return `<br>`
    }
}

function parseChanges() {
    // Function that gets called on every change made to the markdown editor
    let editor = document.getElementById("markdownEditor");

    const toParse = splitLines(editor.value);
    let newMarkdown = [];
    for (let line in toParse) {
        line = toParse[line];
        newMarkdown.push(parseMarkdown(line));
    }
    updatePreview(newMarkdown);
}

function updatePreview(newContent) {
    let preview = document.getElementById("markdownPreview");
    let newString = "";
    for (let lineContent in newContent) {
        lineContent = newContent[lineContent];
        newString += lineContent
    }
    preview.srcdoc = newString
}
