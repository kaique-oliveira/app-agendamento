/*
  Warnings:

  - The `img` column on the `stores` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "stores" DROP COLUMN "img",
ADD COLUMN     "img" BYTEA[];
