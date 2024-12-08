import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50',
      },
      secondary: {
        main: '#f50057',
      },
    },
    // spacing: 8, // Default value (1 spacing unit = 8px)
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#f5f5f5', // Set the global background color
            margin: 0, // Remove default body margin
            padding: 16,
            '@media (max-width:600px)': {
              padding: 0, // Reduce padding for small screens
            },
          },
        },
      },
    },
  });

export default theme;