var fs = require('fs');
var files = fs.readdirSync('./songs');

var stop_sybmols = [' ', ',', ':', '-', '.', ')', '(', '«', '»'];

files.forEach(file => {
    console.log('');
    console.log('     ----', file);
    console.log('');
    var filename = './songs/' + file;
    var text = fs.readFileSync( filename, { encoding: 'utf8', flag: 'r' });

    text = text.split('\n').map(line => {
        if (line.match(/^> (.+)/) && line.indexOf('—') > -1) {
            // word by word - skip
        } else {

            var matches = line.match(/\*[^*]*\*/g);
            matches && matches.forEach && matches.forEach(m => {
                stop_sybmols.find(s => {
                    var d_idx = m.indexOf(s);
                    if (d_idx === 1 || d_idx === m.length - 2) {
                        console.log(m);
                        return true;
                    }
                })
            });

            

            // var matches = line.match(/\*\s+[^*]*\*/g);
            // matches && matches.forEach && matches.forEach(m => {
            //     console.log(m);
            // });
            // var matches = line.match(/\*[^*]*\s+\*/g);
            // matches && matches.forEach && matches.forEach(m => {
            //     console.log(m);
            // })
        }

        return line;
    }).join('\n')

    // fs.writeFileSync(filename, text);
});