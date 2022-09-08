import { test } from "./typeTagTests";

const main = async () => {
  const [, , fname] = process.argv;
  //const remainingArgs = process.argv.slice(3);
  switch (fname) {
    case "test":
      await test();
      break;
    default:
      console.log(`Unrecognized command: ${fname}`);
      break;
  }
};
main();
