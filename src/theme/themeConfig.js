export const primary = '#E91A3B';
export const primaryDark = '#AD0D28';
export const bgColor = '#3C3C3C';
export const bgDark = '#262626';
export const placeholder = '#A5A5A5';
export const input = '#d4d4d4';
export const light = '#E9E9E9';
export const bdDarkOpacity = '#1D1D1BBA';
export const success = '#6FCF97';
export const greyLight = '#8E8E8E';
export const grey = '#4F4F4F';
export const dark = '#020203';

const themeConfig = {
  colors: {
    primary,
    primaryDark,
    bgColor,
    bgDark,
    input,
    dark,
    placeholder,
    light,
    bdDarkOpacity,
    success,
    greyLight,
    grey
  },
  components: { Button: { baseStyle: { bg: bgDark, _pressed: { transform: [{ scale: 0.97 }] } } } }
};

export default themeConfig;
