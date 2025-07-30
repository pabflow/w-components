/**
 * Patterns Dev – Auto Year
 * Displays the current year in all elements with [data-year] attribute
 * 
 * Usage:
 * <span data-year></span>
 * 
 * Load this script via CDN or in your Webflow project.
 * No dependencies required.
 */

document.addEventListener('DOMContentLoaded', function () {
  var yearElements = document.querySelectorAll('[data-year]');
  var currentYear = new Date().getFullYear();

  yearElements.forEach(function (el) {
    el.textContent = currentYear;
  });

  /* ✅ Debug / Test Logs
   * -------------------------------- */
  console.log("[Webflow AutoYear] All components successfully initialized ✅");
});
