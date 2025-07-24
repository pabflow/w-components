/**
 * Patterns Dev / Pablo Gubelin – Scroll-Triggered Animated Counter
 * Requires GSAP v3.12+ and ScrollTrigger
 * 
 * HTML elements must include data-pd-count-* attributes to control behavior.
 */

Webflow ||= [];
Webflow.push(function () {
  console.log("[Webflow CountUp] from Pablo Gubelin successfully initialized 🚀");

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-pd-count-target]').forEach(el => {
    const end = parseFloat(el.getAttribute('data-pd-count-target'));
    const start = parseFloat(el.getAttribute('data-pd-count-start')) || 0;
    const duration = parseFloat(el.getAttribute('data-pd-count-duration')) || 2;
    const step = parseFloat(el.getAttribute('data-pd-count-step')) || 1;
    const prefix = el.getAttribute('data-pd-count-prefix') || '';
    const suffix = el.getAttribute('data-pd-count-suffix') || '';

    const obj = { val: start };

    gsap.to(obj, {
      val: end,
      duration: duration,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true
      },
      onUpdate: () => {
        const stepped = Math.floor(obj.val / step) * step;
        const formatted = stepped.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        el.textContent = prefix + formatted + suffix;
      },
      onComplete: () => {
        const finalFormatted = end.toLocaleString(undefined, {
          minimumFractionDigits: (end % 1 !== 0 ? 1 : 0),
          maximumFractionDigits: 1
        });
        el.textContent = prefix + finalFormatted + suffix;
      }
    });
  });

  /** --------------------------------
   * ✅ Debug / Test Logs
   * -------------------------------- */
  console.log("[Webflow CountUp] All counters from Pablo Gubelin initialized ✅");
});
