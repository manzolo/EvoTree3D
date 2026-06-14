# 🌳 EvoTree 3D — L'albero della vita

### 🔴 [Live demo → manzolo.github.io/EvoTree3D](https://manzolo.github.io/EvoTree3D/)

> **Progetto nato da un'idea di Giada Magni, biologa del CNR-IFAC.**
> *A project born from an idea by Giada Magni, biologist at CNR-IFAC.*

Un albero filogenetico **3D interattivo e immersivo** dell'evoluzione della vita sulla
Terra, dal **LUCA** (Last Universal Common Ancestor, ~3,8 miliardi di anni fa) fino alle
specie attuali. Esplora 3,8 miliardi di anni di evoluzione: ruota, zooma e vola tra i
rami, scorri la timeline e scopri eventi chiave come la Grande Ossidazione, l'esplosione
cambriana e le estinzioni di massa.

Costruito con **React + Three.js (@react-three/fiber + drei)**, TypeScript e Vite.

---

## ✨ Funzionalità

- **Albero 3D organico** con LUCA alla base e i tre domini (Bacteria, Archaea, Eukarya).
- **Navigazione libera**: orbita, pan e zoom (OrbitControls).
- **Timeline evolutiva** dal Precambriano a oggi, con crescita animata dei rami e
  marcatori degli eventi chiave.
- **Interattività**: hover con etichette, click per il pannello informativo dettagliato
  (descrizione, caratteristiche, esempi di specie, fossili, relazioni).
- **Ricerca** per gruppo o specie con centratura automatica della camera.
- **Overlay educativi**: eventi chiave (estinzioni, endosimbiosi, fotosintesi…) e
  indicatori di diversità (spessore dei rami).
- **Modalità ramo**: selezionando un clade, la sua linea evolutiva viene evidenziata e il
  resto attenuato.
- **Bilingue** Italiano / English e **dark mode** elegante con sfondo cosmico.

---

## 🚀 Avvio rapido

### Con Docker + Make (consigliato)

```bash
make up        # avvia il dev server con HMR su http://localhost:5173
make down      # ferma e rimuove i container
make build     # builda l'immagine Docker di sviluppo
make prod      # build di produzione servita da nginx su http://localhost:8080
make help      # elenco di tutti i comandi
```

### Senza Docker (Node 20+)

```bash
make install   # oppure: npm install
make dev       # oppure: npm run dev
```

---

## 🌐 Deploy su GitHub Pages

Il deploy è automatico tramite **GitHub Actions** (Node 24) a ogni push su `main`.

1. Crea un repository su GitHub e fai push del codice.
2. In **Settings → Pages**, imposta **Source = GitHub Actions**.
3. Il workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builda con
   `VITE_BASE=/<nome-repo>/` e pubblica la cartella `dist`.

Il sito sarà disponibile su `https://<utente>.github.io/<nome-repo>/`.

> Per un dominio utente/organizzazione (`<utente>.github.io`) imposta `VITE_BASE=/`.

---

## 🧬 Fonti scientifiche / Scientific sources

Dati a scopo didattico, semplificati dalla filogenetica moderna; topologia e datazioni
sono approssimazioni di consenso.

- [NCBI Taxonomy](https://www.ncbi.nlm.nih.gov/taxonomy)
- [Tree of Life Web Project](http://tolweb.org/tree/)
- [OneZoom Tree of Life Explorer](https://www.onezoom.org/)
- [TimeTree of Life](http://www.timetree.org/)
- [Open Tree of Life](https://tree.opentreeoflife.org/)
- Hug et al. 2016, *A new view of the tree of life*, **Nature Microbiology** — <https://doi.org/10.1038/nmicrobiol.2016.48>
- Spang et al. 2015, *Asgard archaea*, **Nature** — <https://doi.org/10.1038/nature14447>

---

## 🙏 Crediti

- **Ideazione e consulenza scientifica**: **Giada Magni**, biologa presso il **CNR-IFAC**
  (Istituto di Fisica Applicata «Nello Carrara» — CNR).
- Sviluppo: realizzato con React, Three.js e ❤️ per la divulgazione scientifica.

## 📄 Licenza

Codice e contenuti didattici rilasciati sotto **CC-BY-4.0**: liberi da usare con
attribuzione a Giada Magni e alle fonti citate.
