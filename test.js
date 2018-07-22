// Notice you need to changet the paths to adapt that test to your host.

const BinarySearch = require('./binarySearch');
const fs = require("fs");
const PATH = require("path");

let path = "/home/coderhero/Documents/coderhero/Dev/git";
let searchPaths = [`${path}/binarySearch`, `${path}/edream`, `${path}/ramadanC`, `${path}/ywadi`]; // the last path show that it handle well when the element is past the last element of the list

function compareStringsLocale(a, b) {
    return a.localeCompare(b);
}

let bs = new BinarySearch({  // <===============
    compareFunc: compareStringsLocale,
    linearSearchLimit: 20
});

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
        let result = bs.search(paths, searchPath); // <===========
        console.dir(result);
        console.log("====");
    });
});
