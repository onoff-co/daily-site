import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/daily-site/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // 원본 고해상도 에셋·캡처 폴더는 개발 서버가 감시하지 않음
    watch: { ignored: ['**/원본에셋/**', '**/_preview/**'] },
  },
})
