export interface ScaleItem {
  value: number;
  singular: string;
  prefix: string;
}

export const INTERNATIONAL_SCALES: ScaleItem[] = [
  {
    value: 1_000_000_000_000_000,
    singular: "ක්වොඩ්රිලියනය",
    prefix: "ක්වොඩ්රිලියන",
  },
  {
    value: 1_000_000_000_000,
    singular: "ට්රිලියනය",
    prefix: "ට්රිලියන",
  },
  {
    value: 1_000_000_000,
    singular: "බිලියනය",
    prefix: "බිලියන",
  },
  {
    value: 1_000_000,
    singular: "මිලියනය",
    prefix: "මිලියන",
  },
];

export const SINHALA_SCALES: ScaleItem[] = [
  {
    value: 100_000_000,
    singular: "දසකෝටිය",
    prefix: "දසකෝටි",
  },
  {
    value: 10_000_000,
    singular: "කෝටිය",
    prefix: "කෝටි",
  },
  {
    value: 1_000_000,
    singular: "දසලක්ෂය",
    prefix: "දසලක්ෂ",
  },
  {
    value: 100_000,
    singular: "ලක්ෂය",
    prefix: "ලක්ෂ",
  },
];
