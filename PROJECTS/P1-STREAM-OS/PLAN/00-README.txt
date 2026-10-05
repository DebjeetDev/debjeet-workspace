==============================================================================
P1 — STREAM-OS
Smart TV ke liye free live TV
==============================================================================

    STATUS:   BILLING ENGINE — DONE (35/35 tests pass)
              TV APP         — PLANNED (Phase 5 se shuru)
              DEPLOY         — PENDING (aaj hoga)

    BOOK:     Book 1C — JavaScript Core Engine
    UPDATED:  Monday, 5 October 2026 (subah)


==============================================================================
1. EK LINE MEIN
==============================================================================

    Cable ke bina, apne Smart TV pe free live channels chalana.


==============================================================================
2. KAUNSI PROBLEM SOLVE KARTA HAI
==============================================================================

    - Cable ka bill:  Rs 400 - Rs 800 har mahine
    - OTT apps:       har ek ka alag subscription
    - STREAM-OS:      EK jagah, sab free channels

    Aur doosri asli problem:
        Internet pe 31,487 channels FREE hain,
        par Koi nahi jaanta ki kaunsa ABHI ZINDA hai.

        India ke 1,525 channels hain,
        sirf 766 ke paas working link hai.
        Aur un 766 mein se bhi 80-90% mare hote hain.

    Ye project un ZINDE channels ko dhoondh ke TV pe chalata hai.


==============================================================================
3. DATA SOURCE (Free, bina koi key ke)
==============================================================================

    https://iptv-org.github.io/api/channels.json
        31,487 channels, 7.6 MB

    https://iptv-org.github.io/api/streams.json
        18,139 video links, 3.6 MB

    Poori detail:  02-API-RESOURCES.txt


==============================================================================
4. MODULES (Phase ke hisaab se)
==============================================================================

    PHASE 4   Parental Control PIN Lock Vault
              STATUS: DONE  (Project #6 / Ticket FIN-204)
              File:   src/createSubscriptionEngine.js

    PHASE 5   10,000-Channel Filter Pipeline
              STATUS: AGLA (aaj/ kal shuru)
              Kaam:   .filter() se India + safe + HD channels

    PHASE 6   Channel + Stream .m3u8 Merger
              STATUS: PENDING
              Kaam:   channel ID se uska video link dhoondhna

    PHASE 7   Live Player
              STATUS: PENDING
              Kaam:   fetch() + AbortController + HLS.js


==============================================================================
5. INDIA KE LIYE ASLI NUMBERS (Verified 5 Oct 2026)
==============================================================================

    India channels ..................  1,525
    Jinke paas working stream hai ...    766
    1080p streams ...................  5,448 (global)
    720p streams ....................  4,953 (global)

    TERE KOLKATA KE CHANNELS (mil gaye):
        ABPAnanda.in      ZeeBangla.in      StarJalsha.in
        JalshaMovies.in   ColorsBangla.in   SonyAath.in
        News18Bangla.in   KolkataTV.in      RupasiBangla.in
        DhoomMusic.in


==============================================================================
6. IS FOLDER MEIN KYA HAI
==============================================================================

    00-README.txt           Ye file
    01-SPEC-BILLING.txt     FIN-204 ticket + poori teaching
    02-API-RESOURCES.txt    iptv-org API links + field details
    03-CODE-REVIEW.txt      4 bugs jo review mein mile
    04-TESTS.txt            Expected output (35 tests)
    05-DEPLOY.txt           GitHub + npm par kaise chadhana hai
    src/                    createSubscriptionEngine.js
    tests/                  test-suite.js
    docs/                   EXPECTED-OUTPUT.txt


==============================================================================
7. AAJ KA PEHLA KADAM (15 minute)
==============================================================================

    Is project ko GitHub + npm par chadhana.
    Steps:  05-DEPLOY.txt

    Uske baad (Phase 5):
        channels.json ko .filter() se India + safe + HD chaan-na


==============================================================================
8. IMANDAAR NOTE (Legal)
==============================================================================

    iptv-org khud stream NAHI chalata.
    Ye sirf publicly available links ka INDEX hai.

    - blocklist.json ZAROOR use karo (DMCA / NSFW channels)
    - Geo-blocked streams India se nahi chalengi
    - Personal use + learning + portfolio = THEEK HAI
    - Paid public app = pehle legal advice lo
==============================================================================
