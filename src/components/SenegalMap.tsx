import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Mapbox, {
  MapView,
  Camera,
  ShapeSource,
  FillLayer,
  LineLayer,
} from "@rnmapbox/maps";
import { Ionicons } from "@expo/vector-icons";
import senegalRegionsData from "@//assets/geojson/senegal-regions.json";

// Set Mapbox access token - User needs to add their token
// Get token from: https://account.mapbox.com/access-tokens/
Mapbox.setAccessToken(
  process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ||
    "YOUR_MAPBOX_ACCESS_TOKEN_HERE",
);

interface SenegalMapProps {
  onRegionSelect?: (regionId: string, regionName: string) => void;
  selectedRegionId?: string | null;
  className?: string;
}

export default function SenegalMap({
  onRegionSelect,
  selectedRegionId = null,
  className = "",
}: SenegalMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    selectedRegionId,
  );
  const cameraRef = useRef<Camera>(null);

  // Senegal center coordinates
  const SENEGAL_CENTER: [number, number] = [-14.4524, 14.4974];
  const DEFAULT_ZOOM = 6.5;

  useEffect(() => {
    if (selectedRegionId) {
      setSelectedRegion(selectedRegionId);
    }
  }, [selectedRegionId]);

  const handleRegionPress = (event: any) => {
    const { features } = event;
    if (features && features.length > 0) {
      const feature = features[0];
      const regionId = feature.id;
      const regionName = feature.properties.name_fr || feature.properties.name;

      setSelectedRegion(regionId);

      if (onRegionSelect) {
        onRegionSelect(regionId, regionName);
      }

      // Optionally zoom to selected region
      if (feature.geometry && feature.geometry.coordinates) {
        const bounds = calculateBounds(feature.geometry.coordinates);
        if (bounds) {
          cameraRef.current?.fitBounds(
            bounds.ne,
            bounds.sw,
            [50, 50, 50, 50],
            1000,
          );
        }
      }
    }
  };

  const calculateBounds = (coordinates: any) => {
    try {
      let minLng = Infinity;
      let minLat = Infinity;
      let maxLng = -Infinity;
      let maxLat = -Infinity;

      const processCoords = (coords: any) => {
        if (Array.isArray(coords[0])) {
          coords.forEach((c: any) => processCoords(c));
        } else {
          const [lng, lat] = coords;
          minLng = Math.min(minLng, lng);
          minLat = Math.min(minLat, lat);
          maxLng = Math.max(maxLng, lng);
          maxLat = Math.max(maxLat, lat);
        }
      };

      processCoords(coordinates);

      return {
        ne: [maxLng, maxLat] as [number, number],
        sw: [minLng, minLat] as [number, number],
      };
    } catch (error) {
      console.error("Error calculating bounds:", error);
      return null;
    }
  };

  const resetCamera = () => {
    cameraRef.current?.setCamera({
      centerCoordinate: SENEGAL_CENTER,
      zoomLevel: DEFAULT_ZOOM,
      animationDuration: 1000,
      animationMode: "flyTo",
    });
    setSelectedRegion(null);
  };

  const zoomIn = () => {
    cameraRef.current?.zoomTo(DEFAULT_ZOOM + 1, 500);
  };

  const zoomOut = () => {
    cameraRef.current?.zoomTo(DEFAULT_ZOOM - 1, 500);
  };

  return (
    <View style={styles.container} className={className}>
      <MapView
        style={styles.map}
        styleURL="mapbox://styles/mapbox/light-v11"
        compassEnabled={true}
        compassViewPosition={3}
        scaleBarEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
      >
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: SENEGAL_CENTER,
            zoomLevel: DEFAULT_ZOOM,
          }}
          minZoomLevel={5}
          maxZoomLevel={12}
        />

        {/* Senegal Regions Layer */}
        <ShapeSource
          id="senegal-regions-source"
          shape={senegalRegionsData as any}
          onPress={handleRegionPress}
          hitbox={{ width: 20, height: 20 }}
        >
          {/* Fill Layer for Regions */}
          <FillLayer
            id="senegal-regions-fill"
            style={{
              fillColor: [
                "case",
                ["==", ["id"], selectedRegion || ""],
                "#f97316", // Orange for selected region
                "#10b981", // Green for unselected regions
              ],
              fillOpacity: [
                "case",
                ["==", ["id"], selectedRegion || ""],
                0.7,
                0.4,
              ],
            }}
          />

          {/* Outline Layer for Regions */}
          <LineLayer
            id="senegal-regions-outline"
            style={{
              lineColor: [
                "case",
                ["==", ["id"], selectedRegion || ""],
                "#ea580c", // Darker orange for selected
                "#059669", // Darker green for unselected
              ],
              lineWidth: ["case", ["==", ["id"], selectedRegion || ""], 3, 1.5],
              lineOpacity: 0.8,
            }}
          />
        </ShapeSource>
      </MapView>

      {/* Map Controls */}
      <View style={styles.controls}>
        {/* Zoom Controls */}
        <View style={styles.zoomControls}>
          <TouchableOpacity
            onPress={zoomIn}
            style={styles.controlButton}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={24} color="#374151" />
          </TouchableOpacity>
          <View style={styles.controlDivider} />
          <TouchableOpacity
            onPress={zoomOut}
            style={styles.controlButton}
            activeOpacity={0.7}
          >
            <Ionicons name="remove" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Reset Camera Button */}
        {selectedRegion && (
          <TouchableOpacity
            onPress={resetCamera}
            style={styles.resetButton}
            activeOpacity={0.7}
          >
            <Ionicons name="locate" size={20} color="#ffffff" />
            <Text style={styles.resetButtonText}>Réinitialiser</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Selected Region Info */}
      {selectedRegion && (
        <View style={styles.regionInfo}>
          {(() => {
            const feature = senegalRegionsData.features.find(
              (f: any) => f.id === selectedRegion,
            );
            if (!feature) return null;

            return (
              <>
                <View style={styles.regionInfoHeader}>
                  <Text style={styles.regionName}>
                    {feature.properties.name_fr}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setSelectedRegion(null)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close" size={24} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                <View style={styles.regionStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="people" size={16} color="#6b7280" />
                    <Text style={styles.statText}>
                      {feature.properties.population.toLocaleString("fr-FR")}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="map" size={16} color="#6b7280" />
                    <Text style={styles.statText}>
                      {feature.properties.area_km2.toLocaleString("fr-FR")} km²
                    </Text>
                  </View>
                </View>
              </>
            );
          })()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  controls: {
    position: "absolute",
    right: 16,
    bottom: 100,
    alignItems: "flex-end",
    gap: 12,
  },
  zoomControls: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  controlButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  controlDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f97316",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  resetButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  regionInfo: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  regionInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  regionName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  regionStats: {
    flexDirection: "row",
    gap: 24,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
});
