import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import MapView, { Polygon, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const handleRegionChange = (region: Region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    const minLat = 12.3;
    const maxLat = 16.7;
    const minLng = -17.5;
    const maxLng = -11.3;
    const halfLatDelta = latitudeDelta / 2;
    const halfLngDelta = longitudeDelta / 2;
    if (
      latitude - halfLatDelta < minLat ||
      latitude + halfLatDelta > maxLat ||
      longitude - halfLngDelta < minLng ||
      longitude + halfLngDelta > maxLng
    ) {
      mapRef.current?.animateToRegion(senegalCenter, 500);
    }
  };

  const filteredRegions = senegalRegions.filter((region) =>
    region.properties.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View className="flex-1 bg-gray-100">
      <View className="absolute top-12 left-4 right-4 z-10">
        {selectedRegion ? (
          <View className="bg-white rounded-2xl px-5 py-4 shadow-2xl flex-row justify-between items-center">
            <View className="flex-row items-center flex-1">
              <Ionicons name="location" size={24} color="#10b981" />
              <Text className="text-lg font-bold text-gray-800 ml-2">
                {selectedRegion.properties.name}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-green-500 px-5 py-2.5 rounded-xl flex-row items-center"
              onPress={() => {
                resetMapView();
                setModalVisible(false);
              }}
            >
              <Ionicons name="close-circle" size={18} color="white" />
              <Text className="text-white font-semibold ml-1.5">
                Réinitialiser
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View className="bg-white rounded-2xl shadow-2xl flex-row items-center px-4">
              <Ionicons name="search" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 p-4 text-base text-gray-800"
                placeholder="Rechercher une région..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  setShowSuggestions(text.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                onSubmitEditing={() => {
                  const region = filteredRegions[0];
                  if (region) {
                    setSelectedRegion(region);
                    handleRegionPress(region);
                    setShowSuggestions(false);
                    setSearchQuery("");
                  }
                }}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                >
                  <Ionicons name="close-circle" size={20} color="#9ca3af" />
                </TouchableOpacity>
              )}
            </View>
            {showSuggestions && filteredRegions.length > 0 && (
              <View className="bg-white rounded-2xl mt-2 shadow-2xl overflow-hidden max-h-48">
                <FlatList
                  data={filteredRegions}
                  keyExtractor={(item) => item.properties.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="px-4 py-3.5 border-b border-gray-100 flex-row items-center"
                      onPress={() => {
                        setSelectedRegion(item);
                        handleRegionPress(item);
                        setShowSuggestions(false);
                        setSearchQuery("");
                      }}
                    >
                      <Ionicons
                        name="location-outline"
                        size={18}
                        color="#10b981"
                      />
                      <Text className="text-gray-800 ml-2 text-base">
                        {item.properties.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </>
        )}
      </View>
      <View className="absolute right-4 top-32 z-10 gap-2">
        {selectedRegion && (
          <TouchableOpacity
            className="bg-white rounded-xl p-3 shadow-lg items-center justify-center w-12 h-12"
            onPress={() => {
              if (selectedRegion) handleRegionPress(selectedRegion);
            }}
          >
            <Ionicons name="locate" size={24} color="#10b981" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="bg-white rounded-xl p-3 shadow-lg items-center justify-center w-12 h-12"
          onPress={resetMapView}
        >
          <Ionicons name="expand" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>
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
        minZoomLevel={6}
        maxZoomLevel={12}
        onRegionChangeComplete={handleRegionChange}
      >
        {selectedRegion &&
          senegalRegions
            .filter(
              (region) => region.properties.id === selectedRegion.properties.id,
            )
            .map((region) => {
              const coordinates = region.geometry.coordinates[0].map(
                (coord) => ({
                  latitude: coord[1],
                  longitude: coord[0],
                }),
              );

              const baseColor = getRegionColor(region.properties.id);

              return (
                <Polygon
                  key={region.properties.id}
                  coordinates={coordinates}
                  fillColor={`${baseColor}CC`}
                  strokeColor="#000000"
                  strokeWidth={3}
                  tappable={false}
                />
              );
            })}
      </MapView>

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
