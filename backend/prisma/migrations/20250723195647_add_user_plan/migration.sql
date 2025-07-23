-- CreateEnum
CREATE TYPE "UserPlan" AS ENUM ('FREE', 'PRO', 'ADVANCED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "UserPlan" NOT NULL DEFAULT 'FREE';
