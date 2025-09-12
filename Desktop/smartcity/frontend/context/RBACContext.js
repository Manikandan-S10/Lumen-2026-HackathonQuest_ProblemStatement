import { createContext, useState } from "react";

export const RBACContext = createContext();

export function RBACProvider({ children }) {
  const [role, setRole] = useState("engineer"); // default role

  return (
    <RBACContext.Provider value={{ role, setRole }}>
      {children}
    </RBACContext.Provider>
  );
}
