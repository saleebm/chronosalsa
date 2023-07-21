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
