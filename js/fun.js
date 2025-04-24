
function fun() {
  var isFun = sessionStorage.getItem("fun");
  if(isFun !== null){
    sessionStorage.setItem("fun", isFun=='t'?'f':'t')
    const button = document.getElementById('fun-btn');
    button.textContent = isFun=='t' ? 'Click me?' : 'Reduce fun';
    // console.log(isFun=='t'?"not fun":"fun")

    if(isFun == 'f'){
        d3.select("#fun-canvas-container")
            .append("svg")
            .attr("id", "fun-svg")
            .attr("width", "100%")
            .attr("height", "70vh")
            .attr("style", "background: black");
    }
    else{
        d3.select("#fun-svg").remove();
    }
  }
  else{
    sessionStorage.setItem("fun", 't')
  }  
}


