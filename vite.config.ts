import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import requireTransform from 'vite-plugin-require-transform'

// https://vitejs.dev/config/
export default defineConfig(payload => {
  console.log(payload)

  return {
    plugins: [
      react(),
      requireTransform({
        fileRegex: /.ts$|.tsx$/
      })
    ],

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss'],
      alias: {
        '@': '/src'
      }
    },

    env: {
      browser: true
    },

    server: {
      host: '0.0.0.0',
      hmr: {
        overlay: false
      },
      // open: true,
      hot: true
    },

    css: {
      devSourcemap: true
    },

    build: {
      rollupOptions: {
        output: {
          chunkFileNames: `[name].[hash].js`,
          entryFileNames: `[name].[hash].js`
        }
      },
      minify: true, // 코드를 압축하여 최적화합니다.
      chunkSizeWarningLimit: 2000, // 청크 크기 경고 제한을 설정합니다.
      brotliSize: false // Brotli 압축 크기를 표시하지 않습니다.
    }
  }
})
