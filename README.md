# binarySearchJS
Binary search on arrays, for all cases, finding something, or finding a position to insert a new element in an ordered list, you can do all, by defining your own comparaison function. Give it a look, and see the test example.

This class offer configuration, so you can create multiple binarySearch object instances, with different configuration (like having two object each one using a different compare function). It allow you to do a quick search following your configuration. Do a binary search on a list, and return first element where the searched Element is smaller or equal, (we have an ordered list, equality mostly when we want to search for an existing element following a certain creteria (ex, object ordred by there id), And the no equality if we want to insert the searched element there, it will be the right ordered place). (you define your order function) (if you don't then it will default to the normal comparison operator < > 0)

**NOTE:** By default if the list is too short (bellow the linearSearchLimit), a linear search is used in place of a binary search, because in such a state a linear search perform better, we are defaulting the limit to 10 elements. You can change that in the configuration.

The **compareFunc** should return 0 if the elements are equal, return a positive number if the the first element is bigger then second, and a negative number if it's the other way.    note that the check function take two parameter that refer to the two elements being compared.



About the **return format**:
{
    **index: ,**=> the search element position if found, or where to insert the element in if not there (the new eL Take that index, and the old one get pushed forward with all the one that follow) (first position where the searchEl is smaller or equal to that position el),
    **el: ,** => the element itself, (because the searchEl can be not an element, and that's it the case in a wide type of applications, and can be an element if it's just about finding the index within the list.  [you build up the compareFunc, and you handle things in the way you like])
    **equale:** => if it's equale or not (false/true)
}


Configuration options: (it's an object with the following properties)
```javascript
{
    compareFunc: ,// comparison function (used for the search)
    linearSearchLimit; , // integer: represent the number of list elements from where if bellow we use linearSearch (in place of binary)
    forceBinary: // force the use of binary search, even if it's for the cases where it default to linearSearch

    // more may come ...
}
```

If you don't precise an option, then the default value will be used.



## How to use

```javascript 
let bs = new BinarySearch({
    compareFunc: function (searchEl, listEl) {
        // your comparison logic here (return 0 pos integer, or negative, as explained above)
    },
    linearSearchLimit: 20, // you can not precise this parameter (will default to 10 if not)
    forceBinary: false // by default false (if true, then no linearSearch Will be done in any situation)
});

// here we get our object let search for something

let result = bs.search(list, searchEl);

// it's as simple as that


// you can alse set the options as follow (one or multiple ones, only what you precise get changed)
bs.setOptions({
    compareFunc: function (searchEL, listEl) {
        //...
    },
    forceBinary: true
}); // here we changed to properties only


// you can also use  this.setCopareFunc to set the compare func, if it's more readable.

bs.setCompareFunc(function (searchEl, listEl) {
    //...
})
```



## Here an example:
So that you see it in action, if you like to run the example, change the directories to the one on your config, and for searchPaths change them, according to a relevent testing. (the comparaison here is following the `localeCompare` string function [strings case insensitive comparaison]).
```javascript
// Notice you need to changet the paths to adapt that test to your host.

const BinarySearch = require('./binarySearch');
const fs = require("fs");
const PATH = require("path");

let path = "/home/coderhero/Documents/coderhero/Dev/git";
let searchPaths = [`${path}/binarySearch`, `${path}/binarySearchJS`, `${path}/edream`, `${path}/ramadanC`, `${path}/ywadi`]; // the last path show that it handle well when the element is past the last element of the list

function compareStringsLocale(a, b) {
    return a.localeCompare(b);
}

let bs = new BinarySearch({  // <===============
    compareFunc: compareStringsLocale,
    //linearSearchLimit: 20,
    forceBinary: true
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


```

You can copy past the Class to use it, or use an import methode, depending on what suite you better and your environement. (you may need to add the statement for the import mechanism).


## Here a preview of binarySearch.js file 
Case you want to copy past the class, or see the implementation, just quickly.

```javascript
/**
 *  this function do a binnary search on a list, and return first element where the searched Element is smaller or equal, (we have an ordered list and if we insert the searched element there, it will be the right ordered place (we need that when we are not searching for equality (finding an element following a creterion))). (you define your order function) (if you don't then it will default to the normal comparison operator < > 0)
 * 
 * the compareFunc should return 0 if the elements are equal, return a negative number if the the first element is bigger then second, and a negative number if it's the other way.    note that the check function take two parameter that refer to the two elements being compared.
 * 
 * 
 * 
 * about the return format:
 * {
 *  index: ,=> the search element position if found, or where to insert the element in if not there (the new eL Take that index, and the old one get pushed forward with all the one that follow) (first position where the searchEl is smaller or equal to that position el),
 *  el: , => the element itself, (because the searchEl can be not an element, and that's it the case in a wide type of applications, and can be an element if it's just about finding the index within the list.  [you build up the compareFunc, and you handle things in the way you like])
 *  equale:  => if it's equale or not (false/true)
 * }
 * 
 * 
 */


var BinarySearch = function (options) {
    var compareFunc,
        linearSearchLimit = 10,
        forceBinary = false,
        firstTimeRun = true;

    function init(options) {
        if (options && options.compareFunc) {
            compareFunc = options.compareFunc;
        } else {
            if(firstTimeRun) {
                compareFunc = function (_searchEl, listEl) {
                    if (_searchEl > listEl) return 1;
                    else if (_searchEl < listEl) return -1;
                    else return 0;
                };
            }
        }

        if (options && options.linearSearchLimit) linearSearchLimit = options.linearSearchLimit;

        if (options && options.forceBinary) forceBinary = options.forceBinary;

        firstTimeRun = false;
    }


    this.search = function (list, searchEl, start, end) {
        if (!forceBinary && list.length <= linearSearchLimit) {
            return linearSearch(list, searchEl, start, end);
        } else {
            return binarySearch(list, searchEl, start, end);
        }
    }

    this.setCompareFunc = function (cmprFunc) {
        compareFunc = cmprFunc;
    }

    this.setOptions = function (options) {
        init(options);
    }

    function linearSearch(list, searchEl, start, end) {
        if (list.length === 0) return null;
        if (!start) start = 0;
        if (!end) end = list.length - 1;
        var compare = null;
        for (var i = start; i <= end; i++) {
            compare = compareFunc(searchEl, list[i]);
            if (compare <= 0) {
                return {
                    index: i,
                    el: list[i],
                    equal: compare === 0
                };
            }
        }

        return {
            index: list.length,
            el: null,
            equal: false
        };
    }

    /*
     * @param {*} list 
     * @param {*} searchEl 
     */
    function binarySearch(list, searchEl, start, end) {
        if (list.length === 0) return null;
        var lastDirection = null;
        var middleIndex = null;
        var startIndex = 0;
        var endIndex = list.length - 1;
        if (start) startIndex = start;
        if (end) endIndex = end;
        var orderCheck = null;

        while (endIndex > startIndex) {
            middleIndex = Math.floor((endIndex + startIndex) / 2);
            orderCheck = compareFunc(searchEl, list[middleIndex]);
            if (orderCheck > 0) { // if searchEl is greater then we need to check the right side
                startIndex = middleIndex + 1;
            } else if (orderCheck < 0) { // searchEl is less we check the left side
                endIndex = middleIndex - 1;
            } else { // that mean it's equal
                return {
                    index: middleIndex,
                    el: list[middleIndex],
                    equal: true
                };
            }
        }
        var index;
        var equality = false;
        if (startIndex === endIndex) { // case where at the end only 3 were left or there where two, and the search element was bigger then the first el. (note that if only two left, the middleIndex will be allways of the first el)
            orderCheck = compareFunc(searchEl, list[startIndex]);
            if (orderCheck > 0) {
                index = startIndex + 1;
            } else if (orderCheck < 0) {
                index = startIndex;
            } else { // orderCheck = 0
                index = startIndex;
                equality = true;
            }
        } else { // here startIndex > endIndex and startIndex < middleIndex
            index = middleIndex; /// there is only two el, and startIndex = middleIndex, and searchEl < list[middleIndex] (because endIndex get to move)
        }

        return {
            index: index,
            el: list[index],
            equal: equality
        };
    }

    init(options);
};






// function bSearch(searchEl, compareFunc) {
//     return binarySearch(this, searchEl, compareFunc);
// }

// Array.prototype.bSearch = bSearch;

module.exports = BinarySearch; // node export (then you import with require)
//export default binarySearch;  //es6 export statement (then you import with the import statement)  [comment and incoment following your environment, and what you prefere]

```