-- CreateTable
CREATE TABLE `Song` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `artistUniqueId` VARCHAR(191) NOT NULL,
    `albumUniqueId` VARCHAR(191) NULL,
    `sampleHref` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Album` (
    `id` VARCHAR(191) NOT NULL,
    `uniqueId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `artHref` VARCHAR(191) NULL,
    `releaseYear` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Album_uniqueId_key`(`uniqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artist` (
    `id` VARCHAR(191) NOT NULL,
    `uniqueId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `releaseYear` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Artist_uniqueId_key`(`uniqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_artistUniqueId_fkey` FOREIGN KEY (`artistUniqueId`) REFERENCES `Artist`(`uniqueId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_albumUniqueId_fkey` FOREIGN KEY (`albumUniqueId`) REFERENCES `Album`(`uniqueId`) ON DELETE SET NULL ON UPDATE CASCADE;
