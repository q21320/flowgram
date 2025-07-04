import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';
import { defineConfig } from '@rsbuild/core';
import path from 'path';

export default defineConfig({
  plugins: [pluginReact(), pluginLess()],
  source: {
    entry: {
      index: './src/app.tsx',
    },
    /**
     * support inversify @injectable() and @inject decorators
     */
    decorators: {
      version: 'legacy',
    },
  },
  html: {
    title: 'demo-free-layout',
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, 'src'),
    }
  },
  // server:{
  //   host: '0.0.0.0',
  //   proxy:{
  //     '/shares': {
  //         target: 'https://www.xxjwxc.cn/',
  //         // target: 'http://192.155.1.28:82/',
  //         changeOrigin: true,
  //         // 开发环境添加额外代理配置（示例）
  //       },
  //   }
  // }
});
