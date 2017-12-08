CREATE TABLE "offices" (
  "office_id" serial primary key,
  "office" varchar(80) not null UNIQUE
  );
  
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null,
  "office_id" integer not null, FOREIGN KEY ("office_id") references "offices"("office_id") ON DELETE CASCADE ON UPDATE CASCADE,
  "role" varchar(20) not null,
  "superuser" boolean 
);

CREATE UNIQUE INDEX ON "users" ("superuser")
	WHERE "superuser" = true;

INSERT INTO "offices" (
	"office") VALUES (
	'Minneapolis');