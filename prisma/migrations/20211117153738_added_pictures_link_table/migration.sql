-- CreateTable
CREATE TABLE "PictureLinks" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "PictureLinks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PictureLinks" ADD CONSTRAINT "PictureLinks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
