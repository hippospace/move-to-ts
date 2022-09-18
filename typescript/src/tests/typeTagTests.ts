import { AtomicTypeTag, getTypeTagFullname, parseTypeTag } from "../typeTag";
import { assert, print } from "../utils";

export function test() {
  function testAtomicTags() {
    const atomicTags = Object.values(AtomicTypeTag);
    for (const atomicTag of atomicTags) {
      const nameString = getTypeTagFullname(atomicTag);
      console.log(atomicTag);
      console.log(nameString);
      const [result, remaining] = parseTypeTag(nameString);
      assert(result === atomicTag);
      assert(remaining === "");
    }
  }
  testAtomicTags();

  function testVectorTags() {
    const [result1, remaining1] = parseTypeTag("vector<u8>");
    print(result1);
    assert(remaining1 === "");

    const [result2, remaining2] = parseTypeTag("vector<address>");
    print(result2);
    assert(remaining2 === "");
  }

  testVectorTags();

  function testStructTags() {
    const [result1, remaining1] = parseTypeTag("0x1::testMod::struct");
    print(result1);
    assert(remaining1 === "");

    const [result2, remaining2] = parseTypeTag("0x1::testMod::struct<u8>");
    print(result2);
    assert(remaining2 === "");

    const [result3, remaining3] = parseTypeTag(
      "0x1::testMod::struct<u8,0x2::testMod::struct, address, 0x2::ttMod::sssruct<address,vector<u8>>>"
    );
    console.log(getTypeTagFullname(result3!));
    print(result3);
    assert(remaining3 === "");
  }
  testStructTags();

  function genericTest(name: string, requiresEqual = true) {
    const [result, remaining] = parseTypeTag(name);
    if (result === null) {
      throw new Error();
    }
    assert(remaining === "");
    const reString = getTypeTagFullname(result);
    if (requiresEqual && name !== reString) {
      console.log(`name    : ${name}`);
      console.log(`reString: ${reString}`);
      throw new Error();
    }
    console.log(`Passed: ${name}`);
  }

  genericTest("u8");
  genericTest("vector<u8>");
  genericTest("vector<address>");
  genericTest("vector<u128>");
  genericTest("vector<0x1::M::s>");
  genericTest(
    "0x1::M::S<0x1::M::s, u8, 0x2::MM::TT, 0x2::MM::TT<u8, address, 0x2::M::T>, address, vector<0x1::M::S<u8>>>"
  );
  genericTest(
    "0x1::M::S<0x1::M::s, u8, 0x2::MM::TT, 0x2::MM::TT<u8,address,0x2::M::T>, address, vector<0x1::M::S<u8>>>",
    false
  );
  genericTest(
    "0xfff29aab::sss::lV3<0xfff2775c19aab::coins::CoinA, 0xfff2775c19aab::coins::CoinB>"
  );
}
