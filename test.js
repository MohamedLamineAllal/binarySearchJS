const binarySearch = require('./binarySearch');
const fs = require("fs");
const PATH = require("path");

let path = "/home/coderhero/Documents/coderhero/Dev/git";
let searchPaths = [`${path}/binarySearch`, `${path}/edream`, `${path}/ramadanC`];

function compareStringsLocale(a, b) {
    return a.localeCompare(b);
}

fs.readdir(path, function(err, names) {
    if(err) throw err;
    console.log("names = ");
    console.dir(names);
    let paths = names.map(name => PATH.join(path, name));

    paths = paths.sort(compareStringsLocale);
    
    console.log("paths = ");
    paths.forEach(pth => {console.log(pth);});


    console.log("====");
    searchPaths.forEach(searchPath => {
        console.log(`search result for ${searchPath} is :`);
        let result = binarySearch(paths, searchPath, compareStringsLocale); // <===========
        console.dir(result);
        console.log("====");
    });
});
