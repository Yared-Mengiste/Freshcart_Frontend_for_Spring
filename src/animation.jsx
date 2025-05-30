// showObserver utility
// This uses IntersectionObserver to add animations when elements scroll into view.
// Mostly used to trigger "hidden-sec" animations on scroll.

function showObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-section");
      } else {
        entry.target.classList.remove("show-section");
      }
    });
  });

  document.querySelectorAll(".hidden-sec").forEach((section) => {
    observer.observe(section);
  });
}
export default showObserver;
