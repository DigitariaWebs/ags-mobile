import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";

const DEV_ACCOUNTS: UserProfile[] = [
  {
    id: "dev-job-seeker",
    firstName: "Amadou",
    lastName: "Diallo",
    email: "amadou.diallo@example.com",
    phone: "771234567",
    userType: "job_seeker",
    gender: "male",
  },
  {
    id: "dev-farm-owner",
    firstName: "Fatou",
    lastName: "Ndiaye",
    email: "fatou.ndiaye@example.com",
    phone: "781234567",
    userType: "farm_owner",
    gender: "female",
  },
];

export { DEV_ACCOUNTS };

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren) {
  const [userType, setUserType] = useState<UserType>("job_seeker");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const toggleUserType = () => {
    setUserType((prev) =>
      prev === "job_seeker" ? "farm_owner" : "job_seeker",
    );
  };

  const handleSetCurrentUser = (user: UserProfile | null) => {
    setCurrentUser(user);
    if (user) setUserType(user.userType);
  };

  const value: UserContextType = {
    userType,
    setUserType,
    toggleUserType,
    currentUser,
    setCurrentUser: handleSetCurrentUser,
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
