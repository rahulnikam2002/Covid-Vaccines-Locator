let submit = document.getElementById('submit');
let datePicker = document.getElementById('datePicker');
let usersPincode = document.getElementById('usersPincode');
let allPostCards = document.getElementById('allPostCards');
let vaccinePrice = document.getElementById('vaccinePrice');
let copyRightText = document.getElementById('copyRightText');
let developerName = document.getElementById('developerName');
let resultDataFetched = document.getElementById('resultDataFetched');
let storeDateArray;

function rotateAllElements(dateSplit, dateArrLen) {
    let firstEle = dateSplit[0];
    for (let i = 0; i < dateArrLen; i++) {
        dateSplit[i] = dateSplit[i + 1];
    }
    dateSplit[dateArrLen - 1] = firstEle
    let tv = dateSplit[0];
    dateSplit[0] = dateSplit[1];
    dateSplit[1] = tv;
    storeDateArray = dateSplit;
}

function rotateDate(dateValue) {
    dateSplit = dateValue.split('-');
    dateArrLen = dateSplit.length;
    rotateAllElements(dateSplit, dateArrLen);
}

datePicker.addEventListener('click', function () {
    datePicker.placeholder = "";
})
developerName.addEventListener('click', function () {
    location.href = 'https://instagram.com/xx_rahulnikam_xx'
})


submit.addEventListener('click', function () {
    let usersPinCodevalue = usersPincode.value;
    let dateValue = datePicker.value;
    let pincodeValue = usersPincode.value;
    rotateDate(dateValue);
    let dateString = storeDateArray.join('-');
    if (pincodeValue.length == 6 && dateValue.length > 1) {
        fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincodeValue}&date=${dateString}`)
            .then(response => response.json())
            .then(data => {
                if (data.sessions) {
                    let domHtml = "";
                    let totalNoOfPlaces = data.sessions.length;
                    if (totalNoOfPlaces == 0) {
                        resultDataFetched.innerText = `No places found!! Try to change your date or try different Pincode and try again`
                        allPostCards.style.display = "none";
                    }
                    else {
                        allPostCards.style.display = "grid";
                    }
                    let block_name = data.sessions[0].block_name;
                    let district_name = data.sessions[0].district_name;


                    resultDataFetched.innerText = `Found ${totalNoOfPlaces} places in ${block_name}, ${district_name}`

                    data.sessions.forEach(sessions => {
                        domHtml += `
                            <div class="singlepostCard singlepostCard1 vaccinePostCard">
                                <div class="name-add-pricing">
                                    <div class="name-add">
                                        <div class="placeName">
                                            <p>${sessions.name}</p>
                                        </div>
                                        <div class="placeProperAddress">
                                            <p>${sessions.address}</p>
                                        </div>
                                    </div>
                                    <div class="vaccinePricing">
                                        <div class="vaccinePriceBox">
                                            <p id="vaccinePrice">₹ <span class="vaccinePriceSpan">${sessions.fee}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Adding time and date -->
                                <div class="vaccinationTimeDate">
                                    <div class="vaccinationTime vaccinationDateTimeBox">
                                        <p>${sessions.from}<span><i class="fi-rr-arrow-right"></i></span>${sessions.to}</p>
                                    </div>
                                    <div class="vaccinationTextONSection">
                                        <hr>
                                        <p>ON</p>
                                        <hr>
                                    </div>
                                    <div class="vaccinationDate vaccinationDateTimeBox">
                                        ${sessions.date}
                                    </div>
                                </div>

                                <!-- Adding Vaccine details -->
                                <div class="vaccineDetailsArea">
                                    <div class="ageGroup vaccineDetail">
                                        <p class="vaccineDetailsHeading">
                                            Age
                                        </p>
                                        <p>${sessions.min_age_limit}</p>
                                    </div>

                                    <div class="vaccineName vaccineDetail">
                                        <p class="vaccineDetailsHeading">
                                            Vaccine
                                        </p>
                                        <p>${sessions.vaccine}</p>
                                    </div>

                                    <div class="vaccineDose1Slots vaccineDetail">
                                        <p class="vaccineDetailsHeading">
                                            Dose1
                                        </p>
                                        <P>${sessions.available_capacity_dose1}</P>
                                    </div>

                                    <div class="vaccineDose2Slots vaccineDetail">
                                        <p class="vaccineDetailsHeading">
                                            Dose2
                                        </p>
                                        <P>${sessions.available_capacity_dose2}</P>
                                    </div>
                                </div>

                                </div>`
                    });
                    allPostCards.innerHTML = domHtml;

                }
            })

    }
    else {
        alert('Your PinCode or date might be incorrect, Please check it ang try again 😃');
    }
})
