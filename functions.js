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
  });