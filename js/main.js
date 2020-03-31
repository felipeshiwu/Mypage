// function to jump to section without change url
function scrollSmoothTo(elementId) {
    var element = document.getElementById(elementId);
    element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }