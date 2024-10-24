// func to check for errors
function submissionCheck() {

    // check variable, false if there are input errors.
    var check = true;

    // values from html are input here
    var cmin = document.getElementById('cminrange').value;
    var cmax = document.getElementById('cmaxrange').value;
    var rmin = document.getElementById('rminrange').value;
    var rmax = document.getElementById('rmaxrange').value;

    // converting the values into integers to use in the min/max checks and comparison checks
    var cmin_int = parseInt(cmin, 10);
    var cmax_int = parseInt(cmax, 10);
    var rmin_int = parseInt(rmin, 10);
    var rmax_int = parseInt(rmax, 10);

    // override existing content and replace with new content
    var container_exists = document.getElementById("mult_container");
    if(container_exists != null)
        container_exists.parentNode.removeChild(container_exists);
    var table_exists = document.getElementById("mult_table");
    if(table_exists != null)
        table_exists.parentNode.removeChild(table_exists);
    var error_exists = document.getElementById("error_msg");
    if(error_exists != null)
        error_exists.parentNode.removeChild(error_exists);

    // creating error_msg variable, append whenever there is an error
    let error_msg = document.createElement('p');
    error_msg.setAttribute('id', 'error_msg');
    error_msg.innerHTML = "[Error]: Modify the values based on the requirements below to generate the table:<br>";
    
    // validate that the input is numbers only and fall into the range
    if(cmin.length == 0 || isNaN(cmin) || cmin_int < -50 || cmin_int > 50)
    {
        error_msg.innerHTML += "- Enter a number between -50 and 50 for Minimum Column Value<br>";
        check = false;
    }
    if(cmax.length == 0 || isNaN(cmax) || cmax_int < -50 || cmax_int > 50)
    {
        error_msg.innerHTML += "- Enter a number between -50 and 50 for Maximum Column Value<br>";
        check = false;
    }
    if(rmin.length == 0 || isNaN(rmin) || rmin_int < -50 || rmin_int > 50)
    {
        error_msg.innerHTML += "- Enter a number between -50 and 50 for Minimum Row Value<br>";
        check = false;
    }
    if(rmax.length == 0 || isNaN(rmax) || rmax_int < -50 || rmax_int > 50)
    {
        error_msg.innerHTML += "- Enter a number between -50 and 50 for Maximum Row Value<br>";
        check = false;
    }

    // check range of numbers entered to input boxes
    if(cmax_int < cmin_int)
    {
        error_msg.innerHTML += "- Column range is incompatible, adjust the values: min column range is higher than max column range (" + cmin + " > " + cmax + ")<br>";
        check = false;
    }
    if(rmax_int < rmin_int)
    {
        error_msg.innerHTML += "- Row range incompatible, adjust the values: min row range is higher than max row range (" + rmin + " > " + rmax+ ")<br>";
        check = false;
    }

    // if all requirements are met, table should generate, otherwise: display error
    if(check == true)
    {
        generateTable(cmin_int, cmax_int, rmin_int, rmax_int);
    }
    else
    {
        document.getElementById('body').appendChild(error_msg);
    }
}

function generateTable(cmin, cmax, rmin, rmax) {
    // declaring the variables that will be used to display the table
    let container = document.createElement('div');
    container.setAttribute('id', 'mult_container');
    let table = document.createElement('table');
    table.setAttribute('id', 'mult_table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // appending proper html elements as children to other elements
    container.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);

    // adding the entire table to the body tag
    document.getElementById('body').appendChild(container);

    // creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "#";
    row_1.appendChild(heading_1);

    // adding values on row head (column values) from min to max values
    for(let i = cmin; i <= cmax; i++)
    {
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = i.toString();
        row_1.appendChild(heading_2);
    }
    thead.appendChild(row_1);


    // creating and adding the data to 2nd row of table
    // adding values on tbody th column (contains row numbers) from min to max value
    for(let i = rmin; i <= rmax; i++)
    {
        let row_next = document.createElement('tr');
        let row_next_head = document.createElement('th');
        row_next_head.innerHTML = i.toString();
        row_next.appendChild(row_next_head);

        // calc and fill in all td of the table (products of the column and row values)
        for(let j = cmin; j <= cmax; j++)
        {
            let row_next_data = document.createElement('td');
            let product = i * j;
            row_next_data.innerHTML = product.toString();
            row_next.appendChild(row_next_data);
        }
        tbody.appendChild(row_next);
    }
}