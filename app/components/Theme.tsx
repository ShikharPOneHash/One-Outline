import { observer } from "mobx-react";
import * as React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@shared/styles/globals";
import { TeamPreference, UserPreference } from "@shared/types";
import useBuildTheme from "~/hooks/useBuildTheme";
import useStores from "~/hooks/useStores";
import { TooltipStyles } from "./Tooltip";

const Theme: React.FC = ({ children }) => {
  const { auth, ui } = useStores();
  const theme = useBuildTheme(
    auth.team?.getPreference(TeamPreference.CustomTheme) ||
      auth.config?.customTheme ||
      undefined
  );

  React.useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("theme-changed", {
        detail: { isDark: ui.resolvedTheme === "dark" },
      })
    );
  }, [ui.resolvedTheme]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <TooltipStyles />
        <GlobalStyles
          useCursorPointer={auth.user?.getPreference(
            UserPreference.UseCursorPointer,
            true
          )}
        />
        {children}
      </>
    </ThemeProvider>
  );
};

export default observer(Theme);
