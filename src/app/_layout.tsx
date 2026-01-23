import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "@/contexts/UserContext";
import { JobsProvider } from "@/contexts/JobsContext";
import { TrainingProvider } from "@/contexts/TrainingContext";
import "./global.css";

export default function RootLayout() {
  return (
    <UserProvider>
      <JobsProvider>
        <TrainingProvider>
          <StatusBar style="light" hidden={true} />
          <Stack screenOptions={{ headerShown: false }} />
        </TrainingProvider>
      </JobsProvider>
    </UserProvider>
  );
}
