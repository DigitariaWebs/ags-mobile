import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "@/contexts/UserContext";
import { useJobs } from "@/contexts/JobsContext";
import { mockJobs } from "@/data/mockJobs";

export default function JobsScreen() {
  const router = useRouter();
  const { userType, toggleUserType } = useUser();
  const { myJobs, deleteJob, duplicateJob } = useJobs();

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedContractType, setSelectedContractType] =
    useState<string>("all");

  const isJobSeeker = userType === "job_seeker";

  // Filter jobs based on search and filters
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesContract =
      selectedContractType === "all" ||
      job.contractType === selectedContractType;

    return matchesSearch && matchesContract;
  });

  // Navigation handlers
  const handleOpenJobDetails = (jobId: string) => {
    router.push({ pathname: "/(tabs)/jobs/[id]", params: { id: jobId } });
  };

  const handleOpenJobForm = () => {
    router.push("/(tabs)/jobs/post");
  };

  const handleEditJob = (jobId: string) => {
    router.push({ pathname: "/(tabs)/jobs/post", params: { id: jobId } });
  };

  const handleViewApplications = (jobId: string) => {
    router.push({
      pathname: "/(tabs)/jobs/applications",
      params: { id: jobId },
    });
  };

  const handleDuplicateJob = (jobId: string) => {
    duplicateJob(jobId);
  };

  const handleDeleteJob = (jobId: string) => {
    deleteJob(jobId);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary px-4 py-4">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-white text-2xl font-bold">
              Emplois Agricoles
            </Text>
            <Text className="text-white/80 text-sm mt-1">
              {isJobSeeker ? "Trouvez votre opportunité" : "Gérez vos offres"}
            </Text>
          </View>

          {/* User Type Toggle Button */}
          <TouchableOpacity
            onPress={toggleUserType}
            className="bg-white/20 rounded-full px-4 py-2 flex-row items-center"
          >
            <Ionicons
              name={isJobSeeker ? "briefcase-outline" : "people-outline"}
              size={18}
              color="white"
            />
            <Text className="text-white text-xs ml-2 font-medium">
              {isJobSeeker ? "Recruteur" : "Candidat"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar (Job Seeker View) */}
        {isJobSeeker && (
          <View>
            <View className="bg-white rounded-xl flex-row items-center px-4 py-3 mb-3">
              <Ionicons name="search" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-800"
                placeholder="Rechercher un emploi..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Filter Toggle */}
            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              className="bg-white/20 rounded-xl px-4 py-2 flex-row items-center justify-center"
            >
              <Ionicons name="options-outline" size={18} color="white" />
              <Text className="text-white text-sm ml-2 font-medium">
                Filtres
              </Text>
            </TouchableOpacity>

            {/* Filter Options */}
            {showFilters && (
              <View className="bg-white rounded-xl p-4 mt-3">
                <Text className="text-sm font-semibold text-gray-800 mb-3">
                  Type de contrat
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  <TouchableOpacity
                    onPress={() => setSelectedContractType("all")}
                    className={`px-4 py-2 rounded-full ${selectedContractType === "all" ? "bg-primary" : "bg-gray-100"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${selectedContractType === "all" ? "text-white" : "text-gray-700"}`}
                    >
                      Tous
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedContractType("CDI")}
                    className={`px-4 py-2 rounded-full ${selectedContractType === "CDI" ? "bg-primary" : "bg-gray-100"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${selectedContractType === "CDI" ? "text-white" : "text-gray-700"}`}
                    >
                      CDI
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedContractType("CDD")}
                    className={`px-4 py-2 rounded-full ${selectedContractType === "CDD" ? "bg-primary" : "bg-gray-100"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${selectedContractType === "CDD" ? "text-white" : "text-gray-700"}`}
                    >
                      CDD
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedContractType("Saisonnier")}
                    className={`px-4 py-2 rounded-full ${selectedContractType === "Saisonnier" ? "bg-primary" : "bg-gray-100"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${selectedContractType === "Saisonnier" ? "text-white" : "text-gray-700"}`}
                    >
                      Saisonnier
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelectedContractType("Stage")}
                    className={`px-4 py-2 rounded-full ${selectedContractType === "Stage" ? "bg-primary" : "bg-gray-100"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${selectedContractType === "Stage" ? "text-white" : "text-gray-700"}`}
                    >
                      Stage
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Job Seeker View */}
      {isJobSeeker && (
        <ScrollView className="flex-1 px-4 py-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            {filteredJobs.length} offres disponibles
          </Text>

          {filteredJobs.map((job) => (
            <TouchableOpacity
              key={job.id}
              onPress={() => handleOpenJobDetails(job.id)}
              className="bg-white rounded-xl p-4 mb-3 border border-gray-200"
            >
              <Text className="text-lg font-bold text-gray-800 mb-1">
                {job.title}
              </Text>
              <Text className="text-sm text-gray-600 mb-3">{job.farmName}</Text>

              <View className="flex-row flex-wrap gap-2 mb-3">
                <View
                  className={`px-3 py-1 rounded-full ${
                    job.contractType === "CDI"
                      ? "bg-green-100"
                      : job.contractType === "CDD"
                        ? "bg-blue-100"
                        : job.contractType === "Saisonnier"
                          ? "bg-orange-100"
                          : "bg-purple-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      job.contractType === "CDI"
                        ? "text-green-700"
                        : job.contractType === "CDD"
                          ? "text-blue-700"
                          : job.contractType === "Saisonnier"
                            ? "text-orange-700"
                            : "text-purple-700"
                    }`}
                  >
                    {job.contractType}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mb-2">
                <Ionicons name="location-outline" size={16} color="#10b981" />
                <Text className="text-sm text-gray-600 ml-1">
                  {job.location}
                </Text>
              </View>

              <View className="flex-row items-center mb-3">
                <Ionicons name="cash-outline" size={16} color="#10b981" />
                <Text className="text-sm text-gray-600 ml-1">
                  {job.salaryRange}
                </Text>
              </View>

              <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                <View className="flex-row items-center">
                  <Ionicons name="people-outline" size={16} color="#6b7280" />
                  <Text className="text-xs text-gray-500 ml-1">
                    {job.applicantsCount} candidatures
                  </Text>
                </View>
                <View className="bg-primary px-4 py-2 rounded-lg">
                  <Text className="text-white text-sm font-medium">
                    Voir détails
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Recruiter View */}
      {!isJobSeeker && (
        <ScrollView className="flex-1 px-4 py-4">
          {/* Stats Cards */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-white rounded-xl p-4 border border-gray-200">
              <View className="flex-row items-center justify-between mb-2">
                <Ionicons name="briefcase" size={24} color="#10b981" />
                <Text className="text-2xl font-bold text-gray-800">
                  {myJobs.length}
                </Text>
              </View>
              <Text className="text-sm text-gray-600">Offres actives</Text>
            </View>

            <View className="flex-1 bg-white rounded-xl p-4 border border-gray-200">
              <View className="flex-row items-center justify-between mb-2">
                <Ionicons name="people" size={24} color="#3b82f6" />
                <Text className="text-2xl font-bold text-gray-800">
                  {myJobs.reduce((sum, job) => sum + job.applicantsCount, 0)}
                </Text>
              </View>
              <Text className="text-sm text-gray-600">Candidatures</Text>
            </View>
          </View>

          {/* Post Job Button */}
          <TouchableOpacity
            onPress={handleOpenJobForm}
            className="bg-primary rounded-xl py-4 mb-4 flex-row items-center justify-center"
          >
            <Ionicons name="add-circle" size={24} color="white" />
            <Text className="text-white text-lg font-bold ml-2">
              Publier une offre
            </Text>
          </TouchableOpacity>

          {/* My Jobs List */}
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Mes offres publiées
          </Text>

          {myJobs.length > 0 ? (
            myJobs.map((job) => (
              <View
                key={job.id}
                className="bg-white rounded-xl p-4 mb-3 border border-gray-200"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-800 mb-1">
                      {job.title}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      {job.farmName}
                    </Text>
                  </View>
                </View>

                <View className="flex-row flex-wrap gap-2 mb-3">
                  <View
                    className={`px-3 py-1 rounded-full ${
                      job.contractType === "CDI"
                        ? "bg-green-100"
                        : job.contractType === "CDD"
                          ? "bg-blue-100"
                          : job.contractType === "Saisonnier"
                            ? "bg-orange-100"
                            : "bg-purple-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        job.contractType === "CDI"
                          ? "text-green-700"
                          : job.contractType === "CDD"
                            ? "text-blue-700"
                            : job.contractType === "Saisonnier"
                              ? "text-orange-700"
                              : "text-purple-700"
                      }`}
                    >
                      {job.contractType}
                    </Text>
                  </View>
                  <View className="bg-blue-100 px-3 py-1 rounded-full flex-row items-center">
                    <Ionicons name="location" size={12} color="#1e40af" />
                    <Text className="text-blue-700 text-xs font-medium ml-1">
                      {job.location}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center mb-3">
                  <Ionicons name="cash-outline" size={16} color="#6b7280" />
                  <Text className="text-sm text-gray-600 ml-1">
                    {job.salaryRange}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                  <View className="flex-row items-center">
                    <Ionicons name="people-outline" size={16} color="#6b7280" />
                    <Text className="text-xs text-gray-500 ml-1">
                      {job.applicantsCount} candidatures
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                      color="#6b7280"
                    />
                    <Text className="text-xs text-gray-500 ml-1">
                      {new Date(job.postedDate).toLocaleDateString("fr-FR")}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-2 mt-3">
                  <TouchableOpacity
                    onPress={() => handleViewApplications(job.id)}
                    className="flex-1 bg-primary rounded-lg py-2.5 flex-row items-center justify-center"
                  >
                    <Ionicons name="eye-outline" size={18} color="white" />
                    <Text className="text-white text-sm font-medium ml-2">
                      Candidatures
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleEditJob(job.id)}
                    className="bg-blue-500 rounded-lg px-4 py-2.5 flex-row items-center justify-center"
                  >
                    <Ionicons name="create-outline" size={18} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDuplicateJob(job.id)}
                    className="bg-purple-500 rounded-lg px-4 py-2.5 flex-row items-center justify-center"
                  >
                    <Ionicons name="copy-outline" size={18} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteJob(job.id)}
                    className="bg-red-500 rounded-lg px-4 py-2.5 flex-row items-center justify-center"
                  >
                    <Ionicons name="trash-outline" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className="bg-white rounded-xl p-8 items-center">
              <Ionicons name="briefcase-outline" size={48} color="#d1d5db" />
              <Text className="text-gray-500 text-center mt-4">
                Aucune offre publiée
              </Text>
              <Text className="text-gray-400 text-center text-sm mt-2">
                Commencez par publier votre première offre
              </Text>
            </View>
          )}

          <View className="h-4" />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
