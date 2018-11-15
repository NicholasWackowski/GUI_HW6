//Nicholas Wackowski, 2018. Creates a dynamic table using JavaScript
//Code for dynamic table originally based on this video by "WEB Programming": 
//https://www.youtube.com/watch?v=XFGtGzZhy_A

function makeTable(){
	var table = '';
	//This resets the 'Error' text, so if the user previously had an improper input value
	//but then corrected it, the text goes away upon the function being called.
	document.getElementById("xError").innerHTML = ("");
	document.getElementById("yError").innerHTML = ("");

	//Get the values of rows and cols.
	//JS is dumb and tries to set the inputs as strings, not Numbers, so I cast them
	//in the variable declaration so as to set them to the correct type.
	var colStart = Number( document.getElementById("colStart").value );
	var colEnd = Number( document.getElementById("colEnd").value );
	var rowStart = Number( document.getElementById("rowStart").value );
	var rowEnd = Number( document.getElementById("rowEnd").value );

	//Handles validation in a separate function
	if( validation(colStart, colEnd, rowStart, rowEnd) == false ){
		return;
	}

	//First row (border):
	table += "<tr><td></td>";
	for(var cBorder = colStart; cBorder <= colEnd; cBorder++){
		table += ("<td id=topBorder>" + cBorder + "</td>");
	} table+= "</tr>";
	//End First row (border)

	//Fill each row:
	for ( var numRows = rowStart; numRows <= rowEnd; numRows++){
		table += "<tr><td id=sideBorder>" + numRows + "</td>";
		for ( var numCols = colStart; numCols <= colEnd; numCols++){
			//Check to see if it is the diagonal:
			if(numCols == numRows){	//If it IS diagonal, give it a different tag for CSS purposes
				table += ( "<td id=diagonal>" + numCols*numRows + "</td>" );
			}else{
				table += ( "<td id=else>" + numCols*numRows + "</td>" );
			}
		}
		table += "</tr>";
	}
	//Sets the HTML within the 'TABLE' div. This overwrites any previous code in that section
	//of the HTML file, meaning that an old table will be discarded and replaced with the new one.
	document.getElementById("TABLE").innerHTML = ("<table border=1>" +  table + "</table>");
}

//Returns true if everything checks out, otherwise returns false.
function validation(colStart, colEnd, rowStart, rowEnd){
	//Check for valid data types
	if((typeof colStart) != "number" || (typeof colEnd) != "number"){
		document.getElementById("xError").innerHTML = ("ERROR: Input must be valid integer!");
		return false;
	}
	if((typeof rowStart) != "number" || (typeof rowEnd) != "number"){
		document.getElementById("yError").innerHTML = ("ERROR: Input must be valid integer!");
		return false;
	}
	//Check to make sure that start values are less than or equal to end values!
	if(colStart > colEnd){
		document.getElementById("xError").innerHTML = ("ERROR: Start value should not be greater than end value!");
		return false;
	}
	if(rowStart > rowEnd){
		document.getElementById("yError").innerHTML = ("ERROR: Start value should not be greater than end value!");
		return false;
	}
	//Check if the difference between the two would cause a freeze/crash
	if(colEnd-colStart > 100){
		document.getElementById("xError").innerHTML = ("ERROR: Difference between start and end values too great; could cause crash!");
		return false;
	}
	if(rowEnd-rowStart > 100){
		document.getElementById("yError").innerHTML = ("ERROR: Difference between start and end values too great; could cause crash!");
		return false;
	}

	//If it reached this point, then that means all the checks passed successfully and the validation can return true
	return true;
}