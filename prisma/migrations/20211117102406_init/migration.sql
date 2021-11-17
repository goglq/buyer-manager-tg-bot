-- CreateTable
CREATE TABLE "Catalogue" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Catalogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
