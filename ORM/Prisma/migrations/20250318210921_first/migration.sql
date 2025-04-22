-- CreateEnum
CREATE TYPE "roles_name" AS ENUM ('customer', 'admin', 'content-manager', 'inventory-manager', 'order-manager', 'publisher');

-- CreateEnum
CREATE TYPE "users_gender" AS ENUM ('male', 'female', 'other');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "hashedPassword" VARCHAR(161) NOT NULL,
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(30),
    "bio" TEXT,
    "profilePhoto" TEXT,
    "dateOfBirth" DATE,
    "gender" "users_gender" NOT NULL,
    "status" VARCHAR(20),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "deletedAt" TIMESTAMP,
    "rolesId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "recipientName" VARCHAR(60) NOT NULL,
    "country" VARCHAR(30) NOT NULL DEFAULT 'Iran',
    "province" VARCHAR(30) NOT NULL,
    "city" VARCHAR(30) NOT NULL,
    "postalAddress" TEXT NOT NULL,
    "postalCode" VARCHAR(10),
    "phoneNumber" VARCHAR(11) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "phoneNumber" VARCHAR(11) NOT NULL,
    "isVerifiedPhoneNumber" BOOLEAN DEFAULT false,
    "email" VARCHAR(50),
    "isVerifiedEmail" BOOLEAN DEFAULT false,
    "userId" INTEGER,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" "roles_name" NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "username" ON "users"("username");

-- CreateIndex
CREATE INDEX "userId_index" ON "addresses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "phoneNumber" ON "contacts"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "contacts"("email");

-- CreateIndex
CREATE INDEX "contact-userId" ON "contacts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_userId_key" ON "roles"("userId");

-- CreateIndex
CREATE INDEX "role-userId" ON "roles"("userId");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_ibfk_1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_ibfk_1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
