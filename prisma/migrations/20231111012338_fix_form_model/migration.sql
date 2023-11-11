/*
  Warnings:

  - You are about to drop the column `subCount` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `visits` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "subCount",
DROP COLUMN "visits";
