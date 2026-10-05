#!/usr/bin/env python3
"""
make-catalog.py — Poore workspace ka CATALOG.txt banata hai.
Kabhi bhi chalao:  python3 make-catalog.py
Har baar fresh, accurate map milega.
"""
import os
from datetime import datetime, timezone, timedelta

ROOT = "/home/user"
IST = timezone(timedelta(hours=5, minutes=30))

SKIP_DIRS = {".git", "node_modules", "uploads", "__pycache__", ".npm"}
SKIP_FILES = {".DS_Store"}

# Folder ke baare mein ek line
FOLDER_INFO = {
    "READING": "PADHNE ki library — course, roadmap, log, guides (sab plain .txt)",
    "PROJECTS": "BANANE ka kaam — har project ke PLAN/ aur CODE/ alag",
    "P1-STREAM-OS": "FLAGSHIP — Smart TV ke liye free live TV",
    "P2-UPI-LEAK-DETECTOR": "AGLA PROJECT — 'Tera paisa kahan beh raha hai?'",
    "PLAN": "Planning + Research docs (sirf txt, koi code nahi)",
    "CODE": "Asli code — src, tests, package.json",
    "docs": "Extra documents",
    "src": "Source code (jo kaam karta hai)",
    "tests": "Test files (jo check karta hai)",
    "audio": "Voice notes (Dubby Bhaiya ki audio)",
    "_SOURCE": "Purani/original files — safety ke liye rakhi hain",
    "_TEMPLATE": "Namuna — naya project shuru karne ka format",
    ".github": "GitHub Actions (CI + auto-publish)",
    "workflows": "CI/CD pipeline files",
    "uploads": "Teri original uploaded files (kabhi chhedi nahi gayi)",
}

# Har file ke baare mein ek line
FILE_INFO = {
    # ROOT
    "CATALOG.txt": "YHI FILE — poore workspace ka naksha (folder by folder)",
    "course.md": "POORA SYLLABUS — 11 Books + JS ke 10 Phases (source file)",
    "LEARNING-STATE.md": "Tu abhi kahan khada hai + tere rules (source file)",
    "LOG.md": "Roz ka engineering log — kya seekha, kaunsi galti hui",
    "make-catalog.py": "Ye CATALOG.txt banata hai. Kabhi bhi chalao: python3 make-catalog.py",
    "md2txt.py": "Markdown ko saaf plain text mein badalta hai",

    # ROOT (new)
    "sync.sh": "EK COMMAND — poora workspace GitHub par backup (./sync.sh)",
    ".gitignore": "Kya backup NAHI hoga (secrets, cache, junk)",
    "19-AUTO-PUSH-SSH.txt": "*** LIVE — main push karta hoon. Tu bole: 'push kar de' ***",
    "19-AUTO-PUSH-SSH.txt": "*** LIVE — main push karta hoon. Tu bole: 'push kar de' ***",
    "21-REDUCE-DEEP.txt": "Phase 5 aakhri method: .reduce() (analogy + Redux OSS review + 5 stages)",
    "24-STAGE5-REDUCE-SE-MAP-FILTER.txt": "*** AB YE KARO — Phase 5 aakhri stage: reduce se map + filter banao ***",
    "reduce-practice.js": "Debjeet ka reduce practice code (P2)",
    # READING
    "00-START-HERE.txt": "Sabse pehle ye padho — reading order + aaj tak ka summary",
    "01-COURSE-ROADMAP.txt": "Poora roadmap — 11 Books + career ladder + ULTRON",
    "02-LEARNING-STATE.txt": "Teri exact position + locked rules",
    "03-DAILY-LOG.txt": "Daily log (2 Oct se aaj tak) — plain text",
    "04-PROJECT-6-GUIDE.txt": "Project #6 ki poori teaching (syllabus order mein)",
    "05-GITHUB-PUSH-GUIDE.txt": "GitHub par pehli baar code chadhana — 13 step",
    "06-LAUNCH-CHECKLIST.txt": "4 step, 15 minute — GitHub + npm publish",
    "07-SYLLABUS-STATUS.txt": "Kaunsa code tera hai, kaunsa plumbing (Phase 8 / Book 7)",
    "08-REPO-README.txt": "Tere package ki public profile (GitHub pe dikhega)",
    "09-EXPECTED-OUTPUT.txt": "Test chalane ke baad screen par kya aana chahiye",
    "10-FULL-SYLLABUS.txt": "Poora course.md — plain text (1,700+ lines)",
    "11-DAILY-PLAN.txt": "Roz ka routine — subah JS, shaam 1 LeetCode",
    "12-LEETCODE-ENGLISH-DICTIONARY.txt": "Har problem ke English shabdon ka matlab",
    "13-PROBLEM-26-WALKTHROUGH.txt": "LeetCode #26 — super simple Hinglish walkthrough",
    "14-ULTRON-PROJECT-LADDER.txt": "17 projects — har ek ULTRON ka ek ang",
    "15-PROJECT-UPI-LEAK-DETECTOR.txt": "UPI project ki research + spec",
    "16-TODAY-05-OCT-2026.txt": "Aaj ka din — 4 kaam, time table ke saath",
    "17-STREAM-OS-API-LINKS.txt": "iptv-org API links + live verified data",

    # PROJECTS root
    "00-INDEX.txt": "PROJECTS folder ka index",
    "01-ULTRON-LADDER.txt": "17 projects ki ladder (ULTRON tak)",

    # P1 PLAN
    "00-README.txt": "Project kya hai, status, Kolkata channels",
    "01-SPEC.txt": "Jira ticket — kaunse functions, kya rules (CODE NAHI)",
    "02-API-RESOURCES.txt": "iptv-org API + asli data (31,487 channels, 766 India)",
    "03-CODE-REVIEW.txt": "4 bugs jo review mein mile + kya sikhha",
    "04-TESTS.txt": "Expected output — 35 tests",
    "05-DEPLOY.txt": "GitHub + npm par kaise chadhana hai",

    # P1 CODE
    "createSubscriptionEngine.js": "Billing engine — closure + brute-force lock (TERA CODE)",
    "test-suite.js": "35 tests, 7 parts",
    "package.json": "npm publish ke liye taiyaar",
    "README.md": "GitHub pe dikhega (badges ke saath)",
    "LICENSE": "MIT license",
    "SYLLABUS-STATUS.md": "Kaunsa code syllabus ke andar hai",
    "LAUNCH.md": "Deploy steps (markdown version)",
    "ci.yml": "Har push par tests chalata hai (Node 18/20/22)",
    "publish.yml": "Release par automatically npm par publish",
    "EXPECTED-OUTPUT.txt": "Test ka expected jawab",

    # TEMPLATE
    "00-HOW-TO-START.txt": "Naya project shuru karne ka poora format",
}


def human(n):
    return f"{n:,}"


def walk(dirpath, depth=1):
    """Folder ka tree + descriptions banata hai (nesting ke saath)."""
    lines = []
    try:
        entries = sorted(
            [e for e in os.listdir(dirpath)
             if e not in SKIP_DIRS and e not in SKIP_FILES
             and (not e.startswith(".") or e == ".github")],
            key=lambda x: (os.path.isfile(os.path.join(dirpath, x)), x.lower())
        )
    except (PermissionError, FileNotFoundError):
        return lines

    dirs = [e for e in entries if os.path.isdir(os.path.join(dirpath, e))]
    files = [e for e in entries if os.path.isfile(os.path.join(dirpath, e))]

    ind = "      " * depth

    for f in files:
        desc = FILE_INFO.get(f, "")
        lines.append(f"{ind}|-- {f}")
        if desc:
            lines.append(f"{ind}      -> {desc}")

    for d in dirs:
        info = FOLDER_INFO.get(d, "")
        lines.append(f"{ind}|")
        lines.append(f"{ind}|-- [DIR] {d}/")
        if info:
            lines.append(f"{ind}      -> {info}")
        sub = walk(os.path.join(dirpath, d), depth + 1)
        if sub:
            lines.extend(sub)
        else:
            lines.append(f"{ind}      (khali)")
    return lines


def main():
    now = datetime.now(IST)
    out = []
    A = out.append

    A("=" * 78)
    A("WORKSPACE CATALOG — DEBJEET DHAR")
    A("Poore workspace ka naksha: kahan kya hai")
    A("=" * 78)
    A("")
    A(f"  Banaya      : {now.strftime('%A, %d %B %Y')}")
    A(f"  Samay       : {now.strftime('%I:%M %p')} (Asia/Kolkata)")
    A(f"  Root        : {ROOT}")
    A("")
    A("  Ye file khud ban-ti hai. Naya kuch add karo, phir chalao:")
    A("      python3 make-catalog.py")
    A("")

    A("=" * 78)
    A("1. SABSE PEHLE — KAHAN KYA HAI (Quick Answer)")
    A("=" * 78)
    A("")
    A("    Padhna hai?                 ->  READING/00-START-HERE.txt")
    A("    Aaj ka plan?                ->  READING/16-TODAY-05-OCT-2026.txt")
    A("    Poora syllabus?             ->  READING/01-COURSE-ROADMAP.txt")
    A("    Code likhna hai?            ->  PROJECTS/P1-STREAM-OS/CODE/")
    A("                                    PROJECTS/P2-UPI-LEAK-DETECTOR/CODE/")
    A("    Project ka plan?            ->  PROJECTS/P1-STREAM-OS/PLAN/")
    A("                                    PROJECTS/P2-UPI-LEAK-DETECTOR/PLAN/")
    A("    ULTRON ka raasta?           ->  PROJECTS/01-ULTRON-LADDER.txt")
    A("    TV ke API links?            ->  PROJECTS/P1-STREAM-OS/PLAN/02-API-RESOURCES.txt")
    A("    Voice note sunna hai?       ->  audio/")
    A("    Course ki asli file?        ->  course.md")
    A("")

    A("=" * 78)
    A("2. DO BADA Hissa")
    A("=" * 78)
    A("")
    A("    READING/     =  PADHNE ki library")
    A("                    Course, roadmap, daily log, guides, dictionary")
    A("                    (sab plain .txt — koi markdown nahi)")
    A("")
    A("    PROJECTS/    =  BANANE ka kaam")
    A("                    Har project ke do hisse:")
    A("                      PLAN/  = planning + research (sirf txt, koi code nahi)")
    A("                      CODE/  = asli code (src, tests)")
    A("")

    A("=" * 78)
    A("3. POORA TREE — Folder by Folder")
    A("=" * 78)
    A("")
    A("  /home/user/")
    A("  |")
    for line in walk(ROOT, depth=1):
        A(line)
    A("")

    # counts
    total_files = 0
    total_dirs = 0
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        total_dirs += len(dirnames)
        total_files += len([f for f in filenames if f not in SKIP_FILES])

    A("=" * 78)
    A("4. HISAB")
    A("=" * 78)
    A("")
    A(f"    Total files    : {total_files}")
    A(f"    Total folders  : {total_dirs}")
    A("")

    # Reading folder count
    rp = os.path.join(ROOT, "READING")
    if os.path.isdir(rp):
        A(f"    READING/       : {len(os.listdir(rp))} files (numbered 00 se aage)")
    pp = os.path.join(ROOT, "PROJECTS")
    if os.path.isdir(pp):
        A(f"    PROJECTS/      : {len(os.listdir(pp))} items")
    ap = os.path.join(ROOT, "audio")
    if os.path.isdir(ap):
        A(f"    audio/         : {len(os.listdir(ap))} voice notes")
    A("")

    A("=" * 78)
    A("5. NOTE")
    A("=" * 78)
    A("")
    A("    - 'uploads/' isme hai: teri original uploaded files.")
    A("      Kabhi chhedi nahi gayi. Wahan se sab kuch aaya.")
    A("")
    A("    - '_SOURCE/' isme hai: purani files jo ab READING/ ya")
    A("      PROJECTS/ mein copied hain. Safety ke liye rakhi hain.")
    A("")
    A("    - '.git/' folders chhupi hain (git ka khud ka data).")
    A("      Unhe haath mat lagana.")
    A("")
    A("=" * 78)
    A("Koi bhi file dhoondhni ho -> yahan dekh lo. Mil jayegi.")
    A("=" * 78)

    text = "\n".join(out)
    with open(os.path.join(ROOT, "CATALOG.txt"), "w", encoding="utf-8") as f:
        f.write(text)
    print(f"CATALOG.txt ban gaya — {len(text)} chars, {len(out)} lines")


if __name__ == "__main__":
    main()
