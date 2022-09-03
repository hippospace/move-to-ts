export type TypeTagString = string;

export type JsonStructFieldType = {
  name: string;
  type: TypeTagString;
};

export type JsonNamedConstantType = {
  name: string;
  type: TypeTagString;
  value: string;
};

export type JsonAbilityType = "key" | "store" | "copy" | "drop";

export type JsonTypeParamType = {
  name: string;
  abilities: JsonAbilityType[];
  is_phantom: boolean;
};

export type JsonStructType = {
  name: string;
  abilities: JsonAbilityType[];
  type_params: JsonTypeParamType[];
  fields: JsonStructFieldType[];
};

export type JsonFuncParamType = {
  name: string;
  type: TypeTagString;
};

export type JsonFuncType = {
  name: string;
  type_params: JsonTypeParamType[];
  params: JsonFuncParamType[];
};

export type JsonModuleType = {
  address: string;
  module: string;
  constants: JsonNamedConstantType[];
  structs: JsonStructType[];
  script_functions: JsonFuncType[];
};
