-- CreateTable
CREATE TABLE "TravelRecommendation" (
    "id" TEXT NOT NULL,
    "destination_city" TEXT NOT NULL,
    "est_budget" TEXT NOT NULL,
    "trip_duration" TEXT NOT NULL,
    "travel_date" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "response" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelRecommendation_pkey" PRIMARY KEY ("id")
);
