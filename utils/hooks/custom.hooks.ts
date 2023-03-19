/* eslint-disable prefer-exponentiation-operator */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
function getInitials(chain: string): string {
  const words = chain.split(' ');
  const initial1 = words[0].charAt(0);
  const initial2 = words[1].charAt(0);
  return `${initial1}${initial2}`;
}

function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash * 33) ^ char;
  }
  return hash;
}

function interpolateColor(color1: string, color2: string, factor: number): string {
  const result = color1
    .slice(1)
    .match(/.{2}/g)!
    .map((hex, i) => {
      const val1 = parseInt(hex, 16);
      const val2 = parseInt(color2.slice(1).match(/.{2}/g)![i], 16);
      const newVal = Math.floor(val1 + (val2 - val1) * factor);
      return `0${newVal.toString(16)}`.slice(-2);
    });
  return `#${result.join('')}`;
}

function multicolorInterpolation(colors: string[], factor: number): string {
  const sectionLength = 1 / (colors.length - 1);
  const index = Math.floor(factor / sectionLength);
  const localFactor = (factor - index * sectionLength) / sectionLength;

  return interpolateColor(colors[index], colors[index + 1], localFactor);
}

function stringToMulticolor(inputString: string): string {
  const baseColors: string[] = ['#4fd18b', '#ff4d4f', '#4c49ed', '#faad14', '#cf9fff'];
  const hash = djb2Hash(inputString);
  const factor = Math.abs(Math.sin(hash)) % 1;

  return multicolorInterpolation(baseColors, factor);
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

function calculateLuminance(rgb: { r: number; g: number; b: number }): number {
  const linearRgb = ['r', 'g', 'b'].map((channel) => {
    const value = rgb[channel as keyof typeof rgb] / 255;
    // eslint-disable-next-line no-restricted-properties
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * linearRgb[0] + 0.7152 * linearRgb[1] + 0.0722 * linearRgb[2];
}

function getTextColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  const luminance = calculateLuminance(rgb);

  return luminance > 0.5 ? 'black' : 'white';
}

export { getInitials, stringToMulticolor, getTextColor };
