import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import MapView, { Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import {
  senegalRegions,
  senegalCenter,
  getRegionColor,
} from "@/data/senegal-regions";
import type { SenegalRegion } from "@/data/senegal-regions";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [selectedRegion, setSelectedRegion] = useState<SenegalRegion | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegionPress = (region: SenegalRegion) => {
    setSelectedRegion(region);
    setModalVisible(true);

    const coordinates = region.geometry.coordinates[0];
    const latitudes = coordinates.map((coord) => coord[1]);
    const longitudes = coordinates.map((coord) => coord[0]);

    const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
    const centerLng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

    mapRef.current?.animateToRegion(
      {
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: 1.5,
        longitudeDelta: 1.5,
      },
      1000,
    );
  };

  const resetMapView = () => {
    mapRef.current?.animateToRegion(senegalCenter, 1000);
    setSelectedRegion(null);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={senegalCenter}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        showsCompass={true}
        showsScale={true}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        loadingEnabled={true}
        loadingBackgroundColor="#f0f0f0"
      >
        {senegalRegions.map((region) => {
          const coordinates = region.geometry.coordinates[0].map((coord) => ({
            latitude: coord[1],
            longitude: coord[0],
          }));

          const isSelected =
            selectedRegion?.properties.id === region.properties.id;
          const baseColor = getRegionColor(region.properties.id);

          return (
            <Polygon
              key={region.properties.id}
              coordinates={coordinates}
              fillColor={isSelected ? `${baseColor}CC` : `${baseColor}66`}
              strokeColor={isSelected ? "#000000" : "#ffffff"}
              strokeWidth={isSelected ? 3 : 2}
              tappable={true}
              onPress={() => handleRegionPress(region)}
            />
          );
        })}
      </MapView>

      {selectedRegion && (
        <View className="absolute top-4 left-4 right-4 bg-white rounded-xl p-4 flex-row justify-between items-center shadow-lg">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800 mb-1">
              {selectedRegion.properties.name}
            </Text>
            <Text className="text-sm text-gray-600">
              Capitale: {selectedRegion.properties.capital}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-green-500 px-4 py-2 rounded-lg ml-3"
            onPress={resetMapView}
          >
            <Text className="text-white font-semibold text-sm">
              Réinitialiser
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 max-h-[80%]">
            {selectedRegion && (
              <ScrollView>
                <Text className="text-2xl font-bold text-gray-800 mb-6">
                  Région de {selectedRegion.properties.name}
                </Text>

                <View className="mb-5">
                  <Text className="text-sm font-semibold text-gray-600 mb-1">
                    Capitale:
                  </Text>
                  <Text className="text-base text-gray-800">
                    {selectedRegion.properties.capital}
                  </Text>
                </View>

                {selectedRegion.properties.population && (
                  <View className="mb-5">
                    <Text className="text-sm font-semibold text-gray-600 mb-1">
                      Population:
                    </Text>
                    <Text className="text-base text-gray-800">
                      {selectedRegion.properties.population.toLocaleString(
                        "fr-FR",
                      )}{" "}
                      habitants
                    </Text>
                  </View>
                )}

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
                      // TODO: Navigate to farms list for this region
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
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
