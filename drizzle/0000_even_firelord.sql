CREATE TABLE `absence` (
	`id_absence` integer PRIMARY KEY NOT NULL,
	`id_zaka` integer,
	`duvod` text,
	`datum` date,
	`omluvena` boolean,
	FOREIGN KEY (`id_zaka`) REFERENCES `zak`(`id_zaka`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rozvrh` (
	`id_rozvrh` integer PRIMARY KEY NOT NULL,
	`id_trida` integer,
	`den` text,
	`one_hodina` text,
	`two_hodina` text,
	`three_hodina` text,
	`four_hodina` text,
	`five_hodina` text,
	FOREIGN KEY (`id_trida`) REFERENCES `trida`(`id_trida`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `trida` (
	`id_trida` integer PRIMARY KEY NOT NULL,
	`nazev` text
);
--> statement-breakpoint
CREATE TABLE `zak` (
	`jmeno` text,
	`id_zaka` integer PRIMARY KEY NOT NULL,
	`id_trida` integer,
	FOREIGN KEY (`id_trida`) REFERENCES `trida`(`id_trida`) ON UPDATE no action ON DELETE no action
);
