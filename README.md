# TypeScript-friendly strategies for package.json subpath exports compatibility

Many npm libraries are eager to use [subpath exports](https://nodejs.org/api/packages.html#subpath-exports), but support is not universal. This repository demonstrates three strategies for libraries that wish to use subpath exports while providing fallbacks for module resolvers that don’t support them. Each is compatible with TypeScript under `--moduleResolution node` and `--moduleResolution node16` (as well as `nodenext` at the time of writing).

## Why care about old module resolvers?

Support for subpath exports is included in Node versions 12 and later. While many library authors are fine with dropping support for Node 11 and earlier, many TypeScript users on more recent versions of Node have not yet updated their `moduleResolution` setting, and are still type-checking their projects as if it will run on Node 11 or earlier.

Moreover, bundler users who write TypeScript are typically unable to use `--moduleResolution node16` due to significant differences between bundler resolution and Node 16 resolution, and an appropriate `moduleResolution` option for bundlers does [not exist yet](https://github.com/microsoft/TypeScript/issues/50152).

TypeScript is working on these problems, but library authors can ease a lot of compatibility pain by employing one of these strategies in the meantime.

Finally, at least two still-widely-used bundlers, Parcel and Browserify, do not support subpath exports, so any library that relies on them without a fallback strategy will be unusable by users of these bundlers, whether they use TypeScript or not.

## How this repository is structured

The [`examples`](./examples) directory contains two small TypeScript projects, compiled under different `moduleResolution` settings, that consume three hand-written libraries in [`examples/node_modules`](./examples/node_modules). Each of these three libraries is named for the subpath exports fallback strategy it uses, and has a nested README that discusses the strategy in detail:

- [`extensionless`](./examples/node_modules/extensionless)
- [`package-json-redirects`](./examples/node_modules/package-json-redirects)
- [`types-versions-wildcards`](./examples/node_modules/types-versions-wildcards)

Each of the two TypeScript projects successfully type checks with `npm run build`, demonstrating which types are found for each import. The output can be run in Node with `npm start`, where a series of assertions prove which implementation files Node finds. These projects also have nested READMEs:

- [`node11-resolution`](./examples/node11-resolution)
- [`node16-resolution`](./examples/node16-resolution)

## Strategy support matrix

Note that the [`types-versions-wildcard`](./examples/node_modules/types-versions-wildcards) fallback strategy is only  fallback for TypeScript, so it does not help users who are on Node 11 or other runtimes/bundlers that lack `exports` support. It is included because it is the only method that offers an analog to `*` wildcards in subpath `exports`.

| | [`extensionless`](./examples/node_modules/extensionless) | [`package-json-redirects`](./examples/node_modules/package-json-redirects) | [`types-versions-wildcards`](./examples/node_modules/types-versions-wildcards) |
|------------------------------------------------------|-----------------------|------------------|------------------|
| TypeScript `--moduleResolution node16`               | ✅ via `exports`      | ✅ via `exports` | ✅ via `exports` |
| TypeScript `--moduleResolution node`                 | ✅ via fallback       | ✅ via fallback  | ✅ via fallback  |
| Supports dual ESM/CJS type declarations for `node16` | ✅ via sibling lookup | no               | no               |
| Node 12+                                             | ✅ via `exports`      | ✅ via `exports` | ✅ via `exports` |
| Node 11                                              | ✅ via fallback       | ✅ via fallback  | ❌               |
| Most bundlers                                        | ✅ via `exports`      | ✅ via `exports` | ✅ via `exports` |
| Parcel, Browserify                                   | ✅ via fallback       | ✅ via fallback  | ❌               |
