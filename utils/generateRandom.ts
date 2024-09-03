import fs from "node:fs";
import * as csv from "fast-csv";
import { randomBytes } from "node:crypto";
import path from "node:path";

// generate random addresses and amounts
const addresses = Array.from({ length: 1000 }, generateRandomAddressAndAmount);

const filePath = path.resolve(__dirname, "../data/eligible.csv");
const writeStream = fs.createWriteStream(filePath);

const csvStream = csv.format({ headers: true });
csvStream.pipe(writeStream).on("end", process.exit);

addresses.forEach((address) => {
  csvStream.write({ address: address.address, amount: address.amount });
});

csvStream.end();

// helper functions
function generateRandomAddress() {
  return "0x" + randomBytes(20).toString("hex");
}

function generateRandomAmount() {
  const amounts = [100, 1000];
  return Math.ceil(Math.random() * amounts.sort(() => Math.random() - 0.5)[0]);
}

function generateRandomAddressAndAmount() {
  return {
    address: generateRandomAddress(),
    amount: generateRandomAmount(),
  };
}
