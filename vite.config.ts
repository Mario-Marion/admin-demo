import { fileURLToPath, URL } from 'url'
import { resolve } from "path";
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer';
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'
// import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  return {
    // base: loadEnv(mode, process.cwd()).MODE === "development" ? "/" : "./",
    base: "./",
    server: {
      cors: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:9000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      // 插件cdn引入
      resolveExternalsPlugin({
        XE: 'XEUtils',
      }),
      vue(),
      vueJsx(),
      // 查看模块
      visualizer(),
      // 自动导入
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          // presets
          'vue',
          'vue-router',
          '@vueuse/core'
        ],
        resolvers: [ElementPlusResolver(), IconsResolver({ prefix: 'Icon' })],
        dts: './auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      Components({
        resolvers: [ElementPlusResolver(), IconsResolver({
          enabledCollections: ['ep']
        })],
      }),
      Icons({
        autoInstall: true,
      }),
      // 自动导入css
      // createStyleImportPlugin({
      //   resolves: [ElementPlusResolve()],
      // }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.ts', 'tsx', '.js', '.vue'],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, 'src/styles/global.less')}";`
        }
      }
    }
  }
}
)
