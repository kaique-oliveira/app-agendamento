/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `stores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stores" DROP COLUMN "imgUrl",
ADD COLUMN     "img" BYTEA;
