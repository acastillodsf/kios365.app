#!/bin/bash

# 1. Construir el proyecto
npm run build

# 2. Ir a la carpeta build
cd build || exit

# 3. Copiar los archivos a la carpeta de destino
cp -R . "/Volumes/Disco/Proyectos/NodeJS Server/TurnoTouch/public/"

# 4. Ir al directorio del servidor
cd "/Volumes/Disco/Proyectos/NodeJS Server/TurnoTouch" || exit

# 5. Hacer un git pull para actualizar el proyecto
#git pull origin main  # Cambia 'main' si tu rama es 'master' o alguna otra