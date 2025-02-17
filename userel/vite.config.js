import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "@fullcalendar/common/main.css"; @import "@fullcalendar/daygrid/main.css"; @import "@fullcalendar/timegrid/main.css"; @import "@fullcalendar/list/main.css";`
      }
    }
  }
});