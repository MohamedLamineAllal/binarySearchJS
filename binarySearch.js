/**
 *  this function do a binnary search on a list, and return first element where the searched Element is smaller or equal, (we have an ordered list and if we insert the searched element there, it will be the right ordered place (we need that when we are not searching for equality (finding an element following a creterion))). (you define your order function) (if you don't then it will default to the normal comparison operator < > 0)
 * 
 * the orderCheckFunction should return 0 if the elements are equal, return a negative number if the the first element is bigger then second, and a negative number if it's the other way.    note that the check function take two parameter that refer to the two elements being compared.
 * 
 * 
 * 
 * about the return format:
 * {
 *  index: ,=> the search element position if found, or where to insert the element in if not there (the new eL Take that index, and the old one get pushed forward with all the one that follow) (first position where the searchEl is smaller or equal to that position el),
 *  el: , => the element itself, (because the searchEl can be not an element, and that's it the case in a wide type of applications, and can be an element if it's just about finding the index within the list.  [you build up the orderCheckFunction, and you handle things in the way you like])
 *  equale:  => if it's equale or not (false/true)
 * }
 * 
 * 
 * @param {*} list 
 * @param {*} searchEl 
 * @param {*} orderCheckFunction 
 */
function binarySearch(list, searchEl, orderCheckFunction) {
    let lastDirection = null;
    let middleIndex = null;
    let startIndex = 0;
    let endIndex = list.length - 1;
    let orderCheck = null;

    if(!orderCheckFunction) {
        orderCheckFunction = function (el1, el2) {
            if(el1 > el2) return 1;
            else if(el1 < el2) return -1;
            else return 0;
        }
    }

    while (endIndex > startIndex) {
        middleIndex = Math.floor((endIndex + startIndex) / 2);
        orderCheck = orderCheckFunction(searchEl, list[middleIndex]);
        if (orderCheck > 0) { // if searchEl is greater then we need to check the right side
            startIndex = middleIndex + 1;
        } else if (orderCheck < 0) { // searchEl is less we check the left side
            endIndex = middleIndex - 1;
        } else { // that mean it's equal
            return {index: middleIndex, el: list[middleIndex], equal: true};
        }
    }
    let index;
    if(startIndex === endIndex) { // case where at the end only 3 were left or there where two, and the search element was bigger then the first el. (note that if only two left, the middleIndex will be allways of the first el)
        if(orderCheckFunction(searchEl, list[startIndex]) > 0) { 
           index = startIndex + 1;
        } else {
            index = startIndex;
        }
    } else { // here startIndex > endIndex and startIndex < middleIndex
        index = middleIndex;   /// there is only two el, and startIndex = middleIndex, and searchEl < list[middleIndex] (because endIndex get to move)
    }
    return { index, el: list[index], equale: false };
}

module.exports = binarySearch; // node export (then you import with require)
//export default binarySearch;  //es6 export statement (then you import with the import statement)  [comment and incoment following your environment, and what you prefere]