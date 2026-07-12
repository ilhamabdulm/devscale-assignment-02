-- CreateTable
CREATE TABLE "ResearchJobResult" (
    "id" TEXT NOT NULL,
    "researchJobId" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "perspective" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchJobResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResearchJobResult" ADD CONSTRAINT "ResearchJobResult_researchJobId_fkey" FOREIGN KEY ("researchJobId") REFERENCES "ResearchJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
