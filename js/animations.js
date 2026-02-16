(function () {
  const ctaCard = document.querySelector(".cta-card");

  if (!window.gsap || !window.ScrollTrigger) {
    if (ctaCard) {
      ctaCard.classList.add("stamp-down");
    }
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    if (ctaCard) {
      ctaCard.classList.add("stamp-down");
    }
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const baseEase = "power3.out";

  function revealOnScroll(selector, options) {
    const nodes = gsap.utils.toArray(selector);
    if (!nodes.length) {
      return;
    }

    gsap.from(nodes, {
      y: options?.y ?? 34,
      autoAlpha: 0,
      duration: options?.duration ?? 0.95,
      ease: options?.ease ?? baseEase,
      stagger: options?.stagger ?? 0.08,
      clearProps: "all",
      scrollTrigger: {
        trigger: options?.trigger || selector,
        start: options?.start || "top 82%",
        once: true,
      },
    });
  }

  // Refined first-impression timeline.
  const heroTl = gsap.timeline({ defaults: { ease: baseEase } });
  heroTl
    .set(".hero-actions .btn", { y: 18, autoAlpha: 0 })
    .from(".site-header", { y: -36, autoAlpha: 0, duration: 0.9 })
    .from(".brand-group, .main-nav a, .header-actions", { y: -18, autoAlpha: 0, duration: 0.55, stagger: 0.07 }, "-=0.55")
    .from(".hero-reviews", { y: 20, autoAlpha: 0, duration: 0.55 }, "-=0.2")
    .from(".hero h1", { y: 22, autoAlpha: 0, duration: 0.78 }, "-=0.2")
    .from(".hero p", { y: 18, autoAlpha: 0, duration: 0.6 }, "-=0.42")
    .to(".hero-actions .btn", { y: 0, autoAlpha: 1, duration: 0.56, stagger: 0.08, clearProps: "opacity,visibility,transform" }, "-=0.38")
    .from(".hero-visual", { y: 22, autoAlpha: 0, duration: 0.85 }, "-=0.55")
    .from(".trust-card", { y: 14, autoAlpha: 0, duration: 0.55 }, "-=0.35");

  // Luxury subtle float.
  gsap.to(".hero-visual-frame", {
    opacity: 0.62,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Hero parallax polish.
  gsap.to(".hero-visual", {
    y: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    },
  });

  revealOnScroll(".trust-stat", { trigger: ".trust-bar", stagger: 0.11, y: 24 });

  revealOnScroll("#services .section-heading", { trigger: "#services", y: 30 });
  revealOnScroll(".service-feature-card", { trigger: ".services-grid", stagger: 0.09, y: 34, start: "top 78%" });

  revealOnScroll("#why-choose-us .section-kicker, #why-choose-us .section-title", {
    trigger: "#why-choose-us",
    y: 24,
    stagger: 0.08,
  });
  revealOnScroll(".advantage-item", { trigger: ".advantage-list", y: 22, stagger: 0.11, start: "top 76%" });
  revealOnScroll(".nav-app-visual", { trigger: ".nav-app-visual", y: 36, duration: 1.0, start: "top 80%" });

  gsap.to(".nav-app-shell", {
    y: -12,
    ease: "none",
    scrollTrigger: {
      trigger: ".nav-app-visual",
      start: "top 90%",
      end: "bottom top",
      scrub: 1,
    },
  });

  revealOnScroll("#how-it-works .section-heading", { trigger: "#how-it-works", y: 28 });
  revealOnScroll(".process-step", { trigger: ".process-grid", y: 26, stagger: 0.12, start: "top 78%" });

  revealOnScroll("#service-area .section-kicker, #service-area .section-title, #service-area p", {
    trigger: "#service-area",
    y: 26,
    stagger: 0.08,
  });
  revealOnScroll(".area-list div", { trigger: ".area-list", y: 18, stagger: 0.05, start: "top 84%" });
  revealOnScroll(".area-map-wrap", { trigger: ".area-card", y: 30, duration: 0.95, start: "top 78%" });

  revealOnScroll("#testimonials .section-heading", { trigger: "#testimonials", y: 28, duration: 0.9, start: "top 82%" });
  revealOnScroll(".testimonial-feature", { trigger: ".testimonials-layout", y: 30, duration: 0.95, start: "top 80%" });
  revealOnScroll(".testimonial-card", { trigger: ".testimonial-stack", y: 20, stagger: 0.1, duration: 0.8, start: "top 84%" });

  revealOnScroll(".cta-card", { trigger: ".cta", y: 30, duration: 1.0, start: "top 80%" });
  if (ctaCard) {
    ScrollTrigger.create({
      trigger: ".cta",
      start: "top 82%",
      once: true,
      onEnter: function () {
        gsap.delayedCall(1, function () {
          ctaCard.classList.add("stamp-down");
        });
      },
    });
  }
  revealOnScroll(".site-footer .footer-grid > div", { trigger: ".site-footer", y: 24, stagger: 0.11, start: "top 84%" });
  revealOnScroll(".footer-bottom", { trigger: ".footer-bottom", y: 14, duration: 0.7, start: "top 95%" });

  // Tiny rhythmic accent on the active service marker bars.
  gsap.to(".service-feature-bars .is-active", {
    scaleY: 1.22,
    transformOrigin: "center bottom",
    duration: 0.85,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    stagger: 0.07,
  });
})();
