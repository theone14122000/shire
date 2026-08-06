-- AlterTable
ALTER TABLE `blogs` MODIFY `description` TEXT NULL,
    MODIFY `content` TEXT NULL,
    MODIFY `tags` TEXT NULL,
    MODIFY `excerpt` TEXT NULL;

-- CreateTable
CREATE TABLE `gallery_items` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `caption` VARCHAR(191) NULL,
    `category` VARCHAR(191) NOT NULL DEFAULT 'Common Spaces',
    `alt` VARCHAR(191) NULL,
    `src` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'published',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `gallery_items_src_key`(`src`),
    INDEX `gallery_items_category_idx`(`category`),
    INDEX `gallery_items_status_idx`(`status`),
    INDEX `gallery_items_order_idx`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
