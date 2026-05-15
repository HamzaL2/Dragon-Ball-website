// api.js - hier haal ik de data op van de Dragon Ball API

const API_URL = "https://dragonball-api.com/api/characters?limit=25";

// Engelse beschrijvingen per character naam
const beschrijvingen = {
  "Goku": "The main hero of the series. Originally sent to Earth as a baby Saiyan, he lost his memory and grew up to become the greatest warrior on Earth and the defender of the universe.",
  "Vegeta": "The proud prince of the Saiyan race. Once a villain working for Frieza, he later became one of the most powerful Z Fighters and rival of Goku.",
  "Piccolo": "A Namekian warrior and one of the strongest fighters on Earth. He became the mentor and father figure of Gohan after their intense training together.",
  "Bulma": "A genius scientist and founder of Capsule Corporation. She is the one who discovered the Dragon Balls and built many of the gadgets used by the Z Fighters.",
  "Freezer": "The tyrannical ruler of the universe who destroyed Planet Vegeta. He is one of the most powerful and feared villains in the Dragon Ball series.",
  "Frieza": "The tyrannical ruler of the universe who destroyed Planet Vegeta. He is one of the most powerful and feared villains in the Dragon Ball series.",
  "Zarbon": "One of Frieza's elite soldiers, known for his good looks that hide a terrifying transformation. He serves as one of Frieza's most trusted officers.",
  "Dodoria": "A ruthless and powerful member of Frieza's elite force. He is known for his brutal fighting style and loyalty to Frieza.",
  "Ginyu": "The leader of the feared Ginyu Force. He has a unique ability to swap bodies with his opponents, making him a very dangerous fighter.",
  "Cell": "A bio-android created by Dr. Gero using the DNA of the strongest fighters. He absorbs Androids 17 and 18 to reach his perfect form.",
  "Gohan": "The son of Goku, who possesses an incredible hidden power. He defeated Cell in his Super Saiyan 2 form and became one of the strongest fighters.",
  "Krillin": "Goku's best friend since childhood and the strongest human fighter on Earth. He played a key role in many battles despite not being a Saiyan.",
  "Tenshinhan": "A serious and disciplined martial artist with a third eye. He was once a rival of Goku but became one of the most loyal Z Fighters.",
  "Yamcha": "A former desert bandit who became one of the Z Fighters. He is known for his Wolf Fang Fist technique and his long relationship with Bulma.",
  "Chi-Chi": "The wife of Goku and mother of Gohan and Goten. She is a skilled martial artist herself and is known for pushing her sons to study hard.",
  "Trunks": "The son of Vegeta and Bulma. Future Trunks traveled back in time to warn the Z Fighters about the Androids and is one of the first characters to go Super Saiyan 2.",
  "Android 18": "A powerful android created by Dr. Gero. She later married Krillin and became a loving mother while still being one of the strongest fighters.",
  "Android 17": "The twin brother of Android 18, created by Dr. Gero. He later became a park ranger and played a major role in the Tournament of Power.",
  "Broly": "A legendary Saiyan with an immense power level. He is known as the Legendary Super Saiyan and his power grows continuously in battle.",
  "Beerus": "The God of Destruction of Universe 7. He is an extremely powerful deity who destroys planets when he is displeased or bored.",
  "Whis": "The angelic attendant and trainer of Beerus. He is one of the fastest beings in the universe and serves as a guide to the Gods of Destruction.",
  "Bardock": "The father of Goku and a low-class Saiyan warrior. He was one of the few Saiyans who fought back against Frieza before the destruction of Planet Vegeta.",
  "Raditz": "The older brother of Goku who came to Earth to recruit him. He was the first major villain in Dragon Ball Z and revealed Goku's Saiyan origins.",
  "Nappa": "A large and powerful elite Saiyan warrior who came to Earth with Vegeta. He killed several Z Fighters before being defeated by Goku.",
  "Majin Buu": "A magical being of pure destruction created by the wizard Bibidi. He exists in multiple forms ranging from innocent and childlike to pure evil.",
  "Master Roshi": "The legendary martial arts master who trained Goku and Krillin. Despite his old age, he remains a powerful fighter and is the creator of the Kamehameha.",
};


// Haalt alle characters op van de API
async function haalCharactersOp() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("API werkt niet: " + response.status);
  }

  const data = await response.json();
  console.log("API data ontvangen:", data);

  // Ik maak van elk item een nieuw object met alleen wat ik nodig heb
  const characters = data.items.map(function (item) {
    // Gebruik eigen Engelse beschrijving, anders een standaard tekst
    const engelsBeschrijving = beschrijvingen[item.name] ? beschrijvingen[item.name] : "No description available for this character.";

    return {
      id: item.id,
      naam: item.name,
      ras: item.race,
      geslacht: item.gender,
      ki: item.ki,
      maxKi: item.maxKi,
      affiliation: item.affiliation,
      beschrijving: engelsBeschrijving,
      foto: item.image,
    };
  });

  return characters;
}

export { haalCharactersOp };
