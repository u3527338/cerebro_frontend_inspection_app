import {extendTheme} from 'native-base';
import roboto from "./fonts/roboto";
import primary from "./colors/primary";
import secondary from "./colors/secondary";
import baseColor from "./colors/baseColor";
import alertColor from "./colors/alertColor";
import alertButtonColor from "./colors/alertButtonColor";
import montserrat from "./fonts/montserrat";
import lemon from "./fonts/lemon";

const customThemes = extendTheme({
  fontConfig: {
    Roboto: roboto,
    Montserrat: montserrat,
    Lemon: lemon,
  },

  colors: {
    primary: primary,
    secondary: secondary,
    baseColor: baseColor,
    alertColor: alertColor,
    alertButtonColor: alertButtonColor,
  },

  config: {
    initialColorMode: 'dark',
  },

  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
    mono: 'Montserrat',
  },
});

export default customThemes