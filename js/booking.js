(function () {
  const bookingConfig = {
    provider: "calendly", // "calendly" or "acuity"
    calendlyBaseUrl: "https://calendly.com/YOUR_CALENDLY_HANDLE/mobile-notary",
    acuityBaseUrl: "https://YOUR_ACUITY_HANDLE.as.me/schedule.php",
    stripe: {
      depositUrl: "",
      fullUrl: "",
    },
  };

  const modal = document.getElementById("booking-modal");
  const form = document.getElementById("booking-form");
  const triggers = document.querySelectorAll(".book-now-trigger");
  const closeButtons = document.querySelectorAll("[data-close-booking]");
  const dialog = modal ? modal.querySelector(".booking-dialog") : null;
  const steps = form ? Array.from(form.querySelectorAll("[data-booking-step]")) : [];
  const progressItems = form ? Array.from(form.querySelectorAll(".booking-mobile-progress span")) : [];
  const nextButtons = form ? Array.from(form.querySelectorAll("[data-booking-next]")) : [];
  const backButtons = form ? Array.from(form.querySelectorAll("[data-booking-back]")) : [];
  const mobileStepQuery = window.matchMedia("(max-width: 760px)");
  let activeStep = 0;

  if (!modal || !form || !triggers.length) {
    return;
  }

  function isMobileStepMode() {
    return mobileStepQuery.matches && steps.length > 0;
  }

  function syncStepState(stepIndex) {
    activeStep = stepIndex;
    steps.forEach((step, index) => {
      step.classList.toggle("is-active", index === activeStep);
    });
    progressItems.forEach((item, index) => {
      item.classList.toggle("is-active", index === activeStep);
    });
    if (dialog) {
      dialog.scrollTop = 0;
    }
  }

  function resetStepState() {
    syncStepState(0);
  }

  function validateStep(stepIndex) {
    const step = steps[stepIndex];
    if (!step) {
      return true;
    }
    const fields = step.querySelectorAll("input, select, textarea");
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  }

  function openModal(presetService) {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    resetStepState();
    const serviceField = document.getElementById("booking-service");
    if (serviceField) {
      if (presetService) {
        const matchingOption = Array.from(serviceField.options).find((option) => option.value === presetService);
        if (matchingOption) {
          serviceField.value = presetService;
        }
      }
      serviceField.focus();
    }
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    resetStepState();
  }

  function encodeQuery(params) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        search.set(key, String(value));
      }
    });
    return search.toString();
  }

  function getFormValues() {
    const data = new FormData(form);
    return {
      service: data.get("service") || "",
      timePreference: data.get("timePreference") || "",
      address: data.get("address") || "",
      documentType: data.get("documentType") || "",
      signerCount: data.get("signerCount") || "",
      witnessNeeded: data.get("witnessNeeded") || "",
      name: data.get("name") || "",
      email: data.get("email") || "",
      phone: data.get("phone") || "",
      notes: data.get("notes") || "",
      idReady: data.get("idReady") ? "Yes" : "No",
      paymentOption: data.get("paymentOption") || "none",
    };
  }

  function buildCalendlyUrl(values) {
    const params = {
      name: values.name,
      email: values.email,
      a1: values.service,
      a2: values.address,
      a3: values.documentType,
      a4: values.signerCount,
      a5: values.witnessNeeded,
      a6: values.timePreference,
      a7: values.idReady,
      a8: values.phone,
      a9: values.notes,
      utm_source: "website",
      utm_medium: "book_now",
      utm_campaign: "mobile_notary_booking",
    };

    return bookingConfig.calendlyBaseUrl + "?" + encodeQuery(params);
  }

  function buildAcuityUrl(values) {
    const params = {
      firstName: values.name,
      email: values.email,
      phone: values.phone,
      service: values.service,
      location: values.address,
      notes: [
        "Doc type: " + values.documentType,
        "Signers: " + values.signerCount,
        "Witness: " + values.witnessNeeded,
        "Time pref: " + values.timePreference,
        "ID ready: " + values.idReady,
        values.notes ? "Notes: " + values.notes : "",
      ]
        .filter(Boolean)
        .join(" | "),
    };

    return bookingConfig.acuityBaseUrl + "?" + encodeQuery(params);
  }

  function maybeOpenPayment(values) {
    if (values.paymentOption === "deposit" && bookingConfig.stripe.depositUrl) {
      window.open(bookingConfig.stripe.depositUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (values.paymentOption === "full" && bookingConfig.stripe.fullUrl) {
      window.open(bookingConfig.stripe.fullUrl, "_blank", "noopener,noreferrer");
    }
  }

  function continueToScheduler(values) {
    const schedulerUrl =
      bookingConfig.provider === "acuity" ? buildAcuityUrl(values) : buildCalendlyUrl(values);

    if (!schedulerUrl || schedulerUrl.includes("YOUR_CALENDLY_HANDLE") || schedulerUrl.includes("YOUR_ACUITY_HANDLE")) {
      alert("Booking provider URL is not configured yet. Update js/booking.js with your Calendly or Acuity link.");
      return;
    }

    maybeOpenPayment(values);
    window.open(schedulerUrl, "_blank", "noopener,noreferrer");
    closeModal();
  }

  triggers.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.bookService || "");
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!isMobileStepMode()) {
        return;
      }
      if (!validateStep(activeStep)) {
        return;
      }
      const nextIndex = Math.min(activeStep + 1, steps.length - 1);
      syncStepState(nextIndex);
    });
  });

  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!isMobileStepMode()) {
        return;
      }
      const previousIndex = Math.max(activeStep - 1, 0);
      syncStepState(previousIndex);
    });
  });

  mobileStepQuery.addEventListener("change", () => {
    if (!modal.hidden) {
      resetStepState();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const values = getFormValues();
    continueToScheduler(values);
  });
})();

(function () {
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  const toggle = document.querySelector(".menu-toggle");
  const panel = document.getElementById("mobile-nav-panel");

  if (!header || !toggle || !panel) {
    return;
  }

  const menuLinks = panel.querySelectorAll("a");
  const desktopQuery = window.matchMedia("(min-width: 1024px)");

  function setMenuState(isOpen) {
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    panel.hidden = !isOpen;
    header.classList.toggle("menu-open", isOpen);
  }

  function closeMenu() {
    setMenuState(false);
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });

  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) {
      closeMenu();
    }
  });

  function syncHeaderTransparency() {
    if (!hero) {
      return;
    }
    const heroRect = hero.getBoundingClientRect();
    const headerHeight = header.offsetHeight || 72;
    const isOverHero = heroRect.top <= headerHeight && heroRect.bottom > headerHeight;
    header.classList.toggle("is-transparent", isOverHero);
  }

  syncHeaderTransparency();
  window.addEventListener("scroll", syncHeaderTransparency, { passive: true });
  window.addEventListener("resize", syncHeaderTransparency);
})();
