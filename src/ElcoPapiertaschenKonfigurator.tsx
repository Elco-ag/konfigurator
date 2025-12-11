import React, { useState, useEffect } from 'react';

// ============================================================================
// PREISDATEN - Aktualisiert aus Excel (Dezember 2024)
// ============================================================================

const PRICE_DATA = {
  "rules": {
    "tiers": [50, 200, 500, 1000, 2000, 5000],
    "min_qty": 50,
    "shipping": {
      "free_threshold": 250,
      "medium_threshold": 100,
      "medium_cost": 12.90,
      "low_cost": 25,
      "small_qty_surcharge": 20
    }
  },
  "data": {
    "flachhenkel": {
      "braun": {
        "18x8x26": {
          "size_label": "XS / Mini",
          "1/0": { "50": 1.76, "200": 1.26, "500": 0.96, "1000": 0.86, "2000": 0.77, "5000": 0.73 },
          "1/1": { "50": 2.56, "200": 1.81, "500": 1.36, "1000": 1.21, "2000": 1.04, "5000": 0.98 }
        },
        "22x10x29": {
          "size_label": "S / Klein",
          "1/0": { "50": 1.80, "200": 1.30, "500": 1.00, "1000": 0.90, "2000": 0.81, "5000": 0.77 },
          "1/1": { "50": 2.60, "200": 1.85, "500": 1.40, "1000": 1.25, "2000": 1.08, "5000": 1.02 }
        },
        "26x10x33": {
          "size_label": "M / Medium",
          "1/0": { "50": 1.85, "200": 1.35, "500": 1.05, "1000": 0.95, "2000": 0.86, "5000": 0.82 },
          "1/1": { "50": 2.65, "200": 1.90, "500": 1.45, "1000": 1.30, "2000": 1.13, "5000": 1.07 }
        },
        "26x16x29": {
          "size_label": "M-Wide / Medium Breit",
          "1/0": { "50": 1.51, "200": 1.16, "500": 0.95, "1000": 0.86, "2000": 0.83, "5000": 0.80 },
          "1/1": { "50": 2.07, "200": 1.54, "500": 1.23, "1000": 1.10, "2000": 1.03, "5000": 0.98 }
        },
        "32x17x38": {
          "size_label": "L / Gross",
          "1/0": { "50": 1.94, "200": 1.44, "500": 1.14, "1000": 1.04, "2000": 0.95, "5000": 0.91 },
          "1/1": { "50": 2.74, "200": 1.99, "500": 1.54, "1000": 1.39, "2000": 1.22, "5000": 1.16 }
        },
        "32x22x30": {
          "size_label": "Square L / Breit & Gross",
          "1/0": { "50": 1.94, "200": 1.44, "500": 1.14, "1000": 1.04, "2000": 0.95, "5000": 0.91 },
          "1/1": { "50": 2.74, "200": 1.99, "500": 1.54, "1000": 1.39, "2000": 1.22, "5000": 1.16 }
        }
      },
      "weiss": {
        "18x8x26": {
          "size_label": "XS / Mini",
          "1/0": { "50": 1.80, "200": 1.30, "500": 1.00, "1000": 0.90, "2000": 0.81, "5000": 0.77 },
          "1/1": { "50": 2.60, "200": 1.85, "500": 1.40, "1000": 1.25, "2000": 1.08, "5000": 1.02 }
        },
        "22x10x29": {
          "size_label": "S / Klein",
          "1/0": { "50": 1.85, "200": 1.35, "500": 1.05, "1000": 0.95, "2000": 0.86, "5000": 0.82 },
          "1/1": { "50": 2.65, "200": 1.90, "500": 1.45, "1000": 1.30, "2000": 1.13, "5000": 1.07 }
        },
        "26x10x33": {
          "size_label": "M / Medium",
          "1/0": { "50": 1.90, "200": 1.40, "500": 1.10, "1000": 1.00, "2000": 0.90, "5000": 0.87 },
          "1/1": { "50": 2.70, "200": 1.95, "500": 1.50, "1000": 1.35, "2000": 1.18, "5000": 1.11 }
        },
        "26x16x29": {
          "size_label": "M-Wide / Medium Breit",
          "1/0": { "50": 1.55, "200": 1.20, "500": 0.99, "1000": 0.91, "2000": 0.87, "5000": 0.85 },
          "1/1": { "50": 2.11, "200": 1.58, "500": 1.27, "1000": 1.14, "2000": 1.08, "5000": 1.03 }
        },
        "32x17x38": {
          "size_label": "L / Gross",
          "1/0": { "50": 1.99, "200": 1.49, "500": 1.19, "1000": 1.09, "2000": 0.99, "5000": 0.96 },
          "1/1": { "50": 2.79, "200": 2.04, "500": 1.59, "1000": 1.44, "2000": 1.27, "5000": 1.21 }
        },
        "32x22x30": {
          "size_label": "Square L / Breit & Gross",
          "1/0": { "50": 1.99, "200": 1.49, "500": 1.19, "1000": 1.09, "2000": 0.99, "5000": 0.96 },
          "1/1": { "50": 2.79, "200": 2.04, "500": 1.59, "1000": 1.44, "2000": 1.27, "5000": 1.21 }
        }
      }
    },
    "kordelhenkel": {
      "braun": {
        "18x8x24": {
          "size_label": "S / Klein",
          "1/0": { "50": 1.80, "200": 1.30, "500": 1.00, "1000": 0.90, "2000": 0.80, "5000": 0.77 },
          "1/1": { "50": 2.60, "200": 1.85, "500": 1.40, "1000": 1.25, "2000": 1.08, "5000": 1.03 }
        },
        "22x10x29": {
          "size_label": "M / Medium",
          "1/0": { "50": 1.85, "200": 1.35, "500": 1.05, "1000": 0.95, "2000": 0.86, "5000": 0.82 },
          "1/1": { "50": 2.65, "200": 1.90, "500": 1.45, "1000": 1.30, "2000": 1.13, "5000": 1.07 }
        },
        "27x12x37": {
          "size_label": "L / Gross & Hoch",
          "1/0": { "50": 1.95, "200": 1.45, "500": 1.15, "1000": 1.05, "2000": 0.95, "5000": 0.92 },
          "1/1": { "50": 2.75, "200": 2.00, "500": 1.55, "1000": 1.40, "2000": 1.23, "5000": 1.16 }
        },
        "32x13x28": {
          "size_label": "M-Wide / Medium Breit & Kurz",
          "1/0": { "50": 1.91, "200": 1.41, "500": 1.11, "1000": 1.01, "2000": 0.91, "5000": 0.88 },
          "1/1": { "50": 2.71, "200": 1.96, "500": 1.51, "1000": 1.36, "2000": 1.19, "5000": 1.12 }
        },
        "32x13x41": {
          "size_label": "XL / Sehr Gross & Hoch",
          "1/0": { "50": 2.00, "200": 1.50, "500": 1.20, "1000": 1.10, "2000": 1.01, "5000": 0.97 },
          "1/1": { "50": 2.80, "200": 2.05, "500": 1.60, "1000": 1.45, "2000": 1.28, "5000": 1.22 }
        }
      },
      "weiss": {
        "18x8x24": {
          "size_label": "S / Klein",
          "1/0": { "50": 1.80, "200": 1.30, "500": 1.00, "1000": 0.90, "2000": 0.80, "5000": 0.77 },
          "1/1": { "50": 2.60, "200": 1.85, "500": 1.40, "1000": 1.25, "2000": 1.08, "5000": 1.03 }
        },
        "22x10x29": {
          "size_label": "M / Medium",
          "1/0": { "50": 1.85, "200": 1.35, "500": 1.05, "1000": 0.95, "2000": 0.86, "5000": 0.82 },
          "1/1": { "50": 2.65, "200": 1.90, "500": 1.45, "1000": 1.30, "2000": 1.13, "5000": 1.07 }
        },
        "27x12x37": {
          "size_label": "L / Gross & Hoch",
          "1/0": { "50": 1.95, "200": 1.45, "500": 1.15, "1000": 1.05, "2000": 0.95, "5000": 0.92 },
          "1/1": { "50": 2.75, "200": 2.00, "500": 1.55, "1000": 1.40, "2000": 1.23, "5000": 1.16 }
        },
        "32x13x28": {
          "size_label": "M-Wide / Medium Breit & Kurz",
          "1/0": { "50": 1.91, "200": 1.41, "500": 1.11, "1000": 1.01, "2000": 0.91, "5000": 0.88 },
          "1/1": { "50": 2.71, "200": 1.96, "500": 1.51, "1000": 1.36, "2000": 1.19, "5000": 1.12 }
        },
        "32x13x41": {
          "size_label": "XL / Sehr Gross & Hoch",
          "1/0": { "50": 2.00, "200": 1.50, "500": 1.20, "1000": 1.10, "2000": 1.01, "5000": 0.97 },
          "1/1": { "50": 2.80, "200": 2.05, "500": 1.60, "1000": 1.45, "2000": 1.28, "5000": 1.22 }
        }
      }
    }
  }
};

// ============================================================================
// PRICING ENGINE
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
    return { error: 'min_qty', message: `Mindestmenge beträgt ${rules.min_qty} Stück` };
  }
  
  const tier = chooseTier(qty, rules);
  if (!tier) {
    return { error: 'min_qty', message: `Mindestmenge beträgt ${rules.min_qty} Stück` };
  }
  
  try {
    const product = data[handle]?.[color]?.[format];
    if (!product) {
      return { error: 'no_product', message: 'Produkt nicht verfügbar' };
    }
    
    const unitPrice = product[print]?.[tier];
    if (typeof unitPrice !== 'number') {
      return { error: 'no_price_found', message: 'Preis nicht verfügbar' };
    }
    
    const unit = unitPrice;
    const subtotal = unit * qty;
    
    // Calculate shipping based on order value
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
    
    // Calculate next tier savings
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
    
    return { 
      tier, 
      unit, 
      subtotal,
      shipping, 
      smallQtySurcharge,
      total, 
      nextTier, 
      sizeLabel 
    };
  } catch {
    return { error: 'invalid_config', message: 'Ungültige Konfiguration' };
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

// Elco Brand Color
const ELCO_RED = '#e63027';

// ============================================================================
// MAIN COMPONENT - Clean Design with Minimal Red Accents
// ============================================================================

export default function PapiertragetaschenKalkulator() {
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
    setColor(null);
    setFormat(null);
    setPrint(null);
    setQty('');
  }, [handle]);
  
  useEffect(() => {
    setFormat(null);
    setPrint(null);
    setQty('');
  }, [color]);
  
  useEffect(() => {
    setPrint(null);
    setQty('');
  }, [format]);
  
  useEffect(() => {
    const num = parseInt(qty);
    if (qty && (isNaN(num) || num < 50)) {
      setQtyError('Mindestmenge: 50 Stück');
    } else {
      setQtyError('');
    }
  }, [qty]);
  
  // Auto-Scroll when new sections appear
  useEffect(() => {
    if (handle && !color) {
      setTimeout(() => {
        window.scrollBy({ top: 200, behavior: 'smooth' });
      }, 150);
    }
  }, [handle]);
  
  useEffect(() => {
    if (color && !format) {
      setTimeout(() => {
        window.scrollBy({ top: 200, behavior: 'smooth' });
      }, 150);
    }
  }, [color]);
  
  useEffect(() => {
    if (format && !print) {
      setTimeout(() => {
        window.scrollBy({ top: 200, behavior: 'smooth' });
      }, 150);
    }
  }, [format]);
  
  useEffect(() => {
    if (print) {
      setTimeout(() => {
        window.scrollBy({ top: 250, behavior: 'smooth' });
      }, 150);
    }
  }, [print]);
  
  const handleMailto = () => {
    if (!company || !firstName || !lastName || !email || !phone) {
      alert('Bitte alle Pflichtfelder ausfüllen');
      return;
    }
    
    if (!priceResult || priceResult.error) {
      alert('Bitte vollständige Konfiguration wählen');
      return;
    }
    
    const productInfo = PRICE_DATA.data[handle][color][format];
    const sizeLabel = productInfo?.size_label || '';
    
    let shippingText = '';
    if (priceResult.shipping === 0) {
      shippingText = 'Versandkostenfrei (Bestellung über CHF 250.-)';
    } else {
      shippingText = `CHF ${formatPrice(priceResult.shipping)}`;
      if (priceResult.smallQtySurcharge > 0) {
        shippingText += ` + CHF ${formatPrice(priceResult.smallQtySurcharge)} Kleinmengenzuschlag`;
      }
    }
    
    const subject = encodeURIComponent('Anfrage Papiertragetasche mit Logo');
    const body = encodeURIComponent(`Guten Tag ELCO Team

Ich interessiere mich für bedruckte Papiertragetaschen mit meinem Logo und bitte um ein Angebot mit Proof.

MEINE KONFIGURATION:
--------------------
Henkelform: ${handle === 'flachhenkel' ? 'Flachhenkel' : 'Kordelhenkel'}
Farbe: ${color === 'braun' ? 'Braun' : 'Weiss'}
Format: ${format} cm (${sizeLabel})
Druckart: ${print === '1/0' ? 'Einseitig 1-farbig' : 'Beidseitig 1-farbig'}
Menge: ${qty} Stück

PREISKALKULATION:
-----------------
Stückpreis: ${formatPriceCHF(priceResult.unit)}
Warenwert: ${formatPriceCHF(priceResult.subtotal)}
Versand: ${shippingText}
Total: ${formatPriceCHF(priceResult.total)} exkl. MwSt.

KONTAKTDATEN:
-------------
Firma: ${company}
Ansprechperson: ${firstName} ${lastName}
Telefon: ${phone}
E-Mail: ${email}

Mein Logo hänge ich als Anhang an diese E-Mail an.

Bitte senden Sie mir innert 24 Stunden einen digitalen Proof zur Freigabe.

Mit freundlichen Grüssen
${firstName} ${lastName}`);
    
    window.location.href = `mailto:business@elcoworld.ch?subject=${subject}&body=${body}`;
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };
  
  const handleQuickSelection = (qty) => {
    setQty(qty.toString());
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 sm:p-6 lg:p-8" 
      style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Progress Indicator - Schwarz */}
            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute left-0 top-5 w-full h-0.5 bg-gray-200"></div>
                <div 
                  className="absolute left-0 top-5 h-0.5 bg-gray-900 transition-all duration-700"
                  style={{
                    width: `${(handle ? 20 : 0) + (color ? 20 : 0) + (format ? 20 : 0) + (print ? 20 : 0) + (qty && !qtyError ? 20 : 0)}%`
                  }}
                />
                
                {/* Progress Steps */}
                {[
                  { label: 'Henkel', active: handle },
                  { label: 'Farbe', active: color },
                  { label: 'Format', active: format },
                  { label: 'Druck', active: print },
                  { label: 'Menge', active: qty && !qtyError }
                ].map((step, idx) => (
                  <div key={idx} className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
                      step.active 
                        ? 'bg-gray-900 text-white shadow-lg scale-110' 
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}
                      style={{fontWeight: 700}}>
                      {idx + 1}
                    </div>
                    <span className={`text-xs mt-2 ${step.active ? 'text-gray-900' : 'text-gray-400'}`}
                      style={{fontWeight: step.active ? 700 : 400}}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Card Design */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* 1. Henkelform */}
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontWeight: 700}}>
                  Henkelform
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
                    <div style={{fontWeight: 700}}>Flachhenkel</div>
                    <div className="text-xs mt-1 text-gray-600" style={{fontWeight: 400}}>
                      Klassisch & bewährt
                    </div>
                    {handle === 'flachhenkel' && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" 
                        style={{backgroundColor: ELCO_RED}}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    )}
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
                    <div style={{fontWeight: 700}}>Kordelhenkel</div>
                    <div className="text-xs mt-1 text-gray-600" style={{fontWeight: 400}}>
                      Premium & elegant
                    </div>
                    {handle === 'kordelhenkel' && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{backgroundColor: ELCO_RED}}>
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              
              {/* 2. Farbe */}
              {handle && (
                <div id="color-section" className="p-6 border-b border-gray-100">
                  <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontWeight: 700}}>
                    Farbe
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setColor('braun')}
                      className={`relative p-6 rounded-xl transition-all border-2 ${
                        color === 'braun' 
                          ? 'bg-green-50 shadow-lg transform scale-[1.02]' 
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-transparent'
                      }`}
                      style={color === 'braun' ? {borderColor: ELCO_RED} : {}}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-400 mx-auto mb-3 shadow-md"></div>
                      <div style={{fontWeight: 700}}>Braun</div>
                      <div className="text-xs mt-1 text-gray-600" style={{fontWeight: 400}}>
                        Natürlich & nachhaltig
                      </div>
                      {color === 'braun' && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{backgroundColor: ELCO_RED}}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      )}
                    </button>
                    <button
                      onClick={() => setColor('weiss')}
                      className={`relative p-6 rounded-xl transition-all border-2 ${
                        color === 'weiss' 
                          ? 'bg-green-50 shadow-lg transform scale-[1.02]' 
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-transparent'
                      }`}
                      style={color === 'weiss' ? {borderColor: ELCO_RED} : {}}
                    >
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 mx-auto mb-3 shadow-md"></div>
                      <div style={{fontWeight: 700}}>Weiss</div>
                      <div className="text-xs mt-1 text-gray-600" style={{fontWeight: 400}}>
                        Edel & vielseitig
                      </div>
                      {color === 'weiss' && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{backgroundColor: ELCO_RED}}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              {/* 3. Format */}
              {color && (
                <div id="format-section" className="p-6 border-b border-gray-100">
                  <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontWeight: 700}}>
                    Format & Grösse
                  </h3>
                  <select
                    value={format || ''}
                    onChange={(e) => setFormat(e.target.value)}
                    className={`w-full px-4 py-3 text-gray-700 border-2 rounded-xl focus:outline-none transition-all cursor-pointer ${
                      format ? 'bg-green-50' : 'bg-gray-50 hover:bg-white'
                    }`}
                    style={{
                      borderColor: format ? ELCO_RED : '#e5e7eb',
                      fontWeight: 400
                    }}
                  >
                    <option value="">Wählen Sie ein Format...</option>
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
              )}
              
              {/* 4. Druckart */}
              {format && (
                <div id="print-section" className="p-6 border-b border-gray-100">
                  <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontWeight: 700}}>
                    Druckart
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPrint('1/0')}
                      className={`relative px-6 py-4 rounded-xl transition-all border-2 ${
                        print === '1/0' 
                          ? 'bg-green-50 shadow-lg' 
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                      style={print === '1/0' ? {borderColor: ELCO_RED} : {}}
                    >
                      <div className="text-2xl mb-1" style={{fontWeight: 700}}>1/0</div>
                      <div className="text-xs text-gray-600" style={{fontWeight: 400}}>
                        Einseitig bedruckt
                      </div>
                      {print === '1/0' && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{backgroundColor: ELCO_RED}}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      )}
                    </button>
                    <button
                      onClick={() => setPrint('1/1')}
                      className={`relative px-6 py-4 rounded-xl transition-all border-2 ${
                        print === '1/1' 
                          ? 'bg-green-50 shadow-lg' 
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                      style={print === '1/1' ? {borderColor: ELCO_RED} : {}}
                    >
                      <div className="text-2xl mb-1" style={{fontWeight: 700}}>1/1</div>
                      <div className="text-xs text-gray-600" style={{fontWeight: 400}}>
                        Beidseitig bedruckt
                      </div>
                      {print === '1/1' && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{backgroundColor: ELCO_RED}}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              {/* 5. Menge */}
              {print && (
                <div id="qty-section" className="p-6">
                  <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4" style={{fontWeight: 700}}>
                    Menge
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[50, 100, 200, 500, 1000, 2000].map(tier => (
                      <button
                        key={tier}
                        onClick={() => handleQuickSelection(tier)}
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
                    step="10"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    onWheel={(e) => e.target.blur()}
                    placeholder="Eigene Menge eingeben..."
                    className={`w-full px-4 py-3 text-lg border-2 rounded-xl transition-all ${
                      qtyError 
                        ? 'border-red-400 bg-red-50' 
                        : qty && !qtyError
                        ? 'bg-green-50'
                        : 'bg-gray-50 focus:bg-white'
                    } focus:outline-none`}
                    style={{
                      borderColor: qty && !qtyError ? ELCO_RED : qtyError ? '#f87171' : '#e5e7eb',
                      fontWeight: 700
                    }}
                  />
                  {qtyError && (
                    <p className="mt-2 text-sm text-red-600 flex items-center" style={{fontWeight: 400}}>
                      ⚠️ {qtyError}
                    </p>
                  )}
                  {parseInt(qty) > 2000 && !qtyError && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-start">
                        <span className="text-blue-600 mr-2 text-lg">📞</span>
                        <div>
                          <p className="text-sm text-blue-900 mb-2" style={{fontWeight: 700}}>
                            Grossauflage erkannt
                          </p>
                          <p className="text-sm text-blue-800 mb-3" style={{fontWeight: 400}}>
                            Für Auflagen über 2'000 Stück bieten wir Ihnen individuelle Preise und erweiterte Optionen wie:
                          </p>
                          <ul className="text-sm text-blue-800 mb-3 ml-4" style={{fontWeight: 400}}>
                            <li>• Mehrfarbiger Druck (bis 6 Farben)</li>
                            <li>• Rundum-Druck (5 Seiten)</li>
                            <li>• Sonderformate</li>
                            <li>• Premium-Veredelungen</li>
                          </ul>
                          <p className="text-sm text-blue-900" style={{fontWeight: 700}}>
                            Kontaktieren Sie unseren Innendienst:
                          </p>
                          <p className="text-sm text-blue-800 mt-1" style={{fontWeight: 400}}>
                            <a href="mailto:business@elcoworld.ch" className="underline hover:text-blue-900">
                              business@elcoworld.ch
                            </a><br/>
                            <a href="tel:+41564628000" className="underline hover:text-blue-900">
                              +41 56 462 80 00
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
              <div className="p-6">
                <h2 className="text-lg text-gray-900 mb-6" style={{fontWeight: 700}}>Preiskalkulation</h2>
                
                {priceResult && !priceResult.error ? (
                  <>
                    {/* Configuration Summary */}
                    <div className="space-y-3 pb-6 border-b border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500" style={{fontWeight: 400}}>Konfiguration</span>
                        <span className="text-gray-900" style={{fontWeight: 700}}>
                          {handle === 'flachhenkel' ? 'Flach' : 'Kordel'} • {color === 'braun' ? 'Braun' : 'Weiss'} • {print}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500" style={{fontWeight: 400}}>Format</span>
                        <span className="text-gray-900" style={{fontWeight: 700}}>{format?.replace(/x/g, '×')} cm</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500" style={{fontWeight: 400}}>Menge</span>
                        <span className="text-gray-900" style={{fontWeight: 700}}>{qty} Stück</span>
                      </div>
                    </div>
                    
                    {/* Price Details */}
                    <div className="py-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500" style={{fontWeight: 400}}>Stückpreis</span>
                        <span className="text-gray-900" style={{fontWeight: 400}}>{formatPriceCHF(priceResult.unit)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500" style={{fontWeight: 400}}>Warenwert</span>
                        <span className="text-gray-900" style={{fontWeight: 700}}>{formatPriceCHF(priceResult.subtotal)}</span>
                      </div>
                      
                      {priceResult.shipping > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500" style={{fontWeight: 400}}>Versand</span>
                          <span className="text-gray-700" style={{fontWeight: 400}}>+ {formatPriceCHF(priceResult.shipping)}</span>
                        </div>
                      )}
                      
                      {priceResult.smallQtySurcharge > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500" style={{fontWeight: 400}}>Kleinmengenzuschlag</span>
                          <span className="text-orange-600" style={{fontWeight: 400}}>+ {formatPriceCHF(priceResult.smallQtySurcharge)}</span>
                        </div>
                      )}
                      
                      {priceResult.shipping === 0 && (
                        <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <span style={{fontWeight: 700}}>Versandkostenfrei</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Total - Schwarz und Fett */}
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-900" style={{fontWeight: 700}}>Gesamtpreis</span>
                        <div className="text-right">
                          <div className="text-3xl text-gray-900" style={{fontWeight: 700}}>
                            {formatPriceCHF(priceResult.total)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1" style={{fontWeight: 400}}>exkl. MwSt</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Savings Tip */}
                    {priceResult.nextTier && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-2">💡</span>
                          <div className="text-xs text-blue-700" style={{fontWeight: 400}}>
                            <span style={{fontWeight: 700}}>Spartipp:</span> Bei {priceResult.nextTier.tier} Stück sparen Sie {priceResult.nextTier.savingsPercent}% pro Stück
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* CTA Button mit Elco-Rot */}
                    <button
                      onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                      className="w-full mt-6 py-4 text-white rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                      style={{backgroundColor: ELCO_RED, fontWeight: 700}}
                    >
                      Anfrage starten →
                    </button>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl opacity-50">🛍️</span>
                    </div>
                    <p className="text-sm text-gray-500" style={{fontWeight: 400}}>
                      Konfigurieren Sie Ihre Taschen<br/>für eine Preiskalkulation
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Shipping Info Card */}
            {priceResult && !priceResult.error && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-sm text-gray-900 mb-4" style={{fontWeight: 700}}>Versand & Lieferung</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1" style={{fontWeight: 700}}>Versandkosten</div>
                    <div className="text-gray-900" style={{fontWeight: 400}}>
                      • Gratis ab CHF 250.-<br/>
                      • CHF 12.90 (CHF 100-250)<br/>
                      • CHF 25.- (unter CHF 100)
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{fontWeight: 700}}>Lieferzeit</div>
                    <div className="text-gray-900" style={{fontWeight: 400}}>
                      5-7 Arbeitstage<br/>
                      Express auf Anfrage
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{fontWeight: 700}}>Proof</div>
                    <div className="text-gray-900" style={{fontWeight: 400}}>Innert 24 Stunden</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Contact Form */}
            {priceResult && !priceResult.error && (
              <div id="contact-form" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg text-gray-900 mb-6" style={{fontWeight: 700}}>Kontaktdaten</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
                    placeholder="Firma *"
                    style={{fontWeight: 400}}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
                      placeholder="Vorname *"
                      style={{fontWeight: 400}}
                      required
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
                      placeholder="Nachname *"
                      style={{fontWeight: 400}}
                      required
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
                    placeholder="E-Mail *"
                    style={{fontWeight: 400}}
                    required
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
                    placeholder="Telefon *"
                    style={{fontWeight: 400}}
                    required
                  />
                  <button
                    onClick={handleMailto}
                    className="w-full py-4 text-white rounded-xl transition-all shadow-lg hover:shadow-xl"
                    style={{backgroundColor: ELCO_RED, fontWeight: 700}}
                  >
                    📧 E-Mail-Anfrage öffnen
                  </button>
                  <p className="text-xs text-gray-500 text-center" style={{fontWeight: 400}}>
                    Hängen Sie bitte Ihr Logo an die E-Mail an
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border border-gray-100">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-gray-900" style={{fontWeight: 700}}>E-Mail geöffnet</div>
              <div className="text-sm text-gray-500 mt-1" style={{fontWeight: 400}}>
                Bitte Logo anhängen und versenden
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
