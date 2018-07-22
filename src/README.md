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
//=include ../test.js

```

You can copy past the Class to use it, or use an import methode, depending on what suite you better and your environement. (you may need to add the statement for the import mechanism).


## Here a preview of binarySearch.js file 
Case you want to copy past the class, or see the implementation, just quickly.

```javascript
//= include ../binarySearch.js

```