'use client';

import { useEffect } from 'react';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import theme from '../../theme';
import { AppProvider } from '../../contexts/AppContext';
import { ExamProvider } from '../../contexts/ExamContext';
import { ModalWrapper } from '../ModalWrapper';
import NavBar from '../../components/NavBar';
import ExamList from '../../components/ExamList';
import {
  wrapperStyle,
  layoutStyle,
  examListStyle,
  mainContentStyle,
} from './styles';

export default function ClientWrapper({ children }) {
  useEffect(() => {
    // Any client-side effects can be added here
    document.body.style.margin = '0';
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <ExamProvider>
          <ModalWrapper>
            <Box sx={wrapperStyle}>
              {/* Top NavBar */}
              <NavBar />

              <Box sx={layoutStyle}>
                {/* Left ExamList */}
                <Box sx={examListStyle}>
                  <ExamList />
                </Box>

                {/* Main Content */}
                <Box component="main" sx={mainContentStyle}>
                  {children}
                </Box>
              </Box>
            </Box>
          </ModalWrapper>
        </ExamProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
