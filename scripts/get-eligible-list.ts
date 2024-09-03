import * as csv from "fast-csv";
import fs from "node:fs";

export function getEligibleList(filePath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const data: string[] = [];

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => reject(error))
      .on("data", (row: { address: string; amount: string }) =>
        data.push(row.address + row.amount)
      )
      .on("end", (rowCount: number) => {
        console.log(`done reading ${rowCount} rows`);
        resolve(data);
      });
  });
}
