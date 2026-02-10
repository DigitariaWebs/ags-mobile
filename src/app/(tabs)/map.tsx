import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";
import Mapbox, {
  MapView,
  Camera,
  VectorSource,
  FillLayer,
  LineLayer,
} from "@rnmapbox/maps";
import { Ionicons } from "@expo/vector-icons";
import { senegalCenter } from "@/data/senegal-regions";

// Set Mapbox access token
Mapbox.setAccessToken(
  process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || "YOUR_MAPBOX_ACCESS_TOKEN",
);

// Calculate Senegal bounds from center and deltas
const SENEGAL_BOUNDS = {
  ne: [
    senegalCenter.longitude + senegalCenter.longitudeDelta / 2,
    senegalCenter.latitude + senegalCenter.latitudeDelta / 2,
  ], // Northeast corner
  sw: [
    senegalCenter.longitude - senegalCenter.longitudeDelta / 2,
    senegalCenter.latitude - senegalCenter.latitudeDelta / 2,
  ], // Southwest corner
};

export default function MapScreen() {
  const cameraRef = useRef<Camera>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCountryPress = (event: any) => {
    const { features } = event;
    if (features && features.length > 0) {
      const feature = features[0];
      console.log("Pressed country:", feature.properties);
      setModalVisible(true);
    }
  };

  // Query and setup regions programmatically
  useEffect(() => {
    const setupRegions = async () => {
      // This will be populated when regions are loaded
      // Colors will be generated dynamically based on mapbox_id
    };
    setupRegions();
  }, []);

  // Handle camera region changes to enforce bounds
  const handleCameraChanged = (state: any) => {
    if (!state?.properties?.center) return;

    const [lng, lat] = state.properties.center;

    // Check if camera is outside Senegal bounds
    const isOutOfBounds =
      lng < SENEGAL_BOUNDS.sw[0] ||
      lng > SENEGAL_BOUNDS.ne[0] ||
      lat < SENEGAL_BOUNDS.sw[1] ||
      lat > SENEGAL_BOUNDS.ne[1];

    if (isOutOfBounds && cameraRef.current) {
      // Reset camera to center
      cameraRef.current.setCamera({
        centerCoordinate: [senegalCenter.longitude, senegalCenter.latitude],
        zoomLevel: 6.5,
        animationDuration: 500,
      });
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="absolute top-12 left-4 right-4 z-10">
        <View className="bg-white rounded-2xl px-5 py-4 shadow-2xl flex-row items-center">
          <Ionicons name="location" size={24} color="#10b981" />
          <Text className="text-lg font-bold text-gray-800 ml-2">Sénégal</Text>
        </View>
      </View>

      <MapView
        style={styles.map}
        styleURL="mapbox://styles/mapbox/light-v11"
        compassEnabled={true}
        scaleBarEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
        onCameraChanged={handleCameraChanged}
      >
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: [senegalCenter.longitude, senegalCenter.latitude],
            zoomLevel: 6.5,
            padding: {
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 100,
              paddingBottom: 100,
            },
          }}
          minZoomLevel={5.5}
          maxZoomLevel={12}
          maxBounds={{
            ne: SENEGAL_BOUNDS.ne,
            sw: SENEGAL_BOUNDS.sw,
          }}
        />

        {/* Senegal country boundary from Mapbox Countries tileset */}
        <VectorSource
          id="countries"
          url="mapbox://mapbox.country-boundaries-v1"
          onPress={handleCountryPress}
        >
          <FillLayer
            id="country-fill"
            sourceLayerID="country_boundaries"
            filter={[
              "all",
              ["==", ["get", "iso_3166_1"], "SN"],
              ["==", ["get", "disputed"], "false"],
              [
                "any",
                ["==", "all", ["get", "worldview"]],
                ["in", "US", ["get", "worldview"]],
              ],
            ]}
            style={{
              fillColor: "#10b981",
              fillOpacity: 0.3,
            }}
          />
          <LineLayer
            id="country-outline"
            sourceLayerID="country_boundaries"
            filter={[
              "all",
              ["==", ["get", "iso_3166_1"], "SN"],
              ["==", ["get", "disputed"], "false"],
              [
                "any",
                ["==", "all", ["get", "worldview"]],
                ["in", "US", ["get", "worldview"]],
              ],
            ]}
            style={{
              lineColor: "#059669",
              lineWidth: 2,
            }}
          />
        </VectorSource>
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 max-h-[80%]">
            <ScrollView>
              <Text className="text-2xl font-bold text-gray-800 mb-6">
                Sénégal
              </Text>

              <View className="mb-5">
                <Text className="text-sm font-semibold text-gray-600 mb-1">
                  Code pays:
                </Text>
                <Text className="text-base text-gray-800">SN</Text>
              </View>

              <View className="mb-5">
                <Text className="text-sm font-semibold text-gray-600 mb-1">
                  Exploitations enregistrées:
                </Text>
                <Text className="text-base text-gray-800">
                  En cours de chargement...
                </Text>
              </View>

              <View className="mt-6 gap-3">
                <TouchableOpacity
                  className="bg-green-500 py-3.5 px-6 rounded-xl items-center"
                  onPress={() => {
                    setModalVisible(false);
                    // TODO: Navigate to farms list
                  }}
                >
                  <Text className="text-white text-base font-semibold">
                    Voir les exploitations
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-gray-100 py-3.5 px-6 rounded-xl items-center"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-gray-800 text-base font-semibold">
                    Fermer
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
