/**
 * Patterns Dev – Scroll-Triggered Animated Counter
 * Requires Splide V4.1.3 + and Splide-extension-auto-scroll V0.4.2
 * 
 * HTML elements must include data-pd-* attributes to control behavior.
 */

Webflow ||= [];
Webflow.push(function () {
  console.log("[Webflow Splide] from Pablo Gubelin successfully initialized 🚀");

  const sliders = document.querySelectorAll("[data-pd-slider]");

  if (!sliders.length) return;

  sliders.forEach((sliderEl) => {
    const getAttr = (name) => sliderEl.getAttribute(`data-pd-${name}`);
    const getNum = (name, fallback = null) => {
      const val = getAttr(name);
      return val !== null ? parseFloat(val) : fallback;
    };
    const getStr = (name, fallback = null) => {
      const val = getAttr(name);
      return val !== null ? val : fallback;
    };
    const getBool = (name) => getAttr(name) !== null;

    const type = getStr("type", "slide");
    const perPage = getNum("perpage", 1);
    const perMove = getNum("permove", perPage);
    const gap = getStr("gap", "1rem");
    const arrows = getBool("arrows");
    const pagination = getBool("pagination");
    const autoplay = getBool("autoplay");
    const interval = getNum("interval", 4000);
    const focus = getStr("focus", null);
    const easing = getStr("easing", null);
    const rewind = getBool("rewind");
    const useAutoscroll = getBool("autoscroll");
    const autoscrollSpeed = getNum("autoscrollspeed", 1);
    const pauseOnHover = getBool("pauseonhover");
    const trackOverflow = getStr("trackoverflow", null);
    const useProgress = getBool("progress");
    const progressMode = getStr("progressmode", "autoplay");

    const splide = new Splide(sliderEl, {
      type,
      perPage,
      perMove,
      gap,
      arrows,
      pagination,
      autoplay,
      interval,
      focus,
      easing,
      rewind,
      pauseOnHover,
      classes: {
        arrows: 'splide__arrows',
        arrow: 'splide__arrow',
        prev: 'splide__arrow--prev',
        next: 'splide__arrow--next',
      },
    });

    if (useAutoscroll) {
      splide.mount(window.splide.Extensions.AutoScroll);
      splide.options = {
        ...splide.options,
        autoScroll: {
          speed: autoscrollSpeed,
          pauseOnHover,
        },
      };
    } else {
      splide.mount();
    }

    // Optional progress bar
    if (useProgress) {
      const bar = sliderEl.querySelector("[data-pd-progress]");
      if (bar) {
        splide.on("move", (newIndex) => {
          const totalSlides = splide.Components.Controller.edge + 1;
          const percent = (newIndex / (totalSlides - 1)) * 100;
          bar.style.width = `${percent}%`;
        });
      }
    }
  });

  /** --------------------------------
   * ✅ Debug / Test Logs
   * -------------------------------- */
  console.log("[Webflow Splide] All sliders successfully initialized ✅");
});
