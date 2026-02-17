function validateForm(){

    let valid = true;

    nameError.innerHTML = "";
    emailError.innerHTML = "";
    ageError.innerHTML = "";
    passError.innerHTML = "";
    successMsg.innerHTML = "";

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = document.getElementById("age").value;
    let password = document.getElementById("password").value;

    // Validation Rules
    if(name === ""){
        nameError.innerHTML = "Name cannot be empty";
        valid = false;
    }

    if(!email.includes("@")){
        emailError.innerHTML = "Email must contain @";
        valid = false;
    }

    if(age < 18 || age > 60){
        ageError.innerHTML = "Age must be between 18 and 60";
        valid = false;
    }

    if(password.length < 6){
        passError.innerHTML = "Password must be at least 6 characters";
        valid = false;
    }

    // If validation successful
    if(valid){

        // Confirm submission (Required)
        let confirmSubmission = confirm("Do you want to submit the form?");

        if(confirmSubmission){

            // Show success message
            successMsg.innerHTML = "🎉 Registration Successful!";

            // BONUS: alert interaction
            alert("Welcome " + name + "! Your account has been created.");

            // BONUS: prompt interaction
            let feedback = prompt("How did you hear about us?");
            if(feedback !== null && feedback !== ""){
                alert("Thank you for your feedback!");
            }
        }
    }
}
