declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      WEBHOOK_URL: string
      HEROKU_APP_NAME: string
      BOT_TOKEN: string
      DATABASE_URL: string
      ALLOWED_ORIGIN: string
      NODE_ENV: 'development' | 'production'
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
