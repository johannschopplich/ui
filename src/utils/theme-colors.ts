const _variants: Record<string, (hex: number[]) => number[]> = {
  "50": withTint(0.95),
  "100": withTint(0.9),
  "200": withTint(0.75),
  "300": withTint(0.6),
  "400": withTint(0.3),
  "500": (hex: number[]) => hex,
  "600": withShade(0.9),
  "700": withShade(0.6),
  "800": withShade(0.45),
  "900": withShade(0.3),
  "950": withShade(0.2),
};

export function getColors(
  color: string,
  variants = _variants,
): Record<string, string> {
  const components = parseColor(color);

  return Object.fromEntries(
    Object.entries(variants).map(([name, fn]) => [
      name,
      hexValue(fn(components)),
    ]),
  );
}

function parseColor(color = "") {
  const hexMatch = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if (hexMatch) {
    return hexMatch.splice(1).map((c) => Number.parseInt(c, 16));
  }

  const hexMatchShort = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(color);
  if (hexMatchShort) {
    return hexMatchShort.splice(1).map((c) => Number.parseInt(c + c, 16));
  }

  if (color.includes(",")) {
    return color.split(",").map((p) => Number.parseInt(p));
  }

  throw new Error("Invalid color format");
}

function hexValue(components: number[]) {
  return `#${components
    .map((c) => `0${c.toString(16).toUpperCase()}`.slice(-2))
    .join("")}`;
}

function tint(components: number[], intensity: number) {
  return components.map((c) => Math.round(c + (255 - c) * intensity));
}

function shade(components: number[], intensity: number) {
  return components.map((c) => Math.round(c * intensity));
}

function withTint(intensity: number) {
  return (hex: number[]) => tint(hex, intensity);
}

function withShade(intensity: number) {
  return (hex: number[]) => shade(hex, intensity);
}
