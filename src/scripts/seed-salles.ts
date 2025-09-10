import dotenv from "dotenv";
import { faker } from "@faker-js/faker/locale/fr";
import { supabase } from "../config/supabase";

dotenv.config();

// Fonction pour nettoyer les tables
const cleanTables = async (): Promise<void> => {
  await supabase.from("voie").delete().neq("id", 0);
  await supabase.from("voies").delete().neq("id", 0);
  await supabase.from("seances").delete().neq("id", 0);
  await supabase.from("salles").delete().neq("id", 0);
  await supabase.from("localisation").delete().neq("id", 0);
  console.log("✅ Tables nettoyées avec succès");
};

const frenchClimbingGyms = [
  { name: "Climb Up - Brest", latitude: 48.3899, longitude: -4.4861 },
  { name: "Block Out - Nantes", latitude: 47.2184, longitude: -1.5536 },
  { name: "Vertical'Art - Rungis", latitude: 48.7418, longitude: 2.3502 },
  { name: "Climb Up - Bordeaux Mérignac", latitude: 44.8378, longitude: -0.5792 },
  { name: "Block Out - Lille", latitude: 50.6292, longitude: 3.0573 },
  { name: "B'UP - Clermont-Ferrand", latitude: 45.7772, longitude: 3.0870 },
  { name: "Arkose - Massy", latitude: 48.7264, longitude: 2.2918 },
  { name: "Blocbuster - Courbevoie", latitude: 48.8960, longitude: 2.2562 },
  { name: "Kern'Up - Rouen", latitude: 49.4432, longitude: 1.0993 },
  { name: "Espace Vertical 3 - Grenoble", latitude: 45.1885, longitude: 5.7245 },
  { name: "La Zipette - Voglans", latitude: 45.6490, longitude: 5.9160 },
  { name: "Arkose - Bordeaux", latitude: 44.8378, longitude: -0.5792 },
  { name: "Hardbloc - Alfortville", latitude: 48.8150, longitude: 2.4199 },
  { name: "Climb Up - Lille Lesquin", latitude: 50.5840, longitude: 3.0980 },
  { name: "Climb Up - Lyon Confluence", latitude: 45.7380, longitude: 4.8147 },
  { name: "Arkose - Toulouse", latitude: 43.6047, longitude: 1.4442 },
  { name: "Modjo-Escalade - Rennes", latitude: 48.1173, longitude: -1.6778 },
  { name: "M'Roc Laennec - Lyon", latitude: 45.7440, longitude: 4.8430 },
  { name: "The Roof - Poitiers", latitude: 46.5802, longitude: 0.3404 },
  { name: "Duo des Cimes - Gap", latitude: 44.5594, longitude: 6.0793 },
];

// Fonction pour générer une salle d'escalade aléatoire
const generateSalle = (adminId: number, localisationId: number, salleName: string) => {
  const descriptions = [
    "Salle d'escalade avec des voies de toutes difficultés",
    "Salle d'escalade avec des voies de difficulté moyenne",
    "Salle d'escalade avec des voies de difficulté facile",
    "Salle d'escalade avec des voies de difficulté difficile",
    "Salle d'escalade avec des voies de difficulté très difficile",
  ];
  const telephone = `06 ${faker.string.numeric(2)} ${faker.string.numeric(2)} ${faker.string.numeric(2)} ${faker.string.numeric(2)}`;
  const description = faker.helpers.arrayElement(descriptions);
  return {
    admin_id: adminId,
    localisation: localisationId,
    description,
    email: faker.internet.email({ firstName: salleName }),
    telephone,
    nom: salleName
  };
};

// Fonction pour insérer les salles
const insertSalles = async (): Promise<void> => {
  try {
    // Nettoyer les tables avant d'insérer
    await cleanTables();

    console.log("🌱 Début de l'insertion des salles...");

    // Récupérer les IDs des utilisateurs existants
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id")
      .limit(10);

    if (usersError || !users) {
      throw usersError || new Error("Impossible de récupérer les utilisateurs");
    }

    const userIds = users.map(user => user.id);

    // Générer une salle pour chaque gym de la liste
    const salles = [];
    for (const cityObj of frenchClimbingGyms) {
      const salleName = cityObj.name;
      const location = {
        latitude: cityObj.latitude,
        longitude: cityObj.longitude
      };
      const { data: locationData, error: locationError } = await supabase
        .from("localisation")
        .insert([location])
        .select("id")
        .single();

      if (locationError || !locationData) {
        throw locationError || new Error("Erreur lors de la création de la localisation");
      }

      // Créer une salle
      const salle = generateSalle(
        faker.helpers.arrayElement(userIds),
        locationData.id,
        salleName
      );

      const { data: salleData, error: salleError } = await supabase
        .from("salles")
        .insert([salle])
        .select("id, nom")
        .single();

      if (salleError || !salleData) {
        throw salleError || new Error("Erreur lors de la création de la salle");
      }

      salles.push(salleData);
      console.log(`✅ Salle ${salleData.nom} créée avec succès`);
    }

    console.log(`✅ ${salles.length} salles ont été créées avec succès`);

  } catch (err) {
    console.error("❌ Erreur lors de l'insertion des salles:", err);
  }
};

// Exécuter le script
insertSalles(); 