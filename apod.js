var api_key = 'WkP1a90fsdKeA1MEZVqwqdaUNY1d87QP0I2NRqIX';
var baseUrl = "https://api.nasa.gov/planetary/apod";
// var selectedDate=document.getElementById('datepicker').value;

document.getElementById("datepicker").addEventListener("change", myFunction);

function myFunction() {
  var x = document.getElementById("datepicker");
  x.value = x.value;
}

document.getElementById('datepicker').addEventListener('click', function () {
    // check if the form is invalid
    if (isDataValid(selectedDate)) {
        // if the form is invalid display errors
        dispalyErrors();
    } else {
        // else add the new book to the list
        var selectedDate = {
      data: selectedData.value,
        }
    
       
    }

var url = new URL(baseUrl);
url.searchParams.set('api_key', api_key )
url.searchParams.set('date', selectedDate);

function getAstronomyPictureOfTheDayPromise(selectedDate) {

    if (selectedDate) {
        var selectedDate=document.getElementById('datepicker');
        url.searchParams.set('date', selectedDate);
        var url = new URL(baseUrl);
        url.searchParams.set('api_key', api_key);
   }
  
        

    return new Promise(function (resolve, reject) {
        fetch(url.href)
            .then(function (response) {
                if (response.status === 200) {
                    resolve(response)
                } else {
                    response.json().then(function (reason) {
                        reject(reason)
                    });
                }
            })
            .catch(function (error) {
                return new Error("Something went wrong! Please try again!")
            })
    })
}

function displayError(error) {
    var errorContainer = document.getElementById("error");
    errorContainer.innerText = "Error: " + JSON.stringify(error);
}

function displayPicture(pictureUrl) {
    var img = document.getElementById("picture");
    img.src = pictureUrl;
}

function displayTitle(pictureTitle, pictureDate) {
    var title = document.getElementById('title');
    var dateString = pictureDate ? pictureDate + ' picture: ' : 'Today\'s picture: ';
    title.innerText = dateString + pictureTitle;
}

function parseResponse(response) {
    return response.json();
}

function showLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    loader.classList.add("show");
}

function hideLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    loader.classList.remove("show");
}

function getTodaysPicture() {
    showLoader();
    getAstronomyPictureOfTheDayPromise()
        .then(parseResponse)
        .then(
            function (response) {
                displayPicture(response.url);
                displayTitle(response.title);
            }
            //, function (error) {
            //     displayError(error);
            // }
        )
        .catch(function (error) {
            displayError(error);
        })
        .finally(hideLoader);
}



window.addEventListener('DOMContentLoaded', getTodaysPicture);
}
