export function print(obj: any) {
  if (typeof obj === "object") {
    console.log(obj.constructor.name);
  }
  console.log(JSON.stringify(obj, null, 2));
}

export function assert(cond: boolean, msg = "") {
  if (!cond) {
    throw new Error(msg);
  }
}
