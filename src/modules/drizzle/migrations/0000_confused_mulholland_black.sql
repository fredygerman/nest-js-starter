CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(256),
	"last_name" varchar(256),
	"phone_number" varchar(256),
	"is_phone_number_verified" boolean DEFAULT false,
	"email" varchar(256),
	"dob" date,
	"avatar_url" varchar(256),
	"on_boarded" boolean DEFAULT false,
	"locale" varchar(256) DEFAULT 'en',
	"role" varchar DEFAULT 'user',
	"status" varchar DEFAULT 'active',
	"password" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
