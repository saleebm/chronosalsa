This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[Inspiration](https://www.youtube.com/watch?v=qNhgl1tN5vU)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Todo

### Migrate away from spotify

Right now, this is for funsies, but to be a real thing, it can't use spotify. Look into migrating to a different source of music, or just use the spotify api to get the songs and then play them from somewhere else.

Ideas:
- youtube
- https://musicbrainz.org

### Seeding tings

- optimize the seed script to not reseed the same data
  - separate upsert into bulk insert and update (one time insert vs multiple seedings)

## playlist ids

Cafe con leche ☕️

```
5AZE6dPTRQ5ncxRol5XQwL
```