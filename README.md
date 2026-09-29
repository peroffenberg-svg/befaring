# Befaring – web-app

Befaringsfoto med retning (kartnord) og koordinater i EUREF89 UTM32 (EPSG:25832) med omtrentlig NN2000-høyde. Bildene sorteres på prosjekt og befaringsdato og eksporteres som ZIP med mappestrukturen `Prosjekt/Befaringsdato/`, inkludert `befaringslogg.csv` og `befaringslogg.geojson`.

Appen er ren statisk kode. Den har ingen server eller database. Bildene lagres på telefonen til de eksporteres.

## Eksport

**«Eksporter mappe»** gir en ZIP-fil med mappen `Prosjekt/Befaringsdato/`. Den inneholder bildene og disse filene:

| Fil | Bruk |
|---|---|
| `befaringskart.html` | Dobbeltklikk for kart med alle bildene, retningssektorer og bildeliste. Bakgrunnskart fra Kartverket (gråtone/topografisk) eller OpenStreetMap. Krever nett for kartfliser. Må ligge i samme mappe som bildene. |
| `befaring_autocad.dxf` | Åpne i AutoCAD, eller sett inn med XREF/INSERT i en tegning i EUREF89 UTM32 (meter). Inneholder punkt, retningspil (4 m) og siktsektor langs kartnord, samt nummer. Ctrl+klikk på pil, sirkel eller tekst åpner bildet, så lenge DXF-en ligger i samme mappe som bildene. Lag: BEF_PUNKT, BEF_RETNING, BEF_SIKTSEKTOR, BEF_TEKST. |
| `befaring_civil3d_PNEZD.csv` | Punktimport i Civil 3D med formatet «PNEZD (comma delimited)». Beskrivelsen er filnavn og merknad. Z er omtrentlig NN2000 (0 der høyde mangler). |
| `befaring_googleearth.kml` | Åpnes i Google Earth Pro. Bildene vises når KML-filen ligger i samme mappe som bildene. |
| `befaringslogg.csv` / `.geojson` | Excel og QGIS, som før. |

**«Google Earth (KMZ)»** gir én selvstendig fil med bildene innebygd, for Google Earth (web og Pro). Den kan også importeres i Google My Maps, men der kommer bare punkter, navn og tekst med. Bildene må legges til manuelt i My Maps.

## Filer

| Fil | Hva den gjør |
|---|---|
| `index.html` | Selve appen |
| `manifest.webmanifest` | Navn, ikon og oppstart som app |
| `sw.js` | Gjør at appen virker uten dekning ute på befaring |
| `icons/` | App-ikoner |
| `staticwebapp.config.json` | Innstillinger for Azure Static Web Apps (ignoreres andre steder) |

## Publisering

Appen må ligge på en **https**-adresse. Uten https får den ikke tilgang til kamera, GPS og kompass. Legg hele mappen ut som den er.

- **Azure Static Web Apps.** Anbefalt for Oslo kommune, og må bestilles via UKE eller den som forvalter kommunens Azure-miljø. `staticwebapp.config.json` er allerede tilpasset.
- **Intern webserver.** Fungerer hvis den har https og serverer `.webmanifest` som `application/manifest+json`.
- **Netlify eller GitHub Pages.** Egnet for rask testing. Dra mappen inn på app.netlify.com/drop, så får du en https-adresse med en gang.

## Installere på telefonen

- **iPhone.** Åpne adressen i Safari, trykk Del-knappen og velg «Legg til på Hjem-skjerm».
- **Android.** Åpne adressen i Chrome og velg «Installer app», eller bruk knappen under Innstillinger i appen.

Installer appen og åpne den én gang med nett. Etter det virker den uten dekning.

## Oppdatere

1. Endre `index.html`.
2. Øk `VERSION` i `sw.js` (f.eks. `befaring-v2`).
3. Last opp på nytt.

Telefonene får den nye versjonen neste gang appen åpnes med nett.

## Før bruk

- **Kompass.** Sikt langs en gate med kjent retning og juster «Kompasskorreksjon» under Innstillinger.
- **Høyde.** Kontroller høyden på et punkt med kjent NN2000-høyde. Juster «Geoidehøyde», eller velg at telefonen allerede gir høyde over havet.
- **Eksport.** Eksporter etter hver befaring. «Eksporter mappe» åpner delingsmenyen, så du kan lagre til OneDrive, Teams eller Filer.

## Begrensninger

- **GPS-nøyaktighet** er typisk 3–10 m i grunnriss og dårligere i høyde. Kompasset forstyrres av stål i nærheten.
- **Bildene er ikke synkronisert.** De ligger kun på telefonen til de eksporteres.
- **Personvern.** Bilder med posisjon kan være personopplysninger hvis personer eller bilskilt er med. Avklar bruk med personvernombudet før appen tas i bruk av flere.
