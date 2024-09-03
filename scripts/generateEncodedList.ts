import * as csv from "fast-csv";
import fs from "node:fs";
import { abiCoder } from "../utils/abiCoder";
import path from "node:path";

const listPath = path.resolve(__dirname, "../data/eligible-packed.json");
const listWS = fs.createWriteStream(listPath);
const csvPath = path.resolve(__dirname, "../data/eligible.csv");

function getEligibleList(filePath: string) {
  const data: string[] = [];

  fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => {
      console.error(error);
      process.exit(1);
    })
    .on("data", (row: { address: string; amount: string }) =>
      data.push(
        abiCoder.encode(["address", "uint256"], [row.address, row.amount])
      )
    )

    .on("end", (rowCount: number) => {
      listWS.write(JSON.stringify(data));
    });
}

getEligibleList(csvPath);
