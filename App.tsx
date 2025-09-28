import Routes from '~/routes';
import { AppProvider } from './src/context/AppContext';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
