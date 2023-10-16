import React, { createContext, useContext } from "react";
import { useViewport } from "./useViewport";

const MobileContext = createContext();

export function MobileProvier({ children }) {
  const { isMobile } = useViewport();

  return (
    <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>
  );
}

export function useIsMobile() {
  return useContext(MobileContext);
}
