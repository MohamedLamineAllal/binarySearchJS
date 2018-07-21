# binarySearchJS
Binary search on arrays, for all cases, finding something, or finding a position to insert a new element in an ordered list, you can do all, by defining your own comparaison function. Give it a look, and see the test example.

This function do a binnary search on a list, and return first element where the searched Element is smaller or equal, (we have an ordered list, equality mostly when we want to search for an existing element following a certain creteria (ex, object ordred by there id), And the no equality if we want to insert the searched element there, it will be the right ordered place). (you define your order function) (if you don't then it will default to the normal comparison operator < > 0)

the **orderCheckFunction** should return 0 if the elements are equal, return a positive number if the the first element is bigger then second, and a negative number if it's the other way.    note that the check function take two parameter that refer to the two elements being compared.



about the **return format**:
{
    **index: ,**=> the search element position if found, or where to insert the element in if not there (the new eL Take that index, and the old one get pushed forward with all the one that follow) (first position where the searchEl is smaller or equal to that position el),
    **el: ,** => the element itself, (because the searchEl can be not an element, and that's it the case in a wide type of applications, and can be an element if it's just about finding the index within the list.  [you build up the orderCheckFunction, and you handle things in the way you like])
    **equale:** => if it's equale or not (false/true)
}




## Here an example:
So you see it in action, if you like to run the example, change the directories to the one on your config, and for searchPaths change them, according to a relevent testing. (the comparaison here is following the `localeCompare` string function [strings case insensitive comparaison]).
```javascript
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
        let result = binarySearch(paths, searchPath, compareStringsLocale);
        console.dir(result);
        console.log("====");
    });
});

```

You can copy past the function to use it, or use an import methode, depending on what suite you better and your environement. (you may need to add the statement for the import mechanism).