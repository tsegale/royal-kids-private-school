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

  // Gallery filter + lightbox
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  if (galleryItems.length) {
    var filterButtons = document.querySelectorAll(".gallery-filter button");
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var filter = btn.getAttribute("data-filter");
        galleryItems.forEach(function (item) {
          var match = filter === "all" || item.getAttribute("data-category") === filter;
          item.classList.toggle("is-hidden", !match);
        });
      });
    });

    var lightbox = document.getElementById("lightbox");
    var lightboxImage = document.getElementById("lightboxImage");
    var lightboxCaption = document.getElementById("lightboxCaption");
    var lightboxCount = document.getElementById("lightboxCount");
    var lightboxClose = document.querySelector(".lightbox-close");
    var lightboxPrev = document.querySelector(".lightbox-prev");
    var lightboxNext = document.querySelector(".lightbox-next");
    var activeIndex = 0;

    function visibleItems() {
      return galleryItems.filter(function (item) { return !item.classList.contains("is-hidden"); });
    }

    function openLightbox(index) {
      var items = visibleItems();
      activeIndex = index;
      var item = items[activeIndex];
      lightboxImage.src = item.getAttribute("data-full");
      lightboxImage.alt = item.getAttribute("data-caption");
      lightboxCaption.textContent = item.getAttribute("data-caption");
      lightboxCount.textContent = (activeIndex + 1) + " of " + items.length;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
    }

    function showRelative(delta) {
      var items = visibleItems();
      activeIndex = (activeIndex + delta + items.length) % items.length;
      openLightbox(activeIndex);
    }

    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        var items = visibleItems();
        openLightbox(items.indexOf(item));
      });
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener("click", function () { showRelative(-1); });
    if (lightboxNext) lightboxNext.addEventListener("click", function () { showRelative(1); });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("is-open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showRelative(-1);
      if (event.key === "ArrowRight") showRelative(1);
    });
  }
});
