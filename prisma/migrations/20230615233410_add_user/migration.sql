/*
  Warnings:

  - You are about to drop the column `artHref` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `sampleHref` on the `Song` table. All the data in the column will be lost.
  - Added the required column `previewUrl` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Song` DROP FOREIGN KEY `Song_artistUniqueId_fkey`;

-- AlterTable
ALTER TABLE `Album` DROP COLUMN `artHref`,
    ADD COLUMN `blurHash` VARCHAR(1000) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `releaseDay` VARCHAR(191) NULL,
    ADD COLUMN `releaseMonth` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Artist` DROP COLUMN `releaseYear`;

-- AlterTable
ALTER TABLE `Song` DROP COLUMN `sampleHref`,
    ADD COLUMN `externalUrl` VARCHAR(191) NULL,
    ADD COLUMN `previewUrl` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `SpotifyUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NOT NULL,
    `accessToken` CHAR(255) NOT NULL,
    `tokenType` VARCHAR(191) NOT NULL,
    `scope` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SpotifyUser_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArtistToSong` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ArtistToSong_AB_unique`(`A`, `B`),
    INDEX `_ArtistToSong_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ArtistToSong` ADD CONSTRAINT `_ArtistToSong_A_fkey` FOREIGN KEY (`A`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArtistToSong` ADD CONSTRAINT `_ArtistToSong_B_fkey` FOREIGN KEY (`B`) REFERENCES `Song`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
