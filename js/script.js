const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function disableScroll() {
  document.body.classList.add("no-scroll");
}

function enableScroll() {
  document.body.classList.remove("no-scroll");
}

function toggleSidebar(state) {
  if (state) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    disableScroll();
  } else {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    enableScroll();
  }
}

openBtn.addEventListener("click", function () {
  toggleSidebar(true);
});
closeBtn.addEventListener("click", function () {
  toggleSidebar(false);
});
overlay.addEventListener("click", function () {
  toggleSidebar(false);
});

sidebar.addEventListener("mouseover", function () {
  disableScroll();
});

sidebar.addEventListener("mouseout", function () {
  if (!overlay.classList.contains("active")) enableScroll();
});
