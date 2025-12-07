-- DropForeignKey
ALTER TABLE "EventAttendee" DROP CONSTRAINT "EventAttendee_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventAttendee" DROP CONSTRAINT "EventAttendee_userId_fkey";

-- DropForeignKey
ALTER TABLE "ItemProject" DROP CONSTRAINT "ItemProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ItemProjectAssigned" DROP CONSTRAINT "ItemProjectAssigned_itemProjectId_fkey";

-- DropForeignKey
ALTER TABLE "ItemProjectAssigned" DROP CONSTRAINT "ItemProjectAssigned_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectGroup" DROP CONSTRAINT "ProjectGroup_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TaskOwner" DROP CONSTRAINT "TaskOwner_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "TaskOwner" DROP CONSTRAINT "TaskOwner_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_userId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_workspaceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_subscriptionId_fkey";

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_workspaceTypeId_fkey" FOREIGN KEY ("workspaceTypeId") REFERENCES "WorkspaceType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskOwner" ADD CONSTRAINT "TaskOwner_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskOwner" ADD CONSTRAINT "TaskOwner_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectGroup" ADD CONSTRAINT "ProjectGroup_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemProject" ADD CONSTRAINT "ItemProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemProjectAssigned" ADD CONSTRAINT "ItemProjectAssigned_itemProjectId_fkey" FOREIGN KEY ("itemProjectId") REFERENCES "ItemProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemProjectAssigned" ADD CONSTRAINT "ItemProjectAssigned_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
