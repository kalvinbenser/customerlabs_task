-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "website" TEXT
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "http" TEXT NOT NULL,
    "headers" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    CONSTRAINT "Destination_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
