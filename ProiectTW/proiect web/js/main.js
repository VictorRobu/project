// const http = require("http");
const themeSelector = document.getElementById("theme");
const fontSelector = document.getElementById("font");
const mapContainer = document.getElementById('map-container');
const romaniaMap = document.getElementById("romania-map");
var filtre = 1;

function savePreference(key, value) {
    localStorage.setItem(key, value);
}

function loadPreference(key, defaultValue) {
    return localStorage.getItem(key) || defaultValue;
}
function applyPreferences() {
    const theme = loadPreference("theme", "white");
    document.body.className = theme;
    if (themeSelector) {
        themeSelector.value = theme;
    }

    const font = loadPreference("font", "Arial");
    document.body.style.fontFamily = font;
    if (fontSelector) fontSelector.value = font;


    // if (romaniaMap) {
    //     if (theme === "white") {
    //         romaniaMap.style.fill = "black";
    //     } else if (theme === "dark") {
    //         romaniaMap.style.fill = "white";
    //     }
    // }
}

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById('signup-form');
    const logoutBtn = document.getElementById("logout-btn");
    const settingsBtn = document.getElementById("settings-btn");
    const homeBtn = document.getElementById("home-btn");
    const areaBtn = document.getElementById("area-chart-btn");
    const barBtn = document.getElementById("bar-chart-btn");
    const pieBtn = document.getElementById("pie-chart-btn");
    const logInBtn = document.getElementById('login-btn');
    const signUpBtn = document.getElementById('signup-btn');
    const documentationBtn = document.getElementById('documentation-btn');
    const cartographicBtn = document.getElementById('cartographic-btn');

    applyPreferences();



    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            window.location.href = '../html/home.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            window.location.href = "../html/home.html";
        });
    }

    //************************************************* */

    if (cartographicBtn) {
        cartographicBtn.addEventListener('click', function () {
            window.location.href = "../html/cartographic.html";

        });
    }

    if (logInBtn) {
        logInBtn.addEventListener('click', () => {
            window.location.href = '../html/login.html';
        });
    }
    if (signUpBtn) {
        signUpBtn.addEventListener('click', () => {
            window.location.href = '../html/signup.html';
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            window.location.href = "../html/welcome.html";
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener("click", function () {
            window.location.href = "../html/settings.html";
        });
    }

    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            window.location.href = "../html/home.html";
        });
    }

    if (documentationBtn) {
        documentationBtn.addEventListener('click', () => {
            window.location.href = '../html/documentation.html';
        });
    }

    if (areaBtn) {
        areaBtn.addEventListener("click", function () {
            window.location.href = "../html/areaChart.html";
        });
    }
    if (barBtn) {
        barBtn.addEventListener("click", function () {
            window.location.href = "../html/barChart.html";
        });
    }
    if (pieBtn) {
        pieBtn.addEventListener("click", function () {
            window.location.href = "../html/pieChart.html";
        });
    }

    if (themeSelector) {
        themeSelector.addEventListener("change", function () {
            const selectedTheme = themeSelector.value;
            document.body.className = selectedTheme;
            savePreference("theme", selectedTheme);
        });
    }

    if (fontSelector) {
        fontSelector.addEventListener("change", function () {
            const selectedFont = fontSelector.value;
            document.body.style.fontFamily = selectedFont;
            savePreference("font", selectedFont);
        });
    }
});


// ****************************************************** // 



function show(nume) {
    document.getElementById("lista" + nume).style.display = "inline-block";
    document.getElementById("ascunde" + nume).style.display = "inline-block";
    document.getElementById("selectAll" + nume).style.display = "inline-block";
    document.getElementById("deselectAll" + nume).style.display = "inline-block";
}

function ascunde(nume) {
    document.getElementById("lista" + nume).style.display = "none";
    document.getElementById("ascunde" + nume).style.display = "none";
    document.getElementById("selectAll" + nume).style.display = "none";
    document.getElementById("deselectAll" + nume).style.display = "none";
}


function showFiltre() {
    if (filtre == 1)
        document.getElementById("filtre").style.display = "inline-block";
    else document.getElementById("filtre").style.display = "none";
    filtre = 1 - filtre;

}

function selectAll(nume, caz) {
    var elem = document.getElementsByName(nume);
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].type == 'checkbox') {
            if (caz == 1) elem[i].checked = true;
            else elem[i].checked = false;
        }
    }
}

// returns the list of the checked elements of the provided criteria
function getCriteria(nume) {
    var elem = document.getElementsByName(nume);
    let nr = 1;
    const list = [];
    // Default response when nothing is selected
    list[0] = 'An';
    list[1] = 'Exemplu';
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].name == nume) {
            if (elem[i].checked == true)
                list[nr++] = elem[i].value;
        }
    }
    return list;
}

// returns the user selected criteria
function getDiagramCriteria() {
    var nume;
    var criteriu = document.getElementById('Criteriu').value;
    if (criteriu == 'Judet') nume = 'checkbox';
    else if (criteriu == 'Categorie') nume = 'checkboxCategorie';
    else nume = 'checkboxBrand';
    return nume;
}

// returns a json with all the selected elements for all criteria
function getJSON() {
    var json = {
        ani: [],
        judete: [],
        brands: [],
        categorii: [],
        criteriu: ""
    }
    var nr = 0;
    var elem = document.getElementsByName('checkboxAni');
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].checked == true) {
            json.ani[nr++] = elem[i].value;
        }
    }
    nr = 0;
    var elem = document.getElementsByName('checkbox');
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].checked == true) {
            json.judete[nr++] = elem[i].value;
        }
    }
    nr = 0;
    var elem = document.getElementsByName('checkboxBrand');
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].checked == true) {
            json.brands[nr++] = elem[i].value;
        }
    }
    nr = 0;
    var elem = document.getElementsByName('checkboxCategorie');
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].checked == true) {
            json.categorii[nr++] = elem[i].value;
        }
    }
    json.criteriu = document.getElementById('Criteriu').value;
    return json;
}

// sends a post request to the server, provides a json for the criteria and expects an array of numbers
function getPost(url, json) {

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url + "/json-handler", true);
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send(JSON.stringify(json));
    });
}

// sends a get request to the provided url
function getRequest(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
}


// builds the list of required parameters for the google area chart visualization
async function getValuesAreaChart() {
    var json = getJSON();
    var data;
    var countList;
    let nr = 1;
    let list = [];
    // required first parameters for the visualization
    list[0] = getCriteria(getDiagramCriteria());

    // the list of elements for the selected criteria 
    var elem = document.getElementsByName('checkboxAni');

    // for every year
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].checked == true) {
            let pair = [];
            // first position in pair is the name of the column
            pair[0] = elem[i].value;
            pair[1] = 0;
            json.ani = [elem[i].value];
            // get the result numbers for the current year and the rest of the criteria
            data = await getPost('http://localhost:8083', json);
            countList = JSON.parse(data);

            // the rest of pair is the result number for every selected criteria element
            for (var j = 0; j < countList.length; j++)
                pair[j + 1] = parseInt(countList[j]);
            list[nr++] = pair;
        }
    }

    return list;
}

// draws the Area Chart using data provided by getValuesAreaChart()
async function drawAreaChart() {
    const values = await getValuesAreaChart();
    var data = google.visualization.arrayToDataTable(
        values
    );

    var options = {
        title: '',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div1'));
    chart.draw(data, options);
}


var maxVal=0;
// builds the list of required parameters for the google bar chart visualization
async function getValuesBarChart(culoare) {
    var json = getJSON();
    var list = [];

    // required first parameters for the visualization
    var pair = [document.getElementById('Criteriu').value, "Numar", { role: "style" }];

    var nr = 1;
    list[0] = pair;

    // default response when nothing is selected 
    list[1] = ["Exemplu", 1000, culoare];

    // the list of elements for the selected criteria
    var elem = document.getElementsByName(getDiagramCriteria());

    // get the result numbers for the current year and the rest of the criteria
    var data = await getPost('http://localhost:8083', json);
    var countList = JSON.parse(data);


    for (var i = 0; i < elem.length; i++) {
        if (elem[i].checked == true) {
            let pair = [];
            pair[0] = elem[i].value;
            pair[1] = parseInt(countList[nr - 1]);
            maxVal=Math.max(maxVal,pair[1]);
            pair[2] = culoare;
            list[nr++] = pair;
        }
    }
    return list;
}

// draws the Bar Chart using data provided by getValuesBarChart()
async function drawBarChart() {
    var culoare = "#ffa31a";
    var data = google.visualization.arrayToDataTable(await getValuesBarChart(culoare));

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2]);

    var options = {
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' }, minValue: 0, maxValue: maxVal },

        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div2'));
    chart.draw(view, options);
}


// builds the list of required parameters for the google pie chart visualization
async function getValuesPieChart() {
    var json = getJSON();
    var lista = [];
    var nr = 1;

    // required first parameters for the visualization
    lista[0] = [getCriteria(getDiagramCriteria()), "Numar"];

    // default response when nothing is selected 
    lista[1] = ["Exemplu", 1000];

    // the list of elements for the selected criteria
    var elem = document.getElementsByName(getDiagramCriteria());

    // get the result numbers for the current year and the rest of the criteria
    var data = await getPost('http://localhost:8083', json);
    var countList = JSON.parse(data);

    for (var i = 0; i < elem.length; i++) {
        if (elem[i].checked == true) {
            let pair = [];
            pair[0] = elem[i].value;
            pair[1] = parseInt(countList[nr - 1]);
            lista[nr++] = pair;
        }
    }
    return lista;
}

// draws the Pie Chart using data provided by getValuesPieChart()
async function drawPieChart() {

    var data = google.visualization.arrayToDataTable(await getValuesPieChart());

    var options = {
        title: '',
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_div3'));

    chart.draw(data, options);
}

