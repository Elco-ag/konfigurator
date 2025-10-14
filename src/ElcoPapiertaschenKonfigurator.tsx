import React, { useState, useEffect } from 'react';

// ============================================================================
// PRICING DATA & ENGINE (KORRIGIERT AUS EXCEL)
// ============================================================================

const PRICE_DATA = {
  "rules": {
    "tiers": [100, 200, 500, 1000, 2000, 5000],
    "min_qty": 50,
    "setup_per_side": 95,
    "shipping_per_1000": 25,
    "min_shipping": 25
  },
  "data": {
    "flachhenkel": {
      "braun": {
        "18x8x26": {
          "1/0": { "100": 1.76, "200": 1.26, "500": 0.96, "1000": 0.86, "2000": 0.77, "5000": 0.73 },
          "1/1": { "100": 2.56, "200": 1.81, "500": 1.36, "1000": 1.21, "2000": 1.04, "5000": 0.98 },
          "4/0": { "100": 2.56, "200": 1.61, "500": 1.22, "1000": 1.09, "2000": 0.94, "5000": 0.88 },
          "4/4": { "100": 3.26, "200": 2.23, "500": 1.72, "1000": 1.59, "2000": 1.32, "5000": 1.26 }
        },
        "22x10x29": {
          "1/0": { "100": 1.8, "200": 1.3, "500": 1, "1000": 0.9, "2000": 0.81, "5000": 0.77 },
          "1/1": { "100": 2.6, "200": 1.85, "500": 1.4, "1000": 1.25, "2000": 1.08, "5000": 1.02 },
          "4/0": { "100": 2.6, "200": 1.65, "500": 1.26, "1000": 1.13, "2000": 0.98, "5000": 0.92 },
          "4/4": { "100": 3.3, "200": 2.27, "500": 1.76, "1000": 1.63, "2000": 1.36, "5000": 1.3 }
        },
        "26x10x33": {
          "1/0": { "100": 1.85, "200": 1.35, "500": 1.05, "1000": 0.95, "2000": 0.86, "5000": 0.82 },
          "1/1": { "100": 2.65, "200": 1.9, "500": 1.45, "1000": 1.3, "2000": 1.13, "5000": 1.07 },
          "4/0": { "100": 2.65, "200": 1.7, "500": 1.31, "1000": 1.18, "2000": 1.03, "5000": 0.97 },
          "4/4": { "100": 3.35, "200": 2.32, "500": 1.81, "1000": 1.68, "2000": 1.4, "5000": 1.35 }
        },
        "26x16x29": {
          "1/0": { "100": 1.51, "200": 1.16, "500": 0.95, "1000": 0.86, "2000": 0.83, "5000": 0.8 },
          "1/1": { "100": 2.07, "200": 1.54, "500": 1.23, "1000": 1.1, "2000": 1.03, "5000": 0.98 },
          "4/0": { "100": 1.86, "200": 1.4, "500": 1.13, "1000": 1.02, "2000": 0.96, "5000": 0.91 },
          "4/4": { "100": 2.56, "200": 1.75, "500": 1.48, "1000": 1.35, "2000": 1.24, "5000": 1.19 }
        },
        "32x17x38": {
          "1/0": { "100": 1.94, "200": 1.44, "500": 1.14, "1000": 1.04, "2000": 0.95, "5000": 0.91 },
          "1/1": { "100": 2.74, "200": 1.99, "500": 1.54, "1000": 1.39, "2000": 1.22, "5000": 1.16 },
          "4/0": { "100": 2.74, "200": 1.79, "500": 1.4, "1000": 1.27, "2000": 1.12, "5000": 1.06 },
          "4/4": { "100": 3.44, "200": 2.41, "500": 1.9, "1000": 1.77, "2000": 1.5, "5000": 1.44 }
        },
        "32x22x30": {
          "1/0": { "100": 1.94, "200": 1.44, "500": 1.14, "1000": 1.04, "2000": 0.95, "5000": 0.91 },
          "1/1": { "100": 2.74, "200": 1.99, "500": 1.54, "1000": 1.39, "2000": 1.22, "5000": 1.16 },
          "4/0": { "100": 2.74, "200": 1.79, "500": 1.4, "1000": 1.27, "2000": 1.12, "5000": 1.06 },
          "4/4": { "100": 3.44, "200": 2.41, "500": 1.9, "1000": 1.77, "2000": 1.49, "5000": 1.44 }
        },
        "45x15x49": {
          "1/0": { "100": 2.1, "200": 1.6, "500": 1.3, "1000": 1.2, "2000": 1.1, "5000": 1.07 },
          "1/1": { "100": 2.9, "200": 2.15, "500": 1.7, "1000": 1.55, "2000": 1.38, "5000": 1.31 },
          "4/0": { "100": 2.9, "200": 1.95, "500": 1.56, "1000": 1.43, "2000": 1.28, "5000": 1.21 },
          "4/4": { "100": 3.6, "200": 2.56, "500": 2.06, "1000": 1.93, "2000": 1.65, "5000": 1.59 }
        }
      },
      "weiss": {
        "18x8x26": {
          "1/0": { "100": 1.8, "200": 1.3, "500": 1, "1000": 0.9, "2000": 0.81, "5000": 0.77 },
          "1/1": { "100": 2.6, "200": 1.85, "500": 1.4, "1000": 1.25, "2000": 1.08, "5000": 1.02 },
          "4/0": { "100": 2.6, "200": 1.65, "500": 1.26, "1000": 1.13, "2000": 0.98, "5000": 0.92 },
          "4/4": { "100": 3.3, "200": 2.27, "500": 1.76, "1000": 1.63, "2000": 1.36, "5000": 1.3 }
        },
        "22x10x29": {
          "1/0": { "100": 1.85, "200": 1.35, "500": 1.05, "1000": 0.95, "2000": 0.86, "5000": 0.82 },
          "1/1": { "100": 2.65, "200": 1.9, "500": 1.45, "1000": 1.3, "2000": 1.13, "5000": 1.07 },
          "4/0": { "100": 2.65, "200": 1.7, "500": 1.31, "1000": 1.18, "2000": 1.03, "5000": 0.97 },
          "4/4": { "100": 3.35, "200": 2.32, "500": 1.81, "1000": 1.68, "2000": 1.4, "5000": 1.35 }
        },
        "26x10x33": {
          "1/0": { "100": 1.9, "200": 1.4, "500": 1.1, "1000": 1, "2000": 0.9, "5000": 0.87 },
          "1/1": { "100": 2.7, "200": 1.95, "500": 1.5, "1000": 1.35, "2000": 1.18, "5000": 1.11 },
          "4/0": { "100": 2.7, "200": 1.75, "500": 1.36, "1000": 1.23, "2000": 1.08, "5000": 1.01 },
          "4/4": { "100": 3.4, "200": 2.36, "500": 1.86, "1000": 1.73, "2000": 1.45, "5000": 1.39 }
        },
        "26x16x29": {
          "1/0": { "100": 1.76, "200": 1.26, "500": 0.96, "1000": 0.86, "2000": 0.77, "5000": 0.73 },
          "1/1": { "100": 2.56, "200": 1.81, "500": 1.36, "1000": 1.21, "2000": 1.04, "5000": 0.98 },
          "4/0": { "100": 2.56, "200": 1.61, "500": 1.22, "1000": 1.09, "2000": 0.94, "5000": 0.88 },
          "4/4": { "100": 3.26, "200": 2.23, "500": 1.72, "1000": 1.59, "2000": 1.31, "5000": 1.26 }
        },
        "32x17x38": {
          "1/0": { "100": 1.99, "200": 1.49, "500": 1.19, "1000": 1.09, "2000": 0.99, "5000": 0.96 },
          "1/1": { "100": 2.79, "200": 2.04, "500": 1.59, "1000": 1.44, "2000": 1.27, "5000": 1.21 },
          "4/0": { "100": 2.79, "200": 1.84, "500": 1.45, "1000": 1.32, "2000": 1.17, "5000": 1.11 },
          "4/4": { "100": 3.49, "200": 2.46, "500": 1.95, "1000": 1.82, "2000": 1.54, "5000": 1.49 }
        },
        "32x22x30": {
          "1/0": { "100": 1.99, "200": 1.49, "500": 1.19, "1000": 1.09, "2000": 0.99, "5000": 0.96 },
          "1/1": { "100": 2.79, "200": 2.04, "500": 1.59, "1000": 1.44, "2000": 1.27, "5000": 1.21 },
          "4/0": { "100": 2.79, "200": 1.84, "500": 1.45, "1000": 1.32, "2000": 1.17, "5000": 1.11 },
          "4/4": { "100": 3.49, "200": 2.46, "500": 1.95, "1000": 1.82, "2000": 1.54, "5000": 1.49 }
        },
        "45x15x49": {
          "1/0": { "100": 2.16, "200": 1.66, "500": 1.36, "1000": 1.26, "2000": 1.16, "5000": 1.13 },
          "1/1": { "100": 2.96, "200": 2.21, "500": 1.76, "1000": 1.61, "2000": 1.44, "5000": 1.37 },
          "4/0": { "100": 2.96, "200": 2.01, "500": 1.62, "1000": 1.49, "2000": 1.34, "5000": 1.27 },
          "4/4": { "100": 3.66, "200": 2.62, "500": 2.12, "1000": 1.99, "2000": 1.71, "5000": 1.66 }
        }
      }
    },
    "kordelhenkel": {
      "braun": {
        "18x8x24": {
          "1/0": { "100": 1.8, "200": 1.3, "500": 1, "1000": 0.9, "2000": 0.8, "5000": 0.77 },
          "1/1": { "100": 2.6, "200": 1.85, "500": 1.4, "1000": 1.25, "2000": 1.08, "5000": 1.01 },
          "4/0": { "100": 2.6, "200": 1.65, "500": 1.26, "1000": 1.13, "2000": 0.98, "5000": 0.91 },
          "4/4": { "100": 3.3, "200": 2.26, "500": 1.76, "1000": 1.63, "2000": 1.35, "5000": 1.3 }
        },
        "22x10x29": {
          "1/0": { "100": 1.85, "200": 1.35, "500": 1.05, "1000": 0.95, "2000": 0.86, "5000": 0.82 },
          "1/1": { "100": 2.65, "200": 1.9, "500": 1.45, "1000": 1.3, "2000": 1.13, "5000": 1.07 },
          "4/0": { "100": 2.65, "200": 1.7, "500": 1.31, "1000": 1.18, "2000": 1.03, "5000": 0.97 },
          "4/4": { "100": 3.35, "200": 2.32, "500": 1.81, "1000": 1.68, "2000": 1.41, "5000": 1.35 }
        },
        "27x12x37": {
          "1/0": { "100": 1.95, "200": 1.45, "500": 1.15, "1000": 1.05, "2000": 0.95, "5000": 0.92 },
          "1/1": { "100": 2.75, "200": 2, "500": 1.55, "1000": 1.4, "2000": 1.23, "5000": 1.16 },
          "4/0": { "100": 2.75, "200": 1.8, "500": 1.41, "1000": 1.28, "2000": 1.13, "5000": 1.06 },
          "4/4": { "100": 3.45, "200": 2.41, "500": 1.91, "1000": 1.78, "2000": 1.5, "5000": 1.44 }
        },
        "32x13x28": {
          "1/0": { "100": 1.91, "200": 1.41, "500": 1.11, "1000": 1.01, "2000": 0.91, "5000": 0.88 },
          "1/1": { "100": 2.71, "200": 1.96, "500": 1.51, "1000": 1.36, "2000": 1.19, "5000": 1.12 },
          "4/0": { "100": 2.71, "200": 1.76, "500": 1.37, "1000": 1.24, "2000": 1.09, "5000": 1.03 },
          "4/4": { "100": 3.41, "200": 2.38, "500": 1.87, "1000": 1.74, "2000": 1.46, "5000": 1.41 }
        },
        "32x13x41": {
          "1/0": { "100": 2, "200": 1.5, "500": 1.2, "1000": 1.1, "2000": 1.01, "5000": 0.97 },
          "1/1": { "100": 2.8, "200": 2.05, "500": 1.6, "1000": 1.45, "2000": 1.28, "5000": 1.22 },
          "4/0": { "100": 2.8, "200": 1.85, "500": 1.46, "1000": 1.33, "2000": 1.18, "5000": 1.12 },
          "4/4": { "100": 3.5, "200": 2.47, "500": 1.96, "1000": 1.83, "2000": 1.55, "5000": 1.5 }
        },
        "40x12x31": {
          "1/0": { "100": 2.04, "200": 1.54, "500": 1.24, "1000": 1.14, "2000": 1.04, "5000": 1.01 },
          "1/1": { "100": 2.84, "200": 2.09, "500": 1.64, "1000": 1.49, "2000": 1.32, "5000": 1.25 },
          "4/0": { "100": 2.84, "200": 1.89, "500": 1.5, "1000": 1.37, "2000": 1.22, "5000": 1.16 },
          "4/4": { "100": 3.54, "200": 2.51, "500": 2, "1000": 1.87, "2000": 1.59, "5000": 1.54 }
        },
        "55x15x39": {
          "1/0": { "100": 1.76, "200": 1.26, "500": 0.96, "1000": 0.86, "2000": 0.77, "5000": 0.73 },
          "1/1": { "100": 2.56, "200": 1.81, "500": 1.36, "1000": 1.21, "2000": 1.04, "5000": 0.98 },
          "4/0": { "100": 2.56, "200": 1.61, "500": 1.22, "1000": 1.09, "2000": 0.94, "5000": 0.88 },
          "4/4": { "100": 3.26, "200": 2.23, "500": 1.72, "1000": 1.59, "2000": 1.31, "5000": 1.26 }
        }
      },
      "weiss": {
        "18x8x24": {
          "1/0": { "100": 1.8, "200": 1.3, "500": 1, "1000": 0.9, "2000": 0.8, "5000": 0.77 },
          "1/1": { "100": 2.6, "200": 1.85, "500": 1.4, "1000": 1.25, "2000": 1.08, "5000": 1.01 },
          "4/0": { "100": 2.6, "200": 1.65, "500": 1.26, "1000": 1.13, "2000": 0.98, "5000": 0.91 },
          "4/4": { "100": 3.3, "200": 2.26, "500": 1.76, "1000": 1.63, "2000": 1.35, "5000": 1.3 }
        },
        "22x10x29": {
          "1/0": { "100": 1.85, "200": 1.35, "500": 1.05, "1000": 0.95, "2000": 0.86, "5000": 0.82 },
          "1/1": { "100": 2.65, "200": 1.9, "500": 1.45, "1000": 1.3, "2000": 1.13, "5000": 1.07 },
          "4/0": { "100": 2.65, "200": 1.7, "500": 1.31, "1000": 1.18, "2000": 1.03, "5000": 0.97 },
          "4/4": { "100": 3.35, "200": 2.32, "500": 1.81, "1000": 1.68, "2000": 1.41, "5000": 1.35 }
        },
        "27x12x37": {
          "1/0": { "100": 1.95, "200": 1.45, "500": 1.15, "1000": 1.05, "2000": 0.95, "5000": 0.92 },
          "1/1": { "100": 2.75, "200": 2, "500": 1.55, "1000": 1.4, "2000": 1.23, "5000": 1.16 },
          "4/0": { "100": 2.75, "200": 1.8, "500": 1.41, "1000": 1.28, "2000": 1.13, "5000": 1.06 },
          "4/4": { "100": 3.45, "200": 2.41, "500": 1.91, "1000": 1.78, "2000": 1.5, "5000": 1.44 }
        },
        "32x13x28": {
          "1/0": { "100": 1.91, "200": 1.41, "500": 1.11, "1000": 1.01, "2000": 0.91, "5000": 0.88 },
          "1/1": { "100": 2.71, "200": 1.96, "500": 1.51, "1000": 1.36, "2000": 1.19, "5000": 1.12 },
          "4/0": { "100": 2.71, "200": 1.76, "500": 1.37, "1000": 1.24, "2000": 1.09, "5000": 1.03 },
          "4/4": { "100": 3.41, "200": 2.38, "500": 1.87, "1000": 1.74, "2000": 1.46, "5000": 1.41 }
        },
        "32x13x41": {
          "1/0": { "100": 2, "200": 1.5, "500": 1.2, "1000": 1.1, "2000": 1.01, "5000": 0.97 },
          "1/1": { "100": 2.8, "200": 2.05, "500": 1.6, "1000": 1.45, "2000": 1.28, "5000": 1.22 },
          "4/0": { "100": 2.8, "200": 1.85, "500": 1.46, "1000": 1.33, "2000": 1.18, "5000": 1.12 },
          "4/4": { "100": 3.5, "200": 2.47, "500": 1.96, "1000": 1.83, "2000": 1.55, "5000": 1.5 }
        },
        "40x12x31": {
          "1/0": { "100": 2.04, "200": 1.54, "500": 1.24, "1000": 1.14, "2000": 1.04, "5000": 1.01 },
          "1/1": { "100": 2.84, "200": 2.09, "500": 1.64, "1000": 1.49, "2000": 1.32, "5000": 1.25 },
          "4/0": { "100": 2.84, "200": 1.89, "500": 1.5, "1000": 1.37, "2000": 1.22, "5000": 1.16 },
          "4/4": { "100": 3.54, "200": 2.51, "500": 2, "1000": 1.87, "2000": 1.59, "5000": 1.54 }
        },
        "55x15x39": {
          "1/0": { "100": 2.41, "200": 1.91, "500": 1.61, "1000": 1.51, "2000": 1.41, "5000": 1.38 },
          "1/1": { "100": 3.21, "200": 2.46, "500": 2.01, "1000": 1.86, "2000": 1.69, "5000": 1.62 },
          "4/0": { "100": 3.21, "200": 2.26, "500": 1.87, "1000": 1.74, "2000": 1.59, "5000": 1.53 },
          "4/4": { "100": 3.91, "200": 2.88, "500": 2.37, "1000": 2.24, "2000": 1.96, "5000": 1.91 }
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
    const unitPrice = data[handle]?.[color]?.[format]?.[print]?.[tier];
    if (typeof unitPrice !== 'number') {
      return { error: 'no_price_found', message: 'Preis nicht verfügbar' };
    }
    
    const unit = unitPrice;
    const shipping = Math.max(rules.min_shipping, Math.ceil(qty / 1000) * rules.shipping_per_1000);
    const total = unit * qty;
    const unitEffective = unit;
    
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
    
    return { tier, unit, shipping, total, unitEffective, nextTier };
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ElcoPapiertaschenKonfigurator() {
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
    ? Object.keys(PRICE_DATA.data[handle]?.[color] || {}).sort()
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
  
  const handleMailto = () => {
    if (!company || !firstName || !lastName || !email || !phone) {
      alert('Bitte alle Pflichtfelder ausfüllen');
      return;
    }
    
    if (!priceResult || priceResult.error) {
      alert('Bitte vollständige Konfiguration wählen');
      return;
    }
    
    const reqId = Date.now().toString(36);
    const subject = encodeURIComponent(`Bestellanfrage Papiertaschen mit Logo | Request-ID ${reqId}`);
    const body = encodeURIComponent(`Guten Tag ELCO Team

Bitte um Proof und Auftragsbestätigung.

Henkelform: ${handle === 'flachhenkel' ? 'Flachhenkel' : 'Kordelhenkel'}
Farbe: ${color}
Format: ${format} cm
Druck: ${print}
Menge: ${qty} Stück | Staffel: ${priceResult.tier}
Preis Richtwert: ${formatPriceCHF(priceResult.total, 2)} exkl. MwSt. und Versand
Versand: ${formatPriceCHF(priceResult.shipping)} (pauschal 25 CHF je 1000 Stk, mind. 25 CHF)

Firma: ${company}
Name: ${firstName} ${lastName}
Telefon: ${phone}
E-Mail: ${email}

Ich hänge mein Logo an. Danke für die Rückmeldung innert 24 h.`);
    
    window.location.href = `mailto:info@elcoworld.ch?subject=${subject}&body=${body}`;
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Henkelform */}
            <section className="transform transition-all duration-300 hover:translate-y-[-2px]">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-2 mb-5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">1</div>
                  <h2 className="text-2xl font-bold text-gray-900">Henkelform wählen</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setHandle('flachhenkel')}
                    className={`group relative p-8 rounded-xl border-2 transition-all duration-300 ${
                      handle === 'flachhenkel' 
                        ? 'border-red-500 bg-gradient-to-br from-red-50 to-white shadow-lg scale-[1.02]' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-bold text-xl mb-2">Flachhenkel</div>
                      <div className="text-sm text-gray-500">Klassisch & robust</div>
                    </div>
                    {handle === 'flachhenkel' && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => setHandle('kordelhenkel')}
                    className={`group relative p-8 rounded-xl border-2 transition-all duration-300 ${
                      handle === 'kordelhenkel' 
                        ? 'border-red-500 bg-gradient-to-br from-red-50 to-white shadow-lg scale-[1.02]' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-bold text-xl mb-2">Kordelhenkel</div>
                      <div className="text-sm text-gray-500">Elegant & hochwertig</div>
                    </div>
                    {handle === 'kordelhenkel' && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </section>
            
            {/* 2. Farbe */}
            {handle && (
              <section className="transform transition-all duration-300 hover:translate-y-[-2px] animate-fade-in">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">2</div>
                    <h2 className="text-2xl font-bold text-gray-900">Farbe wählen</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setColor('braun')}
                      className={`group relative p-8 rounded-xl border-2 transition-all duration-300 ${
                        color === 'braun' 
                          ? 'border-red-500 bg-gradient-to-br from-red-50 to-white shadow-lg scale-[1.02]' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 shadow-lg border-4 border-white transform group-hover:scale-110 transition-transform"></div>
                        <span className="font-bold text-lg">Braun</span>
                        <span className="text-sm text-gray-500">Natürlich</span>
                      </div>
                      {color === 'braun' && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      )}
                    </button>
                    <button
                      onClick={() => setColor('weiss')}
                      className={`group relative p-8 rounded-xl border-2 transition-all duration-300 ${
                        color === 'weiss' 
                          ? 'border-red-500 bg-gradient-to-br from-red-50 to-white shadow-lg scale-[1.02]' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 rounded-full bg-white shadow-lg border-4 border-gray-300 transform group-hover:scale-110 transition-transform"></div>
                        <span className="font-bold text-lg">Weiss</span>
                        <span className="text-sm text-gray-500">Premium</span>
                      </div>
                      {color === 'weiss' && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </section>
            )}
            
            {/* 3. Format */}
            {color && (
              <section className="transform transition-all duration-300 hover:translate-y-[-2px] animate-fade-in">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">3</div>
                    <h2 className="text-2xl font-bold text-gray-900">Format wählen</h2>
                  </div>
                  <div>
                    <select
                      value={format || ''}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full p-5 text-xl font-semibold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-white transition-all cursor-pointer"
                    >
                      <option value="">Bitte Format auswählen...</option>
                      {availableFormats.map(fmt => (
                        <option key={fmt} value={fmt}>
                          {fmt.replace(/x/g, '×')} cm (B×T×H)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>
            )}
            
            {/* 4. Druckart */}
            {format && (
              <section className="transform transition-all duration-300 hover:translate-y-[-2px] animate-fade-in">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">4</div>
                    <h2 className="text-2xl font-bold text-gray-900">Druckart wählen</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['1/0', '1/1', '4/0', '4/4'].map(p => (
                      <button
                        key={p}
                        onClick={() => setPrint(p)}
                        className={`group relative p-5 rounded-xl border-2 transition-all duration-300 ${
                          print === p 
                            ? 'border-red-500 bg-gradient-to-br from-red-50 to-white shadow-lg scale-[1.02]' 
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-bold text-2xl mb-2">{p}</div>
                          <div className="text-xs text-gray-600 leading-tight">
                            {p === '1/0' && 'Einseitig\n1-farbig'}
                            {p === '1/1' && 'Beidseitig\n1-farbig'}
                            {p === '4/0' && 'Einseitig\n4-farbig'}
                            {p === '4/4' && 'Beidseitig\n4-farbig'}
                          </div>
                        </div>
                        {print === p && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}
            
            {/* 5. Menge */}
            {print && (
              <section className="transform transition-all duration-300 hover:translate-y-[-2px] animate-fade-in">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">5</div>
                    <h2 className="text-2xl font-bold text-gray-900">Menge eingeben</h2>
                  </div>
                  <div>
                    <input
                      type="number"
                      min="50"
                      step="10"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      onWheel={(e) => e.target.blur()}
                      placeholder="z.B. 500"
                      className={`w-full p-5 text-3xl font-bold border-2 rounded-xl transition-all ${
                        qtyError 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-200 focus:border-red-500 bg-white'
                      } focus:outline-none focus:ring-4 focus:ring-red-100`}
                    />
                    {qtyError && (
                      <p className="mt-3 text-sm text-red-600 font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        {qtyError}
                      </p>
                    )}
                    <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Mindestmenge: 50 Stück</span><br/>
                        Preisstaffeln: 100, 200, 500, 1'000, 2'000, 5'000<br/>
                        <span className="text-xs">Versandkosten werden separat berechnet</span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {/* 6. Lieferhinweis */}
            {qty && !qtyError && (
              <section className="animate-fade-in">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">🚚</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">Lieferung & Versand</h3>
                      <p className="text-gray-700">
                        <strong>Gut zum Druck:</strong> Innert 24 Stunden<br/>
                        <strong>Standard Lieferung:</strong> 7-10 Arbeitstage<br/>
                        <strong>Versand:</strong> CHF 25.- / Grossauflagen auf Anfrage
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
          
          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Price Box */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl shadow-2xl overflow-hidden border border-emerald-200/50">
                <div className="p-6">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Ihr Preis</h2>
                  
                  {priceResult && !priceResult.error ? (
                    <>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-baseline pb-3 border-b border-emerald-200">
                          <span className="text-sm text-gray-700">Stückpreis</span>
                          <span className="text-xl font-bold text-gray-900">{formatPriceCHF(priceResult.unit)}</span>
                        </div>
                        <div className="flex justify-between items-baseline pb-3 border-b border-emerald-200">
                          <span className="text-sm text-gray-700">Menge</span>
                          <span className="text-xl font-bold text-gray-900">{qty} Stück</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-3 bg-white/60 rounded-xl p-4 mt-4 shadow-sm">
                          <span className="text-lg font-bold text-gray-900">Total</span>
                          <span className="text-4xl font-bold text-emerald-700">{formatPriceCHF(priceResult.total, 2)}</span>
                        </div>
                      </div>
                      
                      <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl mb-6 text-sm border border-emerald-200/50 shadow-sm">
                        <div className="font-bold mb-2 flex items-center text-gray-900">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                          </svg>
                          Staffel: {priceResult.tier} Stück
                        </div>
                        {priceResult.nextTier && (
                          <div className="text-xs text-gray-700">
                            💡 Bei {priceResult.nextTier.tier} Stück sparen Sie ca. {priceResult.nextTier.savingsPercent}%
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-700 space-y-2">
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          Preise exkl. MwSt und Versandkosten
                        </p>
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          Verbindlich nach Proof
                        </p>
                        <p className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          Proof innert 24h
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4 opacity-50">🛍️</div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Konfigurieren Sie Ihre Papiertaschen für eine Live-Preisberechnung
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Kontaktformular */}
              {priceResult && !priceResult.error && (
                <div className="animate-fade-in bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-2xl font-bold mb-5 text-gray-900">Ihre Kontaktdaten</h2>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700">Firma *</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700">Vorname *</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-700">Nachname *</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700">E-Mail *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-700">Telefon *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
                        required
                      />
                    </div>
                    <button
                      onClick={handleMailto}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg mt-2"
                    >
                      📧 E-Mail-Entwurf öffnen
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-5 rounded-2xl shadow-2xl animate-slide-up z-50 max-w-md border border-green-400/30 backdrop-blur-xl">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <div className="font-bold text-lg mb-1">E-Mail geöffnet!</div>
              <div className="text-sm opacity-95">
                Bitte Logo anhängen. Wir melden uns innert 24h mit dem Gut zum Druck.
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}