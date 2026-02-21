import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    category: "Compte",
    question: "Comment créer un compte ?",
    answer:
      "Pour créer un compte, appuyez sur « Créer un compte » sur la page de connexion. Renseignez vos informations personnelles, vos coordonnées et choisissez un mot de passe sécurisé. Vous devrez accepter les conditions d'utilisation pour finaliser l'inscription.",
  },
  {
    id: "2",
    category: "Compte",
    question: "Comment modifier mes informations personnelles ?",
    answer:
      "Rendez-vous dans Profil > Informations personnelles. Vous pouvez y modifier votre prénom, nom, email et numéro de téléphone. Appuyez sur « Enregistrer » pour valider les modifications.",
  },
  {
    id: "3",
    category: "Compte",
    question: "J'ai oublié mon mot de passe, que faire ?",
    answer:
      "Sur la page de connexion, appuyez sur « Mot de passe oublié ? ». Saisissez votre adresse email et vous recevrez un lien de réinitialisation. Vérifiez également vos spams si vous ne recevez pas l'email.",
  },
  {
    id: "4",
    category: "Emplois",
    question: "Comment postuler à une offre d'emploi ?",
    answer:
      "Dans l'onglet Emplois, parcourez les offres disponibles et appuyez sur celle qui vous intéresse. Sur la page de détail, appuyez sur « Postuler » et remplissez le formulaire de candidature avec vos informations et lettre de motivation.",
  },
  {
    id: "5",
    category: "Emplois",
    question: "Comment publier une offre d'emploi ?",
    answer:
      "Cette fonctionnalité est réservée aux comptes de type « Propriétaire de ferme / Recruteur ». Depuis l'onglet Emplois, appuyez sur le bouton « + » pour créer une nouvelle offre. Renseignez le titre, la description, le type de contrat et les exigences du poste.",
  },
  {
    id: "6",
    category: "Formations",
    question: "Comment m'inscrire à une formation ?",
    answer:
      "Dans l'onglet Formation, parcourez le catalogue de cours disponibles. Appuyez sur un cours pour voir son détail, puis sur « S'inscrire » pour commencer votre apprentissage. Vos progrès sont sauvegardés automatiquement.",
  },
  {
    id: "7",
    category: "Formations",
    question: "Puis-je suivre les formations hors connexion ?",
    answer:
      "Oui, certaines leçons peuvent être téléchargées pour un accès hors ligne. Sur la page d'une leçon, appuyez sur l'icône de téléchargement. Les contenus téléchargés sont accessibles depuis votre tableau de bord de formation.",
  },
  {
    id: "8",
    category: "Conseils",
    question: "Comment obtenir des conseils agricoles personnalisés ?",
    answer:
      "Dans l'onglet Conseils, renseignez les informations sur votre exploitation : région, type de sol, culture, superficie, etc. Le système génère ensuite des recommandations adaptées à votre situation.",
  },
  {
    id: "9",
    category: "Carte",
    question: "À quoi sert la carte de l'application ?",
    answer:
      "La carte vous permet de visualiser les offres d'emploi, les exploitations agricoles et les ressources disponibles près de chez vous. Vous pouvez filtrer les résultats par type et par zone géographique.",
  },
  {
    id: "10",
    category: "Technique",
    question: "L'application ne fonctionne pas correctement, que faire ?",
    answer:
      "Essayez d'abord de fermer et relancer l'application. Si le problème persiste, vérifiez votre connexion internet. Vous pouvez également vider le cache de l'application depuis les paramètres de votre téléphone. Si rien ne fonctionne, contactez notre support.",
  },
];

const CATEGORIES = Array.from(new Set(FAQ_ITEMS.map((f) => f.category)));

export default function HelpScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? FAQ_ITEMS.filter((f) => f.category === activeCategory)
    : FAQ_ITEMS;

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Header */}
      <View className="bg-primary px-6 pt-14 pb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center mb-4"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="white" />
          <Text className="text-white text-base ml-2">Retour</Text>
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Aide</Text>
        <Text className="text-white/70 text-sm mt-1">
          Questions fréquemment posées
        </Text>
      </View>

      <View className="px-6 py-6 gap-5">
        {/* Category filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-6 px-6"
          contentContainerStyle={{ gap: 8 }}
        >
          <TouchableOpacity
            onPress={() => setActiveCategory(null)}
            activeOpacity={0.7}
            className={`rounded-full px-4 py-2 border ${
              activeCategory === null
                ? "bg-primary border-primary"
                : "bg-white border-gray-200"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeCategory === null ? "text-white" : "text-foreground"
              }`}
            >
              Tout
            </Text>
          </TouchableOpacity>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() =>
                setActiveCategory((prev) => (prev === cat ? null : cat))
              }
              activeOpacity={0.7}
              className={`rounded-full px-4 py-2 border ${
                activeCategory === cat
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  activeCategory === cat ? "text-white" : "text-foreground"
                }`}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FAQ Accordion */}
        <View className="gap-3">
          {filtered.map((item) => {
            const isOpen = expandedId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggle(item.id)}
                activeOpacity={0.85}
                className={`bg-white rounded-2xl shadow-sm overflow-hidden border ${
                  isOpen ? "border-primary/30" : "border-transparent"
                }`}
              >
                <View className="flex-row items-center px-4 py-4">
                  <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mr-3">
                    <Ionicons
                      name="help-circle-outline"
                      size={18}
                      color="#10b981"
                    />
                  </View>
                  <Text className="flex-1 text-sm font-semibold text-foreground pr-2">
                    {item.question}
                  </Text>
                  <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#9ca3af"
                  />
                </View>
                {isOpen && (
                  <View className="px-4 pb-4 pt-0">
                    <View className="h-px bg-gray-100 mb-3" />
                    <Text className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Contact support */}
        <View className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
          <View className="flex-row items-center mb-2">
            <Ionicons name="chatbubbles-outline" size={20} color="#10b981" />
            <Text className="text-base font-semibold text-foreground ml-2">
              Toujours besoin d&apos;aide ?
            </Text>
          </View>
          <Text className="text-sm text-muted-foreground mb-4">
            Notre équipe est disponible pour répondre à vos questions.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-primary rounded-xl py-3 items-center"
          >
            <Text className="text-white font-semibold text-sm">
              Contacter le support
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
