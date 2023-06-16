/*
  Warnings:

  - You are about to drop the `SpotifyUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Song_artistUniqueId_fkey` ON `Song`;

-- DropTable
DROP TABLE `SpotifyUser`;
