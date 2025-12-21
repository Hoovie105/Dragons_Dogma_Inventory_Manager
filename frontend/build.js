// build.js
import { build } from 'vite';

build({
  build: {
    outDir: 'dist'
  }
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
