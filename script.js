function highlightCell(rowIndex, colIndex) {
    let table = document.getElementById("cipherTable");
    let rows = table.rows;

    if (rowIndex >= rows.length || colIndex >= rows[0].cells.length) {
        console.error('Ungültige Zeilen- oder Spaltenindex.');
        return;
    }

    for (let r = 0; r < rows.length; r++) {
        let cells = rows[r].cells;
        for (let c = 0; c < cells.length; c++) {
            cells[c].classList.remove("highlight-cell", "highlight-row-col");
        }
    }

    rows[rowIndex].cells[colIndex].classList.add("highlight-cell");

    let selectedRow = rows[rowIndex];
    for (let i = 0; i < selectedRow.cells.length; i++) {
        if (i !== colIndex) {
            selectedRow.cells[i].classList.add("highlight-row-col");
        }
    }

    for (let i = 0; i < rows.length; i++) {
        if (i !== rowIndex) {
            rows[i].cells[colIndex].classList.add("highlight-row-col");
        }
    }
}

/*function getLastLetter(text) {
    for (let i = text.length - 1; i >= 0; i--) {
        if (/[a-zA-Z]/.test(text[i])) {
            return text[i].toUpperCase();
        }
    }
    return null;
}

function getLetterValue(letter) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const upperLetter = letter.toUpperCase();

    const index = alphabet.indexOf(upperLetter);
    if (index !== -1) {
        return index + 1;
    }
    return null;
}

function processTexts() {
    let plaintext = document.getElementById("input").value;
    let ciphertext = document.getElementById("output").value;

    let lastPlainChar = getLastLetter(plaintext);
    let lastCipherChar = getLastLetter(ciphertext);


    if (lastPlainChar && lastCipherChar) {
        highlightCell(getLetterValue(lastCipherChar),getLetterValue(lastPlainChar))
        

    } else {
        let table = document.getElementById("cipherTable");
        let rows = table.rows;

        for (let r = 0; r < rows.length; r++) {
            let cells = rows[r].cells;
            for (let c = 0; c < cells.length; c++) {
                cells[c].classList.remove("highlight-cell", "highlight-row-col");
            }
        }
    }
}
*/


//working
function vigenereEncrypt(plaintext, keyword) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let encryptedText = '';
    const keywordRepeated = keyword.toUpperCase().repeat(Math.ceil(plaintext.length / keyword.length)).slice(0, plaintext.length).toUpperCase();

    for (let i = 0, j = 0; i < plaintext.length; i++) {
        const char = plaintext[i].toUpperCase();

        if (alphabet.includes(char)) {
            const charIndex = alphabet.indexOf(char);
            const keywordChar = keywordRepeated[j];
            const keywordIndex = alphabet.indexOf(keywordChar);
            const encryptedIndex = (charIndex + keywordIndex) % 26;
            encryptedText += alphabet[encryptedIndex];
            highlightCell(keywordIndex + 1, charIndex + 1);
            j++;
        } else {
            encryptedText += char;
        }
    }

    return encryptedText;
}


//working
function vigenereDecrypt(ciphertext, keyword) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let decryptedText = '';
    const keywordRepeated = keyword.toUpperCase().repeat(Math.ceil(ciphertext.length / keyword.length)).slice(0, ciphertext.length).toUpperCase();

    for (let i = 0, j = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i].toUpperCase();

        if (alphabet.includes(char)) {
            const charIndex = alphabet.indexOf(char);
            const keywordChar = keywordRepeated[j];
            const keywordIndex = alphabet.indexOf(keywordChar);
            const decryptedIndex = (charIndex - keywordIndex + 26) % 26;
            decryptedText += alphabet[decryptedIndex];
            highlightCell(keywordIndex + 1, (charIndex - keywordIndex + 26) % 26 + 1 );
            j++;
        } else {
            decryptedText += char;
        }
    }

    return decryptedText;
}


/*
function updateResultsInput() {
    const plaintext = document.getElementById('input').value;
    const keyword = document.getElementById('key').value;


    if (!keyword) {
        document.getElementById('output').value = '';
        return;
    }
    if (!plaintext) {
        document.getElementById('output').value = '';
        return;
    }

    if (plaintext) {
        const encrypted = vigenereEncrypt(plaintext, keyword);
        document.getElementById('output').value = `${encrypted}`;
    }
}
function updateResultsOutput() {
    const ciphertext = document.getElementById('output').value;
    const keyword = document.getElementById('key').value;


    if (!keyword) {
        document.getElementById('input').value = '';
        return;
    }
    if (!ciphertext) {
        document.getElementById('input').value = '';
    }

    if (ciphertext) {
        const decrypted = vigenereDecrypt(ciphertext, keyword);
        document.getElementById('input').value = `${decrypted}`;
    }
}
*/

document.getElementById('input').addEventListener('input', 
    function event()
    {
        let key = document.getElementById("key").value;
        let input = document.getElementById("input").value;
        if(key != "" && input != "")
        {
            document.getElementById('button-svg').classList.remove('button-svg')
            document.getElementById('button-label').textContent = "Encrypt"
            document.getElementById("output").value = vigenereEncrypt(input, key);
        }else
        {
            document.getElementById("output").value = "";
        }
    }
);
document.getElementById('output').addEventListener('input',
    function event()
    {
        if(document.getElementById("key").value != "" && document.getElementById("output").value != "")
        {
            document.getElementById('button-svg').classList.add('button-svg')
            document.getElementById('button-label').textContent = "Decrypt"
            document.getElementById("input").value = vigenereDecrypt(document.getElementById("output").value, document.getElementById("key").value);
        }else
        {
            document.getElementById("input").value = "";
        }
    }
);
document.getElementById('key').addEventListener('input', 
    function event()
    {
        if(document.getElementById('button-svg').classList.contains('button-svg'))
            {
                document.getElementById('input').value = vigenereDecrypt(document.getElementById("output").value, document.getElementById("key").value)
            }else
            {
                document.getElementById('output').value = vigenereDecrypt(document.getElementById("input").value, document.getElementById("key").value)
            }
    }
);

function buttonCrypt()
{
    let svg = document.getElementById('button-svg')
    svg.classList.toggle('button-svg')
    if(svg.classList.contains('button-svg'))
    {
        document.getElementById('button-label').textContent = "Decrypt"
    }else
    {
        document.getElementById('button-label').textContent = "Encrypt"
    }
}
