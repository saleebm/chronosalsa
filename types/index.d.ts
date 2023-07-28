import { Prisma } from "@prisma/client"

declare module "*.svg" {
  const content: any
  export default content
}

declare module "*.png" {
  const content: any
  export default content
}

declare module "*.jpg" {
  const content: any
  export default content
}

declare module "*.jpeg" {
  const content: any
  export default content
}

export type SongProps = Prisma.SongGetPayload<{
  include: { Album: true; Artist: true }
}> & {
  Album: Prisma.AlbumGetPayload
  Artist: Prisma.ArtistGetPayload
}

export type SongQuestion = {
  id: string
  releaseYear: string
  blurHash: string | null
  previewUrl: string
}

export type SongQuestions = Array<SongQuestion>

export type SongAnswer = {
  id: string
  releaseYear: string
  name: string
  externalUrl: string
  albumName: string
  artistName: string
  albumArtUrl: string
}

export type CurrentResultAnswer = {
  guess: string
  song: SongAnswer
}

export type CurrentResult = Record<string, CurrentResultAnswer>
