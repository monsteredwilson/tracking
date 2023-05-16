set -o errexit

npm install
yarn
npm run typeorm migration:run -- -d dist/data-source