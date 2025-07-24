/**
 * Patterns Dev – Splide Slider
 * Requires Splide V4.1.3 + and Splide-extension-auto-scroll V0.4.2
 * 
 * HTML elements must include data-pd-* attributes to control behavior.
 */

  document.addEventListener("DOMContentLoaded", function () {
  const allSplides = document.querySelectorAll("[wb-element='splide']");

  allSplides.forEach((splide, i) => {
    const sliderName = splide.getAttribute('id') || `Slider #${i + 1}`;

    const getBool = (attr) => {
      const val = splide.dataset[attr]?.toLowerCase();
      if (val !== "true" && val !== "false" && val !== undefined) {
        console.warn(`[${sliderName}] Valor inválido en '${attr}': "${val}", usando false.`);
      }
      return val === "true";
    };

    const getNum = (attr, fallback) => {
      const val = parseFloat(splide.dataset[attr]);
      if (isNaN(val)) {
        if (splide.dataset[attr] !== undefined) {
          console.warn(`[${sliderName}] Número inválido en '${attr}': "${splide.dataset[attr]}", usando ${fallback}.`);
        }
        return fallback;
      }
      return val;
    };

    const getStr = (attr, fallback) => {
      const val = splide.dataset[attr]?.trim();
      if (!val) {
        if (splide.dataset[attr] !== undefined) {
          console.warn(`[${sliderName}] String vacío o inválido en '${attr}', usando "${fallback}".`);
        }
        return fallback;
      }
      return val;
    };

    const getBreakpoints = () => {
      const breakpoints = {};
      for (const attr of splide.attributes) {
        const match = attr.name.match(/^data-breakpoint-(\d+)$/);
        if (match) {
          const px = parseInt(match[1], 10);
          const perPageVal = parseFloat(attr.value);
          if (!isNaN(px) && !isNaN(perPageVal)) {
            breakpoints[px] = { perPage: perPageVal };
          } else {
            console.warn(`[${sliderName}] Breakpoint ${match[1]} tiene valor inválido: "${attr.value}"`);
          }
        }
      }
      return breakpoints;
    };

    const type = getStr("type", "slide");
    const perPage = getNum("perPage", 1);
    const perMove = getNum("perMove", perPage);
    const gap = getStr("gap", "1rem");
    const arrows = getBool("arrows");
    const pagination = getBool("pagination");
    const autoplay = getBool("autoplay");
    const interval = getNum("interval", 4000);
    const focus = getStr("focus", null);
    const easing = getStr("easing", null);
    const rewind = getBool("rewind");
    const useAutoscroll = getBool("autoscroll");
    const autoscrollSpeed = getNum("autoscrollSpeed", 1);
    const pauseOnHover = getBool("pauseOnHover");
    const trackOverflow = getStr("trackOverflow", null);
    const useProgress = getBool("progress");
    const progressMode = getStr("progressMode", "autoplay");

    const options = {
      type,
      perPage,
      perMove,
      gap,
      arrows,
      pagination,
      autoplay,
      rewind,
      interval,
      breakpoints: getBreakpoints(),
    };

    if (focus) options.focus = focus;
    if (easing) options.easing = easing;

    if (useAutoscroll) {
      options.autoScroll = {
        speed: autoscrollSpeed,
        pauseOnHover: pauseOnHover,
        pauseOnFocus: false,
      };
    }

    if (trackOverflow) {
      const track = splide.querySelector(".splide__track");
      if (track) {
        track.style.overflow = trackOverflow;
      }
    }

    try {
      const instance = new Splide(splide, options);

      // Barra de progreso
      if (useProgress) {
        const bar = splide.querySelector(".splide__progress-bar");

        if (!bar) {
          console.warn(`[${sliderName}] .splide__progress-bar no encontrada. Se omitirá progreso.`);
        } else {
          if (progressMode === "autoplay") {
            instance.on("autoplay:playing", (rate) => {
              bar.style.width = `${rate * 100}%`;
            });
          } else {
            const updateProgress = () => {
              const end = instance.Components.Controller.getEnd() + 1;
              const rate = Math.min((instance.index + 1) / end, 1);
              bar.style.width = `${rate * 100}%`;
            };
            instance.on("mounted move", updateProgress);
            updateProgress();
          }
        }
      }

      instance.mount(useAutoscroll ? window.splide.Extensions : undefined);
    } catch (err) {
      console.error(`[${sliderName}] Error al montar el slider:`, err);
      splide.classList.add("slider-error");
      splide.innerHTML = `
        <div>
          ⚠️ <strong>Error:</strong> No se pudo cargar este slider.<br>
          Verifica los atributos o la configuración del plugin.
        </div>
      `;
    }
  });
});
