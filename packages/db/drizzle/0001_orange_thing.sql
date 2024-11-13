ALTER TABLE "formats" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_staff_members" ALTER COLUMN "account_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "players" ALTER COLUMN "account_id" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "players" ALTER COLUMN "account_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "account_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "chat_messages" ALTER COLUMN "account_id" SET NOT NULL;