-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "url_image" TEXT NOT NULL,
    "user_creator_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "user_creator_id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "OrderLine" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "value" INTEGER NOT NULL DEFAULT 0,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_creator_id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Products_id_key" ON "Products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderLine_id_key" ON "OrderLine"("id");

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
