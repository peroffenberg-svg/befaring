# Befaring – web-app

Befaringsfoto med retning (kartnord) og koordinater i EUREF89 UTM32 (EPSG:25832). Bildene sorteres på prosjekt og befaringsdato og eksporteres som ZIP med mappestrukturen `Prosjekt/Befaringsdato/`, med befaringsrapport, kart og filer for AutoCAD, Civil 3D, QGIS, Excel og Google Earth.

Appen er ren statisk kode. Den har ingen server eller database. Bildene lagres på telefonen til de eksporteres.

## Slik fungerer appen

**Ta bilder.** Velg prosjekt og dato, trykk «Start befaring» og ta bilder. Velg gjerne kategori (Kum, Ledning, Stikkledning, Sluk, Skade, Grøft, Overflate, Annet) og objekt-ID. De gjelder for bildene som tas til du endrer dem. Merknaden gjelder bare neste bilde og kan snakkes inn med mikrofonknappen der telefonen støtter det.

**Kvalitet.** Linjen over utløseren viser om appen er klar: «Klar» når GPS er innenfor kravet (standard 10 m) og kompasset er stabilt, ellers «Usikker» med årsak. Bilder tatt med svak GPS eller urolig kompass merkes «usikker». Posisjonen er et vektet snitt av GPS-målingene de siste sekundene.

**Kart.** Viser bildene i en befaring med retningssektor, og egen posisjon. Brune punkter har avvik. Trykk på et punkt for å se bildet og redigere.

**Rediger.** Trykk på et bilde under «Bilder» for å endre kategori, objekt-ID, merknad og retning, flytte posisjonen i kartet eller slette. Endringer etter eksport markeres, så du ser hva som må eksporteres på nytt.

**Kalibrering.** Under Innstillinger: sikt langs noe med kjent retning i kartet, skriv inn retningen og trykk «Kalibrer».

**Påminnelse.** Appen varsler om bilder som ikke er eksportert, og kan slette befaringer som er ferdig eksportert.

## Eksport

Trykk «Eksporter …» på en befaring. Fyll eventuelt inn deltakere, formål og oppsummering til rapporten (lagres per befaring). Velg hva du vil eksportere og om filen skal deles (delingsmenyen) eller lagres på telefonen. Kompass-stempel og EXIF legges inn i bildene ved eksport, med retning og posisjon slik de er etter eventuell redigering.

**Komplett mappe (ZIP)** gir `Prosjekt/Befaringsdato/` med:

| Fil | Bruk |
|---|---|
| Bildene | Kompass øverst (og info nederst hvis valgt), GPS og retning i EXIF. |
| `befaringsrapport.pdf` | Forside med deltakere, formål, oppsummering og oversiktskart, deretter to bilder per side med tidspunkt, kategori, objekt-ID, retning, koordinater, kvalitet og merknad. |
| `befaringskart.html` | Dobbeltklikk for kart med alle bildene. Må ligge i samme mappe som bildene. Bakgrunnskart krever nett. |
| `befaring_autocad.dxf` | Punkt, retningspil, siktsektor og nummer i UTM32. Ctrl+klikk åpner bildet. Lag: BEF_PUNKT, BEF_RETNING, BEF_SIKTSEKTOR, BEF_TEKST. |
| `befaring_autocad_bilder.lsp` | Setter bildene inn i tegningen på lag BEF_BILDE. APPLOAD, skriv `BEFARINGSBILDER` og pek på DXF-en. |
| `befaring_civil3d_PNEZD.csv` | Punktimport i Civil 3D. Z er 0. |
| `befaring_googleearth.kml` | Google Earth Pro. |
| `befaringslogg.csv` / `.geojson` | Excel og QGIS (EPSG:25832), med kategori, objekt-ID og kvalitet. |

**Rapport (PDF)** gir bare rapporten. **Google Earth (KMZ)** gir én fil med bildene innebygd.

Stopper Outlook eller OneDrive filen, skyldes det som regel kommunens regler for deling fra nettleseren. Bruk «Lagre på telefonen», eller åpne appen i Edge logget inn med jobbkontoen.

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
- **Eksport.** Eksporter etter hver befaring. «Eksporter mappe» åpner delingsmenyen, så du kan lagre til OneDrive, Teams eller Filer.

## Begrensninger

- **GPS-nøyaktighet** er typisk 3–10 m. Kompasset forstyrres av stål i nærheten.
- **Bildene er ikke synkronisert.** De ligger kun på telefonen til de eksporteres.
- **Personvern.** Bilder med posisjon kan være personopplysninger hvis personer eller bilskilt er med. Avklar bruk med personvernombudet før appen tas i bruk av flere.
