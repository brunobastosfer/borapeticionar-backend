ALTER TABLE "users" ADD COLUMN "hasSeenTutorial" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "petitions" ADD COLUMN "content" TEXT;

UPDATE "petitions"
SET "content" = trim(
  both E'\n'
  from concat_ws(
    E'\n\n',
    CASE
      WHEN "practiceArea" IS NULL OR "practiceArea" = '' THEN NULL
      ELSE 'Area: ' || "practiceArea"
    END,
    'Requerente: ' || "fullName",
    'CPF/CNPJ: ' || "cpfCnpj",
    CASE
      WHEN "rg" IS NULL OR "rg" = '' THEN NULL
      ELSE 'RG: ' || "rg"
    END,
    CASE
      WHEN "maritalStatus" IS NULL OR "maritalStatus" = '' THEN NULL
      ELSE 'Estado civil: ' || "maritalStatus"
    END,
    CASE
      WHEN "cep" IS NULL OR "cep" = '' THEN NULL
      ELSE 'CEP: ' || "cep"
    END,
    CASE
      WHEN "street" IS NULL OR "street" = '' THEN NULL
      ELSE 'Endereco: ' || "street"
    END,
    'Parte requerida: ' || "defendantCompany",
    CASE
      WHEN "cnpj" IS NULL OR "cnpj" = '' THEN NULL
      ELSE 'CNPJ: ' || "cnpj"
    END,
    'Fatos' || E'\n' || "facts",
    'Pedidos' || E'\n' || "requests"
  )
);

ALTER TABLE "petitions" ALTER COLUMN "content" SET DEFAULT '';
ALTER TABLE "petitions" ALTER COLUMN "content" SET NOT NULL;
ALTER TABLE "petitions" ALTER COLUMN "fullName" DROP NOT NULL;
ALTER TABLE "petitions" ALTER COLUMN "cpfCnpj" DROP NOT NULL;
ALTER TABLE "petitions" ALTER COLUMN "defendantCompany" DROP NOT NULL;
ALTER TABLE "petitions" ALTER COLUMN "facts" DROP NOT NULL;
ALTER TABLE "petitions" ALTER COLUMN "requests" DROP NOT NULL;
