#!/bin/bash

# Definiamo i nomi per comodità
IMAGE_NAME="interface-cowbook"
CONTAINER_NAME="cowbook-container"

echo "--- 1. Spegnimento e rimozione container esistenti ---"
# Fermiamo il container se è in esecuzione e lo eliminiamo
docker stop $CONTAINER_NAME 2>/dev/null
docker rm $CONTAINER_NAME 2>/dev/null

echo "--- 2. Creazione della nuova immagine ---"
# Build dell'immagine basata sul tuo Dockerfile
docker build -t $IMAGE_NAME .

echo "--- 3. Avvio del nuovo container ---"
# Avvio in background sulla porta 5173
docker run -d --name $CONTAINER_NAME -p 5173:5173 $IMAGE_NAME

echo "--- 4. Pulizia immagini orfane (opzionale) ---"
# Rimuove le immagini vecchie senza nome create dai build precedenti
docker image prune -f

echo "--- FATTO! L'app è online su http://localhost:5173 ---"