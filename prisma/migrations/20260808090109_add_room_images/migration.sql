-- CreateTable
CREATE TABLE `room_images` (
    `id` VARCHAR(191) NOT NULL,
    `roomSlug` VARCHAR(191) NOT NULL,
    `src` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NULL,
    `caption` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `room_images_roomSlug_order_idx`(`roomSlug`, `order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
