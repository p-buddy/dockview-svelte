import { expectTypeOf } from "vitest";
import Legacy from "./test-harness/Legacy.svelte";
import Runes from "./test-harness/Runes.svelte";
import { type ComponentExports, type ComponentProps, type ModifiedProps } from "./utils.svelte";

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

  type X = ModifiedProps<"dock", {}, {}, {}>;
};
