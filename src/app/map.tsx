import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SenegalMap from "@/components/SenegalMap";

export default function MapScreen() {
  const [selectedRegion, setSelectedRegion] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleRegionSelect = (regionId: string, regionName: string) => {
    setSelectedRegion({ id: regionId, name: regionName });
    console.log("Region selected:", regionId, regionName);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Carte du Sénégal</Text>
          <Text style={styles.headerSubtitle}>
            Sélectionnez une région pour voir les détails
          </Text>
        </View>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <SenegalMap
          onRegionSelect={handleRegionSelect}
          selectedRegionId={selectedRegion?.id}
        />
      </View>

      {/* Instructions */}
      {!selectedRegion && (
        <View style={styles.instructions}>
          <View style={styles.instructionCard}>
            <Ionicons name="information-circle" size={24} color="#f97316" />
            <Text style={styles.instructionText}>
              Touchez une région sur la carte pour afficher ses informations
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  mapContainer: {
    flex: 1,
  },
  instructions: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },
  instructionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
});
