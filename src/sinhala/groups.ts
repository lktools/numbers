export interface NumberGroup {
  value: number;
  scale: string;
}

export const SCALES = [
  "",
  "දහස",
  "මිලියන",
  "බිලියන",
  "ට්රිලියන",
] as const;
