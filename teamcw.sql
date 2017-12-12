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

  CREATE TABLE "dbo_RPRT_Dataset" (
    "Report_Dataset_ID" integer NOT NULL,
    "Dataset_ID" integer,
    "Dataset_Label" character varying,
    "Dataset_Desc" character varying,
    "Period_Type_ID" integer,
    "Period_Type_Interval_ID" integer,
    "Period_Year" integer,
    "Created_User" integer,
    "Created_Date" date,
    "Modified_User" integer,
    "Modified_Date" date
);

CREATE TABLE "dbo_RPRT_Property" (
    "Report_Property_ID" integer NOT NULL,
    "Report_Dataset_ID" integer,
    "Property_ID" integer,
    "Property_Name" character varying,
    "Address_1" character varying,
    "Address_2" character varying,
    "City_ID" integer,
    "State" character varying,
    "Zip" integer,
    "Outlook" boolean,
    "SubMarket_ID" integer,
    "Submarket" character varying,
    "Property_Type_ID" integer,
    "Property_Type" character varying,
    "Building_Size" numeric,
    "Number_Of_Floors" numeric,
    "Year_Built" integer,
    "Year_Renovated" integer,
    "X_Coordinate" numeric,
    "Y_Coordinate" numeric,
    "Squarefeet_Available" numeric,
    "Squarefeet_Vacant" numeric,
    "Squarefeet_Sublease" numeric,
    "Absorption" numeric,
    "Divisible_Min" numeric,
    "Divisible_Max" numeric,
    "Rate_Low" money,
    "Rate_High" money,
    "Squarefeet_OP_Expenses" money,
    "Squarefeet_Taxes" money,
    "Year_Tax" integer,
    "Sale_Asking_Price" money,
    "Rate_Alpha" character varying,
    "Property_SubType_ID" integer,
    "Property_SubType" character varying,
    "Total_Op_Expenses_Taxes" money,
    "RUFactor" numeric,
    "TenantsInfo" character varying,
    "Created_User" integer,
    "Created_Date" date,
    "Modified_User" integer,
    "Modified_Date" date,
    "Construction" numeric,
    "IsInAbsorptionCalculation" boolean,
    "TenancyTypeId" integer
);
