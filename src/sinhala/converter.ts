import {
  HUNDREDS,
  ONES,
  TENS,
  TENS_PREFIX,
  THOUSANDS_BASE_PREFIX,
} from "./constants.js";

import type { ToSinhalaOptions } from "./types.js";
import { INTERNATIONAL_SCALES, SINHALA_SCALES, type ScaleItem } from "./scales.js";

import {
  assertFiniteNumber,
  assertInteger,
  assertSafeInteger,
} from "../common/validators.js";

function convertBelow20(value: number): string {
  return ONES[value];
}

function convertBelow100(value: number): string {
  if (value < 20) {
    return convertBelow20(value);
  }

  const tens = Math.floor(value / 10) * 10;
  const remainder = value % 10;

  if (remainder === 0) {
    return TENS[tens];
  }

  return `${TENS_PREFIX[tens]} ${ONES[remainder]}`;
}

function convertBelow1000(value: number): string {
  if (value < 100) {
    return convertBelow100(value);
  }

  const hundreds = Math.floor(value / 100);
  const remainder = value % 100;

  if (hundreds === 1) {
    if (remainder === 0) {
      return "සියය";
    }
    return `එකසිය ${convertBelow100(remainder)}`;
  }

  const hundred = HUNDREDS[hundreds];

  if (remainder === 0) {
    return hundred;
  }

  return `${hundred} ${convertBelow100(remainder)}`;
}

function getThousandsPrefix(thousandsCount: number): string {
  if (thousandsCount in THOUSANDS_BASE_PREFIX) {
    return THOUSANDS_BASE_PREFIX[thousandsCount];
  }

  if (thousandsCount < 100) {
    const tens = Math.floor(thousandsCount / 10) * 10;
    const remainder = thousandsCount % 10;

    if (remainder === 0) {
      return TENS_PREFIX[tens];
    }

    return `${TENS_PREFIX[tens]}${THOUSANDS_BASE_PREFIX[remainder]}`;
  }

  const hundreds = Math.floor(thousandsCount / 100);
  const remainder = thousandsCount % 100;

  if (hundreds === 1) {
    if (remainder === 0) {
      return "එකසිය";
    }
    return `එකසිය ${getThousandsPrefix(remainder)}`;
  }

  const hundred = HUNDREDS[hundreds];

  if (remainder === 0) {
    return hundred;
  }

  return `${hundred} ${getThousandsPrefix(remainder)}`;
}

function convertBelow1000000(value: number): string {
  if (value < 1000) {
    return convertBelow1000(value);
  }

  const thousands = Math.floor(value / 1000);
  const remainder = value % 1000;

  if (thousands === 1) {
    if (remainder === 0) {
      return "දහස";
    }
    return `එක්දහස් ${convertBelow1000(remainder)}`;
  }

  const prefix = getThousandsPrefix(thousands);

  if (remainder === 0) {
    return `${prefix}දහස`;
  }

  return `${prefix}දහස් ${convertBelow1000(remainder)}`;
}

function formatScaledNumber(
  value: number,
  scales: ScaleItem[],
  subConvert: (val: number) => string,
): string {
  for (const scale of scales) {
    if (value >= scale.value) {
      const count = Math.floor(value / scale.value);
      const remainder = value % scale.value;

      const countStr = subConvert(count);

      if (count === 1 && remainder === 0) {
        return scale.singular;
      }

      if (count === 1 && remainder > 0) {
        return `${scale.prefix} ${subConvert(remainder)}`;
      }

      if (count > 1 && remainder === 0) {
        return `${scale.prefix} ${countStr}`;
      }

      return `${scale.prefix} ${countStr} ${subConvert(remainder)}`;
    }
  }

  return subConvert(value);
}

export function toSinhala(
  value: number,
  options?: ToSinhalaOptions,
): string {
  assertFiniteNumber(value);
  assertInteger(value);
  assertSafeInteger(value);

  if (value < 0) {
    return `ඍණ ${toSinhala(Math.abs(value), options)}`;
  }

  const style = options?.style ?? "standard";
  const largeNumberSystem = options?.largeNumberSystem;

  let activeScales: ScaleItem[] | null = null;

  if (style === "laksha" || largeNumberSystem === "sinhala") {
    if (largeNumberSystem === "international" && value >= 1_000_000) {
      activeScales = INTERNATIONAL_SCALES;
    } else {
      activeScales = SINHALA_SCALES;
    }
  } else if (largeNumberSystem === "international" || value >= 1_000_000) {
    activeScales = INTERNATIONAL_SCALES;
  }

  if (activeScales !== null) {
    return formatScaledNumber(value, activeScales, (val) =>
      toSinhala(val, { ...options, largeNumberSystem: undefined, style: "standard" }),
    );
  }

  return convertBelow1000000(value);
}

export const numberToSinhala = toSinhala;
