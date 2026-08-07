-- AlterTable
ALTER TABLE "Blog" ADD COLUMN "relatedSlugs" TEXT[] DEFAULT ARRAY[]::TEXT[];
