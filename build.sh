set -o errexit

npm install
yarn run build
npm run typeorm migration:run -- -d dist/data-source