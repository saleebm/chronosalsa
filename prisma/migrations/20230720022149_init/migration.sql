-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Song` (
    `id` VARCHAR(191) NOT NULL,
    `uniqueId` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `albumUniqueId` VARCHAR(191) NULL,
    `previewUrl` VARCHAR(191) NOT NULL,
    `externalUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Song_uniqueId_key`(`uniqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Album` (
    `id` VARCHAR(191) NOT NULL,
    `uniqueId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `releaseYear` VARCHAR(191) NOT NULL,
    `releaseMonth` VARCHAR(191) NULL,
    `releaseDay` VARCHAR(191) NULL,
    `blurHash` VARCHAR(1000) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Album_uniqueId_key`(`uniqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artist` (
    `id` VARCHAR(191) NOT NULL,
    `uniqueId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modifiedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Artist_uniqueId_key`(`uniqueId`),
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
ALTER TABLE `Song` ADD CONSTRAINT `Song_albumUniqueId_fkey` FOREIGN KEY (`albumUniqueId`) REFERENCES `Album`(`uniqueId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArtistToSong` ADD CONSTRAINT `_ArtistToSong_A_fkey` FOREIGN KEY (`A`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArtistToSong` ADD CONSTRAINT `_ArtistToSong_B_fkey` FOREIGN KEY (`B`) REFERENCES `Song`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
