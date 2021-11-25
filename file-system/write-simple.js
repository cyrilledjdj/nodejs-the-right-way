const fs = require("fs"),
  [, , filename] = process.argv;
if (!filename) {
  process.exit(0);
}
fs.writeFile(
  filename,
  `
import {Module} from "@nestjs/common"

@Module({
    imports:[],
    exports:[],
    providers:[],
    bootstrap:[],
})
export class Hello {}
`,
  function (err, data) {
    if (err) return console.error(err);
    console.log("File saved");
  }
);
