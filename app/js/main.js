var globalVar={};
var xhttp = new XMLHttpRequest();
var currentDarg = "";
var correctAnswer = [28, 207, 7, 5];
var wrongAnswer = [];
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        readXmlresponse(this);
    }
};
xhttp.open("GET", "./datafiles/readMe.xml", true);
xhttp.send();

function readXmlresponse(xml) {
    var xmlDoc = xml.responseXML;

    console.log("Reasponse Data : ", xmlDoc.getElementsByTagName("textVal").length);


    for (i = 0; i < xmlDoc.getElementsByTagName("textVal").length; i++) {
        var parent = document.getElementsByClassName("dragArea")[0],
            childToAppend = document.createElement("div");
        childToAppend.className = "dragDiv";
        childToAppend.draggable = true;
        childToAppend.id = "draggable" + i;
        var newElement = parent.append(childToAppend);
        document.getElementsByClassName("dragDiv")[i].innerHTML = xmlDoc.getElementsByTagName("textVal")[i].childNodes[0].nodeValue;
        document.getElementsByClassName("dragDiv")[i].addEventListener("dragstart", drag.bind(this));
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    currentDarg = ev.target.id;
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    ev.target.appendChild(document.getElementById(currentDarg));
    var childCount = document.getElementsByClassName("dragArea")[0].childNodes.length;
    if (childCount == 1) {
        document.getElementById("validateButton").style.display = "block";
    }
}

function validate() {
    var alertMsg = "Following answers are not correct: ";
    var classList = document.getElementsByClassName("dragDiv");
    for (i = 0; i < document.getElementsByClassName("dragDiv").length; i++) {
        if (document.getElementsByClassName("dragDiv")[i].innerHTML != correctAnswer[i]) {
            wrongAnswer.push(document.getElementsByClassName("dragDiv")[i].id);
            var count = i + 1;
            alertMsg = alertMsg + count + ",";
        }
    }
    alert(alertMsg == "Following answers are not correct: " ? "All Answers are correct" : alertMsg);
    alertMsg == "Following answers are not correct: " ? document.getElementById("restartButton").style.display = "block" : document.getElementById("resetButton").style.display = "block";

}

function reset() {
    var deletedNode = [];
    for (i = 0; i < wrongAnswer.length; i++) {
        deletedNode.push(document.getElementById(wrongAnswer[i]));
        var parent = document.getElementById(wrongAnswer[i]).parentElement;
        parent.removeChild(document.getElementById(wrongAnswer[i]));
    }

    for (i = 0; i < deletedNode.length; i++) {
        document.getElementsByClassName("dragArea")[0].appendChild(deletedNode[i]);
    }
}

function restart() {
    location.reload();
}

selfCallFn = a => {
    console.log("This is es6 fn", a);
}
selfCallFn(7, 7);

function Person() {
    this.age = 0;

    setInterval(() => {
        (this.age++); // |this| properly refers to the person object
    }, 1000);
}

Person();

var adder = {
    base: 1,

    add: function(a) {
        var f = v => v + this.base;
        return f(a);
    },

    addThruCall: function(a) {
        var f = v => v + this.base;
        var b = {
            base: 2
        };

        return f.call(b, a);
    }
};

console.log(adder.add(1)); // This would log to 2
console.log(adder.addThruCall(1)); // This would log to 2 still

var arguments = 42;
var arr = () => arguments;

arr(); // 42

function foo() {
    var f = (i) => console.log(arguments[0] + i); // foo's implicit arguments binding
    return f(2);
}

foo(1); // 3

var simple = a => a > 19 ? console.log(19) : console.log(a);
simple(20);
var notSimple = function(a) {
    a > 10 ? console.log(10) : console.log(a);
}
notSimple(11);

var list = document.getElementById('list');

for (let i = 1; i <= 5; i++) {
    console.log(i);
    let item = document.createElement('li');
    item.appendChild(document.createTextNode('Item ' + i));

    item.onclick = function(ev) {
        console.log('Item ' + i + ' is clicked.');
    };
    list.appendChild(item);
}
