export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


export function rgbToHsv(hex){
  const rgb = hexToRgb(hex)
  let r = rgb.r / 255
  let g = rgb.g / 255
  let b = rgb.b / 255;

  // r /= 255; g /= 255; b /= 255;
  let v=Math.max(r,g,b), c=v-Math.min(r,g,b);
  let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c));
  return [60*(h<0?h+6:h), v&&c/v, v];
}

export function rgb2hsl(hex) {
  const rgb = hexToRgb(hex)
  let r = rgb.r / 255
  let g = rgb.g / 255
  let b = rgb.b / 255;

  let v=Math.max(r,g,b), c=v-Math.min(r,g,b), f=(1-Math.abs(v+v-c-1));
  let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c));
  return [60*(h<0?h+6:h), f ? c/f : 0, (v+v-c)/2];
}