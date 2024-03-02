

function Przelicz() {
    let d1, d2, d3, d4;
    d1 = parseInt(document.getElementById("text1").value)
    d2 = parseInt(document.getElementById("text2").value)
    d3 = parseInt(document.getElementById("text3").value)
    d4 = parseInt(document.getElementById("text4").value)

    let suma = d1 + d2 + d3 + d4;
    let avg = suma / 4;
    let min = Math.min(d1, d2, d3, d4);
    let max = Math.max(d1, d2, d3, d4);

    document.getElementById("suma").innerHTML = suma;
    document.getElementById("srednia").innerHTML = avg;
    document.getElementById("min").innerHTML = min;
    document.getElementById("max").innerHTML = max;
    
}

//  let handler = document.querySelectorAll(input)

let dok = document.querySelector(".suma");
dok.addEventListener("click", ()=> { console.log("cos")});

// handler.addEventListener("onchange", Przelicz)