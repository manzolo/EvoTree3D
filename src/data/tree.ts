import type { CladeNode } from './types';

/**
 * Simplified but phylogenetically grounded Tree of Life.
 * Ages (Mya) and topology follow modern consensus: a three-domain rooting with
 * eukaryotes emerging from within Archaea (Asgard) via endosymbiosis.
 * See README "Fonti / Sources" for references (NCBI Taxonomy, Tree of Life
 * Web Project, OneZoom, TimeTree).
 */
export const TREE: CladeNode = {
  id: 'luca',
  name: 'LUCA',
  nameEn: 'LUCA',
  domain: 'luca',
  ageMya: 3800,
  diversity: 1,
  description:
    "L'Ultimo Antenato Comune Universale: la popolazione cellulare da cui discendono tutti gli esseri viventi. Già dotata di codice genetico, ribosomi e metabolismo basato su ATP.",
  descriptionEn:
    'The Last Universal Common Ancestor: the cellular population from which all living things descend. It already had a genetic code, ribosomes and ATP-based metabolism.',
  characteristics: ['Codice genetico universale', 'Membrana cellulare', 'Metabolismo anaerobico'],
  characteristicsEn: ['Universal genetic code', 'Cell membrane', 'Anaerobic metabolism'],
  examples: ['—'],
  fossils: ['Tracce isotopiche del carbonio (~3.8 Ga, Groenlandia)'],
  children: [
    {
      id: 'bacteria',
      name: 'Bacteria',
      nameEn: 'Bacteria',
      domain: 'bacteria',
      ageMya: 3500,
      diversity: 100000,
      description:
        'Procarioti senza nucleo, il dominio più abbondante della biosfera. Colonizzano ogni ambiente, dai fondali oceanici al corpo umano.',
      descriptionEn:
        'Prokaryotes without a nucleus, the most abundant domain in the biosphere. They colonise every environment, from ocean floors to the human body.',
      characteristics: ['Parete con peptidoglicano', 'Riproduzione per scissione', 'Enorme diversità metabolica'],
      characteristicsEn: ['Peptidoglycan wall', 'Reproduction by fission', 'Huge metabolic diversity'],
      examples: ['Escherichia coli', 'Streptococcus', 'Clostridium'],
      fossils: ['Stromatoliti (~3.5 Ga)'],
      children: [
        {
          id: 'cyanobacteria',
          name: 'Cyanobacteria',
          nameEn: 'Cyanobacteria',
          domain: 'bacteria',
          ageMya: 3000,
          diversity: 6000,
          description:
            'Batteri capaci di fotosintesi ossigenica: hanno trasformato l’atmosfera terrestre liberando ossigeno (Grande Ossidazione).',
          descriptionEn:
            'Bacteria capable of oxygenic photosynthesis: they transformed Earth’s atmosphere by releasing oxygen (the Great Oxidation).',
          characteristics: ['Fotosintesi ossigenica', 'Pigmenti: clorofilla a, ficobiline'],
          characteristicsEn: ['Oxygenic photosynthesis', 'Pigments: chlorophyll a, phycobilins'],
          examples: ['Anabaena', 'Nostoc', 'Prochlorococcus'],
          fossils: ['Stromatoliti microbiche'],
        },
        {
          id: 'proteobacteria',
          name: 'Proteobacteria',
          nameEn: 'Proteobacteria',
          domain: 'bacteria',
          ageMya: 2500,
          diversity: 40000,
          description:
            'Vasto gruppo metabolicamente versatile. Da un alfa-proteobatterio simbionte derivano i mitocondri delle cellule eucariotiche.',
          descriptionEn:
            'A vast, metabolically versatile group. The mitochondria of eukaryotic cells derive from a symbiotic alpha-proteobacterium.',
          characteristics: ['Gram-negativi', 'Antenati dei mitocondri'],
          characteristicsEn: ['Gram-negative', 'Ancestors of mitochondria'],
          examples: ['Rhizobium', 'Salmonella', 'Helicobacter'],
          fossils: ['—'],
        },
      ],
    },
    {
      id: 'archaea',
      name: 'Archaea',
      nameEn: 'Archaea',
      domain: 'archaea',
      ageMya: 3500,
      diversity: 10000,
      description:
        'Procarioti distinti per biochimica della membrana e genetica. Comprendono estremofili e gli antenati degli eucarioti (Asgard).',
      descriptionEn:
        'Prokaryotes distinguished by membrane biochemistry and genetics. They include extremophiles and the ancestors of eukaryotes (Asgard).',
      characteristics: ['Lipidi di membrana eterici', 'Spesso estremofili', 'Geni simili agli eucarioti'],
      characteristicsEn: ['Ether-linked membrane lipids', 'Often extremophiles', 'Eukaryote-like genes'],
      examples: ['Methanococcus', 'Halobacterium', 'Sulfolobus'],
      fossils: ['Biomarcatori lipidici'],
      children: [
        {
          id: 'euryarchaeota',
          name: 'Euryarchaeota',
          nameEn: 'Euryarchaeota',
          domain: 'archaea',
          ageMya: 3200,
          diversity: 1000,
          description: 'Include i metanogeni, che producono metano, e gli alofili amanti del sale.',
          descriptionEn: 'Includes the methanogens, which produce methane, and salt-loving halophiles.',
          characteristics: ['Metanogenesi', 'Alotolleranza'],
          characteristicsEn: ['Methanogenesis', 'Halotolerance'],
          examples: ['Methanosarcina', 'Halobacterium'],
          fossils: ['—'],
        },
        {
          id: 'asgard',
          name: 'Asgardarchaeota',
          nameEn: 'Asgardarchaeota',
          domain: 'archaea',
          ageMya: 2300,
          diversity: 100,
          description:
            'Archei con un citoscheletro rudimentale e geni eucariotici: il gruppo da cui è emersa la cellula eucariotica.',
          descriptionEn:
            'Archaea with a rudimentary cytoskeleton and eukaryotic genes: the group from which the eukaryotic cell emerged.',
          characteristics: ['Proteine del citoscheletro (actine)', 'Sorella degli eucarioti'],
          characteristicsEn: ['Cytoskeletal proteins (actins)', 'Sister group of eukaryotes'],
          examples: ['Lokiarchaeota', 'Heimdallarchaeota'],
          fossils: ['—'],
        },
      ],
    },
    {
      id: 'eukarya',
      name: 'Eukarya',
      nameEn: 'Eukarya',
      domain: 'eukarya',
      ageMya: 2100,
      diversity: 2000000,
      description:
        'Cellule con nucleo e organelli. Nascono dalla fusione endosimbiotica di un archeo Asgard con un proteobatterio (mitocondrio).',
      descriptionEn:
        'Cells with a nucleus and organelles. They arose from the endosymbiotic fusion of an Asgard archaeon with a proteobacterium (mitochondrion).',
      characteristics: ['Nucleo e endomembrane', 'Mitocondri', 'Citoscheletro complesso'],
      characteristicsEn: ['Nucleus and endomembranes', 'Mitochondria', 'Complex cytoskeleton'],
      examples: ['Amebe', 'Diatomee', 'Lieviti'],
      fossils: ['Grypania (~1.8 Ga)', 'Acritarchi'],
      children: [
        {
          id: 'protists',
          name: 'Protisti (SAR & altri)',
          nameEn: 'Protists (SAR & others)',
          domain: 'eukarya',
          ageMya: 1700,
          diversity: 200000,
          description:
            'Eucarioti per lo più unicellulari, parafiletici: comprendono diatomee, alghe brune, ciliati e amebe.',
          descriptionEn:
            'Mostly unicellular, paraphyletic eukaryotes: they include diatoms, brown algae, ciliates and amoebae.',
          characteristics: ['Grande diversità cellulare', 'Spesso fotosintetici'],
          characteristicsEn: ['Great cellular diversity', 'Often photosynthetic'],
          examples: ['Paramecium', 'Diatomee', 'Plasmodium'],
          fossils: ['Acritarchi del Proterozoico'],
        },
        {
          id: 'plantae',
          name: 'Plantae',
          nameEn: 'Plantae',
          domain: 'eukarya',
          ageMya: 1600,
          diversity: 400000,
          description:
            'Archaeplastida: organismi fotosintetici con plastidi derivati da un cianobatterio endosimbionte.',
          descriptionEn:
            'Archaeplastida: photosynthetic organisms with plastids derived from an endosymbiotic cyanobacterium.',
          characteristics: ['Cloroplasti', 'Parete di cellulosa'],
          characteristicsEn: ['Chloroplasts', 'Cellulose wall'],
          examples: ['Alghe verdi', 'Muschi', 'Angiosperme'],
          fossils: ['Spore del Cambriano', 'Cooksonia (~430 Ma)'],
          children: [
            {
              id: 'embryophyta',
              name: 'Piante terrestri',
              nameEn: 'Land plants',
              domain: 'eukarya',
              ageMya: 470,
              diversity: 320000,
              description:
                'Embryophyta: colonizzano la terraferma con tessuti vascolari, semi e fiori che rivoluzionano gli ecosistemi.',
              descriptionEn:
                'Embryophytes: they colonised land with vascular tissue, seeds and flowers that revolutionised ecosystems.',
              characteristics: ['Cuticola e stomi', 'Tessuti vascolari', 'Semi e fiori (angiosperme)'],
              characteristicsEn: ['Cuticle and stomata', 'Vascular tissue', 'Seeds and flowers (angiosperms)'],
              examples: ['Felci', 'Conifere', 'Querce', 'Orchidee'],
              fossils: ['Cooksonia', 'Archaeopteris (~380 Ma)'],
            },
          ],
        },
        {
          id: 'fungi',
          name: 'Fungi',
          nameEn: 'Fungi',
          domain: 'eukarya',
          ageMya: 1050,
          diversity: 150000,
          description:
            'Eterotrofi che digeriscono per assorbimento, con parete di chitina. Parenti stretti degli animali (Opisthokonta).',
          descriptionEn:
            'Heterotrophs that digest by absorption, with a chitin wall. Close relatives of animals (Opisthokonta).',
          characteristics: ['Parete di chitina', 'Nutrizione per assorbimento', 'Ife e micelio'],
          characteristicsEn: ['Chitin wall', 'Absorptive nutrition', 'Hyphae and mycelium'],
          examples: ['Lieviti', 'Funghi a cappello', 'Muffe', 'Licheni (simbiosi)'],
          fossils: ['Tortotubus (~440 Ma)'],
        },
        {
          id: 'metazoa',
          name: 'Animalia (Metazoa)',
          nameEn: 'Animalia (Metazoa)',
          domain: 'eukarya',
          ageMya: 750,
          diversity: 1500000,
          description:
            'Eucarioti pluricellulari eterotrofi, mobili, con cellule differenziate e tessuti veri (eccetto le spugne).',
          descriptionEn:
            'Multicellular, heterotrophic, mobile eukaryotes with differentiated cells and true tissues (except sponges).',
          characteristics: ['Pluricellularità', 'Collagene', 'Sistema nervoso (Eumetazoa)'],
          characteristicsEn: ['Multicellularity', 'Collagen', 'Nervous system (Eumetazoa)'],
          examples: ['Spugne', 'Meduse', 'Insetti', 'Vertebrati'],
          fossils: ['Fauna di Ediacara (~575 Ma)', 'Esplosione cambriana'],
          children: [
            {
              id: 'arthropoda',
              name: 'Arthropoda',
              nameEn: 'Arthropoda',
              domain: 'eukarya',
              ageMya: 540,
              diversity: 1200000,
              description:
                'Il phylum animale più ricco: esoscheletro chitinoso, corpo segmentato e appendici articolate.',
              descriptionEn:
                'The richest animal phylum: chitinous exoskeleton, segmented body and jointed appendages.',
              characteristics: ['Esoscheletro', 'Appendici articolate', 'Muta (ecdisi)'],
              characteristicsEn: ['Exoskeleton', 'Jointed appendages', 'Moulting (ecdysis)'],
              examples: ['Insetti', 'Ragni', 'Crostacei', 'Trilobiti †'],
              fossils: ['Trilobiti', 'Anomalocaris'],
            },
            {
              id: 'chordata',
              name: 'Chordata',
              nameEn: 'Chordata',
              domain: 'eukarya',
              ageMya: 525,
              diversity: 70000,
              description:
                'Deuterostomi con notocorda, tubo neurale dorsale e fessure faringee almeno in fase embrionale.',
              descriptionEn:
                'Deuterostomes with a notochord, dorsal nerve tube and pharyngeal slits at least in the embryo.',
              characteristics: ['Notocorda', 'Tubo neurale dorsale', 'Fessure faringee'],
              characteristicsEn: ['Notochord', 'Dorsal nerve tube', 'Pharyngeal slits'],
              examples: ['Pesci', 'Anfibi', 'Rettili', 'Mammiferi'],
              fossils: ['Pikaia', 'Myllokunmingia (~520 Ma)'],
              children: [
                {
                  id: 'tetrapoda',
                  name: 'Tetrapoda',
                  nameEn: 'Tetrapoda',
                  domain: 'eukarya',
                  ageMya: 370,
                  diversity: 35000,
                  description:
                    'Vertebrati con quattro arti che conquistano la terraferma a partire da pesci sarcopterigi.',
                  descriptionEn:
                    'Four-limbed vertebrates that conquered land, evolving from lobe-finned fish.',
                  characteristics: ['Quattro arti', 'Polmoni', 'Uovo amniotico (amnioti)'],
                  characteristicsEn: ['Four limbs', 'Lungs', 'Amniotic egg (amniotes)'],
                  examples: ['Anfibi', 'Rettili', 'Uccelli', 'Mammiferi'],
                  fossils: ['Tiktaalik (~375 Ma)', 'Ichthyostega'],
                  children: [
                    {
                      id: 'sauropsida',
                      name: 'Sauropsida',
                      nameEn: 'Sauropsida',
                      domain: 'eukarya',
                      ageMya: 320,
                      diversity: 22000,
                      description:
                        'Rettili e uccelli: amnioti con pelle squamosa o piume. Include i dinosauri, di cui gli uccelli sono discendenti viventi.',
                      descriptionEn:
                        'Reptiles and birds: amniotes with scaly skin or feathers. Includes dinosaurs, of which birds are the living descendants.',
                      characteristics: ['Uova con guscio', 'Squame o piume'],
                      characteristicsEn: ['Shelled eggs', 'Scales or feathers'],
                      examples: ['Coccodrilli', 'Lucertole', 'Uccelli', 'Dinosauri †'],
                      fossils: ['Archaeopteryx (~150 Ma)', 'Tyrannosaurus'],
                    },
                    {
                      id: 'mammalia',
                      name: 'Mammalia',
                      nameEn: 'Mammalia',
                      domain: 'eukarya',
                      ageMya: 220,
                      diversity: 6400,
                      description:
                        'Amnioti a sangue caldo con peli, ghiandole mammarie e cure parentali; si diversificano dopo l’estinzione dei dinosauri.',
                      descriptionEn:
                        'Warm-blooded amniotes with hair, mammary glands and parental care; they diversified after the dinosaur extinction.',
                      characteristics: ['Ghiandole mammarie', 'Peli', 'Neocorteccia'],
                      characteristicsEn: ['Mammary glands', 'Hair', 'Neocortex'],
                      examples: ['Balene', 'Pipistrelli', 'Roditori', 'Primati'],
                      fossils: ['Morganucodon', 'Megazostrodon'],
                      children: [
                        {
                          id: 'primates',
                          name: 'Primates',
                          nameEn: 'Primates',
                          domain: 'eukarya',
                          ageMya: 65,
                          diversity: 500,
                          description:
                            'Mammiferi con mani prensili, visione stereoscopica e cervello voluminoso.',
                          descriptionEn:
                            'Mammals with grasping hands, stereoscopic vision and a large brain.',
                          characteristics: ['Pollice opponibile', 'Visione binoculare', 'Encefalizzazione'],
                          characteristicsEn: ['Opposable thumb', 'Binocular vision', 'Encephalisation'],
                          examples: ['Lemuri', 'Scimmie', 'Grandi scimmie'],
                          fossils: ['Plesiadapis', 'Proconsul'],
                          children: [
                            {
                              id: 'homo',
                              name: 'Homo sapiens',
                              nameEn: 'Homo sapiens',
                              domain: 'eukarya',
                              ageMya: 0.3,
                              diversity: 1,
                              description:
                                'La nostra specie: linguaggio simbolico, cultura cumulativa e capacità di trasformare il pianeta.',
                              descriptionEn:
                                'Our species: symbolic language, cumulative culture and the ability to reshape the planet.',
                              characteristics: ['Bipedismo', 'Linguaggio', 'Cultura e tecnologia'],
                              characteristicsEn: ['Bipedalism', 'Language', 'Culture and technology'],
                              examples: ['Homo sapiens'],
                              fossils: ['Omo Kibish (~233 ka)', 'Jebel Irhoud (~315 ka)'],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
