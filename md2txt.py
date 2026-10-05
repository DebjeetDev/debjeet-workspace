#!/usr/bin/env python3
"""
md2txt.py — Convert markdown files into CLEAN, PLAIN, READABLE text.
Made for Debjeet Dhar (he can't read .md rendering, wants plain text).
"""
import re
import sys
import os

EMOJI_KEEP = True


def strip_bold(line: str) -> str:
    line = re.sub(r"\*\*(.+?)\*\*", r"\1", line)
    line = re.sub(r"__(.+?)__", r"\1", line)
    line = re.sub(r"`([^`]+)`", r"\1", line)
    return line


def convert_heading(line: str) -> str:
    m = re.match(r"^(#{1,6})\s+(.*)$", line)
    if not m:
        return None
    level = len(m.group(1))
    text = strip_bold(m.group(2)).strip()
    text = re.sub(r"\s*\{[^}]*\}\s*$", "", text).strip()
    if level == 1:
        return f"\n{'=' * 78}\n{text.upper()}\n{'=' * 78}\n"
    if level == 2:
        return f"\n{'-' * 78}\n{text.upper()}\n{'-' * 78}\n"
    if level == 3:
        return f"\n{text}\n{'~' * len(text)}\n"
    return f"\n  > {text}\n"


def is_table_sep(line: str) -> bool:
    s = line.strip()
    return s.startswith("|") and set(s.replace("|", "").replace(":", "").replace("-", "").strip()) == set()


def convert_table_row(line: str) -> str:
    cells = [c.strip() for c in line.strip().strip("|").split("|")]
    cells = [strip_bold(c) for c in cells]
    cells = [re.sub(r"\s+", " ", c).strip() for c in cells]
    return "  |  ".join(c for c in cells if c != "")


def convert(src: str, dst: str) -> None:
    with open(src, "r", encoding="utf-8") as f:
        raw = f.read()

    out = []
    in_code = False
    for line in raw.split("\n"):
        stripped = line.strip()

        # code fences
        if stripped.startswith("```"):
            in_code = not in_code
            out.append("")
            continue
        if in_code:
            out.append("      " + line)
            continue

        # headings
        h = convert_heading(line)
        if h is not None:
            out.append(h)
            continue

        # table separator -> dashed line
        if is_table_sep(line):
            continue
        # table row
        if stripped.startswith("|"):
            out.append(convert_table_row(line))
            continue

        # horizontal rule
        if re.match(r"^\s*([-=*_])\1{2,}\s*$", stripped) and set(stripped) <= set("-=*_ "):
            out.append("-" * 78)
            continue

        # bullets
        m = re.match(r"^\s*([-*+])\s+(.*)$", line)
        if m:
            indent = len(line) - len(line.lstrip())
            body = strip_bold(m.group(2))
            body = body.replace("[x]", "[DONE]").replace("[X]", "[DONE]")
            pad = "  " * (indent // 2)
            out.append(f"{pad}  - {body}")
            continue

        # numbered
        m = re.match(r"^\s*(\d+)\.\s+(.*)$", line)
        if m:
            indent = len(line) - len(line.lstrip())
            body = strip_bold(m.group(2)).replace("[x]", "[DONE]")
            pad = "  " * (indent // 2)
            out.append(f"{pad}{m.group(1)}. {body}")
            continue

        # blockquote
        if stripped.startswith(">"):
            out.append("    " + strip_bold(stripped.lstrip("> ").strip()))
            continue

        # normal
        line = strip_bold(line)
        line = line.replace("[x]", "[DONE]")
        out.append(line.rstrip())

    text = "\n".join(out)

    # kill back-to-back separator lines (empty sections)
    cleaned = []
    last_was_sep = False
    for ln in text.split("\n"):
        is_sep = bool(re.fullmatch(r"[-=]{20,}", ln.strip()))
        if is_sep and last_was_sep:
            continue
        cleaned.append(ln)
        if ln.strip():
            last_was_sep = is_sep
    text = "\n".join(cleaned)

    # collapse multiple blank lines to one
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+\n", "\n", text)

    with open(dst, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"OK  {src}  ->  {dst}  ({len(text)} chars)")


if __name__ == "__main__":
    pairs = [
        ("/home/user/LEARNING-STATE.md", "/home/user/READING/02-LEARNING-STATE.txt"),
        ("/home/user/LOG.md", "/home/user/READING/03-DAILY-LOG.txt"),
        ("/home/user/GITHUB-PUSH-GUIDE.md", "/home/user/READING/05-GITHUB-PUSH-GUIDE.txt"),
        ("/home/user/stream-os-engine/LAUNCH.md", "/home/user/READING/06-LAUNCH-CHECKLIST.txt"),
        ("/home/user/stream-os-engine/SYLLABUS-STATUS.md", "/home/user/READING/07-SYLLABUS-STATUS.txt"),
        ("/home/user/stream-os-engine/README.md", "/home/user/READING/08-REPO-README.txt"),
        ("/home/user/EXPECTED-OUTPUT-Project6.txt", "/home/user/READING/09-EXPECTED-OUTPUT.txt"),
    ]
    os.makedirs("/home/user/READING", exist_ok=True)
    for s, d in pairs:
        if os.path.exists(s):
            convert(s, d)
        else:
            print(f"SKIP (missing) {s}")
