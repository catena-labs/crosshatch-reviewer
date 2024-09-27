import { describe, expect, it } from "bun:test"
import { estractChangesFromDiff } from "./extract-changes-from-diff"

/**
 *  Diffs are in the following format, which has:
 * 1. a modified file
 * 2. a renamed file
 * 3. a new file
 * 4. a deleted file
 **/

const diff = `
diff --git a/path/to/file b/path/to/file
index 1234567..89abcdef 100644
--- a/path/to/file
+++ b/path/to/file
@@ -1,3 +1,4 @@
-old line 1
+new line 1
line 2
+new line 2
line 3
diff --git a/apps/mini-crosshatch/app/login/layout.tsx b/apps/mini-crosshatch/app/(auth)/layout.tsx
similarity index 100%
rename from apps/mini-crosshatch/app/login/layout.tsx
rename to apps/mini-crosshatch/app/(auth)/layout.tsx
diff --git a/apps/mini-crosshatch/components/ui/checkbox.tsx b/apps/mini-crosshatch/components/ui/checkbox.tsx
new file mode 100644
index 000000000..42b773c16
--- /dev/null
+++ b/apps/mini-crosshatch/components/ui/checkbox.tsx
@@ -0,0 +1,30 @@
+"use client"
+the rest of the new file
diff --git a/apps/mini-crosshatch/app/login/page.tsx b/apps/mini-crosshatch/app/login/page.tsx
deleted file mode 100644
index ad98df2fe..000000000
--- a/apps/mini-crosshatch/app/login/page.tsx
+++ /dev/null
@@ -1,56 +0,0 @@
-import Link from "next/link"
-the rest of the deleted file
`

describe("estractChangesFromDiff()", () => {
  it("works", () => {
    const result = estractChangesFromDiff(diff)

    expect(result).toEqual([
      "Changed 'path/to/file':\n-old line 1\n+new line 1\nline 2\n+new line 2\nline 3",
      "Renamed 'apps/mini-crosshatch/app/login/layout.tsx' to 'apps/mini-crosshatch/app/(auth)/layout.tsx'",
      "Changed 'apps/mini-crosshatch/components/ui/checkbox.tsx':\n+\"use client\"\n+the rest of the new file",
      "Deleted 'apps/mini-crosshatch/app/login/page.tsx'"
    ])
    console.log(result)
  })
})
