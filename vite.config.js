import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
});

// import {defineConfig, loadEnv} from 'vite';
// import vue from '@vitejs/plugin-vue';
//
// export default defineConfig(({mode}) => {
//   const env = loadEnv(mode, process.cwd());
//   console.log('ENV:', env.VITE_BACKEND_URL);
//
//   return {
//     plugins: [vue()],
//     server: {
//       proxy: {
//         '/api': {
//           target: env.VITE_BACKEND_URL,
//           changeOrigin: true,
//         },
//         configure: (proxy) => {
//           proxy.on('proxyRes', (proxyRes) => {
//             delete proxyRes.headers['cache-control'];
//             delete proxyRes.headers['etag'];
//           });
//         },
//       }
//     }
//   };
// });