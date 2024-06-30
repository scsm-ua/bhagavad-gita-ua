var fs = require('fs');
var files = fs.readdirSync('./songs');

files.forEach(file => {
    console.log('');
    console.log('     ----', file);
    console.log('');
    var filename = './songs/' + file;
    var text = fs.readFileSync( filename, { encoding: 'utf8', flag: 'r' });

    text = text.split('\n').map(line => {
        if (line.match(/^> (.+)/) && line.indexOf('—') > -1) {

            var bits = line.replace(/^> /, '').split(/;\s*/);

            return '> ' + bits.map((bit, idx) => {
                // if (bit && bit.indexOf('*') !== 0) {
                //     console.log(JSON.stringify(bit))
                // }

                // Split by first defice.
                var b2 = bit.split('—');

                if (bit) {
                    var word = b2[0].trim();
                    var translation = b2.slice(1).join('—').trim();

                    if (!/^\*[^\*]+\*$/.test(word)) {

                        if (!/\*/.test(word)) {
                            // ok
                        } else if (/^\*/.test(translation)) {
                            // ok
                            translation = translation.replace(/^\*/, '');
                        } else {
                            console.log(JSON.stringify(bit))
                        }
                    }

                    word = word.replace(/^\*/, '');
                    word = word.replace(/\*$/, '');
                    word = word.trim();

                    return `*${word}* — ${translation}`
                } else {
                    return bit;
                }
            }).join('; ').trim();
        }

        return line;
    }).join('\n')

    fs.writeFileSync(filename, text);
});