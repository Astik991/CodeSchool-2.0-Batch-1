$(document).ready(function(){
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]; 

    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = months[currentDateTime.getMonth()];
    const day = currentDateTime.getDate();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();
    const amPM = hours >= 12 ? 'PM' : 'AM';
    const Hours = hours % 12 || 12;  
    $('.date').append(`${day}-${month}-${year}`)
    $('.time').append(`${Hours}:${minutes}:${seconds} ${amPM}`)   
});
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 48 || charCode > 57))
        return false;
    return true;
}
$(document).ready(function() {
    const logButton = $('#logButton');
    let isLoggedIn = true;

    logButton.click(function() {
        isLoggedIn = !isLoggedIn;

        if (isLoggedIn) {
            logButton.text('Logout');
        } else {
            logButton.text('Login');
        }
    });

    $("#headOfAccount").change(updateValues);

    $("#expenditureType").change(updatePurposeTypes);

    $("input[name='party']").change(function() {
        $("#typeError").text("");
    });

    $("#Next").click(function(event) {
        let isChecked = $("input[name='party']:checked").length > 0;

        if (!isChecked) {
            $("#typeError").text("Please select a Transaction Type.");
            event.preventDefault();
        }
    });

    $("#accountNumber").on('input', validateAccountNumber);

    $("#confirmAccountNumber").on('input', validateConfirmation);

    $("#partyName").on('input', validatePartyName);

    $("#ifscCode").on('input', validateIFSCCode);

    $("#purposeTextarea").on('input', validateCharacterCount);

    $("#partyAmountInput").on('input', validatePartyAmount);
});

$(document).ready(function() {
    $("#headOfAccount").change(updateValues);
});

function updateValues() {
    const selectedOption = $("#headOfAccount").val();
    const accountError = $("#accountError");

    const data = {
        "0853001020002000000NVN": { balance: 1000000, loc: 5000 },
        "8342001170004001000NVN": { balance: 1008340, loc: 4000 },
        "2071011170004320000NVN": { balance: 14530000, loc: 78000 },
        "8342001170004002000NVN": { balance: 1056400, loc: 34000 },
        "2204000030006300303NVN": { balance: 123465400, loc: 5000 }
    };

    const balanceElement = $("#balance");
    const locElement = $("#loc");
    const resultContainer = $("#result");

    if (selectedOption === "") {
        accountError.text("Head of Account is required.");
        resultContainer.hide();
        return true;
    } else if (selectedOption in data) {
        balanceElement.text(data[selectedOption].balance);
        locElement.text(data[selectedOption].loc);
        accountError.text(""); // Clear the error message
        return false;
    } else {
        accountError.text(""); // Clear the error message
        resultContainer.hide();
        return true;
    }
}



function updatePurposeTypes() {
    const purposeTypes = {
        capital: [
            "Maintain current levels of operation within the organization",
            "Expenses to permit future expansion"
        ],
        revenue: [
            "Sales costs or All expenses incurred by the firm that are directly tied to the manufacture and selling of its goods or services",
            "All expenses incurred by the firm to guarantee the smooth operation"
        ],
        deferred: [
            "Exorbitant Advertising Expenditures",
            "Unprecedented Losses",
            "Development and Research Cost"
        ]
    };

    const selectedExpenditureType = $("#expenditureType").val();
    const purposeTypeSelect = $("#purposeType");
    purposeTypeSelect.empty();

    const selectedPurposeTypes = purposeTypes[selectedExpenditureType];
    if (selectedPurposeTypes) {
        selectedPurposeTypes.forEach(text => {
            const optionElement = $("<option>", { value: text, text: text });
            purposeTypeSelect.append(optionElement);
        });

        $("#purposeTypesContainer").show();
    } else {
        $("#purposeTypesContainer").hide();
    }

    purposeTypeSelect.prop('disabled', false);
    
    // Clear existing errors
    $("#expenditureError").text("");
    $("#purposeError").text("");

    // Check and show errors if necessary
    if (selectedExpenditureType === "") {
        $("#expenditureError").text("Expenditure Type is required.");
    }
    if (purposeTypeSelect.val() === "") {
        $("#purposeError").text("Purpose Type is required.");
    }
}


function validateAccountNumber() {
    const accountNumberInput = $("#accountNumber");
    const errorText = $("#errorText");
    const accountNumber = accountNumberInput.val().replace(/\D/g, '');

    if (accountNumber.length === 0) {
        errorText.text("Account number should not be empty.");
        return false;
    } else if (accountNumber.length < 12 || accountNumber.length > 22) {
        errorText.text("Account number length must be between 12 and 22 digits.");
        return false;
    } else if (accountNumber.length > 1 && accountNumber.charAt(0) === '0') {
        errorText.text("Account number cannot have leading zeros except for a single zero.");
        return false;
    } else {
        errorText.text("");
        return true;
    }
}

function validateConfirmation() {
    const accountNumberInput = $("#accountNumber");
    const confirmAccountNumberInput = $("#confirmAccountNumber");
    const confirmErrorText = $("#confirmErrorText");
    
    const accountNumber = accountNumberInput.val().replace(/\D/g, '');
    const confirmAccountNumber = confirmAccountNumberInput.val().replace(/\D/g, '');

    if (confirmAccountNumber.length === 0) {
        confirmErrorText.text("Confirmation Account Number should not be empty.");
    } else if (accountNumber !== confirmAccountNumber) {
        confirmErrorText.text("Confirmation does not match the Party Account Number.");
    } else {
        confirmErrorText.text("");
    }
}

function validatePartyName() {
    const partyNameInput = $("#partyName");
    const partyNameError = $("#partyNameError");
    const partyName = partyNameInput.val();

    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
    if (partyName.trim().length === 0) {
        partyNameError.text("Party Name should not be empty.");
    } else if (specialChars.test(partyName)) {
        partyNameError.text("Party Name should not contain special characters.");
    } else {
        partyNameError.text("");
    }
}

function validateIFSCCode() {
    const ifscCodeInput = $("#ifscCode");
    const ifscCodeError = $("#ifscCodeError");
    const ifscCode = ifscCodeInput.val().trim().toUpperCase();
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    
    if (ifscCode.trim().length === 0) {
        ifscCodeError.text("IFSC Code should not be empty.");
    } else if (!ifscRegex.test(ifscCode)) {
        ifscCodeError.text("Invalid IFSC Code format.");
    } else {
        ifscCodeError.text("");
    }
}

function validateCharacterCount() {
    const textarea = $("#purposeTextarea");
    const errorMessage = $("#errorMessage");
    const maxLength = parseInt(textarea.attr('maxlength'));
    
    if (textarea.val().trim().length === 0) {
        errorMessage.text('Purpose should not be empty.');
    } else if (textarea.val().length > maxLength) {
        errorMessage.text('Exceeded character limit (500)');
    } else {
        errorMessage.text('');
    }
}

function validatePartyAmount() {
    const inputField = $("#partyAmountInput");
    const errorDisplay = $("#amountError");
    const amountInWordsDisplay = $("#amountInWords");
    
    const amountValue = inputField.val().trim();
    const isValidAmount = /^\d+$/.test(amountValue);

    if (amountValue === '') {
        errorDisplay.text('Party Amount should not be empty.');
        amountInWordsDisplay.text('');
    } else if (!isValidAmount) {
        errorDisplay.text('Party Amount should be a whole number.');
        amountInWordsDisplay.text('');
    } else {
        errorDisplay.text('');
        const amountInWords = partyAmountInWords(amountValue);
        amountInWordsDisplay.text(amountInWords);
    }
}
function partyAmountInWords(amount) {
    var ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    var teens = [
      "",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    var tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Fourty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
  
    function numbersToWords(number) {
      if (number === 0) return "";
      else if (number < 10) return ones[number];
      else if (number < 20) return teens[number - 10];
      else if (number < 100)
        return tens[Math.floor(number / 10)] + " " + ones[number % 10];
      else
        return (
          ones[Math.floor(number / 100)] +
          " Hundred " +
          numbersToWords(number % 100)
        );
    }
    var words = "";
    var crores = Math.floor(amount / 10000000);
    var lakhs = Math.floor((amount % 10000000) / 100000);
    var thousands = Math.floor((amount % 100000) / 1000);
    var remaining = Math.round(amount % 1000);
  
    if (crores > 0) {
      words += numbersToWords(crores) + " Crore ";
    }
  
    if (lakhs > 0) {
      words += numbersToWords(lakhs) + " Lakh ";
    }
  
    if (thousands > 0) {
      words += numbersToWords(thousands) + " Thousand ";
    }
  
    if (remaining > 0) {
      words += numbersToWords(remaining);
    }
  
    return words;
  }


$(document).ready(function() {
    $('#file-input').on('change', function(e) {
      const fileList = e.target.files;
      const fileListContainer = $('#file-list');
      fileListContainer.empty();

      if (fileList.length > 0) {
        fileListContainer.append('<h3>Selected Files:</h3>');
        const ul = $('<ul>');

        for (let i = 0; i < fileList.length; i++) {
          const fileName = fileList[i].name;
          ul.append($('<li>').text(fileName));
        }

        fileListContainer.append(ul);
      }
    });
});
function next(e){
    event.preventDefault();
    validateAccountNumber();
    validateConfirmation();
    validatePartyName(); 
    validateIFSCCode();
    validateCharacterCount();
    validatePartyAmount();
    validatePurposeType(); 
    validateSelection();
    validateExpenditureType(); 
    
}


function validateExpenditureType() {
    const expenditureTypeSelect = document.getElementById('expenditureType');
    const expenditureError = document.getElementById('expenditureError');
    const selectedOption = expenditureTypeSelect.value;
    
    if (selectedOption === "") {
        expenditureError.textContent = "Expenditure Type cannot be empty";
    } else {
        expenditureError.textContent = "";
    }
}



function validatePurposeType() {
    const purposeTypeSelect = document.getElementById('purposeType');
    const purposeError = document.getElementById('purposeError');
    const selectedOption = purposeTypeSelect.value;
    
    if (selectedOption === "") {
        purposeError.textContent = "Purpose Type cannot be empty";
    } else {
        purposeError.textContent = "";
    }
}
const headOfAccountSelect = document.getElementById("headOfAccount");
const accountError = document.getElementById("accountError");

// Function to validate the selection
function validateSelection() {
    if (headOfAccountSelect.value === "") {
        accountError.textContent = "Please select an option.";
    } else {
        accountError.textContent = "";
    }
}

// Add an event listener to the select element to trigger validation on change
headOfAccountSelect.addEventListener("change", validateSelection);








    function searchBank() {
        const ifscCodeInput = document.getElementById("ifscCode");
        const bankNameOutput = document.getElementById("bankName");
        const bankBranchOutput = document.getElementById("bankBranch");
        const ifscCode = ifscCodeInput.value;

        $.ajax({
            url: `https://ifsc.razorpay.com/${ifscCode}`,
            type: "GET",
            dataType: "json",
            success: function (bankData) {
                
                bankNameOutput.textContent = bankData.BANK;
                bankBranchOutput.textContent = bankData.BRANCH;
            },
            error: function (xhr, status, error) {
                console.error("Error fetching bank information:", error);
            }
        });
    }

$(document).ready(function () {
   
      $("#side").on("click", function () {
        var attributeValue = $("#Body").attr("site");
        console.log(attributeValue);
        if (attributeValue === "0") {
          $("#Body").attr("site", "1");
          $("#Body").removeClass("moveRight");
          $("#Body").addClass("moveLeft");
        } else {
          $("#Body").attr("site", "0");
          $("#Body").removeClass("moveLeft");
          $("#Body").addClass("moveRight");
        }
      });
  
  });
