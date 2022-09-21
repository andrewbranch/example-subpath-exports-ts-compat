# node16-resolution

This example project compiles under `--moduleResolution node16`, which reflects the resolution algorithm present in Node 16. (At the time of writing, `nodenext` is identical to `node16`, but will be updated in future versions of TypeScript if Node introduces module resolution changes into later versions of Node.)

Both a `.mts` and `.cts` file are included to show that the correct entrypoints are found in the libraries that ship separate CJS and ESM files, but this does not actually impact how subpath exports work.

Volta users can automatically run this test in Node 16. Also note that type checking with `npm run build` verifies that the assertions are correct (or possibly correct, in the case where type definitions are shared between ESM and CJS entrypoints). You can experiment with changing the assertions such that TypeScript issues an error:

```ts
import extensionless from "extensionless";
assert(extensionless === "extensionless/index.js"); // ok
assert(extensionless === "boop!");
//     ^^^^^^^^^^^^^^^^^^^^^^^^^
// ts(2367): This comparison appears to be unintentional because the
// types '"extensionless/index.js"' and '"boop!"' have no overlap.
```