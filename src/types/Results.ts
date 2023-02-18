type Phonetic = {
  audio: string;
  sourceUrl: string;
  license: string;
  text: string;
};

type Definition = {
  definition: string;
};

type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
};

type Results = [
  {
    word: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    sourceUrls: string[];
  }
];

export default Results;
