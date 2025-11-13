/*
  Warnings:

  - You are about to drop the column `month_price` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Workspace` table. All the data in the column will be lost.
  - You are about to drop the column `workspace_type` on the `Workspace` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `monthPrice` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Workspace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Workspace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceTypeId` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PriorityEnum" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_subscription_id_fkey";

-- DropIndex
DROP INDEX "account_accountId_key";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "month_price",
ADD COLUMN     "monthPrice" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "user_id",
DROP COLUMN "workspace_type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "workspaceTypeId" TEXT NOT NULL,
ALTER COLUMN "timezone" SET DEFAULT 'Asia/Jakarta';

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "providerAccountId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "subscription_id",
ADD COLUMN     "subscriptionId" TEXT;

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "WorkspaceType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "memberCapacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkspaceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskOwner" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemProject" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "priority" "PriorityEnum" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemProjectAssigned" (
    "id" TEXT NOT NULL,
    "itemProjectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemProjectAssigned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAttendee" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventAttendee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceType_name_key" ON "WorkspaceType"("name");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_workspaceTypeId_fkey" FOREIGN KEY ("workspaceTypeId") REFERENCES "WorkspaceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskOwner" ADD CONSTRAINT "TaskOwner_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskOwner" ADD CONSTRAINT "TaskOwner_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectGroup" ADD CONSTRAINT "ProjectGroup_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemProject" ADD CONSTRAINT "ItemProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemProjectAssigned" ADD CONSTRAINT "ItemProjectAssigned_itemProjectId_fkey" FOREIGN KEY ("itemProjectId") REFERENCES "ItemProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemProjectAssigned" ADD CONSTRAINT "ItemProjectAssigned_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
