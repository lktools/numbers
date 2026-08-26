export type SinhalaNumberStyle = "standard" | "laksha";

export type LargeNumberSystem = "sinhala" | "international";

export interface SinhalaNumberOptions {
  /**
   * Style of number conversion.
   * - "standard": Default compositional Sinhala style (0 - 999,999+).
   * - "laksha": South Asian Lakh/Crore naming system for 100,000+.
   */
  style?: SinhalaNumberStyle;

  /**
   * Large-number terminology system.
   * - "sinhala": Sinhala/South Asian large-number terminology (ලක්ෂය, දසලක්ෂය, කෝටිය, දසකෝටිය...).
   * - "international": International terminology (මිලියනය, බිලියනය, ට්රිලියනය...).
   */
  largeNumberSystem?: LargeNumberSystem;

  /**
   * Optional currency formatting flag.
   */
  currency?: boolean;
}

export type ToSinhalaOptions = SinhalaNumberOptions;
export type NumberToSinhalaOptions = SinhalaNumberOptions;
