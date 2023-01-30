-- CreateTable
CREATE TABLE "Tick" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first" BOOLEAN NOT NULL,

    CONSTRAINT "Tick_pkey" PRIMARY KEY ("id")
);
