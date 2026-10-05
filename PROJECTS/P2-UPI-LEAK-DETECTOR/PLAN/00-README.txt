==============================================================================
P2 — UPI LEAK DETECTOR
"Tera paisa kahan beh raha hai?"
==============================================================================

    STATUS:   SPEC READY  |  CODE SHURU NAHI HUA
    BOOK:     Book 1C — JavaScript Core Engine, Phase 5
    SKILLS:   Sirf Phase 1-5 (arrays, .map, .filter, .reduce)
    UPDATED:  Monday, 5 October 2026 (subah)


==============================================================================
1. EK LINE MEIN
==============================================================================

    Apna UPI / bank statement daalo,
    aur dekho ki tune kahan paise barbaad kiye.


==============================================================================
2. KAUNSI PROBLEM SOLVE KARTA HAI
==============================================================================

    India mein UPI se har mahine ARABON transactions hote hain.
    India ke digital payments mein UPI ka 85% hissa hai.
    Merchant payments mein 86% transactions Rs 500 se KAM hain.

    Matlab: har chhota payment UPI se,
            par koi HISAB nahi rakhta.

    Result: Log har mahine Rs 4,000 - Rs 40,000 kho dete hain
            bhooli hui subscriptions aur duplicate charges mein.

    Ye tool wo sab pakadta hai.


==============================================================================
3. YE UNIQUE KYUN HAI (Market gap)
==============================================================================

    Jo tools hain aaj:
        spending-leak-agent      Python + FastAPI + Gemini
        subscriptionleakdetector Python
        Financial-leak-detector  React + Node + Gemini
        Subscription Overlap     React + LocalStorage

    JO KOI NAHI HAI:
        - Pure JavaScript
        - Zero dependencies (koi npm install nahi)
        - Offline (tera data tera computer se bahar nahi jata)
        - India / UPI ke liye bana hua

    YAHI TERI JAGAH HAI.


==============================================================================
4. DATA FORMAT (Object nahi — ARRAY!)
==============================================================================

    CSV jaisa: har transaction ek chhota array

        [  DIN,          MERCHANT,      AMOUNT  ]
           [0]             [1]            [2]

        const statement = [
          ["2026-06-01", "NETFLIX",       199],
          ["2026-06-03", "CHAI POINT",     30],
          ["2026-06-05", "ZOMATO",        240],
          ["2026-07-01", "NETFLIX",       199],
          ["2026-07-05", "ZOMATO",        310],
          ["2026-08-01", "NETFLIX",       199],
          ["2026-08-12", "GYM CULT",     1499],
          ["2026-08-12", "GYM CULT",     1499],   <- DUPLICATE!
          ["2026-09-01", "NETFLIX",       199],
          ["2026-09-14", "CHAI POINT",     30],
          ["2026-09-15", "CHAI POINT",     30],
          ["2026-09-16", "CHAI POINT",     30],
        ];

    Kyun array?
        - row[2] = amount    (ye Phase 5 Step 1 hai — tu jaanta hai)
        - Objects ka wait nahi karna padega (Phase 6)


==============================================================================
5. 4 TARAH KE LEAK (Kya pakdega)
==============================================================================

    LEAK 1  BHULI HUI SUBSCRIPTION
            Ek merchant 3+ baar, same price, 25-35 din ke gap
            -> "NETFLIX Rs 199/month = Rs 2,388 / year"

    LEAK 2  DUPLICATE CHARGE
            Same merchant + same amount + same din, do baar
            -> "GYM CULT Rs 1,499 do baar kata gaya!"
            (UPI mein fail hone ke baavjud debit ho jata hai)

    LEAK 3  CHAI-PANI LEAK
            Rs 100 se kam ke chhote payments ka total
            -> "Rs 4,200 saal ke, sirf chai-pani mein"

    LEAK 4  MERCHANT OVERSPEND
            Ek hi merchant par Rs 2,000 se zyada


==============================================================================
6. FUNCTIONS (Poori spec: 01-SPEC.txt)
==============================================================================

    1.  getAmounts(rows)            .map()
    2.  getTotalSpend(rows)         .reduce()
    3.  filterByMerchant(rows, n)   .filter()
    4.  findBigSpends(rows, limit)  .filter()
    5.  detectDuplicateCharges(rows)
    6.  detectSubscriptions(rows)
    7.  calculateSmallLeak(rows, limit)
    8.  buildReport(rows)

    HAR FUNCTION:
        - Guard clause pehle
        - Result Box: { status, ok, data } ya { status, ok, error }
        - Original array kabhi change nahi


==============================================================================
7. AAGLE 10 MINUTE MEIN KYA KARNA HAI
==============================================================================

    1.  file banao:   src/leak.js
    2.  Upar wala sample data paste karo
    3.  SIRF 2 FUNCTION LIKHO:

            getAmounts(rows)     -> .map()  -> amounts ki list
            getTotalSpend(rows)  -> .reduce() -> kul kharcha

    4.  console.log se check karo
    5.  Mujhe bhej do — main review karoonga

    BAS. ITNA HI. Baaki kal.


==============================================================================
8. STAGES (Syllabus ke saath)
==============================================================================

    STAGE 1  (Phase 5)    Functions 1-4     .map .filter .reduce
    STAGE 2  (Phase 5)    Functions 5-8     Poori report
    STAGE 3  (Phase 6)    Merchant grouping + categories
    STAGE 4  (Phase 7)    Asli CSV file padhna
    STAGE 5  (npm)        @debjeetdhar/upi-leak-detector


==============================================================================
9. YE ULTRON KA KYA BANEGA
==============================================================================

    ULTRON ka PERSONAL FINANCE MODULE.

    Aage chalkar ULTRON khud tera statement padhega
    aur bolega:  "Is mahine tune Rs 3,200 zyada kharch kiye."


==============================================================================
10. YAAD RAKH
==============================================================================

    Ye practice project NAHI hai.
    Ye tere asli paise bacha sakta hai.

    Aur jab tera khud ka tool bolega
        "Tune pichhle 6 mahine mein Rs 12,000 barbaad kiye"
    tab samajh aayega ki coding sirf naukri ke liye nahi hoti.
==============================================================================
