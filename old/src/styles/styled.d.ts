import 'styled-components';
import { Theme as MuiTheme } from '@mui/material/styles';

declare module 'styled-components' {
  export interface DefaultTheme extends MuiTheme {
    palette: {
      mode: 'light' | 'dark';
      primary: {
        main: string;
        light: string;
        dark: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
      };
      background: {
        default: string;
        paper: string;
      };
    };
  }
} 