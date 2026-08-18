import { categories, defineArticle, faq, reviewers, section, serviceCtas, source, table, topicIds } from "./content-model.mjs";

const fidoPasskeys = source("Accelerating global passkey adoption on World Passkey Day 2026", "FIDO Alliance", "https://fidoalliance.org/fido-alliance-reports-accelerating-global-passkey-adoption-on-world-passkey-day-2026/");
const nistIdentity = source("Digital Identity Guidelines", "National Institute of Standards and Technology", "https://pages.nist.gov/800-63-4/");
const enisaThreat = source("ENISA Threat Landscape 2025", "European Union Agency for Cybersecurity", "https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025");
const cisaSmb = source("Cyber Guidance for Small Businesses", "Cybersecurity and Infrastructure Security Agency", "https://www.cisa.gov/small-and-medium-sized-business-resources");
const cisaRansomware = source("StopRansomware Guide", "Cybersecurity and Infrastructure Security Agency", "https://www.cisa.gov/stopransomware/ransomware-guide");
const nistPqc = source("Post-Quantum Cryptography", "National Institute of Standards and Technology", "https://www.nist.gov/pqc");
const nistPqcStandards = source("NIST releases first 3 finalized post-quantum encryption standards", "National Institute of Standards and Technology", "https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards");
const euDataAct = source("EU Data Act gives users control over data from connected devices", "European Commission", "https://digital-strategy.ec.europa.eu/en/news/eu-data-act-gives-users-control-over-data-connected-devices");
const euDataActExplained = source("Data Act explained", "European Commission", "https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained");

export const technologyArticlesB = [
  defineArticle({
    order: 17,
    category: "Technology",
    categoryId: categories.Technology,
    topicIds: topicIds.infrastructure,
    title: "Passkeys for SMEs: A Practical Migration Beyond Passwords",
    slug: "passkeys-for-smes-passwordless-migration",
    excerpt: "Passkeys can reduce phishing and password reuse, but SMEs need account recovery, device coverage, identity assurance, rollout support, and secure fallback.",
    reviewerId: reviewers.muhammad,
    primaryQuery: "passkeys for SMEs passwordless migration",
    relatedQueries: ["how to deploy passkeys for business", "passkeys versus passwords", "passkey account recovery", "phishing resistant authentication SME"],
    seoTitle: "Passkeys for SMEs: A Practical Migration Guide",
    seoDescription: "Plan an SME passkey rollout with identity, device and browser coverage, recovery, fallback, privileged access, user support, monitoring, and phased enforcement.",
    plannedPublishedAt: "2026-08-18T14:00:16.000Z",
    hero: {
      alt: "An amber phishing-resistant credential opening an ivory business identity gate on graphite",
      caption: "Passkeys can remove reusable passwords while preserving a familiar device-unlock experience.",
      prompt: "Wide 16:10 premium cybersecurity editorial illustration. An abstract amber phishing-resistant credential securely opens an ivory business identity gate on deep graphite, device-bound trust and clean recovery path shown geometrically, no key icon cliché, no text, no people, LedgerByte graphite ivory amber palette.",
    },
    directAnswer: "Passkeys replace reusable passwords with cryptographic credentials tied to the legitimate service and unlocked through a user’s device. This makes them resistant to common credential phishing and removes password reuse. An SME should migrate in phases: inventory important accounts, confirm provider and device support, prioritize administrators and high-risk systems, test enrollment and sign-in across real devices, design identity-proofed recovery, keep a secure temporary fallback, train users, monitor failures, and only then enforce passkeys where coverage is reliable. Passkeys improve authentication; they do not replace authorization, device security, or access reviews.",
    sections: [
      section("How passkeys change the sign-in model", [
        "A passkey uses public-key cryptography. The service stores a public key, while the private credential remains protected by the user’s authenticator or credential provider. During sign-in, the authenticator proves possession for the correct service after local user verification such as a device PIN or biometric. There is no shared password for a phishing site to capture and replay. The service does not receive the local biometric.",
        "Passkeys may be synced across a user’s trusted ecosystem or bound to a particular device or security key, depending on implementation and policy. Synced credentials can improve usability and recovery; device-bound credentials can support stricter enterprise assurance. The choice should reflect role, data, device ownership, provider capabilities, and threat model. Avoid treating every product labeled passwordless as technically or operationally identical.",
      ]),
      section("Build an account and dependency inventory", [
        "Prioritize identity provider, email, finance, banking, source control, cloud, remote administration, domain registrar, payroll, customer data, and backup systems. Record users, administrators, authentication methods, recovery, federation, device requirements, external collaborators, service accounts, emergency access, and passkey support. Identify where one account can reset many others. Start with systems whose compromise would create the largest impact.",
        "Review the whole sign-in path. A service may support passkeys for normal login but fall back to a phishable email link, SMS, or password during recovery. A legacy mobile app may not support the same flow as the browser. Shared accounts, unattended devices, kiosks, and automation need separate designs. Do not force passkeys until a tested path exists for every legitimate role.",
      ]),
      section("Choose enrollment and assurance rules", [
        "Require users to enroll only after trusted authentication and, for privileged roles, additional identity verification. Decide whether personal devices and synced credentials are permitted, whether managed devices or hardware keys are required, and how many authenticators a user should register. Encourage a backup credential for critical accounts, stored separately. Record credential names and last use without collecting unnecessary device detail.",
        "For administrators and high-risk finance users, consider hardware-backed or device-bound credentials and separate privileged accounts. Apply least privilege, just-in-time administration where available, and transaction-specific controls in the application. A strong passkey does not make an overpowered administrator safe. Protect enrollment and removal as sensitive account changes with alerts and independent review.",
      ]),
      section("Design recovery before rollout", [
        "Recovery is the likely target after passwords disappear. Define how a person proves identity after losing a phone, laptop, or security key; who can approve recovery; which evidence is acceptable; and how risk is escalated. Avoid knowledge questions and public information. For employees, use HR and manager verification plus an independent channel appropriate to risk. For customer systems, provide accessible options without making support staff a universal bypass.",
        "Create protected emergency access for critical business systems, with strong credentials stored securely, limited use, alerting, and periodic tests. Revoke lost credentials promptly and review active sessions. Address employee departure, device replacement, travel, number change, and provider-account recovery. A migration is incomplete if the security team can explain normal sign-in but not the first hour after a lost device.",
      ]),
      section("Pilot across real users and devices", [
        "Test major operating systems, browsers, mobile and desktop applications, managed and personal-device policies, roaming authenticators, shared workstations, remote staff, and accessibility needs. Include interrupted enrollment, lost device, new device, offline or poor connectivity, cross-device sign-in, and recovery. Capture where users misunderstand which device is being unlocked or which service requests authentication.",
        "Measure enrollment completion, successful sign-in, time, fallback use, recovery, support cases, lockout, suspicious attempts, and user confidence. The FIDO Alliance’s 2026 commissioned research reports wide consumer and enterprise adoption across ten surveyed countries, while also finding continued reliance on phishable methods. Treat those survey results as market context; use the SME’s own pilot evidence to set enforcement timing.",
      ]),
      section("Communicate the human experience", [
        "Explain that passkeys use the familiar device-unlock gesture but authenticate the real website or application. Clarify that the website does not receive the user’s fingerprint or face. Show enrollment from a trusted bookmark or app, how to recognize the correct account, and how to report an unexpected prompt. Warn that attackers may still impersonate support or ask users to approve recovery, add a credential, or share a session.",
        "Provide short guides for each supported platform and a trained help desk script. Avoid blaming users for lost devices. Make recovery accessible and verify identity consistently. Notify users before enforcement and show which fallback will retire. Senior leaders and administrators should follow the same process; exceptions for influential users create the accounts attackers value most.",
      ]),
      section("Enforce gradually and maintain the control", [
        "Move from optional enrollment to required enrollment for priority groups, then require passkey sign-in after coverage and recovery meet targets. Remove passwords or weak fallback where the service permits and risk assessment supports it. Monitor credential additions, removals, recovery, new devices, impossible travel, sessions, and privilege changes. Retain application approvals and payment controls.",
        "Review provider changes, device policy, inactive credentials, emergency access, and support outcomes at least annually and after incidents. Add passkey requirements to procurement and identity architecture. Maintain an exit if a credential provider or ecosystem changes. The goal is not a passwordless slogan; it is a phishing-resistant, recoverable identity process people can use safely every day.",
        "Coordinate passkeys with single sign-on. Central identity can simplify enrollment and policy, but it also concentrates impact. Protect identity administrators, federation settings, domain verification, and break-glass accounts. Test what happens when the identity provider is unavailable and which applications retain active sessions. Application owners should still review roles and entitlements; centralized authentication does not guarantee correct authorization.",
        "Address contractors and shared business relationships. Decide whether external users bring their own passkey, receive an account in the SME’s identity system, or authenticate through federation. Set sponsorship, expiry, and review. Avoid shared credentials for a vendor team. When a contract ends, revoke the account and sessions, not only the passkey, and confirm downstream application access is removed.",
        "Monitor fallback as a security metric. If users routinely choose password, SMS, or email because passkey sign-in is confusing, the migration has not achieved its objective. Investigate device coverage, browser behavior, help content, accessibility, and provider configuration. Reduce weak fallback only after legitimate users have reliable alternatives, while applying extra verification whenever recovery or fallback is used.",
        "Prepare for authenticator compromise as well as loss. If a synced credential provider account is taken over or a managed device is infected, revoke affected credentials and sessions, secure the provider account, examine enrollment events, and assess applications reached. Device management, endpoint protection, and account recovery remain part of passkey security. Cryptographic phishing resistance does not make an already compromised endpoint trustworthy.",
        "Document application behavior when a user has several passkeys. Naming, last-used information, and self-service removal should help users manage credentials without revealing excessive device data. Alert on enrollment and removal and provide a quick report route. Prevent an attacker with an active session from silently adding a new passkey without reauthentication and appropriate risk checks.",
        "Review regulated and contractual assurance. Some customers or sectors may require specific authenticator, device, audit, or identity-proofing properties. A consumer synced passkey may be excellent for one workflow and insufficient for another. Map requirements to implementation evidence and avoid claiming a universal assurance level. Obtain qualified security and legal advice for high-impact identity systems.",
        "Keep service accounts and machines out of the human passkey plan. Workloads need managed machine identities, short-lived credentials, key rotation, and secrets governance rather than a passkey held by an employee. Inventory automation that still relies on passwords and migrate it through the appropriate non-human identity architecture. This prevents a passwordless dashboard from hiding reusable credentials in scripts.",
        "Publish a decommission date for passwords only after evidence supports it. Track remaining accounts and exception owners to closure. Where a provider cannot remove a password, generate a strong unique value, store it securely, prevent routine use, and alert on any fallback sign-in while seeking a stronger service design.",
      ]),
    ],
    table: table("Passkey migration gates", ["Gate", "Evidence", "Do not advance when"], [
      ["Coverage", "Priority services, devices, browsers, and roles mapped", "A critical legitimate path has no supported authenticator"],
      ["Enrollment", "Trusted bootstrap, backup, alerts, admin controls", "Credential addition is an easy account-takeover route"],
      ["Recovery", "Identity proof, approval, revocation, emergency test", "Support can bypass security through weak questions"],
      ["Pilot", "Success, fallback, support, accessibility, incident metrics", "Failure or exclusion remains material"],
      ["Enforcement", "Weak fallback removed and monitoring active", "Passwords remain the normal recovery route"],
    ]),
    faqs: [
      faq("Are passkeys the same as biometrics?", "No. A passkey is a cryptographic credential. A biometric may unlock it locally, like a device PIN can. The service receives proof of authentication, not the user’s fingerprint or face data."),
      faq("Can employees use passkeys on personal phones?", "That is a policy decision based on role, data, device management, synced-credential ecosystem, recovery, privacy, and provider support. High-privilege roles may require managed or hardware-bound authenticators."),
      faq("Do passkeys eliminate phishing completely?", "They resist credential phishing for the protected sign-in, but attackers can still target recovery, active sessions, malware, authorization, help desks, or users with deceptive requests. Maintain layered identity and transaction controls."),
    ],
    sources: [fidoPasskeys, nistIdentity, cisaSmb],
    serviceCta: serviceCtas.backend,
  }),

  defineArticle({
    order: 18,
    category: "Technology",
    categoryId: categories.Technology,
    topicIds: topicIds.infrastructure,
    title: "Ransomware Resilience for SMEs: Backups, MFA, Logging and Response",
    slug: "ransomware-resilience-for-smes",
    excerpt: "Ransomware resilience combines protected backups, phishing-resistant identity, patching, segmentation, useful logs, rehearsed response, and tested recovery.",
    reviewerId: reviewers.muhammad,
    primaryQuery: "ransomware resilience for SMEs",
    relatedQueries: ["SME ransomware backup strategy", "ransomware incident response checklist", "MFA logging ransomware prevention", "small business cyber recovery plan"],
    seoTitle: "Ransomware Resilience for SMEs",
    seoDescription: "Build ransomware resilience with isolated tested backups, strong identity, patching, segmentation, useful logs, response roles, suppliers, and recovery drills.",
    plannedPublishedAt: "2026-08-18T14:00:17.000Z",
    hero: {
      alt: "Layered ivory backup vaults and amber recovery paths protecting an SME system on graphite",
      caption: "Resilience reduces entry, limits spread, preserves evidence, and restores essential work from trusted systems.",
      prompt: "Wide 16:10 premium cybersecurity editorial illustration. Layered ivory backup vaults, segmented systems, and amber recovery paths protect an SME digital environment on deep graphite, serious and calm, no skulls, no hackers, no text, no people, LedgerByte graphite ivory amber palette.",
    },
    directAnswer: "Ransomware resilience means the SME can reduce initial compromise, limit attacker movement, detect harmful activity, make decisions under pressure, and restore essential services from trusted backups. Prioritize phishing-resistant MFA for email, cloud, remote access, backups, and administrators; patch exposed systems; remove unnecessary access; segment critical services; keep protected, immutable or offline backups; centralize useful logs; and rehearse a response with named leaders, technical support, legal advice, insurance, communications, law enforcement, and key suppliers. Recovery must be tested, not assumed.",
    sections: [
      section("Treat ransomware as a business interruption", [
        "Ransomware operations may steal data, disrupt systems, encrypt files, target backups, and pressure victims through extortion. The initial route can be stolen credentials, phishing, exposed remote services, unpatched software, a supplier, or administrator abuse. ENISA’s Threat Landscape 2025 analyzes 4,875 incidents from July 2024 through June 2025, providing current European context for a threat that crosses regions and sectors. An SME should plan for loss of systems and confidentiality, not only encrypted laptops.",
        "Identify essential products and services, maximum tolerable outage, recovery time, recovery point, dependencies, manual workarounds, and responsible owners. Include identity, DNS, email, communications, finance, payroll, customer records, production, logistics, and backups. A technical inventory becomes a resilience plan only when it explains which business activity is restored first and how staff and customers operate meanwhile.",
      ]),
      section("Strengthen identity and exposed services", [
        "Require strong MFA—preferably phishing-resistant—for remote access, cloud administration, email, backups, code, and security tools. Disable legacy authentication, shared accounts, dormant users, and direct administrator use for ordinary work. Protect recovery and help-desk processes. Review privileges and service accounts, rotate exposed credentials, and alert on new administrators, MFA changes, forwarding rules, suspicious sign-ins, and disabled security controls.",
        "Inventory internet-facing systems and remove what is unnecessary. Patch known exploited and critical vulnerabilities quickly under a defined process. Secure remote management behind controlled access, restrict source networks, and monitor attempts. Keep network devices, hypervisors, appliances, and backup software in scope; attackers often target infrastructure teams patch less visibly than employee laptops.",
      ]),
      section("Design backups for an active adversary", [
        "Use multiple backup copies with at least one protected from ordinary administrator credentials and production compromise. Immutability, offline media, separate accounts, write-once controls, and segmented management can help depending on architecture. Encrypt backups and protect keys. Back up configuration, identity, SaaS data, code, certificates, and documentation—not only file shares. Know which provider snapshots are backups and which share the same failure domain.",
        "Test restoration regularly at file, application, and business-service levels. Verify clean infrastructure, dependencies, identity, permissions, data consistency, and time to restore. Record results and remediation. A completed backup job proves data was copied, not that the company can recover. Maintain a prioritized recovery runbook and an offline copy of contacts, architecture, licenses, credentials process, and decisions.",
      ]),
      section("Limit spread and protect evidence", [
        "Segment users, servers, administration, backups, production, guest devices, and sensitive environments. Restrict east-west traffic and remote tools to what operations require. Use application control or endpoint protection appropriate to the environment. Separate administrator accounts and workstations. Limit access to shared drives and data so one compromised identity cannot encrypt everything it can see.",
        "Collect logs that answer who authenticated, from where, what changed, which process ran, which data moved, and which security control was altered. Centralize identity, endpoint, firewall, DNS, cloud, email, backup, and critical application events with synchronized time and protected retention. Define alerts and investigation ownership. Logging every event without the ability to detect or retrieve it is cost, not resilience.",
      ]),
      section("Prepare decisions and communications", [
        "Define incident commander, technical lead, business continuity, legal and privacy advice, insurer contact, communications, finance, HR, and executive authority. Record trusted contact channels outside company email. Understand policy conditions and panel providers before an incident. Establish who contacts law enforcement, regulators, customers, employees, banks, and suppliers based on qualified advice and applicable duties.",
        "Do not promise that ransom payment restores data or prevents disclosure. Payment may create legal, sanctions, ethical, and operational issues and offers no certainty. Decisions require qualified legal and incident-response support. Preserve evidence and avoid destroying affected systems through uncontrolled rebuilding. Communications should be accurate, dated, approved, and updated as facts change without speculation.",
      ]),
      section("Practice containment and recovery", [
        "Rehearse a scenario in which email is unavailable, administrators are locked out, backups appear targeted, data may be stolen, and a critical supplier is also affected. Practice isolating systems, disabling credentials, invoking external help, preserving logs, prioritizing services, and operating manually. Include weekends, travel, and absent leaders. Record time and blocked decisions.",
        "Recovery should rebuild from trusted images or environments, patch the entry path, rotate credentials and keys, verify data, monitor for persistence, and return services in controlled waves. Do not reconnect everything because one server works. Validate security, business function, reconciliation, and customer-facing behavior. Retain heightened monitoring and complete post-incident obligations.",
      ]),
      section("Create a sustainable SME security rhythm", [
        "Review assets, exposed services, patches, backups, recovery tests, privileges, alerts, incidents, suppliers, and training on a defined cadence. Use current CISA and local authority guidance, managed providers where appropriate, and contracts that specify access, logs, response, backup responsibility, and notification. Verify provider work with evidence rather than assuming outsourcing transfers accountability.",
        "Track a small set of outcomes: critical patch age, privileged accounts with strong MFA, protected backup coverage, restore-test success, alert investigation time, unsupported systems, and exercise actions closed. Improve the largest weakness first. Resilience is not a product purchase; it is the maintained ability to continue and recover while an attacker actively tries to remove that choice.",
        "Manage suppliers as part of the attack surface. Inventory providers with privileged access, remote tools, backups, identity, customer data, or critical operations. Require named accounts, strong MFA, limited support windows, logging, incident notice, and offboarding. Review evidence and test contacts. A small vendor can be a legitimate dependency without receiving permanent administrator access to every environment.",
        "Reduce data available for extortion. Apply retention schedules, delete obsolete copies, restrict sensitive repositories, encrypt appropriately, monitor unusual transfer, and control sharing links. Data minimization does not prevent encryption but can reduce confidentiality impact. Map notification and contractual duties in advance. Preserve clean records of what information existed and who could access it so investigation is not guesswork.",
        "Keep finance involved. Incident response may require emergency procurement, external specialists, overtime, replacement equipment, communication, insurance evidence, and cash planning while normal systems are unavailable. Preapprove a controlled emergency authority with dual review and fraud safeguards. Attackers may impersonate responders or suppliers during confusion, so bank-detail verification and payment controls must remain in force.",
        "After recovery, complete a blameless but accountable review. Confirm entry path, dwell time, affected identities, data access, control failures, decisions, costs, and remediation. Track actions to closure and retest. Replace temporary emergency settings, revoke accounts, rotate secrets, and update architecture. Returning systems to service is not the end if the conditions that enabled the incident remain.",
        "Protect the response team from attacker observation. Assume compromised email or collaboration may be monitored. Use prearranged alternate communications and verify participants. Limit sensitive recovery details to those who need them. Attackers may use public statements or internal messages to adjust pressure, target customers, or imitate advisers. Coordinate factual communication through the incident commander and qualified counsel.",
        "Include physical and operational technology where relevant. A compromised office network can affect access control, telephony, warehouse devices, manufacturing, building systems, or safety. Inventory dependencies and define safe shutdown and manual operations with specialists. Do not reconnect unmanaged devices to a rebuilt environment without assessment. Safety and regulatory requirements take priority over speed.",
        "Know how to rebuild identity. If directory services, identity providers, certificate authorities, or administrator devices are compromised, restoring applications first can recreate trust in the attacker. Preserve protected configuration and recovery paths, define a clean-room process, and test privileged access. Rotate secrets in an order that avoids breaking recovery dependencies or leaving old access valid.",
        "Exercise executive decisions, not only technical actions. Leaders should practice when to stop operations, invoke insurance, notify stakeholders, obtain emergency funds, bring in external responders, and approve restoration risk. Record decision criteria and delegations. A technically capable team can still lose critical time if authority is unavailable or commercial priorities conflict during the first hours.",
        "Maintain current asset and software inventories with ownership and support status. An unknown server cannot be patched or restored with confidence. Remove unsupported and abandoned systems, restrict unavoidable legacy assets, and plan replacement. Accuracy matters more than an impressive count: validate inventories against network, identity, cloud, purchasing, and operational evidence.",
      ]),
    ],
    table: table("Ransomware resilience minimums", ["Capability", "Minimum evidence", "Test"], [
      ["Identity", "Strong MFA, separate admin, reviewed recovery and access", "Compromised password and lost-device scenario"],
      ["Exposure", "Asset inventory, patch and remote-access controls", "External scan and critical patch verification"],
      ["Backups", "Protected copies, keys, scope, retention", "Timed clean restore of an essential service"],
      ["Detection", "Central useful logs, alerts, owner, retention", "Trace a simulated suspicious account and data event"],
      ["Response", "Offline contacts, roles, legal and supplier routes", "Tabletop with email and identity unavailable"],
    ]),
    faqs: [
      faq("Are cloud files automatically protected from ransomware?", "Not necessarily. Synchronization can propagate deletion or encryption, and provider retention may not meet recovery needs. Understand versioning, backup responsibility, administrative separation, retention, export, and tested restoration for each service."),
      faq("Should an SME pay a ransomware demand?", "There is no guaranteed safe outcome. Payment can involve legal and sanctions issues and may not restore systems or prevent disclosure. Engage qualified legal, law-enforcement, insurer, and incident-response support immediately."),
      faq("How often should backups be restored in a test?", "Set frequency by business criticality and change rate. Test critical service restoration regularly and after major system changes, not only individual files. Record recovery time, data point, integrity, dependencies, and remediation."),
    ],
    sources: [enisaThreat, cisaRansomware, cisaSmb],
    serviceCta: serviceCtas.cloud,
  }),

  defineArticle({
    order: 19,
    category: "Technology",
    categoryId: categories.Technology,
    topicIds: topicIds.infrastructure,
    title: "Post-Quantum Readiness: Build a Cryptography Inventory Now",
    slug: "post-quantum-readiness-cryptography-inventory",
    excerpt: "Post-quantum migration starts with knowing where cryptography protects long-lived data, identity, software, devices, vendors, and communications.",
    reviewerId: reviewers.muhammad,
    primaryQuery: "post quantum cryptography inventory for SMEs",
    relatedQueries: ["post quantum readiness checklist", "cryptographic inventory template", "NIST PQC migration for business", "crypto agility for SMEs"],
    seoTitle: "Post-Quantum Readiness: Build a Crypto Inventory",
    seoDescription: "Prepare for post-quantum migration by inventorying cryptography, long-lived data, certificates, software, devices, vendors, dependencies, and upgrade paths.",
    plannedPublishedAt: "2026-08-18T14:00:18.000Z",
    hero: {
      alt: "An ivory cryptography inventory map transitioning through amber upgrade paths on graphite",
      caption: "A cryptography inventory reveals what must change, how long it takes, and where data needs protection now.",
      prompt: "Wide 16:10 premium technical editorial illustration. An ivory map of certificates, software, devices, data, and communication links transitions through ordered amber upgrade paths on deep graphite, future-ready and precise, no quantum atom clichés, no text, no numbers, no people, LedgerByte palette.",
    },
    inlineDiagram: {
      afterSection: 3,
      alt: "Cryptography inventory layers covering data, protocols, certificates, code, devices, cloud, and vendors",
      caption: "Inventory the business use and dependency chain, not merely algorithm names.",
    },
    directAnswer: "Post-quantum readiness begins with a cryptography inventory because organizations cannot migrate controls they cannot locate. Record which business systems and vendors use public-key cryptography for encryption, key exchange, digital signatures, certificates, identity, software updates, devices, and backups; what data they protect; how long that data must remain secure; which algorithms and key sizes apply; who owns the component; and whether an upgrade path exists. Prioritize long-lived sensitive data and difficult-to-replace systems, require vendor roadmaps, and improve cryptographic agility before making algorithm changes.",
    sections: [
      section("Why inventory work should begin now", [
        "Large cryptographically relevant quantum computers do not yet make current widely used public-key systems obsolete in ordinary operations, and timelines are uncertain. Migration still takes years because cryptography is embedded in protocols, certificates, hardware, firmware, code, partner connections, procurement, and regulated processes. NIST finalized its first three post-quantum cryptography standards in August 2024 and encourages organizations to begin transitioning, making preparation an engineering and supplier-management task rather than a prediction contest.",
        "Some information may be collected now and decrypted later if an adversary can store it until future capability exists. Risk depends on sensitivity and required secrecy lifetime. A contract expiring next month differs from health, identity, intellectual property, legal, or strategic records that must remain protected for many years. Start with data value and lifetime, then trace the cryptography and systems protecting it.",
      ]),
      section("Define the inventory around business use", [
        "For each item, record business service, owner, data, users, environment, confidentiality and integrity need, retention, protocol or function, algorithm, key length, certificate or key source, library or product, hardware dependency, configuration, external party, expiry, update mechanism, and evidence. Include encryption at rest and in transit, key exchange, authentication, digital signatures, code signing, document signing, VPN, email, APIs, databases, backups, and device management.",
        "Prioritize where public-key cryptography is used because that is the main quantum migration concern, while continuing to manage symmetric cryptography properly. Avoid scanning for algorithm strings without context; a library may be installed but unused, or cryptography may be hidden inside an appliance or SaaS service. Combine automated discovery, configuration review, code analysis, certificate records, network observation, architecture diagrams, procurement data, and owner interviews.",
      ]),
      section("Include certificates, keys, and trust relationships", [
        "Inventory public and private certificate authorities, TLS certificates, client certificates, signing certificates, SSH keys, VPN credentials, API identities, device certificates, and roots embedded in software or hardware. Record issuance, storage, rotation, revocation, automation, expiry, and relying parties. Identify hard-coded keys or trust stores and long-lived credentials. An algorithm migration may fail operationally if one partner or device cannot validate the new chain.",
        "Protect the inventory because it reveals security architecture. Use role-based access, version control, and clear evidence without centralizing private keys. Reconcile certificate discovery with approved records and investigate unknown issuers or expired services. Improving ordinary key management and eliminating obsolete cryptography creates value now and reduces the future migration surface.",
      ]),
      section("Map software, hardware, cloud, and suppliers", [
        "Ask vendors which cryptographic functions their products use, where they are configured, which post-quantum standards they plan to support, whether updates are software or hardware, what versions and dates apply, and how hybrid or transition modes will be tested. Require evidence and contract commitments proportionate to risk. A broad statement of quantum readiness is less useful than a roadmap for the exact product version deployed.",
        "Include operating systems, browsers, runtimes, libraries, cloud key management, load balancers, identity providers, network devices, industrial systems, mobile apps, firmware, secure elements, and archived media. Record end-of-support and replacement lead time. A device with a fifteen-year operational life deserves earlier planning than a stateless service upgraded monthly. Identify partner protocols and regulators that constrain changes.",
      ]),
      section("Prioritize with data lifetime and migration difficulty", [
        "Score sensitivity, secrecy or signature lifetime, exposure, business criticality, algorithm vulnerability, internet reachability, vendor dependency, replacement lead time, and testing complexity. Prioritize high-value long-lived data and components with slow upgrade paths. Also identify digital signatures whose validity must be proven years later, such as code, documents, or records, and assess preservation requirements with qualified specialists.",
        "Create waves: remove obsolete and unknown cryptography; improve inventory and ownership; enable crypto-agile configuration; test vendor-supported standards in laboratories; pilot interoperable paths; then migrate production under official guidance. Do not replace algorithms ad hoc or implement novel cryptography. Use finalized standards and supported, reviewed implementations appropriate to the system and jurisdiction.",
      ]),
      section("Build cryptographic agility", [
        "Separate algorithms and parameters from business logic where feasible, centralize policy, automate certificate and key lifecycle, maintain dependency and software bills of materials, and make configurations observable. Create test environments and interoperability cases. Ensure data formats, APIs, databases, and protocols can accommodate larger keys, signatures, ciphertexts, and messages. Performance, memory, bandwidth, storage, and hardware constraints need measurement.",
        "Agility does not mean an administrator can select any algorithm. Changes should use an approved policy, authenticated configuration, testing, staged deployment, monitoring, and rollback. Prevent downgrade and inconsistent negotiation. Hybrid approaches may combine classical and post-quantum methods during transition, but they add complexity and should follow authoritative guidance and vendor support rather than improvised composition.",
      ]),
      section("Create governance and a maintained roadmap", [
        "Assign a cryptography owner or working group appropriate to size, with system, security, risk, procurement, and business input. Review NIST and relevant national or sector guidance, vendor roadmaps, inventory coverage, unsupported systems, pilots, and exceptions. Add cryptography questions to architecture and procurement. Require new systems to support inventory, key lifecycle, upgrade, and export rather than adding opaque dependencies.",
        "Update the inventory after releases, renewals, incidents, acquisitions, and infrastructure changes. Measure coverage, unknown services, obsolete algorithms, certificate automation, vendor responses, end-of-support exposure, and tested migration paths. The immediate goal is not to switch every algorithm. It is to know where the company depends on cryptography and to preserve the ability to migrate safely when the supported path is ready.",
        "Add discovery to normal engineering. Certificate transparency, network scans, code and dependency analysis, cloud configuration, key-management logs, and architecture reviews can identify parts of the estate, but each produces false positives and blind spots. Reconcile automated findings with owner attestation and runtime evidence. Track inventory confidence and last verification rather than marking a row complete forever.",
        "Coordinate retention with migration. Data scheduled for defensible deletion may not need an expensive long-term cryptographic transition, while archives with legal, historical, or operational value need readable formats, protected keys, authenticity evidence, and tested recovery. Confirm which signatures or timestamps must remain verifiable and how trust evidence is preserved. Do not keep sensitive data indefinitely merely because migration planning is difficult.",
        "Test interoperability before broad rollout. A client, server, proxy, certificate authority, hardware module, partner, or monitoring tool may support a standard differently or impose size limits. Measure handshake, throughput, failure, fallback, observability, and resource use under realistic load. Prevent silent downgrade. Record supported combinations and update them with versions so a future team can reproduce the result.",
        "Budget by migration wave. Long-lived hardware, embedded devices, regulated systems, and partner protocols may require procurement years ahead, while software services can move faster. Include testing, downtime, licenses, certificates, hardware, vendor services, training, and rollback. Early inventory gives leadership options and prevents every dependency from becoming an emergency when a deadline or vulnerability arrives.",
        "Include cryptography in incident response. A compromised certificate authority, stolen signing key, weak random generation, expired root, or vulnerable library may require rapid discovery and rotation independent of quantum risk. The inventory should support contact, scope, revocation, replacement, and validation. Practicing these events builds the operational capability later migration will require.",
        "Communicate with customers and partners carefully. Share supported algorithms, certificate changes, test dates, and retirement plans through authenticated channels. Avoid exposing sensitive architecture. Provide overlap and rollback appropriate to criticality and confirm both sides can detect a downgrade or failure. Partner readiness can be the longest dependency, so agreements and tests should begin before the final production wave.",
        "Monitor standards and guidance at the source. Algorithm selections, implementation advice, transition dates, and sector expectations evolve. Assign responsibility for reviewing NIST and relevant national or industry publications, then translate changes into an approved roadmap update. Vendor announcements and general news can prompt investigation but should not be the sole authority for a security migration.",
        "Avoid a compliance-only inventory that ignores availability. Cryptographic changes can affect performance, message size, hardware capacity, certificates, monitoring, and disaster recovery. Include operations and service owners in acceptance tests and measure normal and peak loads. A secure algorithm is not successfully deployed if it makes an essential service unreliable or prevents recovery.",
      ]),
    ],
    table: table("Minimum cryptography inventory fields", ["Field group", "Examples", "Why it matters"], [
      ["Business context", "Service, owner, criticality, users, environment", "Sets accountability and recovery priority"],
      ["Protected asset", "Data type, sensitivity, retention, signature lifetime", "Reveals harvest-now and long-term integrity risk"],
      ["Cryptography", "Function, protocol, algorithm, key, certificate, library", "Identifies the technical migration surface"],
      ["Dependency", "Vendor, hardware, partner, cloud, regulator", "Shows lead time and interoperability constraints"],
      ["Migration", "Support status, target, test, date, fallback", "Turns discovery into a managed roadmap"],
    ]),
    faqs: [
      faq("Should SMEs replace current encryption immediately?", "Do not make unsupported ad hoc changes. Begin inventory, data-lifetime analysis, ordinary cryptography hygiene, vendor engagement, and agility. Follow finalized standards and current guidance for supported migrations appropriate to each system."),
      faq("What does harvest now, decrypt later mean?", "An adversary may collect encrypted information today and retain it in case future capability can break the public-key protection. Data needing long confidentiality deserves earlier inventory and migration planning."),
      faq("Is post-quantum readiness only an IT issue?", "No. Data owners determine sensitivity and lifetime; procurement manages vendor commitments; legal and compliance assess obligations; operations plan upgrades; leadership accepts residual risk and funds long-lead replacement."),
    ],
    sources: [nistPqc, nistPqcStandards, nistIdentity],
    serviceCta: serviceCtas.backend,
  }),

  defineArticle({
    order: 20,
    category: "Technology",
    categoryId: categories.Technology,
    topicIds: topicIds.infrastructure,
    title: "Cloud Portability and Data Ownership: Lessons from the EU Data Act",
    slug: "cloud-portability-data-ownership-eu-data-act",
    excerpt: "The EU Data Act turns cloud switching and connected-product data access into operational questions about export, dependencies, contracts, identity, and testing.",
    reviewerId: reviewers.muhammad,
    primaryQuery: "cloud portability data ownership EU Data Act SMEs",
    relatedQueries: ["EU Data Act cloud switching", "cloud exit plan for SMEs", "data portability connected devices", "avoid cloud vendor lock in"],
    seoTitle: "Cloud Portability and Data Ownership Under the EU Data Act",
    seoDescription: "Use EU Data Act lessons to improve cloud exit planning, data exports, dependency maps, contracts, switching tests, and connected-product data rights.",
    plannedPublishedAt: "2026-08-18T14:00:19.000Z",
    hero: {
      alt: "Amber business data moving through an open ivory bridge between two graphite cloud environments",
      caption: "Portability is the tested ability to move data and business function, not simply a download button.",
      prompt: "Wide 16:10 premium cloud editorial illustration. Amber business data and application modules move through an open ivory bridge between two distinct graphite cloud environments, controlled identity and audit checkpoints, no provider logos, no text, no people, elegant LedgerByte graphite ivory amber palette.",
    },
    inlineDiagram: {
      afterSection: 3,
      alt: "Cloud exit map covering data, applications, identity, networking, operations, contracts, and verification",
      caption: "A usable exit spans the whole service dependency chain, not only stored files.",
    },
    directAnswer: "The EU Data Act, applicable since September 2025, gives SMEs a useful operational lesson even when a specific contract or business falls outside its scope: data access and cloud switching must be designed before an exit. Inventory business data and dependencies, classify what can be exported, document formats and interfaces, separate identity and encryption control, negotiate assistance and deletion, test restore or migration, and retain a fallback. Legal rights, technical portability, and business continuity are related but distinct; qualified counsel should determine how the Act applies to a particular provider, connected product, user, or contract.",
    sections: [
      section("What the EU Data Act changes", [
        "The European Commission describes the Data Act as creating rules for fair access to and use of data, including data generated by connected products and related services and provisions intended to make switching between data-processing services easier. It applies from 12 September 2025, with particular provisions and contractual contexts requiring careful reading. The Act is not a declaration that every person owns every piece of data or that every cloud workload can move without engineering.",
        "For an SME, the durable lesson is to ask who can access which data, for what purpose, in what format, at what cost, with which trade-secret and privacy protections, and how a service is switched or terminated. These questions matter across the world because weak exit design creates operational concentration even where no specific legal switching right applies. Use official guidance and qualified legal advice for scope and rights.",
      ]),
      section("Define data rights and responsibilities precisely", [
        "Create a data map covering customer, employee, finance, product, device, telemetry, derived, model, log, configuration, and support information. Record controller or equivalent role where applicable, contractual rights, intellectual property, trade secrets, retention, location, processors, recipients, access interface, and deletion. Terms such as ownership can obscure different rights to access, use, share, protect, retain, or delete.",
        "Connected-product data may involve the user, manufacturer, service provider, third party, and individuals whose information appears in the dataset. Access must not override privacy, security, or trade-secret controls. Authenticate requesters, authorize fields and periods, minimize data, log disclosure, and provide understandable metadata. A bulk export without meaning or safeguards is not responsible portability.",
      ]),
      section("Inventory the complete cloud dependency", [
        "Map compute, containers, functions, databases, object stores, queues, identity, keys, certificates, DNS, network, observability, backups, deployment, source code, registries, third-party APIs, licenses, support, and operational knowledge. Record owners, versions, configuration, regions, data volumes, service levels, recovery, and replacement options. Managed services may reduce operating burden while increasing migration work; that tradeoff should be explicit.",
        "Distinguish data export from functional equivalence. A database dump may preserve records but not authorization, jobs, indexes, event order, encryption, or application behavior. An infrastructure template may not include manually configured identity or vendor settings. Document what must be rebuilt and what can be transformed. Prioritize essential business services and maximum tolerable downtime.",
      ]),
      section("Negotiate contracts for a real exit", [
        "Before commitment, review notice, term, renewal, early termination, switching assistance, export format, APIs, data volume, egress or transfer charges, professional services, service continuity, deletion, verification, backups, logs, subcontractors, insolvency, and dispute terms. Confirm which provider tools remain available during transition and for how long after termination. Record who owns migration work and third-party costs.",
        "Service credits do not restore a failed business. Require incident and change notification, support routes, and evidence appropriate to risk. Avoid automatic renewals that expire before migration can complete. Place key dates in the vendor calendar. Preserve copies of contracts, architecture, configuration, invoices, and export procedures outside the provider portal. Qualified counsel should assess unfair terms or statutory rights in the relevant context.",
      ]),
      section("Engineer portability without avoiding useful cloud services", [
        "Portability does not require using only the lowest common denominator. A managed database or event service can create genuine value. Make the choice with an exit estimate and mitigation: open data formats, abstraction at selected boundaries, container or standard protocol where useful, infrastructure as code, automated deployment, documented transformations, and portable observability. Keep business logic from depending unnecessarily on provider-specific metadata.",
        "Control identity and encryption. Know how users, workloads, keys, certificates, and secrets are recreated or rotated in a destination. Avoid making the only backup decryptable solely by a service being exited without a tested recovery path. Export access policy and audit evidence where needed, but do not copy stale privileges blindly. A migration is an opportunity to revalidate access.",
      ]),
      section("Test switching and data access", [
        "Run periodic exports and validate completeness, integrity, metadata, schema, permissions, timestamps, and usability. Restore a representative service in an isolated environment or alternate region or provider. Measure time, bandwidth, cost, transformation, manual work, skill gaps, and business validation. Test at realistic data volume; a small sample may hide a multi-day transfer or throttling limit.",
        "For connected-product access, test request authentication, scope, consent or authority, format, rate limit, privacy filtering, trade-secret protection, delivery, revocation, and audit. Include an incorrect or excessive request and a vulnerable requester. Provide documentation so recipients can interpret the data. Monitor abuse and operational load without making legitimate access impractical.",
      ]),
      section("Maintain an exit plan as architecture changes", [
        "Assign executive, technical, data, security, legal, finance, procurement, and business owners. Define exit triggers such as service failure, security risk, legal change, price, product retirement, acquisition, or strategic move. Maintain options: alternate provider, self-managed restoration, regional failover, reduced manual operation, or orderly shutdown. Not every workload needs live multi-cloud; each needs a proportionate continuity and exit decision.",
        "Review dependency, data map, contract, export, restore test, cost, skill, and provider roadmap annually and after material change. Close exercise findings. Cloud portability is not the claim that switching is effortless. It is evidence that the SME understands what it depends on, can retrieve and protect its data, can continue critical work, and retains credible choices when commercial or legal conditions change.",
        "Include finance in exit modeling. Estimate parallel-service periods, data transfer, support, engineering, licenses, tax, contract termination, write-offs, and temporary productivity loss. Compare these costs with the risk and value of remaining. A low monthly price can coexist with a high exit cost. Record assumptions and update them as data and architecture grow so leadership can make an informed timing decision.",
        "Plan deletion as carefully as export. Define which production, replica, backup, log, support, test, and subcontractor copies should be removed, which must be retained, the legal basis, and how deletion is verified. Revoke credentials and network paths and monitor for residual billing or activity. Do not demand immediate deletion of records the SME is legally required to preserve; coordinate privacy, legal, security, and records owners.",
        "Avoid a portability project that weakens security. Migration copies can multiply sensitive data, bypass normal controls, or travel through personal storage. Use approved encrypted transfer, access limits, integrity checks, secure temporary environments, and deletion. Rotate keys and secrets appropriately. Monitor both source and destination during transition and document custody of export media and credentials.",
        "For connected products, incorporate access rights into product design: data catalog, user identity, consent or authority, export, API, rate limits, security, privacy, trade secrets, support, and audit. Retrofitting an undocumented device fleet is expensive. Procurement should ask manufacturers and platform partners how data is exposed, updated, retained, shared, and transferred before the SME commits to a product ecosystem.",
        "Define acceptance in business terms. A destination should process orders, authenticate users, issue reports, preserve balances, meet performance, support operations, and reconcile data—not merely start an application. Business owners should approve representative workflows and totals. Keep source systems in a controlled read-only or rollback state until evidence supports cutover and retention obligations permit closure.",
        "Maintain skills and documentation. Portability fails when only a departed consultant understands transformations or when runbooks depend on a provider portal during termination. Store diagrams, code, schemas, decisions, credentials procedures, and test results in controlled company repositories. Rotate owners through exercises and keep vendor support contacts current. Knowledge is a migration dependency.",
        "Use portability as leverage for better architecture, not as a threat in every vendor relationship. Share realistic requirements, request roadmap evidence, and negotiate proportionate support. Some services may remain intentionally provider-specific because their value exceeds exit cost. Record that decision and revisit it. Informed lock-in is different from dependency discovered during a crisis.",
        "Finally, treat every exit exercise as an architecture review. Remove undocumented workarounds, improve exports, close stale access, and update costs and recovery objectives. The goal is not frequent switching. It is sustained evidence that the SME can make a deliberate choice while protecting customers, records, and essential operations.",
      ]),
    ],
    table: table("Cloud portability evidence pack", ["Area", "Evidence", "Failure it prevents"], [
      ["Data", "Catalog, rights, formats, volumes, retention, export test", "Incomplete or unusable transfer"],
      ["Application", "Dependency map, code, configuration, transformation", "Data moves but the service does not work"],
      ["Identity and security", "Users, workloads, keys, logs, policy recreation", "Lockout, overexposure, or lost evidence"],
      ["Contract and cost", "Notice, assistance, charges, deletion, dates", "Commercial surprise and missed window"],
      ["Operations", "Owners, runbook, restore result, fallback, acceptance", "Uncoordinated migration and prolonged outage"],
    ]),
    faqs: [
      faq("Does the EU Data Act mean cloud switching is free?", "The Act includes switching-related provisions and a phased approach to certain charges, but exact rights, dates, services, and permitted costs require current legal analysis. Engineering, assistance, transformation, and business costs may still exist."),
      faq("Does data ownership mean an SME can export everything?", "No. Different parties may hold access, use, intellectual-property, privacy, confidentiality, retention, or deletion rights. Map the dataset and obtain advice. Export must respect other people’s rights and security."),
      faq("Is multi-cloud required for portability?", "No. Multi-cloud can add complexity and cost. A proportionate strategy may use tested exports, infrastructure as code, documented dependencies, an alternate restore path, contract rights, and a manual continuity plan rather than active duplication."),
    ],
    sources: [euDataAct, euDataActExplained, nistIdentity],
    serviceCta: serviceCtas.cloud,
  }),
];
