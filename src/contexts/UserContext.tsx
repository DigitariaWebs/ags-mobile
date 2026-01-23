import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren) {
  const [userType, setUserType] = useState<UserType>("job_seeker");

  const toggleUserType = () => {
    setUserType((prev) =>
      prev === "job_seeker" ? "farm_owner" : "job_seeker",
    );
  };

  const value: UserContextType = {
    userType,
    setUserType,
    toggleUserType,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
