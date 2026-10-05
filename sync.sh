#!/usr/bin/env bash
# ============================================================
# SYNC — mere (sandbox) se GitHub par push
# Use: ./sync.sh "message"
# ============================================================
set -euo pipefail
cd /home/user

MSG="${1:-auto backup: $(TZ='Asia/Kolkata' date '+%d %b %Y, %I:%M %p') IST}"

REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
if [ -z "$REMOTE" ]; then
  echo ""
  echo "REMOTE SET NAHI HAI."
  echo "  git remote add origin git@github.com:USERNAME/debjeet-workspace.git"
  echo ""
  exit 1
fi

git config user.name "Debjeet Dhar" 2>/dev/null || true
git config user.email "debjeet@users.noreply.github.com" 2>/dev/null || true

git add -A

if git diff --cached --quiet; then
  echo "Kuch badla nahi — backup already latest hai."
else
  git commit -q -m "$MSG"
  echo "Commit: $MSG"
fi

git push -u origin main
echo ""
echo "DONE — GitHub par safe hai."
