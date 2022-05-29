const { GoogleSpreadsheet } = require('google-spreadsheet');
const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
const AutoDetectDecoderStream = require('autodetect-decoder-stream');
const inquirer = require('inquirer');

var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 --credpath [path] --csvpath [path] --gsheetid [id] --gsheettitle [title]')
    .demandOption(['credpath', 'csvpath','gsheetid','gsheettitle'])
    .argv;

console.log(argv);

var rows = Array();
let inputStream = Fs.createReadStream(argv.csvpath).pipe(new AutoDetectDecoderStream({ defaultEncoding: '1255' }))
inputStream
	.pipe(new CsvReadableStream({ parseNumbers:true, delimiter:'\t'}))
	.on('data', function (row) {
		result = row.map(String)
		rows.push(result)
	})
	.on('end', function() {
		console.log('end');
	});

(async function() {
	const creds = require(argv.credpath); 
	const doc = new GoogleSpreadsheet(argv.gsheetid);
	await doc.useServiceAccountAuth(creds);
	await doc.loadInfo(); 
	const sheet = doc.sheetsByTitle[argv.gsheettitle]
	console.log(doc.title);
	console.log(sheet.title);
	await sheet.clear();
	console.log(rows[0]);
	await sheet.setHeaderRow(rows[0]);
  await sheet.addRows(rows.slice(1));
}());