function generateRegistrationCode() {
    // Fetching values from the form
    let Fullname = document.getElementById('name').value;
    let candidateCode = document.getElementById('candidateCode').value;
    let qualification = document.getElementById('qualification').value;
    let gender = document.getElementById('gender').value;

    // Creating registration code
    let registrationCode =Fullnamename.substring(0, 2) + candidateCode.substring(1, 3) + gender.substring(0, 1) + qualification;

    // Displaying registration code
    alert("Registration Code: " + registrationCode);
}

function verifyRegistrationCode() {
    // Fetching the registration code to verify
    let verifyCode = document.getElementById('verifyCode').value;

    // Validating the registration code
    let regex = /^[A-Za-z]\d{2}[A-Za-z]\d{3}[A-Za-z]{2}$/;
    if (regex.test(verifyCode)) {
        // Display welcome message if valid
        document.getElementById('resultMessage').innerText = "Welcome!";
    } else {
        // Display error message if invalid
        document.getElementById('resultMessage').innerText = "Invalid Registration Code. Please try again.";
    }
}
backBtn.addEventListener("click", () => form.classList.remove('secActive'));
