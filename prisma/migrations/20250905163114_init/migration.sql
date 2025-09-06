/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Book" DROP COLUMN "thumbnail",
ADD COLUMN     "coverImageUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "bio" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."Genre" (
    "id" SERIAL NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BookGenre" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "BookGenre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_genre_key" ON "public"."Genre"("genre");

-- CreateIndex
CREATE UNIQUE INDEX "BookGenre_bookId_genreId_key" ON "public"."BookGenre"("bookId", "genreId");

-- AddForeignKey
ALTER TABLE "public"."BookGenre" ADD CONSTRAINT "BookGenre_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookGenre" ADD CONSTRAINT "BookGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "public"."Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
