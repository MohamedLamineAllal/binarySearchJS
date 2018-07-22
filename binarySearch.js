
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
        forceBinary = false;

    if(options && options.compareFunc) {
        compareFunc = options.compareFunc;
    } else {
        compareFunc = function (_searchEl, listEl) {
            if (_searchEl > listEl) return 1;
            else if (_searchEl < listEl) return -1;
            else return 0;
        };
    }

    if(options && options.linearSearchLimit) linearSearchLimit = options.linearSearchLimit;

    if(options && options.forceBinary) forceBinary = options.forceBinary;

    this.search = function (list, searchEl, start, end) {
        if(!forceBinary && list.length <= linearSearchLimit) {
            return linearSearch(list, searchEl, start, end);
        } else {
            return binarySearch(list, searchEl, start, end);
        }
    }

    function linearSearch(list, searchEl, start, end) {
        if(list.length === 0) return null;
        if(!start) start = 0;
        if(!end) end = list.length -1;
        var compare = null;
        for(var i = start; i <= end; i++){
            compare = compareFunc(searchEl, list[i]);
            if(compare <= 0) {
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
        if(start) startIndex = start;
        if(end) endIndex = end;
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
        if (startIndex === endIndex) { // case where at the end only 3 were left or there where two, and the search element was bigger then the first el. (note that if only two left, the middleIndex will be allways of the first el)
            if (compareFunc(searchEl, list[startIndex]) > 0) {
                index = startIndex + 1;
            } else {
                index = startIndex;
            }
        } else { // here startIndex > endIndex and startIndex < middleIndex
            index = middleIndex; /// there is only two el, and startIndex = middleIndex, and searchEl < list[middleIndex] (because endIndex get to move)
        }

        return {
            index: index,
            el: list[index],
            equal: false
        };
    }
};






// function bSearch(searchEl, compareFunc) {
//     return binarySearch(this, searchEl, compareFunc);
// }

// Array.prototype.bSearch = bSearch;

module.exports = BinarySearch; // node export (then you import with require)
//export default binarySearch;  //es6 export statement (then you import with the import statement)  [comment and incoment following your environment, and what you prefere]



