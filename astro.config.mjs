import netlify from '@astrojs/netlify/functions';
export default defineConfig({
  output: 'server',
  adapter: netlify()
});