// build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
npm run build
npm run typeorm migration:run -- -d dist/data-source