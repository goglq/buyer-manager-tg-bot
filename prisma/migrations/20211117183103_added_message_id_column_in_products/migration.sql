-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_catalogueId_fkey";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_catalogueId_fkey" FOREIGN KEY ("catalogueId") REFERENCES "catalogues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
