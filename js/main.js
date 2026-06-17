document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Close mobile nav when a link inside it is clicked
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Hero slideshow
  var slides = document.querySelectorAll(".hero-slide");
  var indicators = document.querySelectorAll(".hero-indicator");
  if (slides.length > 1) {
    var current = 0;
    function goTo(n) {
      slides[current].classList.remove("is-active");
      indicators[current].classList.remove("is-active");
      current = n % slides.length;
      slides[current].classList.add("is-active");
      indicators[current].classList.add("is-active");
    }
    setInterval(function () { goTo(current + 1); }, 5000);
    indicators.forEach(function (btn, i) {
      btn.addEventListener("click", function () { goTo(i); });
    });
  }
});
