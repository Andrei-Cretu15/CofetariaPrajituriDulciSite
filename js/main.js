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
