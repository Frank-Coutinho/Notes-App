-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "isToDoList" BOOLEAN NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);
