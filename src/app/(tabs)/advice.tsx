import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ZodError } from "zod";
import StepIndicator from "@/components/ui/StepIndicator";
import FormButton from "@/components/ui/FormButton";
import FormInput from "@/components/ui/FormInput";
import FormPicker from "@/components/ui/FormPicker";
import {
  departments,
  soilTypes,
  productionTypes,
  crops,
  getDepartmentsByRegion,
  getMunicipalitiesByDepartment,
} from "@/data/agricultural-data";
import { senegalRegions } from "@/data/senegal-regions";
import {
  adviceStep1Schema,
  adviceStep2Schema,
  adviceStep3Schema,
  adviceStep4Schema,
  adviceStep5Schema,
  adviceFormSchema,
} from "@/schemas/validation";

export default function AdviceScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<AdviceFormData>({
    region: "",
    department: "",
    municipality: "",
    cultivatedArea: "",
    areaUnit: "hectare",
    soilType: "",
    productionType: "",
    crop: "",
  });
  const [errors, setErrors] = useState<AdviceFormErrors>({});

  const stepLabels = [
    "Localisation",
    "Superficie",
    "Type de sol",
    "Itinéraire",
    "Culture",
  ];

  const totalSteps = 5;

  // Update form data
  const updateFormData = (field: keyof AdviceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field as keyof AdviceFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate current step using Zod
  const validateStep = (): boolean => {
    const newErrors: AdviceFormErrors = {};

    try {
      switch (currentStep) {
        case 0: // Location
          adviceStep1Schema.parse({
            region: formData.region,
            department: formData.department,
            municipality: formData.municipality,
          });
          break;
        case 1: // Area
          adviceStep2Schema.parse({
            cultivatedArea: formData.cultivatedArea,
            areaUnit: formData.areaUnit,
          });
          break;
        case 2: // Soil type
          adviceStep3Schema.parse({
            soilType: formData.soilType,
          });
          break;
        case 3: // Production type
          adviceStep4Schema.parse({
            productionType: formData.productionType,
          });
          break;
        case 4: // Crop
          adviceStep5Schema.parse({
            crop: formData.crop,
          });
          break;
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof AdviceFormErrors;
          newErrors[field] = err.message;
        });
      }
      setErrors(newErrors);
      return false;
    }
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  // Handle previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    try {
      // Validate complete form
      adviceFormSchema.parse(formData);
      setErrors({});
      setShowResults(true);
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: AdviceFormErrors = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof AdviceFormErrors;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
        Alert.alert(
          "Erreur de validation",
          "Veuillez vérifier tous les champs du formulaire",
        );
      }
    }
  };

  // Handle reset
  const handleReset = () => {
    setCurrentStep(0);
    setShowResults(false);
    setFormData({
      region: "",
      department: "",
      municipality: "",
      cultivatedArea: "",
      areaUnit: "hectare",
      soilType: "",
      productionType: "",
      crop: "",
    });
    setErrors({});
  };

  // Get region name
  const getRegionName = (regionId: string) => {
    return (
      senegalRegions.find((r) => r.properties.id === regionId)?.properties
        .name || regionId
    );
  };

  // Get department name
  const getDepartmentName = (deptId: string) => {
    return departments.find((d) => d.id === deptId)?.name || deptId;
  };

  // Get soil type name
  const getSoilTypeName = (soilId: string) => {
    return soilTypes.find((s) => s.id === soilId)?.name || soilId;
  };

  // Get production type name
  const getProductionTypeName = (prodId: string) => {
    return productionTypes.find((p) => p.id === prodId)?.name || prodId;
  };

  // Get crop name
  const getCropName = (cropId: string) => {
    return crops.find((c) => c.id === cropId)?.name || cropId;
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Location
        return (
          <View className="px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Localisation de votre exploitation
            </Text>
            <Text className="text-gray-600 mb-6">
              Indiquez la localisation géographique de votre exploitation
              agricole
            </Text>

            <FormPicker
              label="Région"
              value={formData.region}
              onValueChange={(value) => {
                updateFormData("region", value);
                updateFormData("department", "");
                updateFormData("municipality", "");
              }}
              items={senegalRegions.map((region) => ({
                label: region.properties.name,
                value: region.properties.id,
              }))}
              error={errors.region}
              required
              placeholder="Choisir une région"
            />

            <FormPicker
              label="Département"
              value={formData.department}
              onValueChange={(value) => {
                updateFormData("department", value);
                updateFormData("municipality", "");
              }}
              items={getDepartmentsByRegion(formData.region).map((dept) => ({
                label: dept.name,
                value: dept.id,
              }))}
              error={errors.department}
              required
              placeholder="Choisir un département"
              enabled={!!formData.region}
            />

            <FormPicker
              label="Commune"
              value={formData.municipality}
              onValueChange={(value) => updateFormData("municipality", value)}
              items={getMunicipalitiesByDepartment(formData.department).map(
                (municipality) => ({
                  label: municipality,
                  value: municipality,
                }),
              )}
              error={errors.municipality}
              required
              placeholder="Choisir une commune"
              enabled={!!formData.department}
            />
          </View>
        );

      case 1: // Cultivated Area
        return (
          <View className="px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Superficie cultivée
            </Text>
            <Text className="text-gray-600 mb-6">
              Indiquez la superficie de votre exploitation
            </Text>

            <FormInput
              label="Superficie"
              value={formData.cultivatedArea}
              onChangeText={(value) => updateFormData("cultivatedArea", value)}
              error={errors.cultivatedArea}
              required
              placeholder="Entrez la superficie"
              keyboardType="decimal-pad"
            />

            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">
                Unité de mesure <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row space-x-3">
                <FormButton
                  title="Hectares (ha)"
                  variant={
                    formData.areaUnit === "hectare" ? "primary" : "outline"
                  }
                  onPress={() => updateFormData("areaUnit", "hectare")}
                  className="flex-1 mr-3"
                />
                <FormButton
                  title="Mètres carrés (m²)"
                  variant={formData.areaUnit === "sqm" ? "primary" : "outline"}
                  onPress={() => updateFormData("areaUnit", "sqm")}
                  className="flex-1"
                />
              </View>
            </View>

            {formData.cultivatedArea && (
              <View className="bg-blue-50 p-4 rounded-lg">
                <Text className="text-blue-800 text-sm">
                  <Text className="font-semibold">Conversion : </Text>
                  {formData.areaUnit === "hectare"
                    ? `${formData.cultivatedArea} ha = ${(Number(formData.cultivatedArea) * 10000).toLocaleString()} m²`
                    : `${formData.cultivatedArea} m² = ${(Number(formData.cultivatedArea) / 10000).toFixed(4)} ha`}
                </Text>
              </View>
            )}
          </View>
        );

      case 2: // Soil Type
        return (
          <View className="px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Type de sol
            </Text>
            <Text className="text-gray-600 mb-6">
              Sélectionnez le type de sol de votre exploitation
            </Text>

            <View className="space-y-3">
              {soilTypes.map((soil) => (
                <FormButton
                  key={soil.id}
                  title={soil.name}
                  variant={
                    formData.soilType === soil.id ? "primary" : "outline"
                  }
                  onPress={() => updateFormData("soilType", soil.id)}
                  className="mb-3"
                />
              ))}
            </View>

            {formData.soilType && (
              <View className="bg-green-50 p-4 rounded-lg mt-4">
                <Text className="text-green-800 font-semibold mb-1">
                  {getSoilTypeName(formData.soilType)}
                </Text>
                <Text className="text-green-700 text-sm">
                  {
                    soilTypes.find((s) => s.id === formData.soilType)
                      ?.description
                  }
                </Text>
              </View>
            )}

            {errors.soilType && (
              <Text className="text-red-500 text-sm mt-2">
                {errors.soilType}
              </Text>
            )}
          </View>
        );

      case 3: // Production Type
        return (
          <View className="px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Itinéraire technique
            </Text>
            <Text className="text-gray-600 mb-6">
              Quel type de production envisagez-vous ?
            </Text>

            <FormPicker
              label="Type de production"
              value={formData.productionType}
              onValueChange={(value) => updateFormData("productionType", value)}
              items={productionTypes.map((prod) => ({
                label: `${prod.name} (${prod.category})`,
                value: prod.id,
              }))}
              error={errors.productionType}
              required
              placeholder="Choisir un type de production"
            />

            {formData.productionType && (
              <View className="bg-yellow-50 p-4 rounded-lg">
                <Text className="text-yellow-900 font-semibold mb-1">
                  {getProductionTypeName(formData.productionType)}
                </Text>
                <Text className="text-yellow-800 text-sm">
                  Catégorie :{" "}
                  {
                    productionTypes.find(
                      (p) => p.id === formData.productionType,
                    )?.category
                  }
                </Text>
              </View>
            )}
          </View>
        );

      case 4: // Crop
        return (
          <View className="px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Culture spécifique
            </Text>
            <Text className="text-gray-600 mb-6">
              Quelle culture souhaitez-vous pratiquer ?
            </Text>

            <FormPicker
              label="Culture"
              value={formData.crop}
              onValueChange={(value) => updateFormData("crop", value)}
              items={crops.map((crop) => ({
                label: `${crop.name} - ${crop.category}${crop.season ? ` (${crop.season})` : ""}`,
                value: crop.id,
              }))}
              error={errors.crop}
              required
              placeholder="Choisir une culture"
            />

            {formData.crop && (
              <View className="bg-purple-50 p-4 rounded-lg">
                <Text className="text-purple-900 font-semibold mb-1">
                  {getCropName(formData.crop)}
                </Text>
                <Text className="text-purple-800 text-sm">
                  Catégorie :{" "}
                  {crops.find((c) => c.id === formData.crop)?.category}
                </Text>
                {crops.find((c) => c.id === formData.crop)?.season && (
                  <Text className="text-purple-800 text-sm">
                    Saison : {crops.find((c) => c.id === formData.crop)?.season}
                  </Text>
                )}
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  // Render results screen
  const renderResults = () => {
    return (
      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          <View className="items-center mb-6">
            <View className="bg-green-100 p-4 rounded-full mb-4">
              <Text className="text-5xl">✓</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
              Recommandations générées
            </Text>
            <Text className="text-gray-600 text-center">
              Voici vos recommandations personnalisées
            </Text>
          </View>

          {/* Summary Card */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Résumé de votre exploitation
            </Text>
            <View className="space-y-2">
              <View className="flex-row">
                <Text className="text-gray-600 flex-1">Localisation :</Text>
                <Text className="text-gray-800 font-medium flex-1">
                  {getRegionName(formData.region)},{" "}
                  {getDepartmentName(formData.department)}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-600 flex-1">Superficie :</Text>
                <Text className="text-gray-800 font-medium flex-1">
                  {formData.cultivatedArea}{" "}
                  {formData.areaUnit === "hectare" ? "ha" : "m²"}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-600 flex-1">Type de sol :</Text>
                <Text className="text-gray-800 font-medium flex-1">
                  {getSoilTypeName(formData.soilType)}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-600 flex-1">Production :</Text>
                <Text className="text-gray-800 font-medium flex-1">
                  {getProductionTypeName(formData.productionType)}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-600 flex-1">Culture :</Text>
                <Text className="text-gray-800 font-medium flex-1">
                  {getCropName(formData.crop)}
                </Text>
              </View>
            </View>
          </View>

          {/* Fertilization Recommendations */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <Text className="text-lg font-bold text-green-700 mb-3">
              🌱 Plan de fertilisation
            </Text>
            <Text className="text-gray-700 mb-4">
              Recommandations basées sur votre type de sol (
              {getSoilTypeName(formData.soilType)}) et votre culture (
              {getCropName(formData.crop)})
            </Text>
            <View className="bg-green-50 p-4 rounded-lg mb-3">
              <Text className="text-green-900 font-semibold mb-2">
                Fertilisation de fond
              </Text>
              <Text className="text-green-800 text-sm mb-1">
                • Fumure organique : 20-30 tonnes/ha de compost ou fumier bien
                décomposé
              </Text>
              <Text className="text-green-800 text-sm">
                • Application : 2-3 semaines avant le semis/plantation
              </Text>
            </View>
            <View className="bg-green-50 p-4 rounded-lg">
              <Text className="text-green-900 font-semibold mb-2">
                Fertilisation d&apos;entretien
              </Text>
              <Text className="text-green-800 text-sm mb-1">
                • NPK 15-15-15 : 200-300 kg/ha en fractionnement
              </Text>
              <Text className="text-green-800 text-sm">
                • Urée 46% : 100 kg/ha à appliquer pendant la croissance
              </Text>
            </View>
          </View>

          {/* Phytosanitary Recommendations */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <Text className="text-lg font-bold text-orange-700 mb-3">
              🛡️ Programme phytosanitaire
            </Text>
            <Text className="text-gray-700 mb-4">
              Traitements recommandés pour {getCropName(formData.crop)}
            </Text>
            <View className="bg-orange-50 p-4 rounded-lg mb-3">
              <Text className="text-orange-900 font-semibold mb-2">
                Traitement préventif
              </Text>
              <Text className="text-orange-800 text-sm mb-1">
                • Traitement de semence : Fongicide systémique
              </Text>
              <Text className="text-orange-800 text-sm">
                • Pulvérisation foliaire préventive : tous les 15 jours
              </Text>
            </View>
            <View className="bg-orange-50 p-4 rounded-lg">
              <Text className="text-orange-900 font-semibold mb-2">
                Traitement curatif
              </Text>
              <Text className="text-orange-800 text-sm mb-1">
                • Insecticide en cas d&apos;attaque : respecter les doses
                homologuées
              </Text>
              <Text className="text-orange-800 text-sm">
                • Fongicide curatif si nécessaire : suivre les recommandations
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <FormButton
            title="Nouvelle demande de conseil"
            variant="primary"
            onPress={handleReset}
            className="mb-3"
          />
          <FormButton
            title="Télécharger le rapport (Bientôt disponible)"
            variant="outline"
            onPress={() =>
              Alert.alert(
                "Information",
                "Cette fonctionnalité sera bientôt disponible",
              )
            }
            disabled
          />
        </View>
      </ScrollView>
    );
  };

  if (showResults) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        {renderResults()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="bg-green-600 px-6 py-8">
            <Text className="text-3xl font-bold text-white mb-2">
              Conseils Agricoles
            </Text>
            <Text className="text-green-100 text-base">
              Obtenez des recommandations personnalisées pour votre exploitation
            </Text>
          </View>

          {/* Step Indicator */}
          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepLabels={stepLabels}
          />

          {/* Step Content */}
          <View className="py-6">{renderStepContent()}</View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View className="bg-white border-t border-gray-200 px-6 py-4">
          <View className="flex-row space-x-3">
            {currentStep > 0 && (
              <FormButton
                title="Retour"
                variant="secondary"
                onPress={handleBack}
                className="flex-1 mr-3"
              />
            )}
            <FormButton
              title={
                currentStep === totalSteps - 1
                  ? "Obtenir les conseils"
                  : "Suivant"
              }
              variant="primary"
              onPress={handleNext}
              className={currentStep > 0 ? "flex-1" : "flex-1"}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
