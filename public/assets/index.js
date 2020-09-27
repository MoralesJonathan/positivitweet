var loginForm = document.getElementById('loginForm');
var submitBtn = document.getElementById('submitBtn');
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    submitBtn.setAttribute('disabled', true)
    var email = document.getElementById('loginForm').querySelector("input[name='email']").value;
    var password = document.getElementById('loginForm').querySelector("input[name='password']").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location.replace("/");
        } else if (this.readyState == 4 && this.status != 200){
            var error = document.getElementById('error');
            error.textContent = "Incorrect credentials. Please try again.";
            submitBtn.removeAttribute('disabled')
        }
    };
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({username: email, password}));
})
