import { ReactNode, useEffect } from 'react';
import { ThemeVariant } from '../types';

interface ThemeSetterProps {
  theme?: ThemeVariant;
  children: ReactNode;
}

export const ThemeSetter: React.FC<ThemeSetterProps> = ({
  theme,
  children,
}) => {
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('hello-csv-data-theme', theme);
    }
  }, [theme]);

  return <>{children}</>;
};
