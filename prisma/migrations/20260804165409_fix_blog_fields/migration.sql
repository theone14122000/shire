/*
  Warnings:

  - You are about to drop the column `coverImage` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `readingTime` on the `blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blogs` DROP COLUMN `coverImage`,
    DROP COLUMN `readingTime`,
    ADD COLUMN `date` VARCHAR(191) NULL,
    ADD COLUMN `excerpt` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `readTime` VARCHAR(191) NULL;
