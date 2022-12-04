/*
  Warnings:

  - A unique constraint covering the columns `[code_machine]` on the table `Machine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Machine_code_machine_key" ON "Machine"("code_machine");
