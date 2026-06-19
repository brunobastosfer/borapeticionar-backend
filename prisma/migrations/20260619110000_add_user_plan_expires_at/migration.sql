ALTER TABLE "users" ADD COLUMN "planExpiresAt" TIMESTAMP(3);

UPDATE "users"
SET "planExpiresAt" = CURRENT_TIMESTAMP + INTERVAL '1 month'
FROM "Plan"
WHERE "users"."planId" = "Plan"."id"
  AND "Plan"."type" <> 'FREE'
  AND "users"."planExpiresAt" IS NULL;
