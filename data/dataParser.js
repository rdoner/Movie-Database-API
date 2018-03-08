var fs = require('fs');

function processData(savPath, srcPath) {
    fs.readFile(srcPath, 'utf8', function (err, dataIn) {
            if (err) throw err;
            let dataOut = "[";
            let array = dataIn.split("\r\n");
            array.splice(0,2)   // remove header and last line
            array.splice(array.length - 1,1);
            // const newHeader = "movie id, title, year, genres[]\r\n,,,\r\n";
            // dataOut = newHeader 
            array.map((line, index) => {  // parse each line into 4 pieces of valuable data
                let parsedLine = "{"
                const id = /(\d+)/.exec(line)[0];
                let title = "";
                if(/,"/.exec(line)){  // case of titles with commas
                    title = /,"(.*)",/.exec(line)[1];
                } else {
                    title = /,(.*\)),/.exec(line)[1];
                }
                const year = /\((\d{4})\)/.exec(line)[1];
                let genres = /(?:\)|"),([A-Z].*)/.exec(line)[1].split('|');
                // parsedLine = parsedLine + id + ',' + title + ',' + year + ',['
                // genres.forEach(genre => parsedLine = parsedLine + genre + ',');
                // parsedLine = parsedLine.slice(0, -1);
                // parsedLine = parsedLine + ']}\r\n';
                let obj = {}
                obj.title = title;
                obj.id = Number(id);
                obj.year = Number(year);
                obj.genres = genres;
                parsedLine = JSON.stringify(obj);
                // parsedLine = parsedLine + '"id":' + id + ',\n';
                // parsedLine = parsedLine + '"title":' + '"' + title + '",\n';
                // parsedLine = parsedLine + '"year":' + year + ',\n';
                // parsedLine = parsedLine + '"genres": ['
                // genres.forEach(genre => parsedLine = parsedLine + '"' + genre + '"' + ',');
                // parsedLine = parsedLine.slice(0, -1);
                // parsedLine = parsedLine + ']},\n';
                // obj = JSON.parse(parsedLine);
                // console.log(parsedLine);
                dataOut = dataOut + parsedLine + ',';
            });
            dataOut = dataOut.slice(0,-1) + ']';
            fs.writeFile (savPath, dataOut, function(err) {
                if (err) throw err;
                console.log('complete');
            });
        });
}

processData('parsedData.JSON','data.csv')