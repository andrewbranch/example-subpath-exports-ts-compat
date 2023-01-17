import assert from "assert";
import extensionless from "extensionless";
import extensionlessOne from "extensionless/one";
import extensionlessTwo from "extensionless/two";
assert(extensionless === "extensionless/index.mjs");
assert(extensionlessOne === "extensionless/one.mjs");
assert(extensionlessTwo === "extensionless/two/index.mjs");

import { index as pjr } from "package-json-redirects";
import { one as pjrOne } from "package-json-redirects/one";
import { two as pjrTwo } from "package-json-redirects/two";
import { one as pjrWcOne } from "package-json-redirects/three/one.js";
import { two as pjrWcTwo } from "package-json-redirects/three/two.js";
assert(pjr === "package-json-redirects/esm/index.js");
assert(pjrOne === "package-json-redirects/esm/one.js");
assert(pjrTwo === "package-json-redirects/esm/two.js");
assert(pjrWcOne === "package-json-redirects/esm/one.js");
assert(pjrWcTwo === "package-json-redirects/esm/two.js");

import tvw from "types-versions-wildcards";
import tvwOne from "types-versions-wildcards/one";
import tvwTwo from "types-versions-wildcards/two";
assert(tvw === "types-versions-wildcards/dist/index.js");
assert(tvwOne === "types-versions-wildcards/dist/one.js");
assert(tvwTwo === "types-versions-wildcards/dist/two.js");

import "./main.cjs";
