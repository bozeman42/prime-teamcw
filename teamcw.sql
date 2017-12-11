CREATE TABLE "offices" (
  "office_id" serial primary key,
  "office" varchar(80) not null UNIQUE
  );
  
CREATE TABLE "users" (
  "id" serial primary key,
  "e_id" int not null UNIQUE,
  "username" varchar (80) not null UNIQUE,
  "password" varchar(240) not null,
  "email" varchar(80) not null,
  "firstname" varchar (80) not null,
  "lastname" varchar (80) not null,
  "o_id" serial references "offices",
  "role" varchar(20) not null,
  "superuser" boolean,
  "forgotPW_code" varchar(40) UNIQUE,
  "forgotPW_created" varchar(80)
);

CREATE UNIQUE INDEX ON "users" ("superuser")
	WHERE "superuser" = true;

INSERT INTO "offices" (
  "office") VALUES (
  'Minneapolis');

CREATE TABLE "emails" (
  "email_id" serial primary key,
  "first" varchar(80),
  "last" varchar(80),
  "title" varchar(200),
  "company" varchar(80),
  "domain" varchar(80),
  "building" varchar(80),
  "market" varchar(80),
  "email" varchar(200),
  "office_id" serial references "offices"
);