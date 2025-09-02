const btndsh = document.querySelector(".btn-mobile-dsh");
const sidebar = document.querySelector(".dashboard");

btndsh.addEventListener("click", function () {
  sidebar.classList.toggle("dsh-open");
  btndsh.classList.toggle("active")
});