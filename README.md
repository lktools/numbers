# @lktools/numbers

Convert numbers into Sinhala words representation with support for configurable large-number systems.

## Installation

```bash
pnpm add @lktools/numbers
# or
npm install @lktools/numbers
```

## Usage

### Default Usage (Backward Compatible)

Calling `toSinhala` without options preserves existing Sinhala number conversion behavior:

```typescript
import { toSinhala } from '@lktools/numbers';

console.log(toSinhala(0));       // "බිංදුව"
console.log(toSinhala(21));      // "විසි එක"
console.log(toSinhala(100));     // "සියය"
console.log(toSinhala(1000));    // "දහස"
console.log(toSinhala(100000));  // "එකසියදහස"
console.log(toSinhala(999999));  // "නවසිය අනූනවදහස් නවසිය අනූ නවය"
```

### Options API

`toSinhala(value: number, options?: SinhalaNumberOptions)`

```typescript
export type SinhalaNumberStyle = "standard" | "laksha";
export type LargeNumberSystem = "sinhala" | "international";

export interface SinhalaNumberOptions {
  style?: SinhalaNumberStyle;
  largeNumberSystem?: LargeNumberSystem;
  currency?: boolean;
}
```

#### 1. `style: "laksha"`

Supports the South Asian Lakh/Crore naming system for 100,000+:

```typescript
toSinhala(100000, { style: "laksha" }); // "ලක්ෂය"
toSinhala(200000, { style: "laksha" }); // "ලක්ෂ දෙක"
toSinhala(500000, { style: "laksha" }); // "ලක්ෂ පහ"
toSinhala(125000, { style: "laksha" }); // "ලක්ෂ විසිපන්දහස"
```

#### 2. `largeNumberSystem: "sinhala"`

Uses Sinhala / South Asian terminology (Lakh, Dasalaksha, Koti, Dasakoti):

```typescript
toSinhala(100000, { largeNumberSystem: "sinhala" });    // "ලක්ෂය"
toSinhala(200000, { largeNumberSystem: "sinhala" });    // "ලක්ෂ දෙක"
toSinhala(1000000, { largeNumberSystem: "sinhala" });   // "දසලක්ෂය"
toSinhala(10000000, { largeNumberSystem: "sinhala" });  // "කෝටිය"
toSinhala(100000000, { largeNumberSystem: "sinhala" }); // "දසකෝටිය"
```

#### 3. `largeNumberSystem: "international"`

Uses international scale terminology (Million, Billion, Trillion, etc.):

```typescript
toSinhala(1000000, { largeNumberSystem: "international" });       // "මිලියනය"
toSinhala(2000000, { largeNumberSystem: "international" });       // "මිලියන දෙක"
toSinhala(10000000, { largeNumberSystem: "international" });      // "මිලියන දහය"
toSinhala(100000000, { largeNumberSystem: "international" });     // "මිලියන සියය"
toSinhala(1000000000, { largeNumberSystem: "international" });    // "බිලියනය"
toSinhala(2000000000, { largeNumberSystem: "international" });    // "බිලියන දෙක"
toSinhala(1000000000000, { largeNumberSystem: "international" }); // "ට්රිලියනය"
```

## License

[MIT](LICENSE)
