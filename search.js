var path = require('path')
var fs = require('fs');
var currentFolder = process.cwd();
var ext = process.argv[2];
var txt = process.argv[3];
var flag = 0;

if (process.argv.length <= 3) {
    console.log('USAGE: node search [EXT] [TEXT]');
    process.exit(-1);
}
function fromDir(startPath, ext, txt) {
	var files = fs.readdirSync(startPath);
	
	for(var i = 0; i < files.length; i++) {
		var filename = path.join(startPath, files[i]);
		var stat = fs.lstatSync(filename);
		
		if (stat.isDirectory()) {
			fromDir(filename, ext, txt);
		}
		else if (filename.endsWith(ext)) {
			var content = fs.readFileSync(filename, 'utf8');
			
				if(content.indexOf(txt) >= 0) {
					console.log(filename);
					flag = 1;
				}
			}
	};
}
fromDir(currentFolder, ext, txt);
if (flag == 0) {
	console.log("No file was found");
}