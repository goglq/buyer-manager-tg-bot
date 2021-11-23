/*
  Warnings:

  - You are about to drop the `PictureLinks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PictureLinks" DROP CONSTRAINT "PictureLinks_product_id_fkey";

-- DropTable
DROP TABLE "PictureLinks";

-- CreateTable
CREATE TABLE "picture_links" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "picture_links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "picture_links" ADD CONSTRAINT "picture_links_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
