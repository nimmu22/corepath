CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`dedup` text NOT NULL,
	`payload` text NOT NULL,
	`branch` text NOT NULL,
	`posted_at` text,
	`fetched_at` text NOT NULL,
	`deadline` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `jobs_dedup_unique` ON `jobs` (`dedup`);--> statement-breakpoint
CREATE INDEX `idx_jobs_branch_posted` ON `jobs` (`branch`,`posted_at`);--> statement-breakpoint
CREATE TABLE `ingestion_locks` (
	`id` text PRIMARY KEY NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `provider_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`fetched_at` text,
	`count` integer DEFAULT 0 NOT NULL
);
