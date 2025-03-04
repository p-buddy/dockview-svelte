import { expectTypeOf } from "vitest";
import { type ComponentExports, type ComponentProps, } from "../utils/types.js";
import { type ModifiedProps } from "../utils/index.js";
import Legacy from "./Legacy.test.svelte";
import Runes from "./Runes.test.svelte";

export type ExpectedComponentProps = {
  stringProp: string;
  numberProp: number;
  optionalRecordProp?: Record<string, any>;
};

export type ExpectedComponentExports = {
  exportedVariable: "hello";
  exportedFunction: () => ExpectedComponentExports["exportedVariable"];
}


export const utilityTypes = () => {
  type LegacyProps = ComponentProps<typeof Legacy>;
  type RunesProps = ComponentProps<typeof Runes>;

  type ExpectedProps = {
    stringProp: string;
    numberProp: number;
    optionalRecordProp?: Record<string, any>;
  }

  expectTypeOf<LegacyProps>().toEqualTypeOf<ExpectedProps>();

  expectTypeOf<RunesProps>().toEqualTypeOf<ExpectedProps>();

  type LegacyExports = ComponentExports<typeof Legacy>;
  type RunesExports = ComponentExports<typeof Runes>;

  type ExpectedExports = {
    exportedVariable: "hello";
    exportedFunction: () => "hello";
  }

  expectTypeOf<LegacyExports>().toEqualTypeOf<ExpectedExports>();

  expectTypeOf<RunesExports>().toEqualTypeOf<ExpectedExports>();
};
