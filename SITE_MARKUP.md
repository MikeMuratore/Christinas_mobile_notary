# SITE MARKUP (AI SCRAPE FRIENDLY)

Use this file as the primary machine-readable source for website content.
It is designed for LLM/RAG crawlers, agents, and automation scripts.

## VERSION
- schema_version: 1.4
- source_file: index.html
- canonical_brand_name: Christina's Mobile Notary
- locale: en-US

## BUSINESS
- business_name: Christina's Mobile Notary
- owner_name: Christina E. Garcia
- legal_status_note: License & Bonded in California
- phone_display: (209) 230-4390
- phone_e164: +12092304390
- phone_href: tel:2092304390
- office_address:
  - line1: 3246 Shannon Ave
  - city: Merced
  - state: CA
  - postal_code: 95340
  - country: US
- availability: 24/7
- service_mode: Mobile service (travels to client)
- primary_region: Merced County, California

## SEO
- title: Christina's Mobile Notary | 24/7 Mobile Notary in Merced County, CA
- description: Christina's Mobile Notary offers professional 24/7 mobile notary services across Merced County, including general notarization, loan signings, hospital and jail visits, and apostille support.
- favicon: ./assets/favicon.svg
- apple_touch_icon: ./assets/webclip.svg

## NAVIGATION
- services: "#services"
- why_choose_us: "#why-choose-us"
- how_it_works: "#how-it-works"
- service_area: "#service-area"

## HERO
- heading: Professional Notary Services That Come To You
- subheading: Secure, reliable, and mobile notary public services available 24/7.
- trust_card_title: Christina E. Garcia
- trust_card_subtitle: License & Bonded in California
- primary_cta_label: Book Appointment
- secondary_cta_label: (209) 230-4390
- hero_image: ./assets/Hero image.png

## TRUST_BAR
- google_reviews_rating: "4.9/5"
- google_reviews_count: 114
- experience: "10+ Years"
- coverage: Mobile Service Coverage
- availability: Same Day

## SERVICES
- id: apostille
  - name: Apostille Services
  - label: Apostille
  - summary: International document authentication with compliant seals, tracking, and delivery prep.
- id: estate
  - name: Estate Notary Signings
  - label: Estate
  - summary: Wills, trusts, and power of attorney signings handled with privacy and sensitivity.
- id: loan
  - name: Loan Signings
  - label: Loan
  - summary: Structured signing flows for refinance, escrow, and mortgage packages.
- id: hospital
  - name: Hospital Signings
  - label: Hospital
  - summary: Rapid bedside notarization for urgent healthcare paperwork and directives.
- id: jail
  - name: Jail Signings
  - label: Correctional
  - summary: Secure document handling for detention facility authorizations and affidavits.
- id: general
  - name: General Notarization
  - label: General
  - summary: Everyday notarizations for affidavits, consent forms, DMV files, and more.

## WHY_CHOOSE_US
- id: why-choose-us
- items:
  - title: I Come To You
    summary: Travels to home, workplace, coffee shop, or other preferred location.
  - title: 24/7 Availability
    summary: Available around the clock, including weekends and holidays.
  - title: Professional & Reliable
    summary: Certified, licensed, bonded; focused on accuracy and timely service.
  - title: Proudly Serving Merced
    summary: Community-rooted service across Merced and surrounding cities.

## PROCESS
- id: how-it-works
- step_1:
  - title: Call or Book
  - summary: Contact by phone or book online.
- step_2:
  - title: We Come To You
  - summary: Mobile notary travels to your location.
- step_3:
  - title: Signed & Notarized
  - summary: ID verification, signing, and notarization completed.

## SERVICE_AREA
- id: service-area
- headline: Serving Merced & Beyond
- cities:
  - Atwater
  - Winton
  - Livingston
  - Los Banos
  - Chowchilla
  - Turlock
- map_embed:
  - provider: Google Maps
  - query: Merced County, California
  - zoom: 9

## TESTIMONIALS
- id: testimonials
- leave_review_url: https://www.google.com/maps/search/?api=1&query=Christina%27s+Mobile+Notary+Merced+CA
- featured:
  - reviewer_key: nikkie-g
  - reviewer_name: Nikkie G.
  - signature_display: Nikkie Guerrero
  - service_context: Estate Signing - Merced, CA
  - rating: 5
- cards:
  - reviewer_key: anayvett-p
    reviewer_name: Anayvett Perez
    service_context: Loan Signing - Atwater
    rating: 5
  - reviewer_key: megan-g
    reviewer_name: Megan G.
    service_context: Hospital Visit - Los Banos
    rating: 5
  - reviewer_key: brittney-s
    reviewer_name: Brittney S.
    service_context: General Notary - Livingston
    rating: 5

## CTA
- heading: Need a Notary Now?
- summary: Don't wait. We're ready to assist you anytime, anywhere in Merced.
- primary_cta_label: Call (209) 230-4390
- secondary_cta_label: Book Online

## FAQ
- id: faq
- heading: Common Questions
- items:
  - question: Do you charge for travel?
    answer: Travel is free within 20 miles of Merced. Beyond that, it's $1 per mile. No hidden fees.
  - question: What ID do I need?
    answer: Valid government-issued photo ID, such as a driver's license, passport, military ID, or state ID card.
  - question: How quickly can you come?
    answer: Same-day appointments are often available. Call (209) 230-4390 for urgent requests within the hour.
  - question: Do you work weekends and holidays?
    answer: Yes. Availability is 24/7, including weekends, evenings, and holidays.
  - question: Can you notarize at hospitals or jails?
    answer: Yes. Bedside signings and detention facility visits are available with proper clearance.
  - question: What payment methods do you accept?
    answer: Cash, Venmo, Zelle, and major credit/debit cards. Payment is due at time of service.

## BOOKING_MODAL
- modal_id: booking-modal
- form_id: booking-form
- provider_default: calendly
- provider_config_file: ./js/booking.js
- modal_features:
  - overlay_backdrop_close: true
  - esc_to_close: true
  - body_scroll_lock_on_open: true
  - open_triggers_selector: ".book-now-trigger"
- fields:
  - service (select, required)
  - timePreference (select, required)
  - address (text, required)
  - documentType (text, required)
  - signerCount (number, required)
  - witnessNeeded (select, required)
  - name (text, required)
  - email (email, required)
  - phone (tel, required)
  - notes (textarea, optional)
  - idReady (checkbox, required)
  - paymentOption (radio: none|deposit|full)
- mobile_step_flow:
  - enabled_below_width_px: 761
  - steps:
    - 1: Service
    - 2: Signer
    - 3: Confirm
  - controls:
    - next_button_selector: "[data-booking-next]"
    - back_button_selector: "[data-booking-back]"
  - behavior:
    - validate_current_step_before_continue: true
    - reset_to_step_1_on_open: true
    - reset_to_step_1_on_close: true

## FOOTER
- brand_name: Christina's Notary
- quick_links:
  - Apostille Services
  - Estate Signings
  - Loan Signings
  - Hospital Visits
- contact_phone_display: (209) 230-4390
- schedule_note: Available 24/7, Mobile Service Only
- appointment_note: BY APPOINTMENT ONLY

## MACHINE_SELECTORS
- main_sections:
  - header.site-header
  - section.hero
  - section.trust-bar
  - section#services
  - section#why-choose-us
  - section#how-it-works
  - section#service-area
  - section#testimonials
  - section.cta
  - section#faq
  - footer.site-footer
- booking_selectors:
  - "#booking-modal"
  - "#booking-form"
  - "[data-booking-step]"
  - ".book-now-trigger"
  - ".service-direct-book"
  - "[data-close-booking]"
  - "[data-booking-next]"
  - "[data-booking-back]"
  - ".booking-mobile-progress"

## FEATURE_INVENTORY
- ui_sections:
  - sticky_gradient_header
  - hero_with_glassmorphism_image_frame
  - trust_bar_metrics
  - 6_service_cards
  - why_choose_section_with_navigation_style_svg
  - 3_step_process
  - service_area_with_google_map_embed
  - testimonials_with_featured_quote_and_reviewer_avatars
  - cta_section
  - premium_faq_accordion_section
  - multi_column_footer
- branding_features:
  - feather_logo_navbar
  - feather_logo_footer
  - satoshi_primary_font
  - signature_font_for_featured_testimonial: Mr Dafoe
  - purple_brand_palette_matched_to_business_card_direction
- service_card_features:
  - six_step_indicator_bars_in_each_card
  - one_active_bar_matches_service_order
  - custom_svg_visual_per_service
  - looping_inline_svg_motion
  - direct_book_icon_button_per_service
  - direct_book_opens_booking_modal
  - direct_book_preselects_service_in_form
- testimonial_features:
  - featured_signature_line: Nikkie Guerrero
  - reviewer_avatar_slot_per_testimonial
  - reviewer_profile_link_slot_per_testimonial
  - hover_lift_on_stack_cards
- map_and_location_features:
  - embedded_google_map_target: Merced County, California
  - map_zoom_level: 9
  - city_list_displayed: true
- mobile_navigation_features:
  - hamburger_toggle: true
  - animated_icon_to_close_state: true
  - dropdown_panel_links: true
  - close_on_link_click: true
  - close_on_escape: true
  - auto_close_at_desktop_breakpoint: true
- language_switcher_features:
  - navbar_language_switcher: true
  - supported_languages: en, es
  - persists_selection_local_storage: true
  - runtime_content_translation_without_reload: true
- cta_stamp_features:
  - stamp_background_effect: true
  - scroll_triggered_stamp_down_animation: true
  - one_time_per_page_load: true
  - delayed_start_seconds: 1

## ANIMATION_SYSTEM
- libraries:
  - gsap
  - ScrollTrigger
- script_file: ./js/animations.js
- reduced_motion_support:
  - respects_prefers_reduced_motion: true
  - fallback_behavior: apply_static_state_without_motion
- hero_animations:
  - staged_intro_timeline: true
  - hero_visual_frame_float: true
  - hero_visual_scroll_parallax: true
- on_scroll_reveal_groups:
  - trust_stats
  - services_heading_and_cards
  - why_choose_heading_items_and_map_visual
  - process_heading_and_steps
  - location_copy_list_and_map
  - testimonials_heading_feature_and_cards
  - cta_card
  - footer_columns_and_bottom_row
- micro_animations:
  - service_active_bar_pulse: true
  - inline_svg_animations_across_service_cards: true
  - nav_map_svg_motion: true

## RESPONSIVE_BEHAVIOR
- breakpoints:
  - mobile_max: 639
  - tablet_min: 768
  - desktop_min: 1024
- mobile_adjustments:
  - brand_title_hidden_on_small_mobile: true
  - hamburger_navigation_enabled: true
  - booking_modal_stepper_enabled: true
  - booking_grid_single_column: true
- desktop_adjustments:
  - primary_nav_visible: true
  - mobile_nav_hidden: true
  - testimonials_two_column_asymmetric_layout: true

## INTEGRATIONS_AND_EXTERNALS
- maps:
  - provider: Google Maps iframe embed
  - location_target: Merced County, California
- booking_provider_support:
  - calendly_supported: true
  - acuity_supported: true
  - stripe_payment_links_supported: true
- fonts:
  - Satoshi via Fontshare
  - Material Symbols via Google Fonts
  - Mr Dafoe via Google Fonts
- cdn_scripts:
  - GSAP 3.12.5
  - ScrollTrigger 3.12.5
- local_scripts:
  - ./js/i18n.js

## UPDATE_RULES
- Keep this file in sync whenever visible text, services, contact details, testimonials, or booking fields change.
- Update `schema_version` when structure changes.
- Prefer plain text and stable keys for deterministic parsing.
