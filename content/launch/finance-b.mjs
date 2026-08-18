import { categories, defineArticle, faq, reviewers, section, serviceCtas, source, table, topicIds } from "./content-model.mjs";

const bisIso = source("Harmonised ISO 20022 data requirements for enhancing cross-border payments", "Bank for International Settlements Committee on Payments and Market Infrastructures", "https://www.bis.org/cpmi/publ/d230.htm");
const bisCrossBorder = source("The next-generation monetary and financial system", "Bank for International Settlements", "https://www.bis.org/publ/arpdf/ar2026e.pdf");
const bisStablecoin = source("Stablecoins and cross-border payments", "Bank for International Settlements", "https://www.bis.org/publ/bppdf/bispap167.htm");
const fatfFraud = source("Cyber-enabled fraud: digitalisation and illicit-finance risks", "Financial Action Task Force", "https://www.fatf-gafi.org/en/publications/Methodsandtrends/cyber-enabled-fraud-digitalisation-ml-tf-pf-risks.html");
const finCenBec = source("Updated Advisory on Email Compromise Fraud Schemes", "Financial Crimes Enforcement Network", "https://www.fincen.gov/resources/advisories/fincen-advisory-fin-2019-a005");
const ifrsJurisdictions = source("IFRS Sustainability Disclosure Standards around the world", "IFRS Foundation", "https://www.ifrs.org/ifrs-sustainability-disclosure-standards-around-the-world/");
const ifrsSmeGuide = source("Voluntarily applying ISSB Standards", "IFRS Foundation", "https://www.ifrs.org/ifrs-sustainability-disclosure-standards-around-the-world/voluntarily-applying-issb-standards/");

export const financeArticlesB = [
  defineArticle({
    order: 5,
    category: "Finance",
    categoryId: categories.Finance,
    topicIds: topicIds.infrastructure,
    title: "ISO 20022 and Cross-Border Payments: What SMEs Need to Know",
    slug: "iso-20022-cross-border-payments-for-smes",
    excerpt: "ISO 20022 makes payment data richer and more structured, giving SMEs a reason to improve beneficiary, invoice, purpose, and reconciliation information now.",
    reviewerId: reviewers.sayyam,
    primaryQuery: "ISO 20022 cross border payments for SMEs",
    relatedQueries: ["ISO 20022 explained for business", "cross border payment data requirements", "ISO 20022 invoice reconciliation", "SME payment modernization"],
    seoTitle: "ISO 20022 for SME Cross-Border Payments",
    seoDescription: "Learn what ISO 20022 changes for SME cross-border payments and how to improve payment data, beneficiary controls, reconciliation, and bank readiness.",
    plannedPublishedAt: "2026-08-18T14:00:04.000Z",
    hero: {
      alt: "Structured amber payment packets crossing a graphite world grid between ivory business ledgers",
      caption: "ISO 20022 creates a shared structure for richer payment information across systems.",
      prompt: "Wide 16:10 premium editorial illustration. Structured amber data packets travel across a subtle graphite world grid between two ivory SME ledgers, precise modular fields, orderly and trustworthy, no text, no numbers, no flags, no people, deep graphite background, restrained amber illumination, LedgerByte brand aesthetic.",
    },
    inlineDiagram: {
      afterSection: 3,
      alt: "Flow diagram showing an invoice, structured payment fields, banks, recipient, and automated reconciliation",
      caption: "A complete payment data chain helps information survive from invoice to reconciliation.",
    },
    directAnswer: "ISO 20022 is a global financial-messaging standard that carries payment information in consistent, structured fields. It does not make every transfer instant or remove fees, but it can help banks and businesses preserve beneficiary, invoice, purpose, and remittance data across a cross-border payment chain. For an SME, the immediate task is practical: clean customer and supplier master data, capture complete payment instructions, test bank and software exports, preserve identifiers end to end, and improve reconciliation rules. The exact fields and implementation dates depend on the bank, network, and jurisdiction.",
    sections: [
      section("What ISO 20022 changes—and what it does not", [
        "Traditional payment messages often compress information into short free-text fields. ISO 20022 uses a shared business model and structured elements for parties, accounts, agents, purpose, remittance, and other details. The BIS Committee on Payments and Market Infrastructures has published harmonized data requirements for cross-border use because different implementations can otherwise recreate fragmentation. Rich structure supports screening, routing, exception handling, analytics, and reconciliation when participants populate and preserve the fields correctly.",
        "The standard is a language, not a single rail or guarantee. A payment may still cross multiple intermediaries, currencies, time zones, and compliance processes. Settlement speed, transparency, cost, and finality depend on the service and institutions involved. An SME should therefore avoid the claim that an ISO 20022 label alone produces an instant, cheap, or error-free transfer. Its real opportunity is higher-quality data that can reduce manual repair and make payment status easier to understand.",
      ]),
      section("Why richer payment data matters to an SME", [
        "Complete information can connect a payment to the underlying business transaction. A customer can include a structured invoice reference; the recipient can match it automatically; finance can investigate only exceptions. Purpose codes and party information may reduce questions from providers. Consistent identifiers can help a shared-services team manage multiple entities and currencies. The benefit is strongest when the invoice, accounting record, payment file, bank message, and cash application all use compatible data rather than translating it into a note midway.",
        "Poor data becomes more visible too. Abbreviated legal names, outdated addresses, inconsistent account identifiers, duplicate suppliers, and vague remittance text can cause repairs or screening delays. A richer message does not correct an unreliable vendor master. It may simply carry the error farther. The migration is therefore partly a data-governance project: define authoritative fields, assign owners, validate changes, and reconcile the business system with bank requirements.",
      ]),
      section("Map the payment information chain", [
        "Choose several real payment journeys: paying an overseas supplier, receiving export revenue, settling an intercompany charge, refunding a customer, or paying a contractor. Document the invoice and contract fields, accounting record, approval, payment file, bank portal, intermediary messages, recipient statement, and final reconciliation. Identify where structured data is created, shortened, transformed, or lost. Ask the bank which channels and message variants apply rather than assuming the same behavior across portal entry, bulk file, API, and local clearing.",
        "Include returns and investigations. Determine which identifier appears when a payment is rejected, charged, partially received, or returned. Confirm how fees are represented and whether the recipient receives the full remittance reference. A successful test should prove more than debit from the sender’s account. It should show that the intended recipient received the right value, the information remained usable, and both finance teams could reconcile the event without an informal email.",
      ]),
      section("Clean master data and strengthen change controls", [
        "Start with legal entity names, registered addresses, tax or organization identifiers where required, account names, account numbers or IBANs, bank identifiers, currencies, and country information. Remove obsolete records and establish one source of truth. Do not invent missing data merely to fill a field. Confirm requirements with the provider and counterparty. Where local scripts or transliteration are involved, test how systems preserve characters and which authoritative form the bank expects.",
        "Vendor-master fraud controls remain essential. A structured format can carry fraudulent details perfectly. Separate requests from approvals, verify bank changes through an independently known channel, restrict edit access, log changes, and apply dual control for sensitive suppliers. Compare the approved master record with the payment file immediately before release. Rich payment data should reinforce these controls rather than tempt the company to trust an automated file without independent validation.",
      ]),
      section("Test ERP, treasury, and banking interfaces", [
        "Inventory every application and file format involved. Ask software providers whether they generate or consume the bank’s required ISO 20022 message, which version they support, how optional fields map, and whether an upgrade changes behavior. Build a controlled test set covering currencies, countries, invoice references, special characters, multiple invoices, charges, returns, and rejected items. Compare the structured source with the bank’s accepted message and with data visible to the recipient.",
        "Do not treat a bank-portal test as proof that an automated integration works. APIs and files can apply different validation and cut-off rules. Check acknowledgment messages, error codes, retry behavior, duplicate prevention, and authorization. Preserve sample evidence and expected results so upgrades can be regression-tested. If a middleware provider transforms messages, document the mapping and assign responsibility for changes.",
      ]),
      section("Improve reconciliation without removing judgment", [
        "Use stable end-to-end references, structured remittance information, amount, currency, value date, and counterparty data to create matching rules. Begin in suggestion mode and measure false matches, missed matches, partial payments, deductions, credit notes, and aggregated settlements. A reference match should not override contradictory amount or counterparty information. Keep thresholds and exception reasons visible so finance understands why an item matched.",
        "Reconciliation design should cover bank fees, foreign-exchange differences, withholding, chargebacks, and returned payments. Route exceptions to owners with evidence and aging. The goal is not one hundred percent straight-through processing at any cost; it is reliable automation of unambiguous cases and faster investigation of the rest. Retain review and sign-off over accounts even when matching becomes highly automated.",
      ]),
      section("Ask providers precise readiness questions", [
        "Request the applicable migration timeline, channel, message version, mandatory and conditional fields, testing process, cut-off, fees, reporting, and support model. Ask whether data survives every correspondent or clearing step, how the bank handles incomplete messages, and which identifiers appear in status reports. For incoming payments, confirm what information is delivered to statements, APIs, or reporting files. Document answers by country and entity because one banking group may implement differently across markets.",
        "Finally, set ownership across finance, treasury, IT, procurement, sales operations, and data protection. Review changes through normal release management, train payment preparers and approvers, and monitor rejection and repair rates after migration. ISO 20022 readiness is complete only when the business process—not merely a file—continues to operate, reconcile, and evidence decisions safely.",
        "Measure a small baseline before the change: manual repairs, rejected payments, missing remittance details, reconciliation time, investigations, and fees. Repeat the measures after implementation and separate migration noise from durable improvement. Better structure may initially expose more errors because validation is stronger. Treat those failures as data-quality work rather than pressure to bypass required fields. Publish a short internal data dictionary so staff understand what each critical field means and where its authoritative value originates.",
        "Coordinate with key customers and suppliers. Share reference and invoice conventions, confirm legal names and account information through controlled channels, and test the information they can actually see. An SME cannot create end-to-end benefit alone if the counterparty discards references or sends unstructured instructions. For multinational counterparties, identify whether their regional treasury or shared-service center owns the data standard. Keep evidence of agreed conventions and revisit it when either side changes bank or software.",
        "Maintain fallback procedures during transition. Know how to create an approved manual payment, validate it, prevent duplicates, preserve structured information, and reconcile it later if a file or API fails. Define who can authorize fallback and how long it may remain active. Review fallback events for root cause. A migration is safer when continuity exists without quietly reopening the control weaknesses the new integration was meant to solve.",
        "Include the change in close and audit procedures. Finance should know which bank report is authoritative, how message identifiers map to statements, how fees and returns are posted, and which exceptions remain open at period end. Retain configuration approvals and test evidence alongside operating reconciliations. When a bank, ERP, or message version changes, repeat the critical cases rather than relying on a prior sign-off. This turns ISO 20022 from a technical migration into a maintained finance capability with visible accountability across every active bank and entity.",
      ]),
    ],
    table: table("ISO 20022 readiness checklist for SMEs", ["Workstream", "Evidence to produce", "Owner question"], [
      ["Bank requirements", "Channel, version, fields, dates, and test plan", "Which rule applies to each entity and payment type?"],
      ["Master data", "Validated party, account, bank, and address records", "Who approves and verifies sensitive changes?"],
      ["Systems", "Documented field mapping and regression cases", "Where is information transformed or lost?"],
      ["Operations", "Updated approvals, returns, and investigation process", "Can staff resolve an exception without informal workarounds?"],
      ["Reconciliation", "Measured match rules and exception categories", "Does automation preserve account ownership and sign-off?"],
    ]),
    faqs: [
      faq("Does ISO 20022 replace SWIFT?", "No. SWIFT and other networks can carry ISO 20022 messages. The standard defines structured financial information; it is not itself a bank, settlement asset, or universal payment network."),
      faq("Will every SME need to change its accounting software?", "Not necessarily. Some banks or providers translate portal entries or existing files, while others require new formats or fields. Ask each bank and software provider what changes apply to the channels your business actually uses, then test end to end."),
      faq("Does ISO 20022 stop payment fraud?", "No. Better structure can support screening and anomaly detection, but fraudulent beneficiary data can still be entered. Independent change verification, segregation of duties, secure access, payment approval, and monitoring remain necessary."),
    ],
    sources: [bisIso, bisCrossBorder, fatfFraud],
    serviceCta: serviceCtas.accountingAutomation,
  }),

  defineArticle({
    order: 6,
    category: "Finance",
    categoryId: categories.Finance,
    topicIds: topicIds.finance,
    title: "Stablecoins vs Bank Transfers for Business Payments",
    slug: "stablecoins-vs-bank-transfers-business-payments",
    excerpt: "Stablecoins may offer continuous transfer and programmable settlement, while bank rails offer established controls, account integration, and legal familiarity.",
    reviewerId: reviewers.haider,
    primaryQuery: "stablecoins vs bank transfers for business payments",
    relatedQueries: ["stablecoin payments for SMEs", "cross border business payment options", "stablecoin treasury risks", "bank transfer versus digital assets"],
    seoTitle: "Stablecoins vs Bank Transfers for Business",
    seoDescription: "Compare stablecoins and bank transfers for business payments across settlement, cost, liquidity, compliance, custody, accounting, and operational risk.",
    plannedPublishedAt: "2026-08-18T14:00:05.000Z",
    hero: {
      alt: "Parallel amber digital-token and ivory bank-payment paths crossing a graphite global network",
      caption: "The best payment rail depends on the full journey from treasury cash to usable recipient funds.",
      prompt: "Wide 16:10 editorial comparison illustration. Two parallel paths across a deep graphite global network: one amber programmable token path and one ivory institutional bank path, both connecting business ledgers with distinct checkpoints, premium restrained geometry, no coins with logos, no text, no numbers, no people, LedgerByte palette.",
    },
    inlineDiagram: {
      afterSection: 2,
      alt: "Comparison flow showing fiat funding, stablecoin transfer, conversion, bank transfer, intermediaries, and recipient funds",
      caption: "Compare the complete cash-to-cash journey, including entry, transfer, conversion, and reconciliation.",
    },
    directAnswer: "Stablecoins and bank transfers solve overlapping but different business-payment problems. A well-designed stablecoin route may operate continuously and transfer a digital claim quickly, but the business must still manage issuer, reserve, custody, wallet, network, compliance, liquidity, conversion, accounting, and legal risks. Bank transfers use established accounts, controls, and reporting, yet may involve cut-offs, intermediaries, opaque fees, or slower cross-border delivery. SMEs should compare the complete cash-to-cash journey—not the on-chain transfer alone—and use only providers and structures permitted in every relevant jurisdiction.",
    sections: [
      section("Begin with the payment outcome", [
        "Define what success means before choosing a rail. Identify the payer entity, recipient, countries, currencies, amount, urgency, purpose, frequency, required documentation, and form of money the recipient needs. A supplier may accept a token but still need local bank money for payroll. A treasury may value weekend transfer but not if conversion liquidity is unavailable. A fast network step can coexist with slow onboarding, funding, screening, redemption, or reconciliation.",
        "Separate payment from speculation. A business-payment policy should not depend on an expected token price. Stablecoins aim to maintain a reference value, commonly against a fiat currency, but stability mechanisms and legal claims differ. The BIS has noted that by value the overwhelming majority of fiat-referenced stablecoins are linked to the US dollar and that much activity remains associated with crypto trading. That context should caution an SME against assuming every product is designed or regulated as business money.",
      ]),
      section("Understand the stablecoin journey", [
        "Map how the company obtains the token, who holds keys or controls the wallet, which network is used, how the recipient receives and verifies it, and how either party redeems or converts it. Identify every provider and jurisdiction. Fees can arise at funding, trading, spread, network, custody, withdrawal, redemption, and local conversion. Availability may depend on banking partners or liquidity venues even when the blockchain itself runs continuously.",
        "Review the issuer’s legal structure, reserve disclosures, redemption terms, eligible customers, asset segregation, assurance, freeze or blacklist powers, and failure process. A token that shares a reference currency is not identical to a deposit at a regulated bank or to another stablecoin. Determine what claim the holder has and against whom. Obtain qualified legal and accounting advice; classification, tax, consumer, payments, sanctions, and reporting rules differ and continue to evolve.",
      ]),
      section("Understand the bank-transfer journey", [
        "Bank payments also need full-path analysis. Domestic real-time systems may deliver funds quickly, while cross-border wires can pass through correspondent banks. Fees may be charged to sender, recipient, or both; foreign exchange may be embedded in a spread; compliance questions can delay release. Ask about cut-offs, value dates, tracking, cancellation, recall, repair, intermediary deductions, and the data delivered to each party.",
        "The bank route’s strengths include familiar account ownership, established approval controls, statements, reconciliation feeds, and legal frameworks. Deposit protection, safeguarding, or finality rules vary and may not cover a business or full balance. A bank transfer can also be irrevocable after release, making fraud prevention essential. Familiarity should not be confused with zero risk; it means the risk model and operational responsibilities are usually better understood by finance teams.",
      ]),
      section("Compare settlement, liquidity, and finality", [
        "A blockchain confirmation may be rapid, but business settlement is complete only when the intended recipient controls an asset it can lawfully and practically use. Consider network reorganization assumptions, issuer freeze rights, wallet controls, redemption windows, and conversion. For bank transfers, distinguish message status, account credit, usable balance, and legal finality. Ask what can still be reversed, frozen, recalled, or disputed at each stage.",
        "Liquidity matters most during stress. Model the size of conversion relative to market depth, likely spread, operating hours of providers, redemption limits, and alternative routes. Do not hold more operational value in a rail than the risk policy permits merely to save transfer time. Establish maximum balances, approved tokens and networks, counterparties, and conversion time. Test a small complete transaction before relying on the route for a material obligation.",
      ]),
      section("Build custody and transaction controls", [
        "Wallet security changes the control surface. Decide whether keys are held by a regulated custodian, multiple authorized devices, or another approved arrangement. Require strong authentication, role separation, address allowlists where supported, transaction limits, independent address verification, and recovery procedures. Protect seed phrases and signing devices from both theft and loss. Test access revocation when an employee leaves and continuity when an approver is unavailable.",
        "Payment fraud controls still apply. Verify a new wallet address through an independently known channel, treat address changes like bank-detail changes, and watch for clipboard or malware substitution. Use a human-readable approval record containing beneficiary, amount, token, network, purpose, destination, fees, and expected recipient value. A transaction sent to the wrong valid address may be difficult or impossible to reverse.",
      ]),
      section("Address compliance, accounting, and evidence", [
        "Screen parties and activity as required, document business purpose, and retain transaction identifiers and provider statements. Confirm that the token, service, exchange, custodian, and use are allowed for both parties. Cross-border transactions can touch multiple regulatory regimes even if the transfer feels borderless. Do not use a digital rail to bypass foreign-exchange, sanctions, tax, capital-control, licensing, or reporting obligations.",
        "Define accounting policy for initial recognition, fees, valuation, gains or losses, impairment where applicable, and presentation. Reconcile wallet records to the ledger and preserve evidence linking an address to the approved counterparty. Public block explorers can show transactions but do not prove the commercial purpose or accounting owner. Keep invoice, authorization, rate source, transaction hash, provider confirmation, conversion, and recipient acknowledgment together.",
      ]),
      section("Use a limited, reversible adoption path", [
        "Start with a permitted, low-value, non-urgent transaction and an established counterparty. Conduct provider due diligence, document the route, set limits, complete a sanctions and compliance assessment, and agree the recipient’s conversion process. Test normal transfer, rejection, delayed conversion, wrong-network prevention, access recovery, and accounting reconciliation. Run a tabletop exercise for issuer de-pegging, provider outage, frozen funds, lost credentials, and a fraudulent address request.",
        "Review actual end-to-end time, recipient value, cost, manual work, failures, volatility, and control effort against the bank alternative. Continue only if the route solves a real business problem and remains within risk appetite. Maintain a bank fallback. Stablecoins may become useful infrastructure for specific corridors, programmable transactions, or round-the-clock operations, but an SME should adopt them as a controlled payment option—not as a shortcut around treasury discipline.",
        "Set treasury reporting before volume grows. Show token balances by issuer, custodian, network, legal entity, and purpose; age unreconciled transfers; compare carrying value with redemption value; and monitor concentration against approved limits. Reconcile provider, wallet, and ledger records. Escalate price deviation, delayed redemption, provider restrictions, unusual fees, or control exceptions. A public market price is useful context but does not replace evidence of what the company can redeem, where, and under which terms.",
        "Procurement and legal review should address service continuity, liability, transaction errors, data use, subcontractors, security incidents, dispute venue, termination, and export. Confirm whether the provider can change supported tokens, networks, fees, or customer eligibility without meaningful notice. Document who owns assets if the provider fails and how the business proves its claim. Marketing language about reserves or regulation should be traced to current legal documents and official registers.",
        "Avoid false comparisons. A bank quote that includes conversion and recipient credit should not be compared with a blockchain fee that excludes purchase, spread, custody, redemption, and local payout. Conversely, a slow and expensive correspondent route should not be treated as the only bank option when regional instant systems or specialist regulated providers exist. Use the same amount, currency pair, time, recipient outcome, and control assumptions for every tested route.",
        "Consider the recipient’s governance as part of the decision. A counterparty may use a personal wallet, an unapproved exchange, or an address controlled by one employee, creating risk even when the payer’s process is strong. Agree acceptable custody and evidence, legal-entity ownership, confirmation, and refund handling in advance. Do not pressure a smaller supplier to accept a rail it cannot control safely. A payment method creates shared operational responsibilities, and the commercial contract should reflect them.",
        "Review the approval annually and after any issuer, custodian, network, regulation, accounting policy, or business-purpose change. Suspend new transfers while a material incident or de-pegging event is assessed. Treasury should have authority to move to the fallback rail without waiting for a routine committee cycle, while preserving the normal payment approval and verification controls.",
      ]),
    ],
    table: table("Stablecoin and bank-transfer decision factors", ["Factor", "Stablecoin route", "Bank-transfer route"], [
      ["Operating time", "Network may run continuously; providers may not", "Cut-offs and rails vary by country and service"],
      ["Value stability", "Depends on issuer, reserves, liquidity, and redemption", "Account denomination is stable, while FX and bank risk remain"],
      ["Control surface", "Wallet, keys, token, network, issuer, conversion", "Account access, approvals, bank, intermediaries, beneficiary data"],
      ["Evidence", "Wallet records plus commercial and provider documents", "Statements, payment messages, invoices, and approvals"],
      ["Failure response", "Freeze, recovery, alternate custody and conversion plan", "Recall, bank investigation, fallback rail and fraud response"],
    ]),
    faqs: [
      faq("Are stablecoin payments always faster than bank transfers?", "No. The on-chain transfer may be fast, but onboarding, funding, screening, redemption, local conversion, or recipient operations can dominate total time. Compare the complete transaction from the payer’s usable cash to the recipient’s usable funds."),
      faq("Is a stablecoin the same as money in a bank account?", "No. Legal claims, reserve structures, redemption rights, protections, custody, and failure processes differ. Review the specific issuer and service rather than inferring safety from a stable reference price."),
      faq("Should an SME hold stablecoins on its balance sheet?", "That depends on business need, jurisdiction, accounting, tax, treasury policy, counterparty risk, and approved limits. Avoid holding operational value without a documented purpose, qualified advice, custody controls, liquidity plan, and fallback."),
    ],
    sources: [bisStablecoin, bisCrossBorder, fatfFraud],
    serviceCta: serviceCtas.fractionalCfo,
  }),

  defineArticle({
    order: 7,
    category: "Finance",
    categoryId: categories.Finance,
    topicIds: topicIds.automation,
    title: "Cyber-Enabled Payment Fraud: Controls Every Finance Team Needs",
    slug: "cyber-enabled-payment-fraud-finance-controls",
    excerpt: "Payment fraud combines impersonation, compromised accounts, manipulated data, and urgency; layered finance controls must interrupt the chain before release.",
    reviewerId: reviewers.faisal,
    primaryQuery: "cyber enabled payment fraud finance controls",
    relatedQueries: ["business email compromise controls", "supplier bank change verification", "finance payment fraud prevention", "SME payment approval controls"],
    seoTitle: "Payment Fraud Controls for Finance Teams",
    seoDescription: "Protect SME payments with independent supplier verification, approval separation, secure access, payment limits, anomaly monitoring, and rehearsed response.",
    plannedPublishedAt: "2026-08-18T14:00:06.000Z",
    hero: {
      alt: "An amber payment path interrupted by layered ivory verification gates on graphite",
      caption: "Layered controls interrupt impersonation and account compromise before money leaves.",
      prompt: "Wide 16:10 high-end editorial illustration. An amber payment stream encounters multiple ivory verification gates and protective graphite layers, subtle deceptive branch blocked before a business ledger, serious and calm, no hacker cliché, no people, no text, no numbers, LedgerByte graphite ivory amber palette.",
    },
    directAnswer: "Every finance team needs layered payment controls that assume an attacker may impersonate a leader, supplier, customer, or colleague and may compromise a real account. The core controls are independent verification of new or changed beneficiary details, segregation between setup and release, phishing-resistant access where available, dual approval based on risk, payment limits, protected master data, anomaly monitoring, daily reconciliation, and a rehearsed response with bank contacts. No single email, message, phone call, or AI-generated voice should be sufficient to redirect money.",
    sections: [
      section("Understand the fraud chain, not only the message", [
        "Cyber-enabled payment fraud often begins before finance sees a request. Criminals may harvest credentials, monitor an email thread, register a lookalike domain, compromise a supplier, alter an invoice, impersonate an executive, or manipulate a legitimate portal. Social pressure then turns access into payment through secrecy, urgency, authority, fear, or a plausible commercial change. FATF’s 2026 work reports that 156 jurisdictions—about 90% of those assessed—identify fraud as a major money-laundering risk, illustrating the scale and cross-border nature of the problem.",
        "The control objective is to break several links. Secure access reduces compromise; master-data governance prevents an email from becoming an approved beneficiary; independent verification detects impersonation; approval and limits constrain release; monitoring spots unusual behavior; reconciliation shortens detection; response improves recovery. A company that trains staff but leaves one person able to change and pay a supplier has addressed awareness without correcting the process weakness.",
      ]),
      section("Verify beneficiary changes independently", [
        "Treat every new bank account, wallet address, payment instruction, or change as high risk. The requester should not control the verification channel. Call a known contact using a number already held in an approved system or independently obtained from a trusted source—not the number in the change request. Use a second method for material changes and record who verified what, when, and with whom. Consider a cooling-off period or test payment where proportionate.",
        "Do not rely on visual familiarity. Attackers can copy signatures, domains, invoices, and conversational style; generative AI can improve language and imitate voices. Verification should confirm legal name, account details, reason for change, and authority. If the counterparty resists a documented process, escalate rather than making an exception. Communicate the policy to suppliers before an incident so legitimate partners expect the extra step.",
      ]),
      section("Separate master data, preparation, approval, and release", [
        "Design roles so one compromised account cannot complete the chain. Restrict who can create or modify counterparties, require review of sensitive changes, and prevent the same user from preparing and releasing a material payment. Bank permissions should reflect job responsibilities and value limits. Review access regularly and immediately after role changes or departures. Avoid shared credentials and uncontrolled administrator accounts.",
        "Dual approval should be meaningful. Two clicks by people reading the same manipulated email are not independent control. Give approvers the invoice, purchase or contract evidence, beneficiary record, recent changes, amount, currency, payment purpose, and anomaly flags. Require them to inspect the bank’s final confirmation screen. For executive or urgent exceptions, add control rather than removing it: a known-channel call, designated alternate, and post-event review.",
      ]),
      section("Secure the human and technical entry points", [
        "Use phishing-resistant authentication such as properly implemented passkeys or hardware-backed methods where providers support them, especially for email, identity administration, finance systems, and banking. Apply conditional access, device protection, patching, domain protections, email authentication, and alerts for suspicious sign-in or forwarding rules. Protect recovery channels because attackers may bypass strong login by resetting access. Separate everyday and privileged accounts.",
        "Train with specific finance scenarios: bank-detail changes, confidential acquisitions, tax or payroll urgency, invoice-thread hijacking, QR codes, fake shared documents, remote-support requests, and calls that mimic a leader. Staff need a simple reporting route and permission to pause. Measure reporting and process compliance, not just quiz scores. When someone reports a suspicious request, investigate the related mailbox, rules, sessions, master records, and payments—not only the visible message.",
      ]),
      section("Use payment analytics without outsourcing judgment", [
        "Flag first-time beneficiaries, recent account changes, round amounts, unusual currencies, out-of-hours creation, split payments, deviations from supplier history, high-risk locations, duplicate invoices, and approvals from new devices. Tune rules to the business and investigate alerts promptly. Machine learning can help prioritize patterns, but it can also miss a carefully designed first attempt or produce fatigue through excessive alerts.",
        "Preserve the distinction between anomaly and authorization. A normal-looking payment may be fraudulent, and an unusual payment may be valid. The reviewer should see the evidence and follow independent verification. Track alert outcomes, overrides, and recurring false positives. Do not allow a risk score to release funds autonomously. The largest losses often begin with a request crafted to resemble ordinary work.",
      ]),
      section("Reconcile quickly and prepare the first hour", [
        "Reconcile bank activity daily or more frequently for high-risk accounts. Alerts for debits, new beneficiaries, limit changes, and administrator actions can shorten detection. Maintain current bank fraud contacts, account and transaction identifiers, insurer details, legal and incident-response escalation, and authority to request a recall or freeze. Staff should know that speed matters and that preserving evidence must not delay contacting the bank.",
        "The first response should stop further payments, contact the bank through trusted channels, secure affected accounts and sessions, preserve emails and logs, identify related beneficiaries and transactions, notify responsible leaders, and follow legal, regulatory, insurance, and contractual requirements. Do not continue communicating with the suspected attacker from a compromised channel. Record time, action, owner, and response. Recovery is uncertain; prevention and rapid detection remain the strongest protections.",
      ]),
      section("Govern exceptions and test the complete process", [
        "Maintain an exception register showing request, reason, approver, compensating control, value, and review. Repeated urgency is a process problem, not justification for a permanent bypass. Test controls with walkthroughs and authorized simulations: attempt a supplier change, review the audit trail, inspect bank entitlements, and rehearse an executive impersonation. Include outsourced bookkeepers, payment processors, payroll providers, and remote teams because the chain often crosses organizational boundaries.",
        "Report meaningful indicators to leadership: sensitive master changes, verification completion, segregations breached, dormant access, high-risk exceptions, blocked attempts, reconciliation delays, and response-test findings. Avoid promising a zero-fraud environment. The objective is a resilient process that makes deception harder, limits what one compromise can do, finds anomalies sooner, and responds without confusion.",
        "Extend controls to the surrounding cash process. Fraudsters may manipulate refunds, payroll, expense reimbursements, direct-debit mandates, payment links, cards, or customer bank details, not only supplier wires. Apply ownership, verification, limits, monitoring, and reconciliation proportionate to each channel. Map which systems can create value movement and which identities administer them. A strong accounts-payable process can still be undermined through an overlooked payment processor or an administrator with broad access.",
        "Manage third parties explicitly. Confirm how an outsourced finance provider authenticates staff, verifies changes, separates duties, releases payments, retains evidence, and reports incidents. Contractual responsibility does not remove the SME’s need to review access and activity. Ask banks and providers which alerts and entitlements are available, then configure them rather than assuming defaults are protective. Remove unused beneficiaries, tokens, devices, and integrations on a defined schedule.",
        "After any attempt, including a blocked one, conduct a learning review. Identify the entry point, information the attacker possessed, controls reached, decisions made, and changes needed. Share useful patterns without blaming the reporter. Update verification scripts and training when attackers adapt. A near miss is valuable evidence that the threat model has changed; treating it as harmless wastes an opportunity to strengthen the process before money is lost.",
        "Keep a concise control standard that staff can use under pressure. State prohibited actions, verification channels, value thresholds, approval roles, emergency contacts, exception authority, and required evidence. Make it available outside a potentially compromised mailbox. Translate or localize instructions for distributed teams without changing the control intent. Test that temporary staff and senior executives follow the same route. Attackers often seek the person who believes normal rules do not apply to an urgent or confidential request.",
        "Where regulation or banking practice imposes additional duties, incorporate them explicitly and verify current requirements with qualified advisers and providers. Record retention, privacy, employee monitoring, sanctions, and reporting rules vary. A global policy should set the minimum control, while local procedures add legitimate requirements. It should never lower verification because one office historically worked through informal messages.",
        "Review insurance coverage and notification conditions before an incident. Policies may distinguish social engineering, computer fraud, funds transfer, or vendor compromise, and time limits can be short. Insurance is not a substitute for control, but understanding evidence and contact requirements prevents avoidable delay during response.",
      ]),
    ],
    table: table("Payment-fraud control checklist", ["Control moment", "Required safeguard", "Evidence"], [
      ["New or changed beneficiary", "Independent known-channel verification and approval", "Verified details, contact, time, and approver"],
      ["Payment preparation", "Authorized source documents and protected master data", "Invoice, purchase evidence, change history"],
      ["Release", "Risk-based dual approval, final-detail review, limits", "Bank approval record and transaction identifier"],
      ["After payment", "Alerts and timely bank reconciliation", "Reviewed activity and resolved exceptions"],
      ["Suspected fraud", "Bank contact, access containment, evidence, escalation", "Timestamped incident log and decisions"],
    ]),
    faqs: [
      faq("Is a phone call enough to verify changed bank details?", "A call can be strong only when made to a previously known or independently sourced contact, not a number supplied in the request. For material changes, combine methods and retain a record. Voice alone is less reliable as impersonation technology improves."),
      faq("Does dual approval prevent business email compromise?", "It reduces risk only if approvers independently inspect trusted evidence and beneficiary details. Two people following the same fraudulent instruction without verification can still release a fraudulent payment."),
      faq("What should finance do immediately after a fraudulent transfer?", "Contact the bank’s fraud channel immediately to request recall or freeze, stop related payments, secure compromised accounts, preserve evidence, escalate internally, and follow applicable legal, regulatory, insurance, and notification requirements. Use trusted channels."),
    ],
    sources: [fatfFraud, finCenBec, bisCrossBorder],
    serviceCta: serviceCtas.accounting,
  }),

  defineArticle({
    order: 8,
    category: "Finance",
    categoryId: categories.Finance,
    topicIds: topicIds.reporting,
    title: "ISSB Sustainability Disclosures: A Practical Readiness Guide for SMEs",
    slug: "issb-sustainability-disclosures-sme-readiness",
    excerpt: "SMEs may face ISSB-aligned information requests through law, lenders, investors, and supply chains; readiness starts with governance and reliable evidence.",
    reviewerId: reviewers.faisal,
    primaryQuery: "ISSB sustainability disclosures SME readiness",
    relatedQueries: ["IFRS S1 S2 for SMEs", "sustainability reporting supply chain data", "SME climate disclosure readiness", "ISSB implementation checklist"],
    seoTitle: "ISSB Sustainability Readiness Guide for SMEs",
    seoDescription: "Prepare an SME for ISSB-aligned sustainability requests with scope, governance, materiality, climate data, controls, evidence, and phased reporting.",
    plannedPublishedAt: "2026-08-18T14:00:07.000Z",
    hero: {
      alt: "Ivory business ledger connected to amber climate, workforce, and governance signals on graphite",
      caption: "Sustainability readiness connects decision-useful information to the same discipline as financial reporting.",
      prompt: "Wide 16:10 sophisticated editorial illustration. An ivory business ledger connects through amber data lines to abstract climate, resource, workforce, and governance signals, enclosed in calm graphite reporting architecture, no text, no icons with labels, no people, premium LedgerByte graphite ivory amber palette, precise and credible.",
    },
    inlineDiagram: {
      afterSection: 3,
      alt: "Readiness flow from stakeholder request through material risks, metrics, controls, review, and disclosure",
      caption: "A phased disclosure process begins with use and scope, then builds governed evidence.",
    },
    directAnswer: "An SME should prepare for ISSB-aligned sustainability disclosures by first confirming who needs the information and which jurisdictional or contractual rules apply. Then assign governance, identify sustainability-related risks and opportunities that could affect enterprise value, map required data and methods, strengthen evidence and controls, and pilot a concise report that is consistent with financial information. IFRS S1 covers sustainability-related financial information generally and IFRS S2 focuses on climate. Adoption and reliefs differ by jurisdiction, so this guide supports readiness rather than determining a company’s legal reporting obligation.",
    sections: [
      section("Why an SME may receive ISSB-aligned requests", [
        "The IFRS Foundation tracks jurisdictions adopting or otherwise using ISSB Standards, but requirements are not uniform. Some regimes apply first to large or listed entities; others phase coverage, modify timing, or use local standards. SMEs may still encounter requests through parent companies, lenders, investors, insurers, public procurement, export customers, or larger clients measuring value-chain exposure. A request from a customer is a commercial data requirement, not automatically proof that the SME itself has a statutory ISSB filing duty.",
        "Begin with a request register. Record the requesting party, purpose, framework, legal or contractual basis, entity and period, metrics, methodology, deadline, assurance expectation, confidentiality, and consequences of non-response. Consolidate overlapping requests. This prevents teams from building multiple inconsistent datasets and helps leaders decide which capabilities are reusable. Obtain local advice before representing compliance with a standard or law.",
      ]),
      section("Understand the decision-useful focus", [
        "ISSB Standards focus on sustainability-related risks and opportunities that could reasonably be expected to affect an entity’s prospects and on information useful to primary users of general-purpose financial reports. That focus differs from reporting every environmental or social activity. For an SME, useful questions include whether energy exposure changes cost or continuity, water stress affects production, regulation changes asset value, customer requirements influence revenue, or workforce capability affects delivery.",
        "The analysis should connect to strategy, cash flows, access to finance, and cost of capital over relevant horizons. Avoid generic lists copied from another industry. Interview finance, operations, procurement, sales, risk, and leadership; review budgets, contracts, insurance, incidents, investment plans, and customer requirements. Document why an issue is included or excluded and revisit the assessment when the business, location, supply chain, or rules change.",
      ]),
      section("Assign governance and reporting boundaries", [
        "Name an accountable executive and a working owner, then define review by management or the board appropriate to the company. Governance should cover scope, methods, estimates, changes, controls, approval, and external communication. Sustainability information should not sit in a presentation disconnected from finance. Finance can help reconcile periods, entities, estimates, and narrative claims with the financial statements and management reporting.",
        "Define the reporting entity and boundary. Map legal entities, sites, operations, joint arrangements, suppliers, customers, and data owners. Climate emissions can involve Scope 1 direct emissions, Scope 2 purchased energy, and relevant Scope 3 value-chain categories, each with different evidence and estimation challenges. Do not imply complete coverage when data is partial. State the boundary, methodology, assumptions, exclusions, and limitations clearly.",
      ]),
      section("Build a controlled data inventory", [
        "For each metric, record definition, unit, entity, site, source system, owner, frequency, calculation, conversion factor, estimate, control, evidence, and retention. Energy invoices, meter readings, fuel records, travel systems, procurement data, HR records, production volumes, and supplier submissions may all contribute. Prefer direct evidence where available and label estimates. Use current, authoritative conversion factors and preserve the factor version and source.",
        "Create controls proportionate to the claim: completeness checks across sites, reconciliations to invoices or ledgers, unit validation, duplicate detection, reasonableness analysis, management review, and access control. Keep a change log for restatements and methodology updates. If a spreadsheet remains the practical starting tool, protect formulas and input cells, use version history, restrict access, and assign a backup owner. A controlled spreadsheet is better than an elaborate platform with uncertain source data.",
      ]),
      section("Address climate risk, scenarios, and estimates honestly", [
        "Climate information can include physical risks such as heat, flood, drought, or storms and transition risks such as policy, technology, market, or energy changes. Map exposure by location, asset, supplier, and customer where relevant. Use scenario analysis proportionate to skills and resources: the purpose is to explore resilience under plausible conditions, not to claim a precise forecast. Connect assumptions to operational and financial planning.",
        "Estimates are often unavoidable, particularly in value chains. Establish an estimation hierarchy, document methods, identify uncertainty, and improve over time. Do not convert supplier silence into a zero. Separate measured, calculated, estimated, and unavailable data. If a customer requests a number that cannot yet be supported, explain the limitation and remediation plan rather than offering false precision. Reliability builds trust more effectively than an ambitious but unauditable total.",
      ]),
      section("Pilot a connected and reviewable disclosure", [
        "Structure a pilot around governance, strategy, risk management, and metrics and targets, while following the exact applicable framework. Cross-reference financial reporting where relevant and check consistency of dates, entities, currency, assumptions, capital plans, and risk descriptions. If a climate risk is described as material but the business plan assumes no operational or financial response, investigate the gap. If a target is stated, identify baseline, boundary, method, timeline, interim milestones, owner, and progress.",
        "Run a disclosure committee or equivalent review involving finance, operations, legal or compliance support, and leadership. Verify every quantitative claim and avoid unsupported superlatives. Clarify whether information is prepared using ISSB Standards, aligned with selected concepts, or supplied only in a customer questionnaire. Those are different representations. Seek qualified review before an external compliance assertion or assurance engagement.",
      ]),
      section("Use a phased roadmap rather than a reporting scramble", [
        "In the first phase, confirm requirements, governance, material topics, boundary, and priority data. In the second, gather a baseline, document methods, implement controls, and pilot management reporting. In the third, reconcile narrative and numbers, resolve gaps, obtain appropriate review, and prepare external responses. Schedule the work with the financial close rather than as a last-minute sustainability project.",
        "Treat incoming requests as signals for process improvement. A reliable energy or supplier dataset can support cost control and resilience as well as disclosure. Review the roadmap quarterly, monitor jurisdictional developments through official sources, and retain evidence of decisions. Readiness does not mean collecting everything. It means knowing what is required, why it matters, how it was measured, where uncertainty remains, and who is accountable for the statement.",
        "Plan capability by role. Operational owners need to understand source records and definitions; finance needs consolidation, reconciliation, and connection to financial effects; leadership needs material risks, choices, and limitations; internal or external reviewers need traceable evidence. Training should use the company’s actual boundary and metrics. A generic sustainability course cannot resolve an unclear meter, a missing supplier record, or an unsupported target. Assign remediation owners and due dates for each gap found in the pilot.",
        "Protect sensitive information while improving transparency. Site energy, supplier exposure, workforce information, strategy, and scenario assumptions may be commercially or personally sensitive. Classify data, restrict access, aggregate appropriately, and review external requests before release. Confirm rights to use supplier data and the confidentiality of customer portals. Disclosure governance should make supported information available to intended users without turning every working paper into a widely shared file.",
        "Budget for evidence and assurance readiness, not merely design. External review may reveal weak ownership, inconsistent periods, undocumented estimates, or numbers that do not reproduce. Conduct an internal dry run: select samples, trace them to source, recalculate metrics, challenge narrative, and inspect approvals. Fix the process that created an error rather than adjusting only the final report. Over successive cycles, shorten collection time, reduce estimates where useful, and preserve comparability when methods change.",
        "Keep claims proportionate during the build. Terms such as net zero, climate neutral, sustainable, aligned, or compliant can carry expectations beyond an internal initiative. Define every public claim, identify the boundary and period, retain supporting evidence, and obtain appropriate review. If progress is partial, say so. Clear description of methods, limitations, and next steps is more decision-useful than an absolute label the SME cannot substantiate across its operations and value chain.",
        "Finally, establish a controlled response to data requests. Staff should know who can answer, which approved dataset to use, how to handle a new metric, and when legal, finance, sustainability, or leadership review is required. Record what was submitted and preserve the version. This avoids inconsistent answers to different customers and gives the next reporting cycle a traceable starting point rather than another search through email attachments.",
      ]),
    ],
    table: table("ISSB-aligned SME readiness workplan", ["Phase", "Key output", "Quality check"], [
      ["Scope", "Request register, jurisdictions, entities, users", "Obligation and purpose verified with qualified support"],
      ["Governance", "Accountable owner, review and approval route", "Responsibilities and escalation are documented"],
      ["Assessment", "Material risks, opportunities, horizons, links to prospects", "Reasoning is company-specific and evidence based"],
      ["Data", "Metric inventory, methods, estimates, controls, evidence", "Numbers reconcile and limitations are visible"],
      ["Disclosure", "Connected narrative, metrics, targets, comparisons", "Claims match scope, records, and financial information"],
    ]),
    faqs: [
      faq("Are all SMEs required to report under ISSB Standards?", "No. Adoption, scope, dates, and reliefs depend on jurisdiction, entity status, and other requirements. SMEs may also receive contractual or supply-chain requests without being directly subject to a statutory ISSB mandate. Confirm the position locally."),
      faq("Does ISSB reporting cover only carbon emissions?", "No. IFRS S2 focuses on climate, while IFRS S1 addresses sustainability-related risks and opportunities more broadly when they could affect the entity’s prospects. Applicable disclosure depends on materiality and the adopted requirements."),
      faq("Can an SME use estimates when direct data is unavailable?", "Often estimates are necessary, but the method, source, boundary, assumptions, uncertainty, and controls should be documented. Distinguish estimates from measured data and avoid claiming more precision or coverage than the evidence supports."),
    ],
    sources: [ifrsJurisdictions, ifrsSmeGuide, bisCrossBorder],
    serviceCta: serviceCtas.reporting,
  }),
];
