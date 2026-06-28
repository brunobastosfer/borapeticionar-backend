ALTER TABLE "petitions"
  ADD COLUMN "companyAddress" TEXT,
  ADD COLUMN "courtDivision" TEXT,
  ADD COLUMN "dismissalType" TEXT,
  ADD COLUMN "controversialPoints" TEXT,
  ADD COLUMN "caseValue" TEXT,
  ADD COLUMN "requestFgtsWithdrawal" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "requestFgtsFine" BOOLEAN NOT NULL DEFAULT false;
