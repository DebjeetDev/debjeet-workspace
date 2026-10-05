#!/usr/bin/env bash
# ============================================================
# SYNC — sandbox se GitHub par backup
# Use: ./sync.sh "message"
#
# IMPORTANT: .git/config snapshot mein SAVE NAHI hota
# (security rule). Isliye har baar remote + identity
# khud se wapas set karta hoon. Isse "origin does not
# appear to be a git repository" error kabhi nahi aayega.
# ============================================================
set -euo pipefail
cd /home/user

MSG="${1:-auto backup: $(TZ='Asia/Kolkata' date '+%d %b %Y, %I:%M %p') IST}"
REMOTE_FILE="/home/user/.git-remote"

# ---- 1. IDENTITY (har baar set karo) ----
git config user.name  "Debjeet Dhar"
git config user.email "debjeet@users.noreply.github.com"

# ---- 2. REMOTE (gaya ho to wapas lao) ----
if ! git remote get-url origin >/dev/null 2>&1; then
  if [ -f "$REMOTE_FILE" ]; then
    URL=$(tr -d ' \n\r' < "$REMOTE_FILE")
    git remote add origin "$URL"
    echo "  [auto] remote wapas set kiya: $URL"
  else
    echo ""
    echo "REMOTE NAHI MILA."
    echo "  echo 'git@github.com:DebjeetDev/debjeet-workspace.git' > /home/user/.git-remote"
    echo ""
    exit 1
  fi
fi

# ---- 3. ADD ----
git add -A

# ---- 4. COMMIT ----
if git diff --cached --quiet; then
  echo "  Kuch badla nahi — backup already latest hai."
else
  git commit -q -m "$MSG"
  echo "  Commit: $MSG"
fi

# ---- 5. PUSH ----
git push -u origin main
echo ""
echo "  DONE — GitHub par safe hai."
