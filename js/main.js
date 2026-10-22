const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Mulțumim! Mesajul tău a fost trimis.";
    contactForm.reset();
  });
}

const icing = document.querySelector(".icing-drip");

if (icing && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("scroll", () => {
    const offset = Math.min(window.scrollY * 0.08, 12);
    icing.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}

const album = document.querySelector("[data-album]");

if (album) {
  const track = album.querySelector(".cake-track");
  const slides = Array.from(album.querySelectorAll(".cake-slide"));
  const previousButton = document.querySelector(".album-prev");
  const nextButton = document.querySelector(".album-next");
  const dotsContainer = document.querySelector(".album-dots");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentIndex = 0;
  let autoplayId;

  const getVisibleSlides = () => window.innerWidth <= 700 ? 1 : 3;
  const getMaxIndex = () => Math.max(0, slides.length - getVisibleSlides());

  const renderDots = () => {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    for (let index = 0; index <= getMaxIndex(); index += 1) {
      const dot = document.createElement("button");
      dot.className = `album-dot${index === currentIndex ? " active" : ""}`;
      dot.type = "button";
      dot.ariaLabel = `Afișează grupul ${index + 1} din album`;
      dot.addEventListener("click", () => moveTo(index));
      dotsContainer.append(dot);
    }
  };

  const moveTo = (index) => {
    currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
    album.scrollTo({
      left: slides[currentIndex].offsetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    renderDots();
  };

  const stopAutoplay = () => window.clearInterval(autoplayId);
  const startAutoplay = () => {
    if (reduceMotion) return;
    stopAutoplay();
    autoplayId = window.setInterval(() => {
      moveTo(currentIndex >= getMaxIndex() ? 0 : currentIndex + 1);
    }, 4500);
  };

  previousButton?.addEventListener("click", () => {
    moveTo(currentIndex === 0 ? getMaxIndex() : currentIndex - 1);
    startAutoplay();
  });
  nextButton?.addEventListener("click", () => {
    moveTo(currentIndex >= getMaxIndex() ? 0 : currentIndex + 1);
    startAutoplay();
  });
  album.addEventListener("mouseenter", stopAutoplay);
  album.addEventListener("scroll", () => {
    const albumStart = album.getBoundingClientRect().left;
    const closestIndex = slides.reduce((closest, slide, index) => {
      const distance = Math.abs(slide.getBoundingClientRect().left - albumStart);
      const closestDistance = Math.abs(slides[closest].getBoundingClientRect().left - albumStart);
      return distance < closestDistance ? index : closest;
    }, 0);
    if (closestIndex !== currentIndex) {
      currentIndex = closestIndex;
      renderDots();
    }
  }, { passive: true });
  album.addEventListener("touchstart", stopAutoplay, { passive: true });
  album.addEventListener("touchend", startAutoplay, { passive: true });
  album.addEventListener("wheel", stopAutoplay, { passive: true });
  album.addEventListener("mouseleave", startAutoplay);
  album.addEventListener("scrollend", startAutoplay, { passive: true });
  album.addEventListener("focusin", stopAutoplay);
  album.addEventListener("focusout", startAutoplay);
  album.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveTo(currentIndex - 1);
    if (event.key === "ArrowRight") moveTo(currentIndex + 1);
  });
  window.addEventListener("resize", () => {
    currentIndex = Math.min(currentIndex, getMaxIndex());
    moveTo(currentIndex);
  });
  renderDots();
  moveTo(0);
  startAutoplay();
}
