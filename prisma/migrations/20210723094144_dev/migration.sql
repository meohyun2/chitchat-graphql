/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "nickname" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "photoUri" TEXT NOT NULL,
    "statusMessage" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
