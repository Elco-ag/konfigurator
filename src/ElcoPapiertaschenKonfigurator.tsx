import React, { useState, useEffect } from 'react';

// ============================================================================
// TRANSLATIONS
// ============================================================================

const T = {
  de: {
    // Steps
    step1: '1. Henkelform',
    step2: '2. Farbe',
    step3: '3. Format & Grösse',
    step4: '4. Druckart',
    step5: '5. Menge',
    // Step hints
    hint_handle: '(Bitte zuerst Henkelform wählen)',
    hint_color: '(Bitte zuerst Farbe wählen)',
    hint_format: '(Bitte zuerst Format wählen)',
    hint_print: '(Bitte zuerst Druckart wählen)',
    // Handle
    flat: 'Flachhenkel',
    flat_desc: 'Klassisch & bewährt',
    cord: 'Kordelhenkel',
    cord_desc: 'Premium & elegant',
    // Color
    brown: 'Braun',
    brown_desc: 'Natürlich & nachhaltig',
    white: 'Weiss',
    white_desc: 'Edel & vielseitig',
    // Format
    choose_format: 'Wählen Sie ein Format...',
    // Print
    print_one: 'Einseitig bedruckt',
    print_both: 'Beidseitig bedruckt',
    // Quantity
    qty_placeholder: 'Eigene Menge eingeben...',
    qty_hint: '💡 Eingabe in 50er Schritten: 50, 100, 150, 200, 250, usw.',
    qty_min_error: 'Mindestmenge: 50 Stück',
    qty_step_error: 'Bitte in 50er Schritten (50, 100, 150, 200, ...)',
    qty_valid: '✓ Gültige Menge',
    // Large order
    large_order_title: 'Grossauflage erkannt',
    large_order_text: 'Für Auflagen über 1\'500 Stück bieten wir Ihnen individuelle Preise und erweiterte Optionen.',
    large_order_contact: 'Kontakt:',
    // Price section
    price_title: 'Ihre Preiskalkulation',
    price_badge: 'Tagesaktuelle Preise',
    config_label: 'Konfiguration',
    format_label: 'Format',
    qty_label: 'Menge',
    qty_unit: 'Stück',
    unit_price: 'Stückpreis',
    subtotal: 'Warenwert',
    shipping_label: 'Versand',
    surcharge: 'Kleinmengenzuschlag',
    free_shipping: 'Versandkostenfrei!',
    total_label: 'Ihr Gesamtpreis',
    excl_vat: 'exkl. MwSt',
    savings_tip: 'Spartipp:',
    savings_text: (tier, pct) => `Bei ${tier} Stück sparen Sie ${pct}% pro Stück`,
    price_placeholder_title: 'Bitte Konfiguration abschliessen',
    price_placeholder_text: 'Wählen Sie alle Optionen aus, um den Preis zu berechnen',
    // Handle labels for summary
    handle_flat_short: 'Flach',
    handle_cord_short: 'Kordel',
    color_brown_short: 'Braun',
    color_white_short: 'Weiss',
    // Contact form
    contact_title: 'Jetzt direkt anfragen',
    contact_hint: '(Bitte zuerst Konfiguration abschliessen)',
    logo_label: 'Logo-Platzierung & Grösse *',
    logo_placeholder: 'z.B. Logo mittelgross, zentriert auf der Vorderseite',
    logo_hint: '💡 Beschreiben Sie die gewünschte Grösse und Position Ihres Logos',
    company_ph: 'Firma *',
    address_ph: 'Adresse (Strasse, PLZ, Ort) *',
    firstname_ph: 'Vorname *',
    lastname_ph: 'Nachname *',
    email_ph: 'E-Mail *',
    phone_ph: 'Telefon *',
    submit_btn: '📧 E-Mail-Anfrage öffnen',
    submit_hint: 'Hängen Sie bitte Ihr Logo an die E-Mail an',
    alert_fields: 'Bitte alle Pflichtfelder ausfüllen (inkl. Adresse und Logo-Beschreibung)',
    alert_config: 'Bitte vollständige Konfiguration wählen',
    // Toast
    toast_title: 'E-Mail geöffnet',
    toast_text: 'Bitte Logo anhängen und versenden',
    // Shipping info
    ship_title: 'Versand & Lieferung',
    ship_cost_label: 'Versandkosten',
    ship_free: 'Gratis',
    ship_free_from: 'ab CHF 250.-',
    ship_mid: 'CHF 12.90',
    ship_mid_from: 'ab CHF 100.-',
    ship_low: 'CHF 25.-',
    ship_low_from: 'unter CHF 100.-',
    delivery_label: 'Lieferzeit',
    delivery_1: '5-7 Arbeitstage',
    delivery_2: 'ab Freigabe',
    delivery_3: 'Express möglich',
    proof_label: 'Proof',
    proof_1: 'Innert 24h',
    proof_2: 'digital',
    // Email
    email_subject: 'Anfrage Papiertragetasche mit Logo via Konfigurator',
    email_body: (cfg) => `Guten Tag ELCO Team

Ich interessiere mich für bedruckte Papiertragetaschen mit meinem Logo und bitte um ein Angebot mit Proof.

========================================
⚠️ WICHTIG: LOGO-ANHANG ⚠️
========================================
Mein Logo in SCHWARZ und guter Auflösung (min. 300 DPI) hänge ich als Anhang an diese E-Mail an.
Als PDF, AI, EPS oder hochauflösendes PNG.
========================================

MEINE KONFIGURATION:
--------------------
Henkelform: ${cfg.handleLabel}
Farbe: ${cfg.colorLabel}
Format: ${cfg.format} cm (${cfg.sizeLabel})
Druckart: ${cfg.printLabel}
Menge: ${cfg.qty} Stück

LOGO-PLATZIERUNG & GRÖSSE:
--------------------------
${cfg.logoDescription}

PREISKALKULATION:
-----------------
Stückpreis: ${cfg.unitPrice}
Warenwert: ${cfg.subtotal}
Versand: ${cfg.shippingText}
Total: ${cfg.total} exkl. MwSt.

KONTAKTDATEN:
-------------
Firma: ${cfg.company}
Adresse: ${cfg.address}
Ansprechperson: ${cfg.firstName} ${cfg.lastName}
Telefon: ${cfg.phone}
E-Mail: ${cfg.email}

Bitte senden Sie mir innert 24 Stunden einen digitalen Proof zur Freigabe.

Mit freundlichen Grüssen
${cfg.firstName} ${cfg.lastName}`,
    // Email helpers
    print_one_long: 'Einseitig 1-farbig',
    print_both_long: 'Beidseitig 1-farbig',
    ship_free_long: 'Versandkostenfrei (Bestellung über CHF 250.-)',
    ship_surcharge_prefix: ' + CHF ',
    ship_surcharge_suffix: ' Kleinmengenzuschlag',
  },
  fr: {
    step1: '1. Type de poignée',
    step2: '2. Couleur',
    step3: '3. Format & taille',
    step4: '4. Type d\'impression',
    step5: '5. Quantité',
    hint_handle: '(Veuillez d\'abord choisir le type de poignée)',
    hint_color: '(Veuillez d\'abord choisir la couleur)',
    hint_format: '(Veuillez d\'abord choisir le format)',
    hint_print: '(Veuillez d\'abord choisir le type d\'impression)',
    flat: 'Poignée plate',
    flat_desc: 'Classique & éprouvée',
    cord: 'Poignée cordelette',
    cord_desc: 'Premium & élégante',
    brown: 'Brun',
    brown_desc: 'Naturel & durable',
    white: 'Blanc',
    white_desc: 'Élégant & polyvalent',
    choose_format: 'Choisissez un format...',
    print_one: 'Imprimé recto',
    print_both: 'Imprimé recto-verso',
    qty_placeholder: 'Saisir une quantité personnalisée...',
    qty_hint: '💡 Saisie par tranches de 50 : 50, 100, 150, 200, 250, etc.',
    qty_min_error: 'Quantité minimum : 50 pièces',
    qty_step_error: 'Par tranches de 50 (50, 100, 150, 200, ...)',
    qty_valid: '✓ Quantité valide',
    large_order_title: 'Grande commande détectée',
    large_order_text: 'Pour les commandes de plus de 1\'500 pièces, nous vous proposons des prix individuels et des options étendues.',
    large_order_contact: 'Contact :',
    price_title: 'Votre calcul de prix',
    price_badge: 'Prix du jour',
    config_label: 'Configuration',
    format_label: 'Format',
    qty_label: 'Quantité',
    qty_unit: 'pièces',
    unit_price: 'Prix unitaire',
    subtotal: 'Valeur marchandise',
    shipping_label: 'Livraison',
    surcharge: 'Supplément petite quantité',
    free_shipping: 'Livraison gratuite !',
    total_label: 'Votre prix total',
    excl_vat: 'HT',
    savings_tip: 'Astuce :',
    savings_text: (tier, pct) => `À ${tier} pièces, vous économisez ${pct}% par pièce`,
    price_placeholder_title: 'Veuillez compléter la configuration',
    price_placeholder_text: 'Sélectionnez toutes les options pour calculer le prix',
    handle_flat_short: 'Plate',
    handle_cord_short: 'Cordelette',
    color_brown_short: 'Brun',
    color_white_short: 'Blanc',
    contact_title: 'Demander maintenant',
    contact_hint: '(Veuillez d\'abord compléter la configuration)',
    logo_label: 'Placement et taille du logo *',
    logo_placeholder: 'p. ex. Logo taille moyenne, centré sur la face avant',
    logo_hint: '💡 Décrivez la taille et la position souhaitées de votre logo',
    company_ph: 'Entreprise *',
    address_ph: 'Adresse (rue, NPA, localité) *',
    firstname_ph: 'Prénom *',
    lastname_ph: 'Nom *',
    email_ph: 'E-mail *',
    phone_ph: 'Téléphone *',
    submit_btn: '📧 Ouvrir la demande par e-mail',
    submit_hint: 'Veuillez joindre votre logo à l\'e-mail',
    alert_fields: 'Veuillez remplir tous les champs obligatoires (y compris l\'adresse et la description du logo)',
    alert_config: 'Veuillez compléter la configuration',
    toast_title: 'E-mail ouvert',
    toast_text: 'Veuillez joindre votre logo et envoyer',
    ship_title: 'Livraison & expédition',
    ship_cost_label: 'Frais de port',
    ship_free: 'Gratuit',
    ship_free_from: 'dès CHF 250.-',
    ship_mid: 'CHF 12.90',
    ship_mid_from: 'dès CHF 100.-',
    ship_low: 'CHF 25.-',
    ship_low_from: 'en dessous de CHF 100.-',
    delivery_label: 'Délai de livraison',
    delivery_1: '5-7 jours ouvrables',
    delivery_2: 'après validation',
    delivery_3: 'Express possible',
    proof_label: 'Épreuve',
    proof_1: 'Sous 24h',
    proof_2: 'numérique',
    email_subject: 'Demande de sacs en papier avec logo via configurateur',
    email_body: (cfg) => `Bonjour l'équipe ELCO,

Je suis intéressé(e) par des sacs en papier imprimés avec mon logo et je vous prie de me faire une offre avec épreuve.

========================================
⚠️ IMPORTANT : LOGO EN PIÈCE JOINTE ⚠️
========================================
Mon logo en NOIR et en bonne résolution (min. 300 DPI) est joint à cet e-mail.
En format PDF, AI, EPS ou PNG haute résolution.
========================================

MA CONFIGURATION :
------------------
Type de poignée : ${cfg.handleLabel}
Couleur : ${cfg.colorLabel}
Format : ${cfg.format} cm (${cfg.sizeLabel})
Type d'impression : ${cfg.printLabel}
Quantité : ${cfg.qty} pièces

PLACEMENT ET TAILLE DU LOGO :
------------------------------
${cfg.logoDescription}

CALCUL DU PRIX :
-----------------
Prix unitaire : ${cfg.unitPrice}
Valeur marchandise : ${cfg.subtotal}
Livraison : ${cfg.shippingText}
Total : ${cfg.total} HT

COORDONNÉES :
-------------
Entreprise : ${cfg.company}
Adresse : ${cfg.address}
Personne de contact : ${cfg.firstName} ${cfg.lastName}
Téléphone : ${cfg.phone}
E-mail : ${cfg.email}

Merci de m'envoyer une épreuve numérique pour validation dans les 24 heures.

Cordialement,
${cfg.firstName} ${cfg.lastName}`,
    print_one_long: 'Recto 1 couleur',
    print_both_long: 'Recto-verso 1 couleur',
    ship_free_long: 'Livraison gratuite (commande supérieure à CHF 250.-)',
    ship_surcharge_prefix: ' + CHF ',
    ship_surcharge_suffix: ' supplément petite quantité',
  }
};

// ============================================================================
// PRICE DATA
// ============================================================================

const PRICE_DATA = {
  rules: {
    tiers: [50, 200, 500, 1000, 2000, 5000],
    min_qty: 50,
    shipping: {
      free_threshold: 250,
      medium_threshold: 100,
      medium_cost: 12.90,
      low_cost: 25,
      small_qty_surcharge: 20
    }
  },
  data: {
    flachhenkel: {
      braun: {
        "18x8x26": {
          size_label: "Mini / 7010101.25",
          "1/0": { 50: 1.76, 200: 1.26, 500: 0.96, 1000: 0.86, 2000: 0.77, 5000: 0.73 },
          "1/1": { 50: 2.56, 200: 1.81, 500: 1.36, 1000: 1.21, 2000: 1.04, 5000: 0.98 }
        },
        "22x10x29": {
          size_label: "Small / 7010102.25",
          "1/0": { 50: 1.80, 200: 1.30, 500: 1.00, 1000: 0.90, 2000: 0.81, 5000: 0.77 },
          "1/1": { 50: 2.60, 200: 1.85, 500: 1.40, 1000: 1.25, 2000: 1.08, 5000: 1.02 }
        },
        "26x10x33": {
          size_label: "Medium / 7010103.25",
          "1/0": { 50: 1.85, 200: 1.35, 500: 1.05, 1000: 0.95, 2000: 0.86, 5000: 0.82 },
          "1/1": { 50: 2.65, 200: 1.90, 500: 1.45, 1000: 1.30, 2000: 1.13, 5000: 1.07 }
        },
        "26x16x29": {
          size_label: "Medium Wide / 7010107.25",
          "1/0": { 50: 1.51, 200: 1.16, 500: 0.95, 1000: 0.86, 2000: 0.83, 5000: 0.80 },
          "1/1": { 50: 2.07, 200: 1.54, 500: 1.23, 1000: 1.10, 2000: 1.03, 5000: 0.98 }
        },
        "32x17x38": {
          size_label: "Large / 7010104.25",
          "1/0": { 50: 1.94, 200: 1.44, 500: 1.14, 1000: 1.04, 2000: 0.95, 5000: 0.91 },
          "1/1": { 50: 2.74, 200: 1.99, 500: 1.54, 1000: 1.39, 2000: 1.22, 5000: 1.16 }
        },
        "32x22x30": {
          size_label: "Large Take-Away / 7010105.25",
          "1/0": { 50: 1.94, 200: 1.44, 500: 1.14, 1000: 1.04, 2000: 0.95, 5000: 0.91 },
          "1/1": { 50: 2.74, 200: 1.99, 500: 1.54, 1000: 1.39, 2000: 1.22, 5000: 1.16 }
        }
      },
      weiss: {
        "18x8x26": {
          size_label: "Mini / 7010201.10",
          "1/0": { 50: 1.80, 200: 1.30, 500: 1.00, 1000: 0.90, 2000: 0.81, 5000: 0.77 },
          "1/1": { 50: 2.60, 200: 1.85, 500: 1.40, 1000: 1.25, 2000: 1.08, 5000: 1.02 }
        },
        "22x10x29": {
          size_label: "Small / 7010202.10",
          "1/0": { 50: 1.85, 200: 1.35, 500: 1.05, 1000: 0.95, 2000: 0.86, 5000: 0.82 },
          "1/1": { 50: 2.65, 200: 1.90, 500: 1.45, 1000: 1.30, 2000: 1.13, 5000: 1.07 }
        },
        "26x10x33": {
          size_label: "Medium / 7010203.10",
          "1/0": { 50: 1.90, 200: 1.40, 500: 1.10, 1000: 1.00, 2000: 0.90, 5000: 0.87 },
          "1/1": { 50: 2.70, 200: 1.95, 500: 1.50, 1000: 1.35, 2000: 1.18, 5000: 1.11 }
        },
        "26x16x29": {
          size_label: "Medium Wide / 7010207.10",
          "1/0": { 50: 1.55, 200: 1.20, 500: 0.99, 1000: 0.91, 2000: 0.87, 5000: 0.85 },
          "1/1": { 50: 2.11, 200: 1.58, 500: 1.27, 1000: 1.14, 2000: 1.08, 5000: 1.03 }
        },
        "32x17x38": {
          size_label: "Large / 7010204.10",
          "1/0": { 50: 1.99, 200: 1.49, 500: 1.19, 1000: 1.09, 2000: 0.99, 5000: 0.96 },
          "1/1": { 50: 2.79, 200: 2.04, 500: 1.59, 1000: 1.44, 2000: 1.27, 5000: 1.21 }
        },
        "32x22x30": {
          size_label: "Large Take-Away / 7010205.10",
          "1/0": { 50: 1.99, 200: 1.49, 500: 1.19, 1000: 1.09, 2000: 0.99, 5000: 0.96 },
          "1/1": { 50: 2.79, 200: 2.04, 500: 1.59, 1000: 1.44, 2000: 1.27, 5000: 1.21 }
        }
      }
    },
    kordelhenkel: {
      braun: {
        "18x8x24": {
          size_label: "Small / 84101.25",
          "1/0": { 50: 1.80, 200: 1.30, 500: 1.00, 1000: 0.90, 2000: 0.80, 5000: 0.77 },
          "1/1": { 50: 2.60, 200: 1.85, 500: 1.40, 1000: 1.25, 2000: 1.08, 5000: 1.03 }
        },
        "22x10x29": {
          size_label: "Medium / 84102.25",
          "1/0": { 50: 1.85, 200: 1.35, 500: 1.05, 1000: 0.95, 2000: 0.86, 5000: 0.82 },
          "1/1": { 50: 2.65, 200: 1.90, 500: 1.45, 1000: 1.30, 2000: 1.13, 5000: 1.07 }
        },
        "27x12x37": {
          size_label: "Large / 84103.25",
          "1/0": { 50: 1.95, 200: 1.45, 500: 1.15, 1000: 1.05, 2000: 0.95, 5000: 0.92 },
          "1/1": { 50: 2.75, 200: 2.00, 500: 1.55, 1000: 1.40, 2000: 1.23, 5000: 1.16 }
        },
        "40x12x31": {
          size_label: "Large Landscape / 84205.25",
          "1/0": { 50: 2.04, 200: 1.54, 500: 1.24, 1000: 1.14, 2000: 1.04, 5000: 1.01 },
          "1/1": { 50: 2.84, 200: 2.09, 500: 1.64, 1000: 1.49, 2000: 1.32, 5000: 1.25 }
        },
        "32x13x41": {
          size_label: "X-Large / 84104.25",
          "1/0": { 50: 2.00, 200: 1.50, 500: 1.20, 1000: 1.10, 2000: 1.01, 5000: 0.97 },
          "1/1": { 50: 2.80, 200: 2.05, 500: 1.60, 1000: 1.45, 2000: 1.28, 5000: 1.22 }
        }
      },
      weiss: {
        "18x8x24": {
          size_label: "Small / 84101.10",
          "1/0": { 50: 1.80, 200: 1.30, 500: 1.00, 1000: 0.90, 2000: 0.80, 5000: 0.77 },
          "1/1": { 50: 2.60, 200: 1.85, 500: 1.40, 1000: 1.25, 2000: 1.08, 5000: 1.03 }
        },
        "22x10x29": {
          size_label: "Medium / 84102.10",
          "1/0": { 50: 1.85, 200: 1.35, 500: 1.05, 1000: 0.95, 2000: 0.86, 5000: 0.82 },
          "1/1": { 50: 2.65, 200: 1.90, 500: 1.45, 1000: 1.30, 2000: 1.13, 5000: 1.07 }
        },
        "27x12x37": {
          size_label: "Large / 84103.10",
          "1/0": { 50: 1.95, 200: 1.45, 500: 1.15, 1000: 1.05, 2000: 0.95, 5000: 0.92 },
          "1/1": { 50: 2.75, 200: 2.00, 500: 1.55, 1000: 1.40, 2000: 1.23, 5000: 1.16 }
        },
        "40x12x31": {
          size_label: "Large Landscape / 84205.10",
          "1/0": { 50: 2.04, 200: 1.54, 500: 1.24, 1000: 1.14, 2000: 1.04, 5000: 1.01 },
          "1/1": { 50: 2.84, 200: 2.09, 500: 1.64, 1000: 1.49, 2000: 1.32, 5000: 1.25 }
        },
        "32x13x41": {
          size_label: "X-Large / 84104.10",
          "1/0": { 50: 2.00, 200: 1.50, 500: 1.20, 1000: 1.10, 2000: 1.01, 5000: 0.97 },
          "1/1": { 50: 2.80, 200: 2.05, 500: 1.60, 1000: 1.45, 2000: 1.28, 5000: 1.22 }
        }
      }
    }
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function chooseTier(qty, rules) {
  if (qty < rules.min_qty) return null;
  let selected = rules.tiers[0];
  for (const tier of rules.tiers) {
    if (tier <= qty) selected = tier;
    else break;
  }
  return selected;
}

function calcPrice(selection, priceData) {
  const { handle, color, format, print, qty } = selection;
  const { rules, data } = priceData;
  
  if (qty < rules.min_qty) {
    return { error: 'min_qty' };
  }
  
  const tier = chooseTier(qty, rules);
  if (!tier) {
    return { error: 'min_qty' };
  }
  
  try {
    const product = data[handle]?.[color]?.[format];
    if (!product) {
      return { error: 'no_product' };
    }
    
    const unitPrice = product[print]?.[tier];
    if (typeof unitPrice !== 'number') {
      return { error: 'no_price_found' };
    }
    
    const unit = unitPrice;
    const subtotal = unit * qty;
    
    let shipping = 0;
    let smallQtySurcharge = 0;
    
    if (subtotal >= rules.shipping.free_threshold) {
      shipping = 0;
    } else if (subtotal >= rules.shipping.medium_threshold) {
      shipping = rules.shipping.medium_cost;
    } else {
      shipping = rules.shipping.low_cost;
      smallQtySurcharge = rules.shipping.small_qty_surcharge;
    }
    
    const total = subtotal + shipping + smallQtySurcharge;
    
    const tierIndex = rules.tiers.indexOf(tier);
    let nextTier = null;
    if (tierIndex < rules.tiers.length - 1) {
      const nextTierValue = rules.tiers[tierIndex + 1];
      const nextResult = calcPrice({ ...selection, qty: nextTierValue }, priceData);
      if (!nextResult.error) {
        const savings = unit - nextResult.unit;
        const savingsPercent = (savings / unit) * 100;
        nextTier = {
          tier: nextTierValue,
          savingsPercent: Math.round(savingsPercent * 10) / 10,
          savingsAmount: Math.round(savings * 100) / 100
        };
      }
    }
    
    const sizeLabel = product.size_label || '';
    
    return { tier, unit, subtotal, shipping, smallQtySurcharge, total, nextTier, sizeLabel };
  } catch {
    return { error: 'invalid_config' };
  }
}

function formatPrice(price, decimals = 2) {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(price);
}

function formatPriceCHF(price, decimals = 2) {
  return `${formatPrice(price, decimals)} CHF`;
}

const ELCO_RED = '#e63027';

const CheckIcon = () => (
  <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
    style={{backgroundColor: ELCO_RED}}>
    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
    </svg>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PapiertragetaschenKalkulator() {
  const [lang, setLang] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      return urlLang === 'fr' ? 'fr' : 'de';
    } catch {
      return 'de';
    }
  });
  const t = T[lang];
  
  const [handle, setHandle] = useState(null);
  const [color, setColor] = useState(null);
  const [format, setFormat] = useState(null);
  const [print, setPrint] = useState(null);
  const [qty, setQty] = useState('');
  const [qtyError, setQtyError] = useState('');
  
  const [company, setCompany] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [logoDescription, setLogoDescription] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  const priceResult = handle && color && format && print && qty && parseInt(qty) >= 50
    ? calcPrice({ handle, color, format, print, qty: parseInt(qty) }, PRICE_DATA)
    : null;
  
  const availableFormats = handle && color 
    ? Object.keys(PRICE_DATA.data[handle]?.[color] || {})
        .map(fmt => ({
          value: fmt,
          label: `${fmt.replace(/x/g, '×')} cm`,
          sizeLabel: PRICE_DATA.data[handle][color][fmt]?.size_label || ''
        }))
        .sort((a, b) => {
          const [w1] = a.value.split('x').map(Number);
          const [w2] = b.value.split('x').map(Number);
          return w1 - w2;
        })
    : [];
  
  useEffect(() => {
    setColor(null); setFormat(null); setPrint(null); setQty('');
  }, [handle]);
  
  useEffect(() => {
    setFormat(null); setPrint(null); setQty('');
  }, [color]);
  
  useEffect(() => {
    setPrint(null); setQty('');
  }, [format]);
  
  useEffect(() => {
    const num = parseInt(qty);
    if (qty) {
      if (isNaN(num) || num < 50) {
        setQtyError(t.qty_min_error);
      } else if (num % 50 !== 0) {
        setQtyError(t.qty_step_error);
      } else {
        setQtyError('');
      }
    } else {
      setQtyError('');
    }
  }, [qty, lang]);
  
  const handleMailto = () => {
    if (!company || !firstName || !lastName || !email || !phone || !address || !logoDescription.trim()) {
      alert(t.alert_fields);
      return;
    }
    if (!priceResult || priceResult.error) {
      alert(t.alert_config);
      return;
    }
    
    const productInfo = PRICE_DATA.data[handle][color][format];
    const sizeLabel = productInfo?.size_label || '';
    
    let shippingText = '';
    if (priceResult.shipping === 0) {
      shippingText = t.ship_free_long;
    } else {
      shippingText = `CHF ${formatPrice(priceResult.shipping)}`;
      if (priceResult.smallQtySurcharge > 0) {
        shippingText += `${t.ship_surcharge_prefix}${formatPrice(priceResult.smallQtySurcharge)}${t.ship_surcharge_suffix}`;
      }
    }
    
    const handleLabel = handle === 'flachhenkel' ? t.flat : t.cord;
    const colorLabel = color === 'braun' ? t.brown : t.white;
    const printLabel = print === '1/0' ? t.print_one_long : t.print_both_long;
    
    const cfg = {
      handleLabel, colorLabel, format, sizeLabel, printLabel,
      qty, logoDescription,
      unitPrice: formatPriceCHF(priceResult.unit),
      subtotal: formatPriceCHF(priceResult.subtotal),
      shippingText,
      total: formatPriceCHF(priceResult.total),
      company, address, firstName, lastName, phone, email
    };
    
    const subject = encodeURIComponent(t.email_subject);
    const body = encodeURIComponent(t.email_body(cfg));
    
    window.location.href = `mailto:busness@myelco.ch?subject=${subject}&body=${body}`;
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };
  
  const isPriceAvailable = priceResult && !priceResult.error;
  const showLargeOrderMessage = (parseInt(qty) >= 1500 && print === '1/1') || parseInt(qty) > 1500;
  
  return (
    <div className="bg-gradient-to-b from-white to-gray-50" 
      style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', 
        minHeight: '100vh', 
        padding: 0, 
        margin: 0,
        overflow: 'visible'
      }}>
      <div style={{padding: '16px', maxWidth: '800px', margin: 0}}>
        
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex bg-white rounded-full shadow-sm border border-gray-200 p-1 gap-1">
            <button
              onClick={() => setLang('de')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                lang === 'de' 
                  ? 'bg-gray-900 text-white shadow' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{fontWeight: lang === 'de' ? 700 : 400}}
            >
              <span className="text-lg leading-none">🇩🇪</span>
              <span>Deutsch</span>
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                lang === 'fr' 
                  ? 'bg-gray-900 text-white shadow' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{fontWeight: lang === 'fr' ? 700 : 400}}
            >
              <span className="text-lg leading-none">🇫🇷</span>
              <span>Français</span>
            </button>
          </div>
        </div>
        
        {/* Configuration Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            
            {/* 1. Handle */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontWeight: 700}}>
                {t.step1}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setHandle('flachhenkel')}
                  className={`relative p-6 rounded-xl transition-all border-2 ${
                    handle === 'flachhenkel' 
                      ? 'bg-green-50 shadow-lg transform scale-[1.02]' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-transparent'
                  }`}
                  style={handle === 'flachhenkel' ? {borderColor: ELCO_RED} : {}}
                >
                  <span className="text-2xl mb-2 block">🛍️</span>
                  <div style={{fontWeight: 700}}>{t.flat}</div>
                  <div className="text-xs mt-1 text-gray-600" style={{fontWeight: 400}}>{t.flat_desc}</div>
                  {handle === 'flachhenkel' && <CheckIcon />}
                </button>
                <button
                  onClick={() => setHandle('kordelhenkel')}
                  className={`relative p-6 rounded-xl transition-all border-2 ${
                    handle === 'kordelhenkel' 
                      ? 'bg-green-50 shadow-lg transform scale-[1.02]' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-transparent'
                  }`}
                  style={handle === 'kordelhenkel' ? {borderColor: ELCO_RED} : {}}
                >
                  <span className="text-2xl mb-2 block">🛍️</span>
                  <div style={{fontWeight: 700}}>{t.cord}</div>
                  <div className="text-xs mt-1 text-gray-600" style={{fontWeight: 400}}>{t.cord_desc}</div>
                  {handle === 'kordelhenkel' && <CheckIcon />}
                </button>
              </div>
            </div>
            
            {/* 2. Color */}
            <div className={`p-6 border-b border-gray-100 transition-opacity ${!handle ? 'opacity-40 pointer-events-none' : ''}`}>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontWeight: 700}}>
                {t.step2} {!handle && <span className="text-xs normal-case">{t.hint_handle}</span>}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handle && setColor('braun')}
                  disabled={!handle}
                  className={`relative p-6 rounded-xl transition-all border-2 ${
                    color === 'braun' 
                      ? 'bg-green-50 shadow-lg transform scale-[1.02]' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-transparent'
                  }`}
                  style={color === 'braun' ? {borderColor: ELCO_RED} : {}}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-400 mx-auto mb-3 shadow-md"></div>
                  <div style={{fontWeight: 700}}>{t.brown}</div>
                  <div className="text-xs mt-1 text-gray-600" style={{fontWeight: 400}}>{t.brown_desc}</div>
                  {color === 'braun' && <CheckIcon />}
                </button>
                <button
                  onClick={() => handle && setColor('weiss')}
                  disabled={!handle}
                  className={`relative p-6 rounded-xl transition-all border-2 ${
                    color === 'weiss' 
                      ? 'bg-green-50 shadow-lg transform scale-[1.02]' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-transparent'
                  }`}
                  style={color === 'weiss' ? {borderColor: ELCO_RED} : {}}
                >
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 mx-auto mb-3 shadow-md"></div>
                  <div style={{fontWeight: 700}}>{t.white}</div>
                  <div className="text-xs mt-1 text-gray-600" style={{fontWeight: 400}}>{t.white_desc}</div>
                  {color === 'weiss' && <CheckIcon />}
                </button>
              </div>
            </div>
            
            {/* 3. Format */}
            <div className={`p-6 border-b border-gray-100 transition-opacity ${!color ? 'opacity-40 pointer-events-none' : ''}`}>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontWeight: 700}}>
                {t.step3} {!color && <span className="text-xs normal-case">{t.hint_color}</span>}
              </h3>
              <select
                value={format || ''}
                onChange={(e) => color && setFormat(e.target.value)}
                disabled={!color}
                className={`w-full px-4 py-3 text-gray-700 border-2 rounded-xl focus:outline-none transition-all ${
                  !color ? 'cursor-not-allowed' : 'cursor-pointer'
                } ${format ? 'bg-green-50' : 'bg-gray-50 hover:bg-white'}`}
                style={{ borderColor: format ? ELCO_RED : '#e5e7eb', fontWeight: 400 }}
              >
                <option value="">{t.choose_format}</option>
                {availableFormats.map(fmt => (
                  <option key={fmt.value} value={fmt.value}>
                    {fmt.label} — {fmt.sizeLabel}
                  </option>
                ))}
              </select>
              {format && (
                <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-900 text-white"
                  style={{fontWeight: 700}}>
                  {availableFormats.find(f => f.value === format)?.sizeLabel}
                </div>
              )}
            </div>
            
            {/* 4. Print */}
            <div className={`p-6 border-b border-gray-100 transition-opacity ${!format ? 'opacity-40 pointer-events-none' : ''}`}>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontWeight: 700}}>
                {t.step4} {!format && <span className="text-xs normal-case">{t.hint_format}</span>}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => format && setPrint('1/0')}
                  disabled={!format}
                  className={`relative px-6 py-4 rounded-xl transition-all border-2 ${
                    print === '1/0' 
                      ? 'bg-green-50 shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                  style={print === '1/0' ? {borderColor: ELCO_RED} : {}}
                >
                  <div className="text-2xl mb-1" style={{fontWeight: 700}}>1/0</div>
                  <div className="text-xs text-gray-600" style={{fontWeight: 400}}>{t.print_one}</div>
                  {print === '1/0' && <CheckIcon />}
                </button>
                <button
                  onClick={() => format && setPrint('1/1')}
                  disabled={!format}
                  className={`relative px-6 py-4 rounded-xl transition-all border-2 ${
                    print === '1/1' 
                      ? 'bg-green-50 shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                  style={print === '1/1' ? {borderColor: ELCO_RED} : {}}
                >
                  <div className="text-2xl mb-1" style={{fontWeight: 700}}>1/1</div>
                  <div className="text-xs text-gray-600" style={{fontWeight: 400}}>{t.print_both}</div>
                  {print === '1/1' && <CheckIcon />}
                </button>
              </div>
            </div>
            
            {/* 5. Quantity */}
            <div className={`p-6 transition-opacity ${!print ? 'opacity-40 pointer-events-none' : ''}`}>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontWeight: 700}}>
                {t.step5} {!print && <span className="text-xs normal-case">{t.hint_print}</span>}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {[50, 100, 200, 500, 1000, 2000].map(tier => (
                  <button
                    key={tier}
                    onClick={() => print && setQty(tier.toString())}
                    disabled={!print}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      parseInt(qty) === tier 
                        ? 'bg-gray-900 text-white shadow' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={{fontWeight: 700}}
                  >
                    {tier.toLocaleString('de-CH')}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="50"
                step="50"
                value={qty}
                onChange={(e) => print && setQty(e.target.value)}
                onWheel={(e) => e.target.blur()}
                disabled={!print}
                placeholder={t.qty_placeholder}
                className={`w-full px-4 py-3 text-lg border-2 rounded-xl transition-all ${
                  !print ? 'cursor-not-allowed' : ''
                } ${
                  qtyError ? 'border-red-400 bg-red-50' 
                    : qty && !qtyError ? 'bg-green-50' 
                    : 'bg-gray-50 focus:bg-white'
                } focus:outline-none`}
                style={{
                  borderColor: qty && !qtyError ? ELCO_RED : qtyError ? '#f87171' : '#e5e7eb',
                  fontWeight: 700
                }}
              />
              {!qtyError && !qty && (
                <p className="mt-2 text-xs text-gray-500" style={{fontWeight: 400}}>{t.qty_hint}</p>
              )}
              {qtyError && (
                <p className="mt-2 text-sm text-red-600 flex items-center" style={{fontWeight: 400}}>⚠️ {qtyError}</p>
              )}
              {qty && !qtyError && parseInt(qty) % 100 !== 0 && (
                <p className="mt-2 text-xs text-blue-600 flex items-center" style={{fontWeight: 400}}>{t.qty_valid}</p>
              )}
              {showLargeOrderMessage && !qtyError && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2 text-lg">📞</span>
                    <div>
                      <p className="text-sm text-blue-900 mb-2" style={{fontWeight: 700}}>{t.large_order_title}</p>
                      <p className="text-sm text-blue-800 mb-3" style={{fontWeight: 400}}>{t.large_order_text}</p>
                      <p className="text-sm text-blue-900" style={{fontWeight: 700}}>{t.large_order_contact}</p>
                      <p className="text-sm text-blue-800 mt-1" style={{fontWeight: 400}}>
                        <a href="mailto:business@elcoworld.ch" className="underline hover:text-blue-900">business@elcoworld.ch</a>
                        {' • '}
                        <a href="tel:+41564628000" className="underline hover:text-blue-900">+41 56 462 80 00</a>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Price Section */}
        <div className="mb-6">
          <div className={`bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg border overflow-hidden transition-all ${
            isPriceAvailable ? 'border-green-100' : 'border-gray-200 opacity-60'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900" style={{fontWeight: 700}}>{t.price_title}</h2>
                {isPriceAvailable && (
                  <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full" style={{fontWeight: 700}}>
                    {t.price_badge}
                  </span>
                )}
              </div>
              
              {isPriceAvailable ? (
                <>
                  <div className="space-y-3 pb-6 border-b border-gray-100 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600" style={{fontWeight: 400}}>{t.config_label}</span>
                      <span className="text-gray-900" style={{fontWeight: 700}}>
                        {handle === 'flachhenkel' ? t.handle_flat_short : t.handle_cord_short} • {color === 'braun' ? t.color_brown_short : t.color_white_short} • {print}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600" style={{fontWeight: 400}}>{t.format_label}</span>
                      <span className="text-gray-900" style={{fontWeight: 700}}>{format?.replace(/x/g, '×')} cm</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600" style={{fontWeight: 400}}>{t.qty_label}</span>
                      <span className="text-gray-900" style={{fontWeight: 700}}>{qty} {t.qty_unit}</span>
                    </div>
                  </div>
                  
                  <div className="py-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500" style={{fontWeight: 400}}>{t.unit_price}</span>
                      <span className="text-gray-900" style={{fontWeight: 400}}>{formatPriceCHF(priceResult.unit)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500" style={{fontWeight: 400}}>{t.subtotal}</span>
                      <span className="text-gray-900" style={{fontWeight: 700}}>{formatPriceCHF(priceResult.subtotal)}</span>
                    </div>
                    {priceResult.shipping > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500" style={{fontWeight: 400}}>{t.shipping_label}</span>
                        <span className="text-gray-700" style={{fontWeight: 400}}>+ {formatPriceCHF(priceResult.shipping)}</span>
                      </div>
                    )}
                    {priceResult.smallQtySurcharge > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500" style={{fontWeight: 400}}>{t.surcharge}</span>
                        <span className="text-orange-600" style={{fontWeight: 400}}>+ {formatPriceCHF(priceResult.smallQtySurcharge)}</span>
                      </div>
                    )}
                    {priceResult.shipping === 0 && (
                      <div className="flex items-center text-sm text-green-600 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-lg border border-green-200">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span style={{fontWeight: 700}}>{t.free_shipping}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-6 border-t-2 border-gray-100">
                    <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-700" style={{fontWeight: 700}}>{t.total_label}</span>
                        <div className="text-right">
                          <div className="text-3xl text-gray-900" style={{fontWeight: 700}}>
                            {formatPriceCHF(priceResult.total)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1" style={{fontWeight: 400}}>{t.excl_vat}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {priceResult.nextTier && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-2">💡</span>
                        <div className="text-xs text-blue-700" style={{fontWeight: 400}}>
                          <span style={{fontWeight: 700}}>{t.savings_tip}</span> {t.savings_text(priceResult.nextTier.tier, priceResult.nextTier.savingsPercent)}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-12 text-center">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-gray-600 mb-2" style={{fontWeight: 700}}>{t.price_placeholder_title}</p>
                  <p className="text-sm text-gray-500" style={{fontWeight: 400}}>{t.price_placeholder_text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className={`mb-6 transition-all ${!isPriceAvailable ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="bg-white rounded-2xl shadow-lg border-2 p-6" style={{borderColor: isPriceAvailable ? ELCO_RED : '#d1d5db'}}>
            <h3 className="text-xl text-gray-900 mb-6" style={{fontWeight: 700}}>
              {t.contact_title}
              {!isPriceAvailable && <span className="text-sm text-gray-500 ml-2 font-normal">{t.contact_hint}</span>}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2" style={{fontWeight: 700}}>{t.logo_label}</label>
                <textarea
                  value={logoDescription}
                  onChange={(e) => isPriceAvailable && setLogoDescription(e.target.value)}
                  disabled={!isPriceAvailable}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all disabled:cursor-not-allowed resize-none"
                  placeholder={t.logo_placeholder}
                  style={{fontWeight: 400}}
                />
                <p className="mt-1 text-xs text-gray-500" style={{fontWeight: 400}}>{t.logo_hint}</p>
              </div>
              <input type="text" value={company} onChange={(e) => isPriceAvailable && setCompany(e.target.value)} disabled={!isPriceAvailable}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all disabled:cursor-not-allowed"
                placeholder={t.company_ph} style={{fontWeight: 400}} />
              <input type="text" value={address} onChange={(e) => isPriceAvailable && setAddress(e.target.value)} disabled={!isPriceAvailable}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all disabled:cursor-not-allowed"
                placeholder={t.address_ph} style={{fontWeight: 400}} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" value={firstName} onChange={(e) => isPriceAvailable && setFirstName(e.target.value)} disabled={!isPriceAvailable}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all disabled:cursor-not-allowed"
                  placeholder={t.firstname_ph} style={{fontWeight: 400}} />
                <input type="text" value={lastName} onChange={(e) => isPriceAvailable && setLastName(e.target.value)} disabled={!isPriceAvailable}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all disabled:cursor-not-allowed"
                  placeholder={t.lastname_ph} style={{fontWeight: 400}} />
              </div>
              <input type="email" value={email} onChange={(e) => isPriceAvailable && setEmail(e.target.value)} disabled={!isPriceAvailable}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all disabled:cursor-not-allowed"
                placeholder={t.email_ph} style={{fontWeight: 400}} />
              <input type="tel" value={phone} onChange={(e) => isPriceAvailable && setPhone(e.target.value)} disabled={!isPriceAvailable}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all disabled:cursor-not-allowed"
                placeholder={t.phone_ph} style={{fontWeight: 400}} />
              <button
                onClick={handleMailto}
                disabled={!isPriceAvailable}
                className="w-full py-4 text-white rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{backgroundColor: ELCO_RED, fontWeight: 700}}
              >
                {t.submit_btn}
              </button>
              <p className="text-xs text-gray-500 text-center" style={{fontWeight: 400}}>{t.submit_hint}</p>
            </div>
          </div>
        </div>
        
        {/* Shipping Info */}
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-sm text-gray-900 mb-3" style={{fontWeight: 700}}>{t.ship_title}</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-600 mb-1" style={{fontWeight: 700}}>{t.ship_cost_label}</div>
              <div className="text-gray-900" style={{fontWeight: 400}}>
                <strong>{t.ship_free}</strong> {t.ship_free_from}<br/>
                <strong>{t.ship_mid}</strong> {t.ship_mid_from}<br/>
                <strong>{t.ship_low}</strong> {t.ship_low_from}
              </div>
            </div>
            <div>
              <div className="text-gray-600 mb-1" style={{fontWeight: 700}}>{t.delivery_label}</div>
              <div className="text-gray-900" style={{fontWeight: 400}}>
                {t.delivery_1}<br/>{t.delivery_2}<br/>{t.delivery_3}
              </div>
            </div>
            <div>
              <div className="text-gray-600 mb-1" style={{fontWeight: 700}}>{t.proof_label}</div>
              <div className="text-gray-900" style={{fontWeight: 400}}>
                {t.proof_1}<br/>{t.proof_2}
              </div>
            </div>
          </div>
        </div>
        
        {/* Toast */}
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border border-gray-100 z-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-gray-900" style={{fontWeight: 700}}>{t.toast_title}</div>
                <div className="text-sm text-gray-500 mt-1" style={{fontWeight: 400}}>{t.toast_text}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
