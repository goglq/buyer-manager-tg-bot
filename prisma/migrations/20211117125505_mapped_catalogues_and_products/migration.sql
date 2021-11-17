/*
  Warnings:

  - You are about to drop the `Catalogue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_catalogueId_fkey";

-- DropTable
DROP TABLE "Catalogue";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "catalogues" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "catalogues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "catalogueId" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_catalogueId_fkey" FOREIGN KEY ("catalogueId") REFERENCES "catalogues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
