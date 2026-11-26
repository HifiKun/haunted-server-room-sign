import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The funniest sign for the door of a haunted server room: the ghost in
// rack 3 has root access, and the last sysadmin who walked in without
// knocking got rm -rf'd. A warning sign, in the ghost's own voice.
const LINE =
  "HAUNTED SERVER ROOM: The ghost in rack 3 has root access. Knock first — it once rm -rf'd a sysadmin.";

function validate(line: string): void {
  if ([...line].length > 120) {
    throw new Error(`sign is ${[...line].length} characters, over the 120 limit`);
  }
  if (line.includes("\n") || line.trim().length === 0) {
    throw new Error("sign must be a single non-empty line");
  }
  if (/[\u0000-\u001f]/.test(line)) {
    throw new Error("sign must not contain control characters");
  }
}

validate(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read it back: the file the judge sees must be byte-identical to the line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the sign line");
}
