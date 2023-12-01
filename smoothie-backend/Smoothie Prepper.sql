CREATE TABLE "user" (
  "user_id" serial PRIMARY KEY,
  "google_id" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar,
  "status" varchar,
  "time_updated" timestamp NOT NULL,
  "time_created" timestamp NOT NULL
);

CREATE TABLE "smoothie" (
  "smoothie_id" serial PRIMARY KEY,
  "smoothie_name" varchar,
  "status" varchar,
  "time_updated" timestamp NOT NULL,
  "time_created" timestamp NOT NULL
);

CREATE TABLE "smoothie_ingredient" (
  "smoothie_ingredient_id" serial PRIMARY KEY,
  "smoothie_id" integer,
  "ingredient_display" varchar,
  "ingredient_type" varchar,
  "ingredient_weight" float,
  "status" varchar
);

CREATE TABLE "ingredient_type" (
  "ingredient_type_id" serial PRIMARY KEY,
  "ingredient_type" varchar,
  "status" varchar
);

CREATE TABLE "ingredient" (
  "ingredient_id" serial PRIMARY KEY,
  "amazon_link" varchar,
  "ingredient_name" varchar,
  "ingredient_type_id" integer,
  "item_cost" float,
  "organic" boolean,
  "weight_g" float,
  "status" varchar
);

CREATE TABLE "liked_smoothie" (
  "liked_smoothie_id" serial PRIMARY KEY,
  "user_id" integer,
  "smoothie_id" integer,
  "status" varchar
);

CREATE TABLE "saved_order" (
  "saved_order_id" serial PRIMARY KEY,
  "time_created" timestamp NOT NULL
);

CREATE TABLE "saved_order_smoothie" (
  "saved_order_smoothie_id" serial PRIMARY KEY,
  "saved_order_id" integer,
  "smoothie_id" integer,
  "count" integer,
  "time_created" timestamp NOT NULL
);

ALTER TABLE "smoothie_ingredient" ADD FOREIGN KEY ("smoothie_id") REFERENCES "smoothie" ("smoothie_id");

ALTER TABLE "ingredient" ADD FOREIGN KEY ("ingredient_type_id") REFERENCES "ingredient_type" ("ingredient_type_id");

ALTER TABLE "liked_smoothie" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "liked_smoothie" ADD FOREIGN KEY ("smoothie_id") REFERENCES "smoothie" ("smoothie_id");

ALTER TABLE "saved_order_smoothie" ADD FOREIGN KEY ("saved_order_id") REFERENCES "saved_order" ("saved_order_id");

ALTER TABLE "saved_order_smoothie" ADD FOREIGN KEY ("smoothie_id") REFERENCES "smoothie" ("smoothie_id");
