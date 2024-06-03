/*
  Warnings:

  - Added the required column `url_image` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "url_image" TEXT NOT NULL;
