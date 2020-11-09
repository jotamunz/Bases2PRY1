function initializeSideNav() {
  // Initialize sidenav
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  document
    .querySelector(".close-sidenav")
    .addEventListener("click", closeSideNav);
}

function closeSideNav() {
  $(".sidenav").sidenav("close");
}

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", initializeSideNav);
}

loadEventListeners();
