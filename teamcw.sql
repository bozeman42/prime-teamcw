CREATE TABLE "offices" (
  "office_id" serial primary key,
  "office" varchar(80) not null UNIQUE
  );
  
CREATE TABLE "users" (
  "id" serial primary key,
  "e_id" varchar(80) not null UNIQUE,
  "username" varchar (80) not null UNIQUE,
  "firstname" varchar (80) not null,
  "lastname" varchar (80) not null,
  "password" varchar(240) not null,
  "office" varchar(80) not null, FOREIGN KEY ("office") references "offices"("office") ON DELETE CASCADE ON UPDATE CASCADE,
  "role" varchar(20) not null,
  "superuser" boolean 
);

CREATE UNIQUE INDEX ON "users" ("superuser")
	WHERE "superuser" = true;

INSERT INTO "offices" (
  "office") VALUES (
  'Minneapolis');