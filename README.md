# Cowbook Web Interface

La **Cowbook Web Interface** è il frontend del progetto Cowbook, progettato per fornire un'interfaccia utente intuitiva per la configurazione e la visualizzazione del tracciamento delle mucche all'interno di una stalla. L'applicazione permette di caricare video da diverse telecamere, configurarne la disposizione e visualizzare i risultati del tracciamento proiettati su una mappa 2D.

## Panoramica dell'Applicazione

L'interfaccia è sviluppata con **React** e **TypeScript**, utilizzando **Vite** come build tool. Il design è focalizzato sulla semplicità d'uso per consentire anche a utenti non tecnici di gestire il sistema di monitoraggio.

## Funzionalità Principali

### 1. Configurazione tramite Drag & Drop
L'applicazione include un sistema di configurazione video basato su trascinamento (drag and drop):
* **AreaDropzone**: Permette di caricare i file video semplicemente trascinandoli nelle aree corrispondenti alle telecamere.
* **Mappatura Telecamere**: Supporta la configurazione di un gruppo di video (fino a 4) mappandoli agli ID telecamera reali (1, 4, 6, 8) richiesti dal server di inferenza.

### 2. Validazione dei Vincoli di Sicurezza
L'interfaccia implementa controlli per garantire che la configurazione sia valida prima dell'invio al server:
* Verifica che siano stati caricati i video necessari.
* Gestione dei parametri di configurazione per assicurare la compatibilità con il modello di inferenza.

### 3. Visualizzazione dei Risultati
Una volta completata l'elaborazione, l'app offre diverse modalità di visualizzazione:
* **Video Annotati**: Creazione di visualizzazioni che combinano il video originale con le annotazioni di tracciamento.
* **Dati in Real-time**: Possibilità di visualizzare i dati elaborati frame per frame per un'analisi dettagliata.

### 4. Interfaccia Live (WIP)
È presente un modulo dedicato alla visualizzazione in live stream, predisposto per interfacciarsi con flussi video in tempo reale per un monitoraggio costante.

## 🛠 Tecnologie Utilizzate

* **React (Vite)**: Framework principale per la costruzione dell'interfaccia.
* **TypeScript**: Per una gestione sicura dei tipi di dato tra frontend e API.
* **Tailwind CSS**: Utilizzato per lo styling rapido e reattivo dei componenti.
* **Axios**: Per le comunicazioni API con il server di inferenza Cowbook.

## 📡 Comunicazione con il Server

L'interfaccia funge da client per il **Cowbook Inference Server**. Invia le richieste di elaborazione tramite endpoint POST multipart, trasmettendo i file video e gli indici di telecamera selezionati dall'utente, e riceve in risposta gli output del modello in formato JSON.

---
*Nota: Per le istruzioni riguardanti la containerizzazione e l'avvio tramite Docker, consultare il file `README_DOCKER.md` (o equivalente).*
