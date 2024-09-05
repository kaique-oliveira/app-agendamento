-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('CAR', 'HOUSE', 'COURT');

-- CreateTable
CREATE TABLE "stores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "imgUrl" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "adresses" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "operatingHours" (
    "id" SERIAL NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,
    "storeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "relDayWeekOperation" (
    "id" SERIAL NOT NULL,
    "operationHourId" INTEGER NOT NULL,
    "dayWeekId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "daysWeek" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "schedulableItems" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "ItemType" NOT NULL,
    "specificAttributes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "stores_id_key" ON "stores"("id");

-- CreateIndex
CREATE UNIQUE INDEX "stores_cnpj_key" ON "stores"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "stores_email_key" ON "stores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "adresses_id_key" ON "adresses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "adresses_storeId_key" ON "adresses"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "operatingHours_id_key" ON "operatingHours"("id");

-- CreateIndex
CREATE UNIQUE INDEX "relDayWeekOperation_id_key" ON "relDayWeekOperation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "daysWeek_id_key" ON "daysWeek"("id");

-- CreateIndex
CREATE UNIQUE INDEX "daysWeek_day_key" ON "daysWeek"("day");

-- CreateIndex
CREATE UNIQUE INDEX "daysWeek_index_key" ON "daysWeek"("index");

-- CreateIndex
CREATE UNIQUE INDEX "schedulableItems_id_key" ON "schedulableItems"("id");

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operatingHours" ADD CONSTRAINT "operatingHours_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relDayWeekOperation" ADD CONSTRAINT "relDayWeekOperation_dayWeekId_fkey" FOREIGN KEY ("dayWeekId") REFERENCES "daysWeek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relDayWeekOperation" ADD CONSTRAINT "relDayWeekOperation_operationHourId_fkey" FOREIGN KEY ("operationHourId") REFERENCES "operatingHours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
