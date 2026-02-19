(function () {
  const switcher = document.querySelector(".lang-switch");
  const langButtons = switcher ? Array.from(switcher.querySelectorAll(".lang-btn")) : [];
  const LANG_KEY = "site_language";
  const originals = new WeakMap();
  const defaultLang = "en";

  if (!switcher || !langButtons.length) {
    return;
  }

  const entries = [
    { selector: "title", type: "text", es: "Notaria Movil de Christina | Notaria Movil 24/7 en el Condado de Merced, CA" },
    {
      selector: 'meta[name="description"]',
      type: "attr",
      attr: "content",
      es: "La Notaria Movil de Christina ofrece servicios notariales moviles profesionales 24/7 en todo el Condado de Merced, incluyendo notarizacion general, firmas de prestamos, visitas a hospitales y carceles, y apoyo con apostillas."
    },

    { selector: '.main-nav a[href="#services"], .mobile-nav-inner a[href="#services"]', type: "text", es: "Servicios" },
    { selector: '.main-nav a[href="#why-choose-us"], .mobile-nav-inner a[href="#why-choose-us"]', type: "text", es: "Por Que Elegirnos" },
    { selector: '.main-nav a[href="#how-it-works"], .mobile-nav-inner a[href="#how-it-works"]', type: "text", es: "Como Funciona" },
    { selector: '.main-nav a[href="#service-area"], .mobile-nav-inner a[href="#service-area"]', type: "text", es: "Area de Servicio" },
    { selector: ".btn-header.book-now-trigger", type: "text", es: "Reservar Ahora" },

    { selector: ".hero-reviews span", type: "html", es: "<strong>4.9/5</strong> de 114+ resenas en Google" },
    { selector: ".hero h1", type: "html", es: "Servicios Notariales Profesionales <span>Que Van Hasta Usted</span>" },
    {
      selector: ".hero-content > p",
      type: "text",
      es: "Servicios de notaria movil seguros y confiables disponibles 24/7. Ya sea en su hogar, oficina, hospital u otro lugar, llevamos la oficina hasta su puerta."
    },
    { selector: ".hero-actions .book-now-trigger", type: "text", es: "Reservar Cita" },
    { selector: ".trust-subtitle", type: "text", es: "Licenciada y Afianzada en California" },

    { selector: ".trust-grid .trust-stat:nth-child(1) .trust-value", type: "text", es: "Disponible 24/7" },
    { selector: ".trust-grid .trust-stat:nth-child(1) .trust-label", type: "text", es: "En Merced" },
    { selector: ".trust-grid .trust-stat:nth-child(2) .trust-value", type: "text", es: "25+ Anos" },
    { selector: ".trust-grid .trust-stat:nth-child(2) .trust-label", type: "text", es: "Experiencia" },
    { selector: ".trust-grid .trust-stat:nth-child(3) .trust-value", type: "text", es: "Movil" },
    { selector: ".trust-grid .trust-stat:nth-child(3) .trust-label", type: "text", es: "Cobertura de Servicio" },
    { selector: ".trust-grid .trust-stat:nth-child(4) .trust-value", type: "text", es: "Mismo Dia" },
    { selector: ".trust-grid .trust-stat:nth-child(4) .trust-label", type: "text", es: "Disponibilidad" },

    { selector: "#services .section-kicker", type: "text", es: "Nuestra Experiencia" },
    { selector: "#services .section-title", type: "text", es: "Servicios Notariales Integrales" },
    {
      selector: "#services .section-copy",
      type: "text",
      es: "Desde documentos legales hasta firmas medicas y correccionales sensibles, manejamos cada cita con profesionalismo y discrecion."
    },
    { selector: '.services-grid .service-feature-card:nth-child(1) .service-feature-label', type: "text", es: "Apostilla" },
    { selector: '.services-grid .service-feature-card:nth-child(1) h4', type: "text", es: "Servicios de Apostilla" },
    { selector: '.services-grid .service-feature-card:nth-child(1) p', type: "text", es: "Autenticacion internacional de documentos con sellos conformes, seguimiento y preparacion de entrega." },
    { selector: '.services-grid .service-feature-card:nth-child(2) .service-feature-label', type: "text", es: "Patrimonio" },
    { selector: '.services-grid .service-feature-card:nth-child(2) h4', type: "text", es: "Firmas Notariales de Patrimonio" },
    { selector: '.services-grid .service-feature-card:nth-child(2) p', type: "text", es: "Testamentos, fideicomisos y poderes notariales con privacidad y sensibilidad." },
    { selector: '.services-grid .service-feature-card:nth-child(3) .service-feature-label', type: "text", es: "Prestamo" },
    { selector: '.services-grid .service-feature-card:nth-child(3) h4', type: "text", es: "Firmas de Prestamos" },
    { selector: '.services-grid .service-feature-card:nth-child(3) p', type: "text", es: "Flujos de firma estructurados para refinanciamiento, escrow y paquetes hipotecarios." },
    { selector: '.services-grid .service-feature-card:nth-child(4) .service-feature-label', type: "text", es: "Hospital" },
    { selector: '.services-grid .service-feature-card:nth-child(4) h4', type: "text", es: "Firmas en Hospital" },
    { selector: '.services-grid .service-feature-card:nth-child(4) p', type: "text", es: "Notarizacion rapida al pie de cama para papeleo medico urgente y directivas." },
    { selector: '.services-grid .service-feature-card:nth-child(5) .service-feature-label', type: "text", es: "Correccional" },
    { selector: '.services-grid .service-feature-card:nth-child(5) h4', type: "text", es: "Firmas en Carcel" },
    { selector: '.services-grid .service-feature-card:nth-child(5) p', type: "text", es: "Manejo seguro de documentos para autorizaciones y declaraciones en centros de detencion." },
    { selector: '.services-grid .service-feature-card:nth-child(6) .service-feature-label', type: "text", es: "General" },
    { selector: '.services-grid .service-feature-card:nth-child(6) h4', type: "text", es: "Notarizacion General" },
    { selector: '.services-grid .service-feature-card:nth-child(6) p', type: "text", es: "Notarizaciones cotidianas para declaraciones juradas, consentimientos, tramites DMV y mas." },
    { selector: ".service-direct-book-text", type: "text", es: "Reservar" },

    { selector: "#why-choose-us .section-kicker", type: "text", es: "La Ventaja" },
    { selector: "#why-choose-us .section-title", type: "text", es: "Por Que Elegir a Christina's Mobile Notary?" },
    { selector: "#why-choose-us .advantage-item:nth-child(1) h4", type: "text", es: "Voy Hasta Usted" },
    { selector: "#why-choose-us .advantage-item:nth-child(1) p", type: "text", es: "Olvidese de buscar una oficina notarial. Me desplazo a su hogar, trabajo, cafeteria o ubicacion preferida." },
    { selector: "#why-choose-us .advantage-item:nth-child(2) h4", type: "text", es: "Disponibilidad 24/7" },
    { selector: "#why-choose-us .advantage-item:nth-child(2) p", type: "text", es: "La vida no ocurre de 9 a 5. Estoy disponible todo el dia, incluyendo fines de semana y dias festivos." },
    { selector: "#why-choose-us .advantage-item:nth-child(3) h4", type: "text", es: "Profesional y Confiable" },
    { selector: "#why-choose-us .advantage-item:nth-child(3) p", type: "text", es: "Totalmente certificada, licenciada y afianzada en California. Me enfoco en precision y puntualidad." },
    { selector: "#why-choose-us .advantage-item:nth-child(4) h4", type: "text", es: "Orgullosamente en Merced" },
    { selector: "#why-choose-us .advantage-item:nth-child(4) p", type: "text", es: "Con raices en la comunidad, brindando servicios de confianza en Merced y ciudades cercanas." },
    { selector: ".nav-app-topbar > span:nth-child(2)", type: "text", es: "Rumbo al cliente" },
    { selector: ".nav-eta-chip span", type: "text", es: "Condado de Merced" },
    { selector: ".nav-eta-chip strong", type: "text", es: "Notaria movil en camino" },

    { selector: "#how-it-works .section-kicker", type: "text", es: "Proceso Simple" },
    { selector: "#how-it-works .section-title", type: "text", es: "Notarizar Es Facil" },
    { selector: "#how-it-works .process-step:nth-child(2) h4", type: "text", es: "Llame o Reserve" },
    { selector: "#how-it-works .process-step:nth-child(2) p", type: "text", es: "Contactenos al (209) 230-4390 o reserve en linea para agendar su horario y ubicacion." },
    { selector: "#how-it-works .process-step:nth-child(3) h4", type: "text", es: "Vamos Hasta Usted" },
    { selector: "#how-it-works .process-step:nth-child(3) p", type: "text", es: "Nuestra notaria movil viaja a su ubicacion indicada, en Merced y alrededores." },
    { selector: "#how-it-works .process-step:nth-child(4) h4", type: "text", es: "Firmado y Notariado" },
    { selector: "#how-it-works .process-step:nth-child(4) p", type: "text", es: "Verificacion de identidad, firma de documentos y notarizacion oficial en el momento." },

    { selector: "#service-area .section-kicker", type: "text", es: "Ubicacion" },
    { selector: "#service-area .section-title", type: "text", es: "Atendiendo Merced y Mas" },
    { selector: "#service-area .area-copy > p", type: "text", es: "Con base en Merced, ofrecemos servicios moviles a comunidades cercanas en todo el Condado de Merced." },

    { selector: "#testimonials .section-kicker", type: "text", es: "Comentarios de Clientes" },
    { selector: "#testimonials .section-title", type: "text", es: "Confianza en Servicio Profesional y Puntual" },
    { selector: "#testimonials .section-copy", type: "text", es: "Experiencias reales de clientes del Condado de Merced que necesitaban notarizacion movil rapida y precisa." },
    { selector: ".testimonials-review-cta .review-cta-label", type: "text", es: "Dejar una Resena" },
    { selector: ".testimonial-badge", type: "text", es: "Cliente Verificado" },
    {
      selector: ".testimonial-feature blockquote",
      type: "text",
      es: "\"Christina es muy flexible y pudo acomodarnos a mi esposo y a mi fuera de horario por su trabajo. Contacte a 3 notarios y ella fue la unica que me respondio. Estoy muy agradecida de que pudiera ayudarnos de ultimo minuto. Sin duda volveria a usar sus servicios.\""
    },
    {
      selector: ".testimonial-stack .testimonial-card:nth-child(1) p",
      type: "text",
      es: "\"Christina fue puntual, servicial y muy amable. Vino a mi casa para la firma de mis documentos de cierre, lo cual fue una gran ventaja despues de trabajar un turno nocturno de 12 horas. Fue detallada y explico lo que estaba firmando. Definitivamente la recomiendo para sus servicios.\""
    },
    {
      selector: ".testimonial-stack .testimonial-card:nth-child(2) p",
      type: "text",
      es: "\"Christina hizo mucho mas de lo esperado para ayudarme. Fue puntual, profesional y muy conocedora. Aprecio mucho su flexibilidad. Incluso hizo tiempo mas tarde ese mismo dia para ayudarme con documentos adicionales. Su precio es justo y todo el proceso fue rapido y sin estres.\""
    },
    {
      selector: ".testimonial-stack .testimonial-card:nth-child(3) p",
      type: "text",
      es: "\"Christina nos ha notariado muchas veces y cada vez nos impresiona. Muy conocedora, educada y profesional.\""
    },
    { selector: ".testimonial-stack .testimonial-card:nth-child(1) .testimonial-chip", type: "text", es: "Firma de Prestamo" },
    { selector: ".testimonial-stack .testimonial-card:nth-child(2) .testimonial-chip", type: "text", es: "Visita a Hospital" },
    { selector: ".testimonial-stack .testimonial-card:nth-child(3) .testimonial-chip", type: "text", es: "Notaria General" },

    { selector: ".cta-card h2", type: "text", es: "Necesita un Notario Ahora?" },
    { selector: ".cta-card .cta-points li:nth-child(1) span:last-child", type: "text", es: "Despacho rapido para firmas urgentes" },
    { selector: ".cta-card .cta-points li:nth-child(2) span:last-child", type: "text", es: "Licenciada, con fianza y precisa en cada detalle" },
    { selector: ".cta-card .cta-points li:nth-child(3) span:last-child", type: "text", es: "Atendiendo Merced y comunidades cercanas" },
    { selector: ".cta-actions .book-now-trigger", type: "text", es: "Reservar En Linea" },

    { selector: "#faq .section-eyebrow", type: "text", es: "Preguntas Frecuentes" },
    { selector: "#faq .faq-title", type: "text", es: "Preguntas Comunes" },
    { selector: "#faq .faq-item:nth-child(1) summary", type: "text", es: "Cobran por desplazamiento?" },
    { selector: "#faq .faq-item:nth-child(1) p", type: "text", es: "El traslado es gratis dentro de 20 millas de Merced. Mas alla de eso, es $1 por milla. Sin cargos ocultos." },
    { selector: "#faq .faq-item:nth-child(2) summary", type: "text", es: "Que identificacion necesito?" },
    { selector: "#faq .faq-item:nth-child(2) p", type: "text", es: "Identificacion oficial vigente con foto: licencia, pasaporte, identificacion militar o tarjeta estatal." },
    { selector: "#faq .faq-item:nth-child(3) summary", type: "text", es: "Que tan rapido pueden llegar?" },
    { selector: "#faq .faq-item:nth-child(3) p", type: "text", es: "Con frecuencia hay citas el mismo dia. Llame al (209) 230-4390 para solicitudes urgentes dentro de la hora." },
    { selector: "#faq .faq-item:nth-child(4) summary", type: "text", es: "Trabajan fines de semana y dias festivos?" },
    { selector: "#faq .faq-item:nth-child(4) p", type: "text", es: "Si. Estoy disponible 24/7, incluyendo fines de semana, noches y dias festivos." },
    { selector: "#faq .faq-item:nth-child(5) summary", type: "text", es: "Pueden notarizar en hospitales o carceles?" },
    { selector: "#faq .faq-item:nth-child(5) p", type: "text", es: "Claro. Me especializo en firmas al pie de cama y visitas a centros de detencion con autorizacion adecuada." },
    { selector: "#faq .faq-item:nth-child(6) summary", type: "text", es: "Que metodos de pago aceptan?" },
    { selector: "#faq .faq-item:nth-child(6) p", type: "text", es: "Efectivo, Venmo, Zelle y todas las tarjetas principales. El pago se realiza al momento del servicio." },

    { selector: ".footer-brand h2", type: "text", es: "Notaria de Christina" },
    {
      selector: ".footer-brand-col > p",
      type: "text",
      es: "Notaria publica movil profesional que brinda autenticacion legal de documentos de forma confiable en Merced y zonas cercanas."
    },
    { selector: ".footer-grid > div:nth-child(2) h3", type: "text", es: "Enlaces Rapidos" },
    { selector: ".footer-grid > div:nth-child(3) h3", type: "text", es: "Contactenos" },
    { selector: ".footer-grid > div:nth-child(4) h3", type: "text", es: "Informacion de Oficina" },
    { selector: ".footer-grid > div:nth-child(2) .footer-links li:nth-child(1) a", type: "text", es: "Servicios de Apostilla" },
    { selector: ".footer-grid > div:nth-child(2) .footer-links li:nth-child(2) a", type: "text", es: "Firmas de Patrimonio" },
    { selector: ".footer-grid > div:nth-child(2) .footer-links li:nth-child(3) a", type: "text", es: "Firmas de Prestamos" },
    { selector: ".footer-grid > div:nth-child(2) .footer-links li:nth-child(4) a", type: "text", es: "Visitas a Hospitales" },
    {
      selector: ".footer-bottom p",
      type: "text",
      es: "© 2023 Christina's Mobile Notary Public. Todos los derechos reservados. Notaria licenciada y afianzada en California."
    }
  ];

  function cacheOriginal(el, key, value) {
    const current = originals.get(el) || {};
    if (!(key in current)) {
      current[key] = value;
      originals.set(el, current);
    }
  }

  function applyEntry(entry, lang) {
    const nodes = document.querySelectorAll(entry.selector);
    nodes.forEach((el) => {
      if (entry.type === "text") {
        cacheOriginal(el, "text", el.textContent);
        el.textContent = lang === "es" ? entry.es : (originals.get(el)?.text ?? el.textContent);
        return;
      }

      if (entry.type === "html") {
        cacheOriginal(el, "html", el.innerHTML);
        el.innerHTML = lang === "es" ? entry.es : (originals.get(el)?.html ?? el.innerHTML);
        return;
      }

      if (entry.type === "attr" && entry.attr) {
        const cacheKey = "attr:" + entry.attr;
        cacheOriginal(el, cacheKey, el.getAttribute(entry.attr) || "");
        el.setAttribute(entry.attr, lang === "es" ? entry.es : (originals.get(el)?.[cacheKey] ?? ""));
      }
    });
  }

  function setFieldLabel(id, textEs, lang) {
    const control = document.getElementById(id);
    if (!control) {
      return;
    }
    const label = control.closest("label");
    const span = label ? label.querySelector("span") : null;
    if (!span) {
      return;
    }
    cacheOriginal(span, "text", span.textContent);
    span.textContent = lang === "es" ? textEs : (originals.get(span)?.text ?? span.textContent);
  }

  function setOptionText(selectId, value, textEs, lang) {
    const select = document.getElementById(selectId);
    if (!select) {
      return;
    }
    const option = select.querySelector(`option[value="${value}"]`);
    if (!option) {
      return;
    }
    cacheOriginal(option, "text", option.textContent);
    option.textContent = lang === "es" ? textEs : (originals.get(option)?.text ?? option.textContent);
  }

  function setPlaceholder(id, textEs, lang) {
    const control = document.getElementById(id);
    if (!control) {
      return;
    }
    const key = "attr:placeholder";
    cacheOriginal(control, key, control.getAttribute("placeholder") || "");
    control.setAttribute("placeholder", lang === "es" ? textEs : (originals.get(control)?.[key] ?? ""));
  }

  function applyBookingTranslations(lang) {
    setFieldLabel("booking-service", "Tipo de Servicio", lang);
    setFieldLabel("booking-time-preference", "Horario Preferido", lang);
    setFieldLabel("booking-address", "Direccion de la Cita", lang);
    setFieldLabel("booking-document-type", "Tipo de Documento", lang);
    setFieldLabel("booking-signers", "Numero de Firmantes", lang);
    setFieldLabel("booking-witness", "Se Necesita Testigo?", lang);
    setFieldLabel("booking-name", "Nombre Completo", lang);
    setFieldLabel("booking-email", "Correo Electronico", lang);
    setFieldLabel("booking-phone", "Telefono", lang);
    setFieldLabel("booking-notes", "Notas Especiales", lang);

    setOptionText("booking-service", "", "Seleccione un servicio", lang);
    setOptionText("booking-service", "General Notary Work", "Notaria General", lang);
    setOptionText("booking-service", "Estate Notary Signing", "Firma Notarial de Patrimonio", lang);
    setOptionText("booking-service", "Loan Signing", "Firma de Prestamo", lang);
    setOptionText("booking-service", "Hospital Visit", "Visita a Hospital", lang);
    setOptionText("booking-service", "Jail Signing", "Firma en Carcel", lang);
    setOptionText("booking-service", "Apostille Service", "Servicio de Apostilla", lang);
    setOptionText("booking-service", "After-hours Appointment", "Cita Fuera de Horario", lang);

    setOptionText("booking-time-preference", "Earliest available", "Lo mas pronto disponible", lang);
    setOptionText("booking-time-preference", "Same day", "Mismo dia", lang);
    setOptionText("booking-time-preference", "Tomorrow", "Manana", lang);
    setOptionText("booking-time-preference", "This week", "Esta semana", lang);
    setOptionText("booking-time-preference", "After-hours", "Fuera de horario", lang);

    setOptionText("booking-witness", "No", "No", lang);
    setOptionText("booking-witness", "Yes", "Si", lang);
    setOptionText("booking-witness", "Not sure", "No estoy seguro", lang);

    setPlaceholder("booking-address", "Calle, Ciudad, Codigo Postal", lang);
    setPlaceholder("booking-document-type", "p. ej., Poder Notarial, Documentos de Prestamo", lang);
    setPlaceholder("booking-phone", "(209) 230-4390", lang);
    setPlaceholder("booking-notes", "Notas de acceso, urgencia, idioma preferido, etc.", lang);

    const bookingTitle = document.getElementById("booking-title");
    if (bookingTitle) {
      cacheOriginal(bookingTitle, "text", bookingTitle.textContent);
      bookingTitle.textContent =
        lang === "es" ? "Reserve una Cita con Notaria Movil" : (originals.get(bookingTitle)?.text ?? bookingTitle.textContent);
    }

    const bookingHeadP = document.querySelector(".booking-head p");
    if (bookingHeadP) {
      cacheOriginal(bookingHeadP, "text", bookingHeadP.textContent);
      bookingHeadP.textContent =
        lang === "es"
          ? "Elija los detalles del servicio, comparta informacion del firmante y continue para agendar en linea."
          : (originals.get(bookingHeadP)?.text ?? bookingHeadP.textContent);
    }

    const progressLabels = document.querySelectorAll(".booking-mobile-progress span");
    if (progressLabels.length === 3) {
      const esLabels = ["Servicio", "Firmante", "Confirmar"];
      progressLabels.forEach((item, index) => {
        cacheOriginal(item, "text", item.textContent);
        item.textContent = lang === "es" ? esLabels[index] : (originals.get(item)?.text ?? item.textContent);
      });
    }

    const idReadyInput = document.getElementById("booking-id-ready");
    const idReadyLabel = idReadyInput ? idReadyInput.closest("label") : null;
    if (idReadyLabel) {
      const textNode = idReadyLabel.childNodes[idReadyLabel.childNodes.length - 1];
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        if (!idReadyLabel.dataset.enText) {
          idReadyLabel.dataset.enText = textNode.textContent || "";
        }
        textNode.textContent =
          lang === "es" ? " El firmante tiene una identificacion valida con foto lista" : idReadyLabel.dataset.enText;
      }
    }

    const legend = document.querySelector(".booking-payment legend");
    if (legend) {
      cacheOriginal(legend, "text", legend.textContent);
      legend.textContent =
        lang === "es"
          ? "Opcion de Pago (Opcional, Recomendado)"
          : (originals.get(legend)?.text ?? legend.textContent);
    }

    const paymentLabels = document.querySelectorAll(".booking-payment label");
    const paymentEs = ["Pagar en la cita", "Pagar deposito ahora", "Pagar total ahora"];
    paymentLabels.forEach((label, idx) => {
      const textNode = label.childNodes[label.childNodes.length - 1];
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        if (!label.dataset.enText) {
          label.dataset.enText = textNode.textContent || "";
        }
        textNode.textContent = lang === "es" ? " " + paymentEs[idx] : label.dataset.enText;
      }
    });

    const policyP = document.querySelector(".booking-policy p");
    if (policyP) {
      cacheOriginal(policyP, "text", policyP.textContent);
      policyP.textContent =
        lang === "es"
          ? "Incluye confirmaciones/recordatorios, programacion con reglas de traslado, opciones para reprogramar y politica de cancelacion mediante agenda en linea."
          : (originals.get(policyP)?.text ?? policyP.textContent);
    }

    const submitBtn = document.querySelector('.booking-actions button[type="submit"]');
    if (submitBtn) {
      cacheOriginal(submitBtn, "text", submitBtn.textContent);
      submitBtn.textContent =
        lang === "es"
          ? "Continuar al Agendado en Linea"
          : (originals.get(submitBtn)?.text ?? submitBtn.textContent);
    }

    const callLink = document.querySelector(".booking-call-link");
    if (callLink) {
      cacheOriginal(callLink, "text", callLink.textContent);
      callLink.textContent =
        lang === "es"
          ? "Prefiere reservar por telefono? Llame al (209) 230-4390"
          : (originals.get(callLink)?.text ?? callLink.textContent);
    }

    const stepNextButtons = document.querySelectorAll('[data-booking-next]');
    stepNextButtons.forEach((btn) => {
      cacheOriginal(btn, "text", btn.textContent);
      btn.textContent = lang === "es" ? "Continuar" : (originals.get(btn)?.text ?? btn.textContent);
    });

    const stepBackButtons = document.querySelectorAll('[data-booking-back]');
    stepBackButtons.forEach((btn) => {
      cacheOriginal(btn, "text", btn.textContent);
      btn.textContent = lang === "es" ? "Atras" : (originals.get(btn)?.text ?? btn.textContent);
    });
  }

  function applyLanguage(lang) {
    const activeLang = lang === "es" ? "es" : "en";
    document.documentElement.setAttribute("lang", activeLang);

    entries.forEach((entry) => applyEntry(entry, activeLang));
    applyBookingTranslations(activeLang);

    langButtons.forEach((button) => {
      const isActive = button.dataset.lang === activeLang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    localStorage.setItem(LANG_KEY, activeLang);
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.lang);
    });
  });

  const initialLang = localStorage.getItem(LANG_KEY) || defaultLang;
  applyLanguage(initialLang);
})();
