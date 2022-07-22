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

function isBolded(markdownCode) {
    // TODO: Get this to work as expected upon the input of 2 or more bolded words
    let asterisksFound = [];
    let grabAsterisk = true;
    for (let charIndex in markdownCode) {
        let char = markdownCode[charIndex];
        if (char === "*") {
            if (grabAsterisk) {
                console.log("Test");
                asterisksFound.push(charIndex);
                grabAsterisk = false;
            }
            else if (!grabAsterisk) {
                grabAsterisk = true;
            }
        }
    }
    console.log(asterisksFound);
    let numToAdd = 0;
    for (let i = 0; i < 3 / 2; i++) {
        if (asterisksFound.length % 2 === 0) {
            // Get the position of the first actual character after being prefaced with **
            let boldBorder1 = asterisksFound[0 + i];
            // Get the position of the last actual character after being closed with **
            let boldBorder2 = asterisksFound[1 + i];

            let textToBeBolded = markdownCode.slice(boldBorder1, boldBorder2);
            console.log(textToBeBolded)
            textToBeBolded = textToBeBolded.slice(1, textToBeBolded.length);

            console.log(textToBeBolded);
            numToAdd++;
        }

    }
}

isBolded("# **Test** 2 **bold2**")

function parseMarkdown(markdownCode) {
    let isHeader1 = markdownCode.slice(0, 2) === '# ' && alphabet_and_special_chars.search(markdownCode[1]) !== -1;
    let isHeader2 = markdownCode.slice(0, 3) === '## ' && alphabet_and_special_chars.search(markdownCode[2]) !== -1;
    let isHeader3 = markdownCode.slice(0, 4) === '### ' && alphabet_and_special_chars.search(markdownCode[3]) !== -1;
    let isHeader4 = markdownCode.slice(0, 5) === '#### ' && alphabet_and_special_chars.search(markdownCode[4]) !== -1;
    let isHeader5 = markdownCode.slice(0, 6) === '##### ' && alphabet_and_special_chars.search(markdownCode[5]) !== -1;
    let isHeader6 = markdownCode.slice(0, 7) === '###### ' && alphabet_and_special_chars.search(markdownCode[6]) !== -1;
    let isPlaintext = alphabet_and_special_chars.search(markdownCode[0]) !== -1;
    let isEmptyLine = markdownCode === "";
    let finalParser = {
        "header1": isHeader1,
        "header2": isHeader2,
        "header3": isHeader3,
        "header4": isHeader4,
        "header5": isHeader5,
        "header6": isHeader6,
        "isPlaintext": isPlaintext,
        "isEmptyLine": isEmptyLine
    };
    switch (true) {
        case (finalParser.header1):
            return `<h1>${markdownCode.slice(2, markdownCode.length)}</h1>`;
        case (finalParser.header2):
            return `<h2>${markdownCode.slice(2, markdownCode.length)}</h2>`;
        case (finalParser.header3):
            return `<h3>${markdownCode.slice(3, markdownCode.length)}</h3>`;
        case (finalParser.header4):
            return `<h4>${markdownCode.slice(4, markdownCode.length)}</h4>`;
        case (finalParser.header5):
            return `<h5>${markdownCode.slice(5, markdownCode.length)}</h5>`;
        case (finalParser.header6):
            return `<h6>${markdownCode.slice(6, markdownCode.length)}</h6>`;
        case (finalParser.isPlaintext):
            return `<p>${markdownCode}</p> <br>`;
        case (finalParser.isEmptyLine):
            return `<br>`;
    }
}

function parseChanges() {
    // Function that gets called on every change made to the markdown editor
    let editor = document.getElementById("markdownEditor");

    const toParse = splitLines(editor.value);
    let newMarkdown = [];
    for (let line in toParse) {
        line = toParse[line];

        let parseResult = parseMarkdown(line);
        if (parseResult === undefined) {
            newMarkdown.push("<p style='color: red;'>" +
                "Syntax Error. Please make sure you're following <a href='https://www.markdownguide.org" +
                "/basic-syntax'>Markdown Best Practices.</a> <a href='https://github.com/TheProtonDev/markdown-editor" +
                "/issues/new?title=Syntax%20Error%20Report'><br>If you confirm that you are, please report a detailed issue submission on GitHub" +
                "</a></p>");
        } else {
            newMarkdown.push(parseResult);
        }
    }
    updatePreview(newMarkdown);
}

function updatePreview(newContent) {
    let preview = document.getElementById("markdownPreview");
    let newString = "";
    for (let lineContent in newContent) {
        lineContent = newContent[lineContent];
        newString += lineContent;
    }
    preview.srcdoc = newString;
}
