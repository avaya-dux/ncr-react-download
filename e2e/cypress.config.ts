import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
  video: false,
  e2e: nxE2EPreset(__dirname, {
    bundler: 'vite',
  }),
});
