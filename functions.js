document.addEventListener("keydown", function(event) {
    console.log(event)
    if (event.key === 'Enter') {
        location.assign("/")
    }
    else if (event.key === 'b') {
        location.assign("/blog")
    }
    else if (event.key === 'p') {
        location.assign("/projects")
    }
    else if (event.key === 'r'){
        location.assign("https://docs.google.com/document/d/1oJAJqYTUJ6GiNbTngM10SrqfeBA0YqhM9R3Fzrm2oBM/edit?usp=sharing")
    }
    else if (event.key === 'g'){
        location.assign("https://github.com/lukewangm")
    }
  });