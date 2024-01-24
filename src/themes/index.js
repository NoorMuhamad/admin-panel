import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({ children }) {
  const theme = Palette('light', 'default');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography = Typography(`'Public Sans', sans-serif`);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536
        }
      },
      direction: 'ltr',
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <style>
          {`
            /* WebKit browsers (Chrome, Safari) */
            ::-webkit-scrollbar {
              width: 2px; /* Set the width of the scrollbar on the y-axis */
              height: 2px; /* Set the height of the scrollbar on the x-axis */
            }

            ::-webkit-scrollbar-thumb {
              background-color: #3498db; /* Set the color of the scrollbar thumb */
            }

            ::-webkit-scrollbar-track {
              background-color: #ecf0f1; /* Set the color of the scrollbar track */
            }

            /* For Firefox */
            /* Note: Firefox does not support setting the width directly, so we use the 'border' property */
            ::-moz-scrollbar {
              border: 2px solid #3498db; /* Set the border width for Firefox on the y-axis */
            }
          `}
        </style>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node
};
