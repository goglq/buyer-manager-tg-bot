/*
  Warnings:

  - You are about to drop the column `productId` on the `PictureLinks` table. All the data in the column will be lost.
  - You are about to drop the column `catalogueId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `products` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `PictureLinks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catalogue_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PictureLinks" DROP CONSTRAINT "PictureLinks_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_catalogueId_fkey";

-- AlterTable
ALTER TABLE "PictureLinks" DROP COLUMN "productId",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "catalogueId",
DROP COLUMN "messageId",
ADD COLUMN     "catalogue_id" INTEGER NOT NULL,
ADD COLUMN     "message_id" INTEGER;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_catalogue_id_fkey" FOREIGN KEY ("catalogue_id") REFERENCES "catalogues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PictureLinks" ADD CONSTRAINT "PictureLinks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
