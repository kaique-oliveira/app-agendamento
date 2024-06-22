/*
  Warnings:

  - A unique constraint covering the columns `[itemSchedulableId]` on the table `scheduling` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemSchedulableId` to the `scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scheduling" ADD COLUMN     "itemSchedulableId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "scheduling_itemSchedulableId_key" ON "scheduling"("itemSchedulableId");

-- AddForeignKey
ALTER TABLE "scheduling" ADD CONSTRAINT "scheduling_itemSchedulableId_fkey" FOREIGN KEY ("itemSchedulableId") REFERENCES "schedulableItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
