-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "premiumAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
