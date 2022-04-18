countryData = {
    India: {
        Maharashtra: ["Mumbai", "Pune", "Nashik", "Nagpur", "Solapur"],
        Gujarat: ["Ahemdabad", "Surat", "Anand", "Rajkot", "Vadodara"],
        Rajastan: ["Jaipur", "Jodhpur", "Kota", "Ajmer", "Bikaner"],
        Karnataka: ["Bengluru", "Ballari", "Mysuru", "Dharwad"],
        Madhyapradesh: ["Bhopal", "Ujjain", "Indore", "Dewas"]
    },
    Usa: {
        Texas: ["Houston", "San Antonio", "	Dallas"],
        California: ["Los Angeles", "Oakland", "Fresno", "Irvino"],
        Florida: ["Miami", "Tempa", "Sarasota"]
    },
    Australia: {
        Queensland: ["Brisbane", "Mackay", "Emerald"],
        Victoria: ["Melbourne", "Geelong", "Ballarat"],
        Tasmania: ["Abbotsham", "Perth", "Aberdeen"],
        SouthAustralia: ["Adelaide", "Gawler", "Whyalla"]
    }
};

var key = "";
var arr = [];
var id;
var td;

var selectedRow = null

function Country() {
    var key = Object.keys(countryData);
    key.map(x => document.getElementById("country").innerHTML += '<option>' + x + '</option>')
}

function State(event) {
    document.getElementById("state").innerHTML = '<option value = "" selected="selcted"> Select Your State</option>';
    document.getElementById("city").innerHTML = '<option value = "" selected="selcted"> Select Your City</option>';
    key = event.target.value;
    var key1 = Object.keys(countryData[key]);
    key1.map(x1 => document.getElementById("state").innerHTML += '<option>' + x1 + '</option>')
}

function City(event) {
    document.getElementById("city").innerHTML = '<option value = "" selected="selcted"> Select Your City</option>';
    var val3 = event.target.value;
    var abcde = countryData[key][val3];
    abcde.map(x2 => document.getElementById("city").innerHTML += '<option>' + x2 + '</option>')
}
Country();

function CheckForBlank() {
    if (document.getElementById('fname').value == "") {
        alert("enter the first name!");
        document.getElementById('fname').focus()
        return false;
    }
    if (document.getElementById('mname').value == "") {
        alert("enter the middle name!");
        document.getElementById('mname').focus()
        return false;
    }
    if (document.getElementById('lname').value == "") {
        alert("enter the last name!");
        document.getElementById('lname').focus()
        return false;
    }
    if (document.getElementById('dob').value == "") {
        alert("enter the Date of Birth!");
        document.getElementById('dob').focus()
        return false;
    }

    var bgen = document.getElementsByName("gender");
    if (!(bgen[0].checked || bgen[1].checked)) {
        alert("Please! Select Your gender!!")
        return false;
    }

    if (document.getElementById('country').value == "") {
        alert("enter your country!");
        document.getElementById('country').focus()
        return false;
    }
    if (document.getElementById('state').value == "") {
        alert("enter your state!");
        document.getElementById('state').focus()
        return false;
    }
    if (document.getElementById('city').value == "") {
        alert("enter your city!");
        document.getElementById('city').focus()
        return false;
    }
    return true;
}

function ReadFormData() {
    // if (CheckForBlank()) {

    var upid = Math.max.apply(null, arr.map(ele => ele.id));
    console.log(upid);

    var formdata = {};
    formdata.id = upid == -Infinity ? 1 : upid + 1;
    var gen = displayRadioValue();
    var checkValue = Check();
    formdata.firstname = document.getElementById("fname").value;
    formdata["middlename"] = document.getElementById("mname").value;
    formdata["lastname"] = document.getElementById("lname").value;
    formdata["dob"] = document.getElementById("dob").value;
    formdata["gender"] = gen;
    formdata["country"] = document.getElementById("country").value;
    formdata["state"] = document.getElementById("state").value;
    formdata["city"] = document.getElementById("city").value;
    formdata["marriedstatus"] = checkValue;
    arr1(formdata);
    // console.log(arr1(formdata));
    // return formdata
    //}

}

function displayRadioValue() {
    var rates = document.getElementsByName('gender');
    var rate_value;
    for (var i = 0; i < rates.length; i++) {
        if (rates[i].checked) {
            rate_value = rates[i].value;
        }
    }
    return rate_value;
}

function displayRadioValue1() {
    var rates = document.getElementsByName('gender');
    for (var i = 0; i < rates.length; i++) {
        rates[i].checked = false
    }
}



function Check() {
    let check = document.getElementById("check");
    let checkValue = "";
    if (check.checked) {
        checkValue = "Yes";
    } else {
        checkValue = "No";
    }
    return checkValue;
}

function arr1(x) {
    arr.push(x);
    insertNewRecord(arr);
    resetForm();

}

console.log(arr);

function insertNewRecord() {
    var table = document.getElementById("personList").getElementsByTagName('tbody')[0];
    table.innerHTML = ""
    arr.map((array) => {
        var newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0)
        cell1.innerHTML = array.id;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = array.firstname;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = array.middlename;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = array.lastname;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = array.dob;
        cell6 = newRow.insertCell(5);
        cell6.innerHTML = array.gender;
        cell7 = newRow.insertCell(6);
        cell7.innerHTML = array.country;
        cell8 = newRow.insertCell(7);
        cell8.innerHTML = array.state;
        cell9 = newRow.insertCell(8);
        cell9.innerHTML = array.city;
        cell10 = newRow.insertCell(9);
        cell10.innerHTML = array.marriedstatus;
        cell10 = newRow.insertCell(10);
        cell10.innerHTML = `<button onClick="onEdit(${array.id})">Edit</button>
                       <button onClick="onDelete(${array.id})" >Delete</button>`;

    });
    // resetForm(); 
}

function resetForm() {
    document.getElementById("fname").value = "";
    document.getElementById("mname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("country").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    document.getElementById("check").checked = false;
    document.getElementsByName("gender").checked = displayRadioValue1();
}

function onEdit(id) {
    let index1 = arr.findIndex(data => data.id === id)
    let obj = arr[index1];
    updateId = index1;

    let state = document.getElementById("state")
    state.innerHTML = '<option value = "" selected="selcted">Select Your State </option>';
    let city = document.getElementById("city")
    city.innerHTML = '<option value = "" selected="selcted"> Select Your City</option>';
    document.getElementById("fname").value = obj.firstname;
    document.getElementById("mname").value = obj.middlename;
    document.getElementById("lname").value = obj.lastname;
    document.getElementById("dob").value = obj.dob;
    document.forms.myForm.gender.value = obj.gender
    document.getElementById("check").checked = obj.marriedstatus === "Yes" ? true : false;
    document.getElementById("country").value = obj.country;
    if (obj.country) {
        var key1 = Object.keys(countryData[obj.country]);
        key1.map(x1 => document.getElementById("state").innerHTML += '<option>' + x1 + '</option>')
    }
    document.getElementById("state").value = obj.state;
    if (obj.state) {
        var abcde = countryData[obj.country][obj.state];
        abcde.map(x2 => document.getElementById("city").innerHTML += '<option>' + x2 + '</option>')
    }
    document.getElementById("city").value = obj.city;
}



function updateRecord() {
    let index2 = updateId;
    let objj = arr[index2];
    objj.firstname = document.getElementById("fname").value;
    objj.middlename = document.getElementById("mname").value;
    objj.lastname = document.getElementById("lname").value;
    objj.dob = document.getElementById("dob").value;
    objj.gender = displayRadioValue();
    objj.country = document.getElementById("country").value;
    objj.state = document.getElementById("state").value;
    objj.city = document.getElementById("city").value;
    objj.marriedstatus = Check();

    insertNewRecord();
    resetForm();
}

function onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
        let index = arr.findIndex(data => data.id === id)
        console.log(index);
        arr.splice(index, 1)
    }
    insertNewRecord();
}