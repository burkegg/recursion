// If life were easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
	let arr = [];
	let getem = function(node){
  	//console.log(node.classList);
  	// Look at the current node's classList
  	// If it has the right stuff, push it to output.
  	let currentNode
  		if (_.contains(node.classList, className)){
    		//console.log("here's one:  " + node.classList);
    		arr.push(node);
  		}
  	    // Does the node have kids?
  	    // If so, call getem on each kid.
  		let currentList = node.childNodes;
  		for (let i = 0; i < currentList.length; i++){
    		getem(node.childNodes[i]);
  		}
	}
    //console.log(arr[0]);
	getem(document);
	return arr;
}
