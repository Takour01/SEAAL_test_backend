/*
  Warnings:

  - Added the required column `password` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Administrator` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Manager` ADD COLUMN `password` VARCHAR(191) NOT NULL;
