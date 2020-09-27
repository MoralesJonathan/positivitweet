var addBtn = document.getElementById('addTweetInput');
var inputCount = 0;
var inputContainer = document.getElementById('inputContainer');
var submitBtn = document.getElementById('submitTweets');

addBtn.addEventListener('click', function (e) {
    inputCount++
    var field = document.createElement('div');
    field.setAttribute('data-inputid', inputCount)
    field.classList.add('field');
    var control = document.createElement('div');
    control.classList.add('control');
    var input = document.createElement('input');
    input.classList.add('input', 'tweetInput');
    input.type = 'text';
    input.placeholder = "Type tweet here";
    var anchor = document.createElement('a');
    anchor.classList.add('delete', 'newDelete')
    anchor.setAttribute('data-inputid', inputCount)
    control.append(input)
    control.append(anchor)
    field.append(control)
    inputContainer.append(field)
});


submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    submitBtn.classList.add('is-loading')
    var inputs = document.getElementById('tweetInputs').getElementsByTagName("input");
    var tweets = [];
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i]) {
            tweets.push(inputs[i].value)
        }
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    xhttp.open("POST", "https://positivitweets.azurewebsites.net/api/tweetUpdater", true);
    xhttp.send(JSON.stringify(tweets));
})

inputContainer.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('delete')) {
        var inputId = e.target.dataset.inputid;
        var field = document.querySelector('div.field[data-inputid="' + inputId + '"]');
        field.remove();
    }
})

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var tweets = JSON.parse(xhttp.responseText);
        for (var i = 1; i <= tweets.length; i++) {
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.textContent = i;
            var td2 = document.createElement('td');
            td2.textContent = tweets[i - 1];
            td2.style.fontWeight = 300;
            tr.append(td1);
            tr.append(td2);
            document.querySelector("#tweetsTable tbody").append(tr)
        }
    }
};
xhttp.open("GET", "https://positivitweets.azurewebsites.net/api/functionTests", true);
xhttp.send();