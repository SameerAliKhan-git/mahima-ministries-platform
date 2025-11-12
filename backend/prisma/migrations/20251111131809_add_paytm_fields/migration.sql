/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[txnId]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `donorName` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "bankTxnId" TEXT,
ADD COLUMN     "donorName" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gatewayResponse" TEXT,
ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentMode" TEXT,
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "txnId" TEXT,
ALTER COLUMN "paymentMethod" SET DEFAULT 'PAYTM';

-- CreateIndex
CREATE UNIQUE INDEX "Donation_orderId_key" ON "Donation"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_txnId_key" ON "Donation"("txnId");

-- CreateIndex
CREATE INDEX "Donation_paymentStatus_idx" ON "Donation"("paymentStatus");

-- CreateIndex
CREATE INDEX "Donation_orderId_idx" ON "Donation"("orderId");
