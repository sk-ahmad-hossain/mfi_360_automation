import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  //workers: process.env.CI ? 1 : undefined,
  workers: 1,
  snapshotDir: "images",

  reporter: [
    ['list'],
  ],

  use: {
    headless: false,
    channel: 'msedge',
    screenshot: 'on-first-failure',
    video: 'on',
    navigationTimeout: 60000,
    actionTimeout: 60000,
    baseURL: "https://mfi360web-it2.icraanalytics.co.in:8443",
    
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        launchOptions: {
          args: ["--start-maximized"]
        },
        viewport: null
      },
      metadata: {
        username: "",
        password: ""
      }
    },
    // Uncomment below to enable Firefox or WebKit
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
