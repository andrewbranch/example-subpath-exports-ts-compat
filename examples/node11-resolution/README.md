# node11-resolution

This example project compiles under `--moduleResolution node`, which reflects the resolution algorithm present in Node 11 (and will possibly be renamed or aliased to `node11` in a future version of TypeScript).

Volta users can automatically run this test in Node 11. It will fail because the [`types-versions-wildcards`](../node_modules/types-versions-wildcards) strategy is intentionally incompatible with Node 11. Also note that type checking with `npm run build` verifies that the assertions are correct (or possibly correct, in the case where type definitions are shared between ESM and CJS entrypoints). You can experiment with changing the assertions such that TypeScript issues an error:

```ts
import extensionless from "extensionless";
assert(extensionless === "extensionless/index.js"); // ok
assert(extensionless === "boop!");
//     ^^^^^^^^^^^^^^^^^^^^^^^^^
// ts(2367): This comparison appears to be unintentional because the
// types '"extensionless/index.js"' and '"boop!"' have no overlap.
```
