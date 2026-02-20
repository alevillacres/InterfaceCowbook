#!/bin/bash
IMAGE_NAME="interface-cowbook"
CONTAINER_NAME="cowbook-container"

echo "--- 1. Spegnimento e rimozione container esistenti ---"
docker stop $CONTAINER_NAME 2>/dev/null
docker rm $CONTAINER_NAME 2>/dev/null

echo "--- 2. Creazione della nuova immagine ---"
# L'aggiunta di || exit dice allo script di fermarsi se il build fallisce
docker build -t $IMAGE_NAME . || { echo "ERRORE: Il build è fallito!"; exit 1; }

echo "--- 3. Avvio del nuovo container ---"
docker run -d --name $CONTAINER_NAME -p 5173:5173 $IMAGE_NAME

echo "--- 4. Pulizia ---"
docker image prune -f

