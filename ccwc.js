const fs = require('fs');

function countBytes(content, label) {
    console.log(`${Buffer.byteLength(content, 'utf8')} ${label}`);
}

function countLines(content, label) {
    console.log(`${content.split('\n').length} ${label}`);
}

function countWords(content, label) {
    console.log(`${content.split(/\s+/).filter(Boolean).length} ${label}`);
}

function countCharacters(content, label) {
    console.log(`${Array.from(content).length} ${label}`);
}

function countAll(content, label) {
    const byteCount = Buffer.byteLength(content, 'utf8');
    const lineCount = content.split('\n').length;
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    console.log(`${lineCount} ${wordCount} ${byteCount} ${label}`);
}

function processInput(input, option, label) {
    switch (option) {
        case '-c':
            countBytes(input, label);
            break;
        case '-l':
            countLines(input, label);
            break;
        case '-w':
            countWords(input, label);
            break;
        case '-m':
            countCharacters(input, label);
            break;
        default:
            countAll(input, label);
    }
}

function main() {
    const args = process.argv.slice(2);
    const option = args[0];
    const filePath = args[1];

    if(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        processInput(content, option, filePath);
    } else {
        let input = '';
        process.stdin.on('data', (chunk) => {
            input += chunk;
        });
        process.stdin.on('end', () => {
            processInput(input, option, 'stdin');
        })
    }
}

main();
