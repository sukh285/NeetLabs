-- CreateEnum
CREATE TYPE "PlaylistAccess" AS ENUM ('FREE', 'PRO', 'ADVANCED', 'CUSTOM');

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "accessLevel" "PlaylistAccess" NOT NULL DEFAULT 'CUSTOM';
