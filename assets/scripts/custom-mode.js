const bgColor = document.getElementById("bgColor");
const body = document.querySelector("body");
const headers = document.querySelectorAll("h1,h2,h3,nav");
const textColor = document.getElementById("textColor");
const fontSet = document.getElementById("fontSet");
const ret = document.getElementById("default");

const savedBg = localStorage.getItem("bgColor");
const savedText = localStorage.getItem("text");
const savedFont = localStorage.getItem("font");

ret.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

if(savedBg){
    body.style.backgroundImage = "none";
    body.style.backgroundColor = savedBg;
    bgColor.value = savedBg;
}
if(savedText){
    body.style.color = savedText;
    textColor.value = savedText;
}
if(savedFont){
    body.style.fontFamily = savedFont;
    fontSet.value = savedFont;
}

bgColor.addEventListener("input", (event) => {
    body.style.backgroundImage = "none";
    body.style.backgroundColor = bgColor.value;
    localStorage.setItem("bgColor", bgColor.value);
});

textColor.addEventListener("input", (event) => {
    body.style.color = textColor.value;
    localStorage.setItem("text", textColor.value);
});

fontSet.addEventListener("input", (event) => {
    let val = fontSet.value;
    if(val == "serif"){
        body.style.fontFamily = "serif";
    }
    else if(val == "sans-serif"){
        body.style.fontFamily = "sans-serif";
    }
    else if(val == "cursive"){
        body.style.fontFamily = "cursive";
    }
    else if(val == "monospace"){
        body.style.fontFamily = "monospace";
    }
    else if(val == "fantasy"){
        body.style.fontFamily = "fantasy";
    }
    localStorage.setItem("font", val);
});