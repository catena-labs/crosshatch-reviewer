import { compact } from "es-toolkit/array"

export function estractChangesFromDiff(diff: string) {
  return compact(
    diff
      .split(/diff --git /)
      .slice(1) // ignore first item as it's an empty string before the first "diff --git"
      .map((file) => {
        const [fileHeader, ...lines] = file.split("\n")
        if (!fileHeader || !lines.length) {
          return
        }

        /* fileHeader is of format: `a/path/to/file b/path/to/file` */
        const filenames = fileHeader
          .split(" ")
          .map((filename) => filename.slice(2))
        const filenameA = filenames[0] ?? "a file"
        const filenameB = filenames[1] ?? "a file"

        // If the file was deleted, note it and go to the next diff
        if (lines[0]?.startsWith("deleted")) {
          return `Deleted '${filenameA}'`
        }

        // if the file was renamed with no changes, note it and go to the next diff
        if (lines[0]?.startsWith("similarity index 100%")) {
          return `Renamed '${filenameA}' to '${filenameB}'`
        }

        const changes = []

        // If the file was renamed, note it and continue to see if there are
        // also code changes.
        if (lines[1]?.startsWith("rename")) {
          changes.push(`Renamed '${filenameA}' to '${filenameB}' and changed:`)
        } else {
          // Otherwise, add the filename as a marker
          changes.push(`Changed '${filenameA}':`)
        }

        // Find all non-empty changes
        removeDiffHeader(lines).forEach((line) => {
          if (line.startsWith("@@")) {
            return
          }

          // If this is an actual diff
          if (line.startsWith("+") || line.startsWith("-")) {
            const trimmedLine = line.trim()
            if (trimmedLine !== "+" && trimmedLine !== "-") {
              changes.push(trimmedLine)
            }

            return
          }

          const trimmedLine = line.trim()
          if (trimmedLine === "") {
            return
          }

          changes.push(trimmedLine)
        })

        return changes.join("\n")
      })
  )
}

/**
 * Removes all lines from a diff until the first '@@' line, which marks
 * the beginning of the actual diff.
 */
function removeDiffHeader(lines: string[]) {
  const index = lines.findIndex((element) => element.startsWith("@@"))
  if (index === -1) {
    return []
  }

  return lines.slice(index)
}
