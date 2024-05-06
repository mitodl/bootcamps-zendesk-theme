// Custom

window.addEventListener("DOMContentLoaded", () => {
  //Hide Contact Us element on new request page
  if (location.pathname.indexOf("/requests/new") > -1) {
    document.getElementById("contact-us-element").style.display = "none";
  }
});
