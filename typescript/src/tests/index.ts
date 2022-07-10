import { AptosTsgen } from "../aptosTsgen";
import { test } from "./typeTagTests";

const tsgen = async (args: string[]) => {
  const generator = new AptosTsgen([], args[0], args.slice(1));
  generator.generate();
}


const main = async () => {
  const [, , fname] = process.argv;
  const remainingArgs = process.argv.slice(3);
  switch (fname) {
    case "test": 
      await test();
      break;
    case "tsgen":
      await tsgen(remainingArgs);
      break;
    default:
      console.log(`Unrecognized command: ${fname}`);
      break;
  }
}
main();