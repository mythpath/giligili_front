npm run build
cp -r ../dist ./
docker build -t giligili_front:v1.0.0
docker push giligili_front:v1.0.0