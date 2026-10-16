# Medical Device Cybersecurity Market — research notes
**Slug:** medical-device-cybersecurity-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| **Fortune Business Insights, *Medical Device Cybersecurity Solutions Market* (119283)** | last updated **28 September 2026**; study period 2021–2034, base year 2025 | 2025 | **$1.46B** (2026: **$1.69B**) | 2034 | $5.68B | **16.3%** (2026–2034) | "Software platforms, embedded controls, monitoring technologies and security services that protect connected medical devices, IoMT assets, clinical networks and device firmware", plus the data flows tied to those devices. Segmented by product type (connected device security platforms; device product security solutions; embedded/device-native security; cybersecurity services), by application (secure device development and **premarket cybersecurity**; device discovery and asset management; vulnerability and post-market risk management; runtime detection and response; network access control and microsegmentation; legacy and end-of-support device security), by technology (network/protocol intelligence, behavioural analytics, **SBOM analytics**, cryptography and trusted device identity, zero trust, security testing) and by deployment. **Read directly from the publisher's own page** |
| **Fortune Business Insights, *Medical Device Security Market* (115040)** | last updated **28 September 2026**; study period 2021–2034, base year 2025 | 2025 | **$7.29B** (2026: **$8.30B**) | 2034 | $22.69B | **13.39%** (2026–2034) | Same house, different report. Segmented by **offering** — solutions including *encryption, antivirus, identity and access management, disaster recovery and compliance management*, plus managed and professional services — by type (network and IoMT security, **endpoint, application, cloud**), and by end user (healthcare providers, **healthcare payers**, device manufacturers). **Read directly from the publisher's own page** |
| **IMARC Group, *Medical Device Security Market*** (SR112026A4841) | last updated **20 February 2026**; historical 2020–2025 | 2025 | **$12.4B** | 2034 | $34.5B | **11.66%** (2026–2034) | By device type (stationary, internally embedded, external devices and consumer wearables); by component — solutions (*IAM, antivirus/antimalware, encryption, data loss prevention, risk and compliance management, IDS/IPS, disaster recovery, DDoS*) and services; by deployment; by end user (healthcare institutions, device manufacturers, others); 5 regions, 16 named countries. States **North America over 43.6% of 2025**, United States **87.60%** (of North America), stationary devices 43.2%, solutions 68.2%, on-premises 58.9%, healthcare institutions 43.8%. **Read directly from the publisher's own page** |
| Mordor Intelligence, medical device security market | — | 2025 | **$7.87B** | 2031 | — | **15.24%** (2026–2031) | "Medical device security". **Read from a search summary — flagged** |
| Mordor Intelligence, a second medical device security report | — | 2025 | **$8.47B** | 2030 | $12.56B | **8.2%** | "Medical device security". Horizon stops at 2030; the two Mordor-attributed figures do not reconcile with each other. **Read from a search summary — flagged** |
| A services-only blog estimate | — | 2023 | ~$3.5B | — | — | ~18% | "Medical device cybersecurity services". Unsourced on its own page. **Recorded for range only, not used** |

## The spread

**At 2025, $1.46B to $12.4B — an 8.49x spread.** CAGRs run 8.2% to 16.3%, a 1.99x spread. On the
2034 endpoints the gap is $5.68B to $34.5B, 6.07x.

8.49x is the second-widest spread in this corpus after phage therapy's 33.2x, and in a market
where the buyers are listed hospitals and the sellers are venture-funded software companies that
is not a measurement problem. It is a definition problem, and **the definition problem is proved
inside one publishing house rather than inferred across several.**

Fortune Business Insights publishes **two reports, last updated on the same day — 28 September
2026 — that give two different sizes for the same base year.** $1.46B and $7.29B, a 4.99x gap, from
one publisher, on one date. That is not a disagreement. It is two scopes, and because both
scope tables are printed, the scopes can be read against each other:

| | *Medical Device Cybersecurity Solutions* ($1.46B) | *Medical Device Security* ($7.29B) |
|---|---|---|
| Product axis | Device security platforms, device-native/embedded security, SBOM analytics, trusted device identity, security testing | Encryption, antivirus/antimalware, **identity and access management**, **disaster recovery**, **compliance management** |
| Type axis | — | Network and IoMT security, **endpoint, application, cloud** |
| End user | Providers and manufacturers | Providers, manufacturers and **healthcare payers** |

The smaller report counts **products built for medical devices**: asset discovery on the clinical
network, firmware and SBOM analysis, device identity, premarket security engineering. The larger
one counts **general enterprise security bought by healthcare organisations** — antivirus,
endpoint, cloud, IAM, disaster recovery, and spend by payers, who own no medical devices at all.
IMARC's $12.4B is constructed the same way as the larger one, from the same component list
(IAM, antivirus, DLP, DDoS, disaster recovery), and lands 1.70x above it.

**So "the medical device cybersecurity market" as published is, in two of the four sources, the
healthcare cybersecurity market with the words "medical device" in the title.** The arithmetic
below shows which reading survives contact with a countable denominator.

## Grounding arithmetic

**Registers used:** the AHA Annual Survey hospital count (2024 survey, published as *Fast Facts on
U.S. Hospitals, 2026*); the HIMSS Healthcare Cybersecurity Survey distribution of cybersecurity
spend as a share of IT budget; FDA 510(k) clearance counts; and the one company-announced
recurring-revenue figure that exists in this vendor set.

### The registers

```
All US hospitals, AHA 2024 Annual Survey                       6,100
  of which community hospitals                                 5,121
Total US hospital admissions, same survey                 35,658,583

FDA 510(k) clearances, 2024                             3,082  (510kdatabase.net)
FDA 510(k) clearances, 2025                             3,195  (510kdatabase.net)
   alternate aggregator count, 2025                     3,225  (MedDeviceGuide)
AI/ML-enabled device authorisations, 2025                 295  (Innolitics)
```

(The 510(k) counts are **aggregator tallies of FDA's public 510(k) files, not an FDA-published
annual total**, and the two aggregators differ by 30–70 devices a year. **Flagged.** The AHA
counts are from AHA's own Fast Facts page.)

### Test 1 — dollars per US hospital per year, which is the decisive test

Each published global figure is localised using the only regional split any source in the set
publishes — **IMARC's own North America 43.6% and United States 87.60% of North America** — and
then divided by AHA's 6,100 hospitals. The split is IMARC's, applied to other publishers' totals
as a common yardstick; that is an assumption and it is labelled as one.

```
IMARC            $12.40B x 0.436 x 0.876  =  $4.736B  / 6,100  =  $776,000 per US hospital/yr
Fortune (Security) $7.29B x 0.436 x 0.876  =  $2.784B  / 6,100  =  $456,000 per US hospital/yr
Mordor             $8.47B x 0.436 x 0.876  =  $3.235B  / 6,100  =  $530,000 per US hospital/yr
Fortune (Solutions)$1.46B x 0.436 x 0.876  =  $0.558B  / 6,100  =   $91,000 per US hospital/yr
```

Now the plausibility question the brief asks: **would a hospital plausibly spend that on device
security alone?**

The HIMSS Healthcare Cybersecurity Survey (fielded late 2024, 273 healthcare cybersecurity
professionals, reported at HIMSS 2025) found healthcare organisations have traditionally spent
**6% or less of their IT budget on cybersecurity in total**, with about 30% of respondents
reporting more than 7% for 2025: 19% at 3–6%, 14% at 7–10%, 7% at 11–14% and 9% above 14%. 52%
said spending was rising, 28% flat, 10% falling. 20% have **no set cybersecurity line at all** and
add funds as needed, and 23% said they lacked good information on how their own cybersecurity
budget was allocated.

That last pair of figures is the heart of it. **A fifth of healthcare organisations cannot state
their total cybersecurity budget**, and these are the organisations IMARC's model has spending
$776,000 a year specifically on medical device security — a single category within a
cybersecurity budget that is itself 6% or less of IT.

```
$776,000 on medical device security alone, inside a total cybersecurity budget
that HIMSS respondents mostly put at 6% or less of IT spend, implies a hospital
cybersecurity budget of several million dollars of which device security is one line.
That describes a large academic health system, not the median of 6,100 hospitals,
1,797 of which AHA classifies as rural.
```

**$91,000 per hospital per year survives; $456,000 to $776,000 does not.** $91,000 is what an
IoMT security platform actually costs: these products are priced per connected device or per bed,
and a mid-size hospital with a five-figure device estate at single-digit dollars per device per
year lands in exactly that range. The three large figures describe the whole healthcare security
stack, which hospitals do buy — just not under this heading.

### Test 2 — the vendor sum, which points the same way

This vendor set barely discloses. One figure in it is company-announced:

| Company | Figure | Basis |
|---|---|---|
| **Armis** | **ARR passed $300M**, announced **August 2025**, up from $200M in under a year, >50% YoY growth | **Company announcement.** Armis is cross-industry exposure management across IT, OT **and** medical devices — healthcare is one vertical, not the whole business |
| Armis | ~$340M ARR, January 2026 | **Sacra, a third-party private-company estimator — flagged** |
| Armis | $6.1B valuation on a $435M pre-IPO round, late 2025; **ServiceNow agreed to acquire for $7.75B in cash**, announced late December 2025, expected to close in H2 2026 | Widely reported; **read from news aggregators rather than ServiceNow's own release — flagged** |
| **Claroty** | ">$200M annualised recurring revenue"; earlier round noted ARR passing $100M; **$150M Series F at a $3B valuation, January 2026** | **multiples.vc, a private-company data aggregator — not a company disclosure, flagged.** Claroty acquired **Medigate**, the first platform built specifically for healthcare IoT, alongside a $400M Series E; the product is now Claroty xDome |
| **Cynerio** | No revenue figure found | Private. Appears in KLAS's healthcare IoT security ranking with **n=15 respondents** |
| **Asimily** | No revenue figure found | Private. KLAS 2025 score 93.9; a vendor-authored 2026 roundup puts it at 96.6 against Claroty xDome at 92.1 (**vendor-authored — flagged**) |
| **Palo Alto Networks** | **No healthcare line is separately disclosed.** Palo Alto reports by product category (Network Security, Prisma Cloud, Cortex), not by vertical | We looked for a healthcare segment figure and there is none to cite |

The two largest names in connected-device security therefore total roughly **$500M of
cross-industry recurring revenue**, of which healthcare is a fraction nobody publishes.

```
$500M (Armis + Claroty, all verticals)  /  $1.46B  (Fortune Solutions)  =  34%
$500M (Armis + Claroty, all verticals)  /  $7.29B  (Fortune Security)   =   7%
$500M (Armis + Claroty, all verticals)  /  $12.40B (IMARC)              =   4%
```

34% of a category held by its two leading platforms, with Asimily, Cynerio, Ordr, Medcrypt, the
device manufacturers' own security programmes and a long tail of services firms taking the rest,
is a normal concentration for a software category of this age. **4% is not.** For IMARC's $12.4B
to be medical device security, 96% of it would have to sit with vendors that no buyer survey
ranks and no funding round has priced — or, far more likely, with Microsoft, CrowdStrike, Cisco
and Palo Alto selling general enterprise security to hospitals.

### Test 3 — the regulatory denominator, which bounds the manufacturer side

Section 524B was added to the Federal Food, Drug, and Cosmetic Act by the Consolidated
Appropriations Act, 2023 (FDORA), and took effect **29 March 2023**. Precision matters here,
because the requirement is narrower than it is usually described:

- It binds **sponsors of premarket submissions**, not hospitals and not device owners. The covered
  submission types are **510(k), PMA, PDP, De Novo and HDE**.
- It binds them only for a **"cyber device"** — one that (i) includes software validated, installed
  or authorised by the sponsor, (ii) has the ability to connect to the internet, and (iii) contains
  technological characteristics that could be vulnerable to cybersecurity threats.
- For such a device the sponsor must submit a **plan to monitor, identify and address postmarket
  vulnerabilities, including a coordinated vulnerability disclosure process**; design and maintain
  **processes giving reasonable assurance** the device and related systems are cybersecure; make
  **postmarket updates and patches** available on a regular cycle and out of cycle for critical
  vulnerabilities; and provide a **software bill of materials** covering commercial, open-source
  and off-the-shelf components.
- FDA stated in the Federal Register notice of **30 March 2023** (Docket FDA-2023-D-1030) that it
  generally did not intend to issue refuse-to-accept decisions on 524B grounds alone **before
  1 October 2023**, working with sponsors instead. After that date it may refuse to accept a
  deficient submission, and non-compliance is a prohibited act.
- The operative guidance is **FDA, *Cybersecurity in Medical Devices: Quality System
  Considerations and Content of Premarket Submissions*, issued 27 June 2025**, which supersedes
  the final guidance of 27 September 2023 and adds a section addressing 524B cyber devices.

So the countable obligation is per submission, not per device in service:

```
$1.46B (Fortune Solutions, 2025)  /  3,195 510(k) clearances in 2025  =  $457,000 per clearance
```

(510(k)s are not the whole denominator — PMAs, De Novos and HDEs are also covered, and not every
cleared device is a cyber device — so $457,000 is an upper bound on the per-submission figure, and
it ignores PMA/De Novo volume that would lower it.)

**$457,000 of security spend per cleared device is far more than premarket cybersecurity
engineering costs**, which tells us the solutions market is not primarily a compliance market. It
is predominantly **provider-side** — asset discovery and segmentation on hospital networks — with
manufacturer-side SBOM and security-engineering work the smaller and newer half. That is
consistent with Test 1: the $91,000-per-hospital figure is where the money is.

**What these tests are and are not.** They are scope and plausibility tests. They establish that
one publishing house printed a 4.99x disagreement with itself on a single date; that only the
smaller of the two scopes survives division by the AHA hospital register against HIMSS's measured
budget shares; and that the disclosed vendor revenue is a normal fraction of the smaller figure
and an implausible fraction of the larger ones. They do **not** establish the correct size of
either category. The 43.6%/87.60% regional split is IMARC's and is applied to other publishers'
totals as a yardstick, which is an assumption. The vendor sum mixes a company announcement with a
third-party estimate and counts cross-industry revenue against a healthcare market. HIMSS's
distribution is a survey of 273 self-selected professionals, not an audited budget series. And
dividing a global market total by a national hospital count compares differently constructed
numbers.

## What we publish

**Headline: $1.69B (2026) → $4.18B (2032) at 16.3%.**

Source: **Fortune Business Insights, *Medical Device Cybersecurity Solutions Market*, report
119283, last updated 28 September 2026**, which states **$1.46B for 2025, $1.69B for 2026**,
$5.68B for 2034 and a **16.3% CAGR for 2026–2034**, with a 2021–2034 study period and 2025 base
year. The 2026 base is **the publisher's own published 2026 figure**, not our interpolation. The
2032 endpoint is **derived by continuing the publisher's own stated rate** (1.69 × 1.163^6 =
4.18). Internal check: the implied rate between our endpoints is 16.30%, identical to Fortune's
stated rate.

Chosen because: (a) it is the only series in the set whose **stated scope is actually medical
device security** rather than healthcare enterprise security, and its scope table says so
explicitly — device-native security, SBOM analytics, trusted device identity, premarket
cybersecurity; (b) it is the only figure in the set that **survives the per-hospital test**, at
$91,000 per US hospital per year against $456,000–$776,000 for the others; (c) the two leading
platform vendors' disclosed revenue is **34% of it**, a credible concentration, against 4% of
IMARC's; and (d) it was **read directly from the publisher's own page**, with a stated
last-updated date and a published 2026 value, so no interpolation is needed at the base year.

Unit: USD Billion. Industry: Healthcare IT.

The report states plainly in `market_context`, `forecast_analysis` and `research_methodology` that
one publisher printed $1.46B and $7.29B for the same year on the same day, that the gap is a scope
boundary rather than a disagreement, that only the narrow reading survives division by the AHA
register, and that section 524B binds premarket sponsors rather than device owners.

## Do not publish

- **Vendor market share.** No vendor in this market discloses healthcare-specific revenue. Armis's
  $300M ARR is cross-industry; Claroty's ">$200M" is an aggregator's estimate; Cynerio, Asimily,
  Ordr and Medcrypt publish nothing; Palo Alto Networks reports by product category, not by
  vertical. `competitive_landscape[].market_share` omitted entirely. The ratios we do publish —
  $500M of cross-industry revenue at 34% of the narrow figure and 4% of the broad one — are stated
  in prose with both inputs named.
- **IMARC's regional and country figures** (North America over 43.6% of 2025, United States
  87.60%). We use them inside the grounding arithmetic as a labelled yardstick and publish none of
  them. They are one source's apportionment of a total this report's own arithmetic rejects.
  `regional_analysis` and `country_analysis` stay `[]`.
- **IMARC's component, device-type and deployment shares** (stationary devices 43.2%, solutions
  68.2%, on-premises 58.9%, healthcare institutions 43.8%). One source, one page, and attached to
  the total we rule out. Segmentation goes out as plain strings.
- **A per-hospital market size.** Our $91,000 is a global publisher total multiplied by another
  publisher's regional split and divided by a national hospital count. It is a labelled
  plausibility figure stated in prose and is never published as a price or a market size.
- **The KLAS and vendor-roundup scores** (Asimily 96.6 / Claroty 92.1 in a 2026 roundup; Asimily
  93.9, Claroty xDome n=34, Cynerio n=15 in KLAS 2025). The roundup is written by a competing
  vendor; the KLAS figures reached us through third-party pages, not KLAS. Named in the notes,
  published nowhere.
- **Sacra's $340M Armis ARR and multiples.vc's $200M Claroty ARR as disclosures.** They are
  third-party estimates of private companies. Used directionally inside Test 2, labelled, and not
  published as revenue.
- **A count of CISA ICS medical advisories (ICSMA).** CISA's advisory listing is rendered client-side
  and we could not retrieve a filtered annual total; the vendor whitepaper that tallies them gives
  **433 vulnerabilities across 2013–2024, about 200 of them at four vendors (Baxter, BD, Medtronic,
  Philips)**, and reports the monthly advisory rate up 386% since FDA's 2016 postmarket guidance and
  plateauing 2022–2024 — but an earlier edition of the same whitepaper cited 490% for the same
  claim, and it is a vendor source. **Too thin to use as a denominator.** No advisory count is
  published, and the per-advisory arithmetic the brief anticipated was not performed.
- **A Palo Alto Networks healthcare revenue line.** There is none. Stated as an absence rather
  than estimated.
- **The second Mordor figure as a separate observation.** Two Mordor-attributed series ($7.87B at
  15.24% and $8.47B to $12.56B at 8.2%) do not reconcile with each other, and both were read from
  search summaries. Recorded for range only.
- **The $3.5B services blog estimate.** Unsourced on its own page.

## Sources

1. **Fortune Business Insights, *Medical Device Cybersecurity Solutions Market*, report 119283** —
   **$1.46B (2025), $1.69B (2026), $5.68B (2034), 16.3% CAGR (2026–2034)**; study period 2021–2034,
   historical 2021–2024, base year 2025; **last updated 28 September 2026** (no original publication
   date stated on the page). Scope: software platforms, embedded controls, monitoring technologies
   and security services protecting connected medical devices, IoMT assets, clinical networks and
   device firmware. Product type: connected medical device security platforms; medical device
   product security solutions; embedded and device-native security; cybersecurity services.
   Application: secure device development and premarket cybersecurity; device discovery and asset
   management; vulnerability and post-market risk management; runtime threat detection and incident
   response; network access control and microsegmentation; legacy and end-of-support device
   security. Technology: network and protocol intelligence; behavioural analytics and AI/ML;
   software composition and SBOM analytics; cryptography and trusted device identity; zero trust;
   security testing and attack simulation. **Read directly from the publisher's page.**
   https://www.fortunebusinessinsights.com/medical-device-cybersecurity-solutions-market-119283
2. **Fortune Business Insights, *Medical Device Security Market*, report 115040** — **$7.29B (2025),
   $8.30B (2026), $22.69B (2034), 13.39% CAGR (2026–2034)**; historical 2021–2024, base year 2025;
   **last updated 28 September 2026 — the same date as source 1**. Segmented by offering (solutions:
   encryption, antivirus, identity and access management, disaster recovery, compliance management;
   plus managed and professional services), by type (network and IoMT security, endpoint,
   application, cloud, others), by end user (healthcare providers, healthcare payers, medical device
   manufacturers, others) and by region. Value in USD billion. **Read directly from the publisher's
   page.** https://www.fortunebusinessinsights.com/industry-reports/medical-device-security-market-115040
3. **IMARC Group, *Medical Device Security Market*, report SR112026A4841** — **$12.4B (2025), $34.5B
   (2034), 11.66% CAGR (2026–2034)**; historical period 2020–2025; **last updated 20 February 2026**.
   By device type (stationary; internally embedded; external devices and consumer wearables); by
   component (solutions — IAM, antivirus and antimalware, encryption, data loss prevention, risk and
   compliance management, IDS/IPS, disaster recovery, DDoS, others — and services); by deployment
   (on-premises, cloud); by end user (healthcare institutions, medical device manufacturers,
   others); 5 regions and 16 named countries. States North America over **43.6%** of 2025, United
   States **87.60%**, stationary devices 43.2%, solutions 68.2%, on-premises 58.9%, healthcare
   institutions 43.8%. **Read directly from the publisher's page.**
   https://www.imarcgroup.com/medical-device-security-market
4. **American Hospital Association, *Fast Facts on U.S. Hospitals, 2026*** — **6,100 total US
   hospitals**; **5,121 community hospitals** (2,984 nongovernment not-for-profit, 1,224
   investor-owned, 913 state/local government); 210 federal government hospitals; 656 nonfederal
   psychiatric; 113 other; community hospitals split **1,797 rural / 3,324 urban** in the table and
   1,805 / 3,336 in the infographic — **the two AHA presentations differ slightly, flagged**; total
   admissions **35,658,583**. Data from the **2024 AHA Annual Survey**. The 2025 edition reported
   6,093 total and 5,112 community hospitals on 2023 data. https://www.aha.org/statistics/fast-facts-us-hospitals-2017
   and https://www.aha.org/system/files/media/file/2026/02/Fast-Facts-on-US-Hospitals-2026-Infographics.pdf
5. **HIMSS Healthcare Cybersecurity Survey**, fielded late 2024, **273 healthcare cybersecurity
   professionals**, reported at HIMSS 2025 — healthcare organisations have traditionally spent **6%
   or less of their IT budget on cybersecurity**, with about **30% reporting more than 7% for 2025**:
   19% at 3–6%, 14% at 7–10%, 7% at 11–14%, 9% above 14%; **52% increasing, 28% flat, 10%
   decreasing**; **20% have no set cybersecurity amount** and add funds as needed; **23% said they
   lacked good information** on their own cybersecurity budget allocation; of those increasing
   spend, 57% put it into tools and only 34% into significant staff increases. **Read from HIPAA
   Journal's and Chief Healthcare Executive's reports of the survey, not from HIMSS's own
   publication — flagged; the two reports give slightly different groupings of the 11%-plus band.**
   https://www.chiefhealthcareexecutive.com/view/some-hospitals-are-spending-more-on-cybersecurity-but-not-always-on-staff-himss-2025
6. **Section 524B of the Federal Food, Drug, and Cosmetic Act**, added by the Consolidated
   Appropriations Act, 2023 (FDORA), **effective 29 March 2023** — applies to premarket submissions
   (510(k), PMA, PDP, De Novo, HDE) for a **"cyber device"**: software validated, installed or
   authorised by the sponsor; ability to connect to the internet; technological characteristics
   vulnerable to cybersecurity threats. Requires a postmarket vulnerability monitoring,
   identification and remediation plan including coordinated disclosure; processes giving reasonable
   assurance of cybersecurity; postmarket patches and updates on a cycle and out of cycle for
   critical vulnerabilities; and a software bill of materials. **Federal Register notice of 30 March
   2023, Docket FDA-2023-D-1030**: FDA generally did not intend to issue refuse-to-accept decisions
   on 524B grounds alone before **1 October 2023**. Non-compliance is a prohibited act.
   https://www.govinfo.gov/content/pkg/FR-2023-03-30/html/2023-06646.htm and
   https://www.crowe.com/insights/medical-device-cybersecurity-complying-with-section-524b
7. **FDA, *Cybersecurity in Medical Devices: Quality System Considerations and Content of Premarket
   Submissions*, final guidance issued 27 June 2025** — supersedes the final guidance of **27
   September 2023** (itself a replacement for FDA's 2014 premarket cybersecurity guidance) and adds
   **Section VII** addressing FDA's recommendations on section 524B for cyber devices. A separate
   refuse-to-accept policy document exists for cyber devices. **The June 2025 date was read from
   FDA's cybersecurity page as reported by Emergo by UL — flagged.**
   https://www.fda.gov/medical-devices/digital-health-center-excellence/cybersecurity and
   https://emergobyul.com/news/fda-releases-final-guidance-medical-device-cybersecurity
8. **FDA 510(k) clearance counts** — **3,082 in 2024** and **3,195 in 2025** per 510kdatabase.net,
   which tallies FDA's public 510(k) files; MedDeviceGuide's independent tally gives **3,129 (2024)
   and 3,225 (2025)** and states this is consistent with FDA's own reporting of roughly 3,100–3,300
   510(k) authorisations per fiscal year. Annual volume has been broadly flat for nearly two
   decades at 3,000–3,350, down from mid-1990s peaks above 5,400. Innolitics' 2025 review reports a
   record **295 AI/ML-enabled device authorisations in 2025**. **All aggregator counts, not an
   FDA-published annual total — flagged.** https://510kdatabase.net/clearances-2025 and
   https://meddeviceguide.com/blog/fda-510k-clearance-trends-over-time-analysis-2026
9. **Armis** — announced in **August 2025** that **annual recurring revenue passed $300 million**, up
   from $200 million in under a year, with growth above 50% year on year; valued at **$6.1 billion**
   on a **$435 million** pre-IPO round in late 2025; **ServiceNow agreed to acquire Armis for $7.75
   billion in cash**, announced late **December 2025**, ServiceNow's largest acquisition, funded from
   cash and debt, expected to close in **H2 2026** subject to regulatory approval. Sacra, a
   third-party estimator, put ARR at about **$340 million** in January 2026. Armis is cross-industry
   exposure management across IT, OT and medical devices; **no healthcare-only revenue is
   disclosed**. **The $300M milestone is a company announcement; the acquisition terms and the Sacra
   figure were read from news aggregators and a private-company estimator — flagged.**
   https://www.businesswire.com/news/home/20250804741988/de and https://therecord.media/servicenow-cyber-armis-acquisition
10. **Claroty** — ">$200 million annualised recurring revenue" per **multiples.vc, a private-company
    data aggregator, not a company disclosure — flagged**; ARR reported as passing $100 million at an
    earlier round; **$150 million Series F at a $3 billion valuation, January 2026**; acquired
    **Medigate**, described as the first security platform built specifically for healthcare IoT,
    alongside a **$400 million Series E**, with the product now sold as Claroty xDome.
    https://multiples.vc/private-comps/claroty and https://www.securityweek.com/claroty-raises-400-million-acquires-healthcare-iot-security-firm-medigate/
11. **KLAS Research, Healthcare IoT Security** — 2025 ranking lists Asimily at **93.9**, with Claroty
    xDome at **n=34** respondents and Cynerio at **n=15**; Cynerio appears in an older ranking at
    92.4. A **vendor-authored** 2026 roundup gives Asimily 96.6 and Claroty 92.1. **All read from
    third-party pages, not from KLAS; the roundup is written by a competing vendor — flagged, and
    published nowhere.** https://klasresearch.com/best-in-klas-ranking/healthcare-iot-security/2025/374
12. **Medcrypt, *What the Medical Device Industry Can Learn from Past Cybersecurity Vulnerability
    Disclosures* (2025 edition)** — counts **433 vulnerabilities across 2013–2024**, about **200 of
    them (roughly half) at four vendors: Baxter, Becton Dickinson, Medtronic and Philips**; states
    the monthly rate of ICS-CERT medical device advisories rose **386%** after FDA's 2016 postmarket
    guidance and plateaued from 2022 through 2024. **An earlier edition of the same whitepaper cited
    490% for the equivalent claim, and this is a vendor source — flagged, used for nothing.**
    https://www.medcrypt.com/cybersecurity-whitepapers/what-the-medical-device-industry-can-learn-from-past-cybersecurity-vulnerability-disclosures-2025
13. **CISA ICS medical advisories (ICSMA)** — CISA's advisory listing is rendered client-side and we
    could not retrieve a filtered annual total; the vendor facets we could read showed Philips,
    Becton Dickinson, Medtronic and Contec Health among the most-cited manufacturers, and
    **ICSMA-25-030-01** (Contec Health CMS8000 patient monitor, 25 February 2025) as an example
    entry. **No count obtained; no arithmetic performed on it.** https://www.cisa.gov/icsma
14. **Mordor Intelligence, medical device security** — $7.87B (2025) at **15.24%** for 2026–2031 in
    one report, and $8.47B (2025) to $12.56B (2030) at **8.2%** in another. **Both read from search
    summaries, and the two do not reconcile with each other — flagged.**
    https://www.mordorintelligence.com/industry-reports/global-medical-device-security-market-industry
15. **Palo Alto Networks** — reports revenue by product category (Network Security, Prisma Cloud,
    Cortex), **not by industry vertical**; no healthcare or medical-device line is separately
    disclosed. Recorded as an absence. https://investors.paloaltonetworks.com/
