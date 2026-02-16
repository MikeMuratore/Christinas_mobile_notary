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

  if (!modal || !form || !triggers.length) {
    return;
  }

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const serviceField = document.getElementById("booking-service");
    if (serviceField) {
      serviceField.focus();
    }
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
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
    button.addEventListener("click", openModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
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