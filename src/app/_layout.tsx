import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "@/contexts/UserContext";
import { JobsProvider } from "@/contexts/JobsContext";
import "./global.css";

export default function RootLayout() {
  return (
    <UserProvider>
      <JobsProvider>
        <StatusBar style="light" hidden={true} />
        <Stack screenOptions={{ headerShown: false }} />
      </JobsProvider>
    </UserProvider>
  );
}
