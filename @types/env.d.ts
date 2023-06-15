namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_HOST: string
    DATABASE_URL: string
    SPOTIFY_CLIENT_ID: string
    SPOTIFY_CLIENT_SECRET: string
    SILLY_SECRET: string
    STATE_SECRET: string
  }
}
