-- CreateTable
CREATE TABLE `room_content` (
    `id` VARCHAR(191) NOT NULL,
    `roomSlug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `view` VARCHAR(191) NULL,
    `floor` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `facilities` TEXT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `room_content_roomSlug_key`(`roomSlug`),
    INDEX `room_content_roomSlug_idx`(`roomSlug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page_content` (
    `id` VARCHAR(191) NOT NULL,
    `pageKey` VARCHAR(191) NOT NULL,
    `data` TEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `page_content_pageKey_key`(`pageKey`),
    INDEX `page_content_pageKey_idx`(`pageKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
