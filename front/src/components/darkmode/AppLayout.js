import React from "react";
import styled from "styled-components";
import { useTheme } from "../components/darkmode/themeProvider";
import { FlexContainer } from "../styles/styles";
import ThemeToggle from "../components/darkmode/ThemeToggle";

const AppLayout = ({ children }) => {
  const [ThemeMode, toggleTheme] = useTheme();
  return (
    <WrapContainer>
      <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
        DarkMode
      </ThemeToggle>
      <FlexContainer>{children}</FlexContainer>
    </WrapContainer>
  );
};

export default AppLayout;

const WrapContainer = styled.main`
  min-height: 100%;
  position: relative;
`;
