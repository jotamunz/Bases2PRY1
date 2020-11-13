function $initializeComponents() {
  $(".sidenav").sidenav();
  $(".collapsible").collapsible();
}

function $closeSideNav() {
  $(".sidenav").sidenav("close");
}

$(document).ready(() => {
  // Initialize sidenav
  $initializeComponents();
  // Event listeners
  $(".close-sidenav").on("click", $closeSideNav);
  // $("ul.sidenav li a").on("click", $closeSideNav);
});
