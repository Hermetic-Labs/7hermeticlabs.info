(function () {
  'use strict';

  const projects = {
    halt: {
      index: '01',
      state: 'Family workspace',
      name: 'HALT',
      description: 'Organization, Caregiver, and Community share a product family while retaining distinct audiences, evidence, wording, and approval context.',
      products: ['HALT Organization', 'HALT Caregiver', 'HALT Community'],
      job: 'Translate verified product truth into useful public communication.',
      publicState: 'Only sanitized, named campaign records appear here.',
      nextGate: 'Bind claims to the relevant product and build.',
      pulse: {
        summary: 'Product education and contribution activity for the HALT family.',
        scope: 'HALT Organization, Caregiver, and Community',
        rule: 'Explicit HALT project key required',
        notice: 'Only campaigns explicitly assigned to HALT appear in this lane.',
        empty: 'No named HALT campaign is currently projected.',
        aliases: ['halt', 'halt-organization', 'halt-caregiver', 'halt-community']
      },
      studio: {
        title: 'Know the product. Build from truth.',
        description: 'HALT is an offline-capable medical coordination system in closed beta. Contributions must stay grounded in the product lane, current evidence, and qualified human review.',
        referenceUrl: 'https://7hermeticlabs.health/',
        referenceLabel: 'Open the full product reference',
        scopeQuestion: 'Which HALT experience are you speaking for?',
        scopeDescription: 'Start with an active Susan assignment, then choose the product and contribution type. Each lane serves a different person and setting.',
        audiences: ['Medical and humanitarian organizations', 'Caregivers and families', 'Community responders and mutual-aid teams', 'Researchers and evaluators', 'Technical builders and contributors', 'General public'],
        positive: 'HALT is a working closed-beta, offline-capable medical coordination system designed for structured evaluation in constrained environments. Core workflows are designed to run locally, with qualified human review kept in the loop.',
        positiveWhy: 'Why it works · Names the current status, bounds the capability, and keeps human review visible.',
        negative: 'HALT uses autonomous medical AI to diagnose patients anywhere with 100% reliability—even without doctors or internet.',
        negativeWhy: 'Why it fails · Invents autonomy, diagnosis, absolute performance, and removal of clinical oversight.',
        lanes: {
          organization: { label: 'HALT Organization', summary: 'Field medical coordination, structured intake, ward visibility, supplies, and local workflows.', truth: 'A working closed-beta, offline-capable medical coordination system designed for structured evaluation through a single-laptop, local-first model.', boundary: 'Keep qualified human review explicit. Do not imply clinical deployment, validation, authorization, or autonomous decision-making.' },
          caregiver: { label: 'HALT Caregiver', summary: 'Bedside and household timelines, needs, supplies, multilingual assistance, and requests for help.', truth: 'A bedside and household workspace being shaped around care timelines, dietary needs, supplies, multilingual communication, and requests for assistance.', boundary: 'Describe it as part of the closed-beta family. Do not present emerging workflows as clinically validated or generally available.' },
          community: { label: 'HALT Community', summary: 'Household intake, local response, food and WASH stock, first aid, translation, and coordination.', truth: 'A simplified community-response workspace being shaped for household intake, local care mapping, food and WASH stock, first aid, translation, and coordination.', boundary: 'Keep the community-response scope distinct from clinical authority, emergency-service replacement, or proven field deployment.' }
        }
      },
      assets: [
        { name: 'HALT', source: './assets/halt-mark.png', description: 'Current public product-family mark.', role: 'Product family' },
        { name: 'HALT primary mark', source: './assets/ip-library/halt-primary-mark.png', description: 'Full HALT hand-and-wordmark composition retained as an approved source asset.', role: 'Product identity' },
        { name: 'HALT horizontal banner', source: './assets/ip-library/halt-banner.png', description: 'Wide HALT lockup for horizontal placements.', role: 'Product banner', wide: true },
        { name: 'HALT Windows banner', source: './assets/ip-library/halt-windows-banner.png', description: 'Windows-oriented HALT banner with the Developers Without Borders hand mark.', role: 'Platform banner', wide: true },
        { name: 'Hermetic Labs symbol', source: './assets/ip-library/hermetic-labs-symbol.png', description: 'RGB geometric Hermetic Labs symbol on a transparent field.', role: 'Company identity' },
        { name: 'Hermetic Labs banner', source: './assets/ip-library/hermetic-labs-banner.png', description: 'Horizontal Hermetic Labs wordmark for dark backgrounds.', role: 'Company identity', wide: true },
        { name: 'Hermetic Labs icon', source: './assets/ip-library/hermetic-labs-icon.png', description: 'Metallic Hermetic Labs figure-and-light icon.', role: 'Company icon' },
        { name: 'Developers Without Borders', source: './assets/ip-library/developers-without-borders-mark.png', description: 'Humanitarian development initiative mark.', role: 'Initiative identity' },
        { name: 'Developers Without Borders pledge', source: './assets/ip-library/developers-without-borders-pledge.png', description: 'Printable pledge certificate retained with the HALT humanitarian identity set.', role: 'Pledge certificate' }
      ]
    },
    vulpine: {
      index: '02',
      state: 'Release hardening',
      name: 'Courier Services',
      description: 'A clean-room medical-logistics system joining command, dispatch, driver custody, offline recovery, and governed operational intelligence.',
      products: ['Command Center', 'Dispatcher', 'Driver'],
      job: 'Turn verified synthetic release evidence into a precise operational story.',
      publicState: 'The provider-controlled Onfleet create/cancel proof and tenant-gated command access are verified. No production deployment or Onfleet partnership is claimed.',
      nextGate: 'Prove the governed driver-to-worker binding, full synthetic lifecycle, cross-surface state agreement, and stable authenticated TestFlight flow.',
      pulse: {
        summary: 'Release evidence and contribution activity belonging only to Courier Services.',
        scope: 'Courier Command Center, Dispatcher, Driver, and named provider proofs',
        rule: 'Explicit Courier project key required',
        notice: 'Only campaigns explicitly assigned to Courier Services appear in this lane.',
        empty: 'No named Courier campaign is currently projected.',
        aliases: ['courier', 'courier-services', 'phoxx', 'vulpine', 'vulpine-driver', 'vulpine-dispatcher']
      },
      studio: {
        title: 'Show the chain. Name the boundary.',
        description: 'Courier Services is in release hardening. Contributions may use sanitized synthetic evidence, but must distinguish verified provider and identity proofs from the lifecycle and physical-device work still in progress.',
        referenceUrl: 'https://7hermeticlabs.services/',
        referenceLabel: 'Open Courier Services',
        scopeQuestion: 'Which Courier operating surface are you speaking for?',
        scopeDescription: 'Choose command, provider lifecycle, or driver delivery before drafting. Keep every state tied to the named proof and use synthetic data only.',
        audiences: ['Medical-logistics operators', 'Dispatch and field-service teams', 'Healthcare technology evaluators', 'Operational AI and platform teams', 'Technical builders and contributors', 'General public'],
        positive: 'Courier Services is a clean-room medical-logistics system in release hardening. Its current evidence includes tenant-gated command access and a live provider-controlled Onfleet create/cancel proof; the full governed lifecycle and stable physical-device flow remain under verification.',
        positiveWhy: 'Why it works · Names the verified proof, states the release phase, and keeps the unfinished lifecycle visible.',
        negative: 'Courier Services is deployed with Onfleet across healthcare fleets and autonomously manages every delivery from dispatch through completion.',
        negativeWhy: 'Why it fails · Invents a partnership, customers, deployment scale, autonomy, and lifecycle evidence that has not been completed.',
        lanes: {
          command: { label: 'Command and control', summary: 'Tenant-gated operations context, approvals, evidence, and normalized state.', truth: 'The public Command surface, allowlisted Entra access, gateway path, and grounded operations context have verified release evidence.', boundary: 'Do not imply general availability, a customer deployment, or that every underlying operational view is complete.' },
          provider: { label: 'Provider lifecycle', summary: 'Governed binding and task-state exchange with external delivery providers.', truth: 'Onfleet Level 3 create/cancel control has been proven with synthetic data.', boundary: 'Create/cancel is not the full lifecycle. Do not claim assign, start, arrive, complete, or fail until the end-to-end proof records exist.' },
          driver: { label: 'Driver and device', summary: 'Custody, pairing, scanning, offline state, reconnect, and mobile delivery.', truth: 'The driver surface and iOS shell exist, and Azure has recorded an iOS token event.', boundary: 'Do not call the physical-device, authenticated context, pairing, protected evidence, or offline restart/reconnect path complete until the stable TestFlight proof passes.' }
        }
      },
      assets: [
        { name: 'Courier Services', source: './assets/vulpine-mark.png', description: 'Existing fox-and-AI identity retained through the Courier Services rename.', role: 'Product identity' },
        { name: 'Hermetic Labs symbol', source: './assets/ip-library/hermetic-labs-symbol.png', description: 'RGB geometric Hermetic Labs symbol for company attribution.', role: 'Company identity' },
        { name: 'Hermetic Labs banner', source: './assets/ip-library/hermetic-labs-banner.png', description: 'Horizontal Hermetic Labs wordmark for dark-background placements.', role: 'Company banner', wide: true }
      ]
    },
    vrf: {
      index: '03',
      state: 'Public catalog active',
      name: 'VRF',
      description: 'VRF is a modular Unreal Engine ecosystem moving from reusable utilities and foundation packs into intelligence, integration, and embodied experiences.',
      products: ['Movement', 'Weapons', 'Vehicles', '4 free utilities', 'AI E.v.E', 'Bundle', 'Unleashed', 'Veritas'],
      job: 'Show the exact product, build, and demonstrated capability while the ecosystem develops as one connected family.',
      publicState: 'Movement, Weapons, and Cars are published on Fab. Their videos and three routes into the live VRF Discord are available; the older Movement and Cars demo downloads need repair.',
      nextGate: 'Maintain the standalone VRF source of truth, then advance the foundation packs through native verification.',
      spotlight: {
        kicker: 'VRF public map',
        title: 'Three live packs. One larger body taking shape.',
        summary: 'The current storefront begins with Movement, Weapons, and Vehicles. Historical releases and signals show how the family expanded toward AI, composition, and the two-way boundary with EVE-OS.',
        stats: [
          { value: '3', label: 'Current Fab packs' },
          { value: '2', label: 'Legacy release records' },
          { value: '1', label: 'Unleashed teaser' },
          { value: '11', label: 'Defined pack lanes' }
        ],
        path: 'Four capability limbs → Bundle torso → Unleashed inbound → Veritas outbound',
        referenceUrl: 'https://virtualrealityfatality.com/',
        cards: [
          { title: 'Movement', state: 'Available on Fab', tone: 'current', image: './assets/vrf-showcase/movement.jpg', alt: 'VRF Volume 1 Movement artwork with a VR character and locomotion feature names', copy: 'Locomotion, body, pose, climbing, swimming, flight, and physical interaction foundations.', href: 'https://www.fab.com/listings/2f944cd3-c998-4e00-b90e-26866e26d432', linkLabel: 'Open Movement on Fab' },
          { title: 'Weapons', state: 'Available on Fab', tone: 'current', image: './assets/vrf-showcase/weapons.jpg', alt: 'VRF Volume 2 Weapons artwork showing VR hands, pistols, and ammunition', copy: 'Physical firearms, ammunition, attachments, reloading, and two-handed combat interaction.', href: 'https://www.fab.com/listings/1866e14e-8b87-486a-bbe2-262b2ae39342', linkLabel: 'Open Weapons on Fab' },
          { title: 'Vehicles', state: 'Available on Fab', tone: 'current', image: './assets/vrf-showcase/vehicles.jpg', alt: 'VRF Volume 3 Cars artwork showing a stylized vehicle and VR driver', copy: 'Driveable systems, seats, controls, doors, cameras, and vehicle-state foundations.', href: 'https://www.fab.com/listings/01a12f16-02ce-4d97-961d-8e367a4349bc', linkLabel: 'Open Vehicles on Fab' },
          { title: 'AI E.v.E', state: 'Historical public release', tone: 'history', image: './assets/vrf-showcase/ai-eve.jpg', alt: 'Thumbnail from the public VRF Volume 4 NPC demonstration', copy: 'NPC behavior, perception, expression, embodiment, and later conversational experiments.', href: 'https://www.youtube.com/watch?v=IoOVCA3xdgU', linkLabel: 'Watch the public record' },
          { title: 'Bundle', state: 'Historical public release', tone: 'history', image: './assets/vrf-showcase/bundle.jpg', alt: 'Thumbnail from the public VRF Bundle demonstration', copy: 'The torso: a composition of foundation capabilities into replicated example experiences.', href: 'https://www.youtube.com/watch?v=HsHhoJvsJog', linkLabel: 'Watch the public record' },
          { title: 'Unleashed', state: 'Historical public teaser', tone: 'history', image: './assets/vrf-showcase/unleashed.jpg', alt: 'Thumbnail from the public VRF Unleashed teaser', copy: 'The inbound gateway now defined to bring EVE modules and external systems into Unreal.', href: 'https://www.youtube.com/watch?v=3I9MpV3nZco', linkLabel: 'Watch the teaser' }
        ]
      },
      pulse: {
        summary: 'Public communication across VRF utilities, foundations, intelligence, integration, and expansion lanes.',
        scope: 'The VRF product family, with every claim tied to a named pack, build, or roadmap source',
        rule: 'Explicit VRF project key required',
        notice: 'Only campaigns explicitly assigned to VRF appear in this lane.',
        empty: 'No named VRF campaign is currently projected.',
        aliases: ['vrf']
      },
      studio: {
        title: 'Show the system. Bound the build.',
        description: 'VRF is a modular family of Unreal Engine and immersive-system assets. Contributions must identify the exact product lane, pack or build, version, source, and demonstrated capability.',
        referenceUrl: 'https://virtualrealityfatality.com/',
        referenceLabel: 'Visit the standalone VRF site',
        scopeQuestion: 'Which part of the VRF ecosystem are you speaking for?',
        scopeDescription: 'Choose the foundation, system, or expansion lane before drafting. Do not combine claims across packs, versions, builds, or roadmap material.',
        audiences: ['Unreal Engine developers', 'XR and simulation teams', 'Technical artists and designers', 'Marketplace customers', 'Technical builders and contributors', 'General public'],
        positive: 'VRF is a modular Unreal Engine ecosystem. The current public Fab catalog includes Movement, Weapons, and Cars; other lanes should be described only from their named build, source project, or roadmap evidence.',
        positiveWhy: 'Why it works · Names what is publicly available, preserves the wider ecosystem shape, and keeps every other claim tied to evidence.',
        negative: 'VRF is a universal VR framework that works with every headset, engine version, and project without setup.',
        negativeWhy: 'Why it fails · Claims universal compatibility and frictionless performance without product-, version-, or device-level evidence.',
        lanes: {
          foundations: { label: 'Foundation packs', summary: 'Movement, Weapons, and Vehicles establish locomotion, physical interaction, combat, and driveable systems.', truth: 'Movement, Weapons, and Cars are the three products currently published in the Hermetic Labs Fab catalog.', boundary: 'Name the exact pack and version. A published listing does not prove universal device, engine, or project compatibility.' },
          systems: { label: 'Systems and integration', summary: 'AI E.v.E, Bundle, and four free utilities connect reusable behavior into broader framework experiences.', truth: 'These lanes belong to the working VRF ecosystem and must be described from their own current build or source evidence.', boundary: 'Do not present a workspace build or source project as a currently available Fab product unless the live catalog lists it.' },
          expansion: { label: 'Expansion and embodiment', summary: 'Unleashed and Veritas form opposite gateway directions between Unreal, external systems, and EVE-OS.', truth: 'Unleashed has a historical public teaser. Veritas is the final internal VRF pack and dashboard, supported by design evidence rather than a released runtime product.', boundary: 'Keep Veritas inside VRF. Do not present it as a separate Social Health project or as demonstrated runtime behavior.' }
        }
      },
      assetLibraryDescription: 'Five reusable VRF and Hermetic Labs identity assets for Susan’s content workflow. Product imagery remains in the separate curation view until selected for a specific campaign.',
      assets: [
        { name: 'VRF primary mark', source: './assets/vrf-mark.png', description: 'Canonical high-resolution mark for the VRF product family.', role: 'Product family', status: 'Ready for content' },
        { name: 'VRF channel avatar', source: './assets/vrf-showcase/vrf-channel-avatar.jpg', description: 'Established VRF character/avatar from the public YouTube channel. Use when the historical channel identity is relevant.', role: 'Channel identity', status: 'Ready with context' },
        { name: 'Hermetic Labs channel banner', source: './assets/vrf-showcase/vrf-channel-banner.jpg', description: 'Wide banner recovered from the public VRF YouTube channel for channel and landscape placements.', role: 'Channel banner', status: 'Ready for content', wide: true },
        { name: 'Hermetic Labs symbol', source: './assets/ip-library/hermetic-labs-symbol.png', description: 'RGB geometric Hermetic Labs symbol on a transparent field.', role: 'Company identity', status: 'Ready for content' },
        { name: 'Hermetic Labs horizontal banner', source: './assets/ip-library/hermetic-labs-banner.png', description: 'Compact transparent Hermetic Labs wordmark for dark horizontal placements.', role: 'Company banner', status: 'Ready for content', wide: true }
      ]
    },
    fefe: {
      index: '04',
      state: 'Public foundation',
      name: 'FEFE Connect',
      description: 'FEFE Connect is an independent, privacy-minded professional-network foundation for legal and mental-health professionals, with separate evidence and approval boundaries.',
      products: ['Legal membership', 'Mental-health membership', 'Reviewed profiles'],
      job: 'Prepare an evidence-backed introduction to the reviewed-membership model.',
      publicState: 'The responsive public site, dual application preview, trust-center drafts, and identity foundation exist. Live verification, authentication, billing, applications, and directory access are not connected.',
      nextGate: 'Complete the Georgia pilot, ownership, legal, identity, and service-integration gates before inviting real applicants.',
      pulse: {
        summary: 'Public communication and contributor activity belonging only to FEFE Connect.',
        scope: 'FEFE Connect communication',
        rule: 'Explicit FEFE Connect project key required',
        notice: 'Only campaigns explicitly assigned to FEFE Connect appear in this lane.',
        empty: 'No named FEFE Connect campaign is currently projected.',
        aliases: ['fefe', 'fefe-connect']
      },
      studio: {
        title: 'Make the introduction. Keep the standard clear.',
        description: 'FEFE Connect is a private professional network for legal and mental-health professionals. Contributions must preserve its reviewed-membership model, professional boundaries, and privacy-minded positioning.',
        referenceUrl: 'https://fefeconnect.com/',
        referenceLabel: 'Open the FEFE Connect reference',
        scopeQuestion: 'Which FEFE Connect audience are you speaking for?',
        scopeDescription: 'Choose the professional lane or membership story before drafting. Keep review, pricing, privacy, and outcome claims exactly aligned with the current source.',
        audiences: ['Legal professionals and firms', 'Mental-health professionals and practices', 'Prospective members', 'Professional referral partners', 'Technical builders and contributors', 'General public'],
        positive: 'FEFE Connect is a private professional network for legal and mental-health professionals. Applicants complete a role-specific review before an approved profile becomes part of the member community.',
        positiveWhy: 'Why it works · Identifies the two professional groups and describes review without promising a connection or outcome.',
        negative: 'FEFE Connect guarantees fully vetted experts, instant referrals, and successful professional outcomes for every paying member.',
        negativeWhy: 'Why it fails · Turns a reviewed-membership process into absolute vetting, referral, and outcome guarantees.',
        lanes: {
          legal: { label: 'Legal professionals', summary: 'Reviewed firms and legal professionals seeking considered professional connections.', truth: 'FEFE Connect offers a legal-professional path into a private, reviewed membership community.', boundary: 'Do not imply legal endorsement, guaranteed introductions, case outcomes, or verification beyond the checks named in the current source.' },
          mentalHealth: { label: 'Mental-health professionals', summary: 'Reviewed practitioners presenting expertise and connection preferences.', truth: 'FEFE Connect offers a mental-health-professional path with reviewed profiles and member-controlled contact preferences.', boundary: 'Do not disclose clinical records, imply public directories, or promise referrals, engagements, or professional outcomes.' },
          membership: { label: 'Membership experience', summary: 'Application, review, activation, privacy, and community expectations.', truth: 'Applicants apply before payment; approved applicants can activate a fixed monthly membership.', boundary: 'Use current published pricing and terms only. Approval does not guarantee introductions or outcomes.' }
        }
      },
      assets: [{ name: 'FEFE Connect', source: './assets/fefe-connect-mark.png', description: 'Current public wordmark from the FEFE Connect site.', role: 'Service identity', wide: true }]
    },
    eve: {
      index: '05',
      state: 'Platform lane active',
      name: 'Eve OS / Exchange',
      description: 'Eve OS and Hermetic Labs Exchange share a portfolio lane while their precise product and repository boundaries are resolved. No backup tree is treated as canonical by inference.',
      products: ['Eve OS', 'Hermetic Labs Exchange'],
      job: 'Organize approved platform communication without inheriting private Graph, module, or unrelated project claims.',
      publicState: 'The company surface publicly identifies Eve OS and the Exchange as different layers. Private orchestration records, support conversations, and planned modules remain outside this projection.',
      nextGate: 'Bind each operating-system, marketplace, module, and institutional-support claim to its current approved public source.',
      pulse: {
        summary: 'Public communication for Eve OS and Hermetic Labs Exchange within their shared portfolio lane.',
        scope: 'Eve OS and Hermetic Labs Exchange',
        rule: 'Explicit Eve or Exchange project key required',
        notice: 'Only campaigns explicitly assigned to Eve OS or Hermetic Labs Exchange appear in this lane.',
        empty: 'No named Eve OS or Exchange campaign is currently projected.',
        aliases: ['eve', 'eve-os', 'exchange', 'hermetic-labs-exchange']
      },
      studio: {
        title: 'Name the layer. Keep the boundary visible.',
        description: 'Eve OS and Hermetic Labs Exchange share a portfolio lane, but they are not interchangeable. Contributions must identify whether they describe the operating system, a module, or the marketplace.',
        referenceUrl: 'https://7hermeticloops.com/',
        referenceLabel: 'Open the Exchange reference',
        scopeQuestion: 'Which Eve OS or Exchange layer are you speaking for?',
        scopeDescription: 'Choose the system, marketplace, or module lane first. Keep product status, availability, economics, and compatibility tied to the current public source.',
        audiences: ['Developers and module builders', 'Organizations evaluating Eve OS', 'Exchange publishers and customers', 'Integration and platform teams', 'Technical contributors', 'General public'],
        positive: 'Eve OS and Hermetic Labs Exchange serve different layers of the ecosystem: Eve OS provides the operating environment, while the Exchange presents modules and packages through a separate marketplace surface.',
        positiveWhy: 'Why it works · Separates the operating system from the marketplace and avoids inventing availability or adoption.',
        negative: 'Every Exchange module is certified by Hermetic Labs, works everywhere, and automatically becomes part of Eve OS.',
        negativeWhy: 'Why it fails · Invents certification, universal compatibility, and automatic platform inclusion.',
        lanes: {
          eveOs: { label: 'Eve OS', summary: 'The operating environment, orchestration layer, and system capabilities.', truth: 'Eve OS is the operating-system layer in the Hermetic Labs ecosystem.', boundary: 'Do not treat planned features, private integrations, or repository artifacts as live public capability without a current source.' },
          exchange: { label: 'Hermetic Labs Exchange', summary: 'The marketplace surface for discovering and presenting Eve OS modules and packages.', truth: 'Hermetic Labs Exchange is the marketplace layer associated with Eve OS modules and packages.', boundary: 'Do not imply that every listing is certified, compatible, approved, or generally available unless the current record says so.' },
          modules: { label: 'Modules and connectors', summary: 'Individual packages, integrations, documentation, and publisher material.', truth: 'Modules and connectors must be described from their own current package record and documentation.', boundary: 'Keep ownership, version, compatibility, pricing, and support claims specific to the named module.' }
        }
      },
      assets: [
        { name: 'Eve OS', source: './assets/eve-os-wordmark.png', description: 'Existing chromatic wordmark retained for identity reference.', role: 'Product identity', wide: true },
        { name: 'Hermetic Labs Exchange', source: './assets/exchange-mark.png', description: 'Existing RGB ring mark retained as the marketplace reference.', role: 'Marketplace identity' },
        { name: 'Exchange transparent mark', source: './assets/ip-library/exchange-logo-transparent.png', description: 'Transparent-background Exchange source mark retained for alternate placements.', role: 'Marketplace identity' }
      ]
    },
    abbe: {
      index: '06',
      state: 'Private demonstration',
      name: 'Abbé Faria',
      description: 'A learning and re-entry workspace combining a source-grounded tutor with guided practice for everyday digital tasks. The product direction is institution-controlled and local-first.',
      products: ['Approved-material tutor', 'Practice OS', 'Institutional controls'],
      job: 'Explain the learner experience while separating a private demonstration from institutional deployment.',
      publicState: 'The project team reports an authenticated private cloud demonstration with cited tutor answers and a Practice OS. This demonstrates the experience; it does not establish a production local runtime, learner outcomes, or institutional approval.',
      nextGate: 'Complete owner acceptance, reconcile the release into the canonical source, and obtain institutional requirements before any learner pilot.',
      pulse: {
        summary: 'Learning, digital practice, and contribution activity belonging only to Abbé Faria.',
        scope: 'Abbé Faria learning, control-plane, and institutional-path communication',
        rule: 'Explicit Abbé Faria project key required',
        notice: 'Only campaigns explicitly assigned to Abbé Faria appear in this lane.',
        empty: 'No named Abbé Faria campaign is currently projected.',
        aliases: ['abbe', 'abbe-faria', 'abbé-faria']
      },
      studio: {
        title: 'Teach from approved truth. Keep authority human.',
        description: 'Abbé Faria pairs learning from approved material with a Practice OS: simulated Phone, Messages, Mail, and Internet activities in a bounded environment. Its private demonstration is hosted for evaluation; the intended institutional product remains local-first and governed by human owners.',
        referenceUrl: 'https://abbefaria.app/',
        referenceLabel: 'Open the public Abbé Faria brief',
        scopeQuestion: 'Which Abbé Faria boundary are you speaking for?',
        scopeDescription: 'Choose the learning model, control plane, or institutional path. Keep approved-corpus grounding, privacy, vendor status, and deployment state explicit.',
        audiences: ['Correctional education teams', 'Re-entry and workforce programs', 'Educators and curriculum partners', 'Institutional technology and security teams', 'Human-services organizations', 'Technical builders and contributors'],
        positive: 'Abbé Faria is developing an institution-controlled learning and re-entry workspace. A private demonstration pairs cited tutor answers with bounded digital practice. Institutional deployment, learner outcomes, and a vendor partnership have not been established.',
        positiveWhy: 'Why it works · Explains the experience, identifies the private demonstration, and keeps deployment and outcomes separate.',
        negative: 'Abbé Faria is an approved Securus learning platform already delivering autonomous AI education to incarcerated learners.',
        negativeWhy: 'Why it fails · Invents approval, a vendor relationship, deployment, learner use, and autonomous authority.',
        lanes: {
          learning: { label: 'Approved-material learning', summary: 'A bounded tutor that explains its sources and leaves unanswered questions visible.', truth: 'The project team reports an authenticated, cited tutor response in the private demonstration.', boundary: 'A demonstration is not evidence of learning outcomes, institution-approved curriculum use, learner access, or a production local runtime.' },
          controlPlane: { label: 'Practice OS', summary: 'Guided Phone, Messages, Mail, and sealed Internet exercises for everyday digital confidence.', truth: 'The private prototype contains modular practice surfaces, local presence settings, and bounded suggestions. Check-in and Games remain placeholders.', boundary: 'These are simulated exercises, not live calls, email, open-web access, or clinical care. Keep private URLs, learner data, and internal configuration out of public content.' },
          institutional: { label: 'Institutional path', summary: 'Requirements, non-production access, security boundaries, and accountable ownership.', truth: 'Securus is an active prospective route governed by ten explicit decision gates; ViaPath remains a separate prospective route.', boundary: 'Do not imply contact, approval, sponsorship, a sandbox, a pilot, procurement, or a vendor relationship unless a public approved record establishes it.' }
        }
      },
      assets: [
        { name: 'Abbé Faria', source: './assets/abbe-faria-mark.png', description: 'Current project mark from the public Abbé Faria brief.', role: 'Project identity' },
        { name: 'Hermetic Labs symbol', source: './assets/ip-library/hermetic-labs-symbol.png', description: 'RGB geometric Hermetic Labs symbol for company attribution.', role: 'Company identity' },
        { name: 'Hermetic Labs banner', source: './assets/ip-library/hermetic-labs-banner.png', description: 'Horizontal Hermetic Labs wordmark for dark-background placements.', role: 'Company banner', wide: true }
      ]
    },
    dcd: {
      index: '07',
      state: 'Public site · limited pilots',
      name: 'Data Center Direct',
      description: 'A county-centered place to understand data-center projects: published records, sources, commitments, and questions in one connected view. Government, enterprise, and community each have a distinct entry point.',
      products: ['County records', 'Government', 'Enterprise', 'Community voice'],
      job: 'Help people understand what is published, what remains unanswered, and how to take part without assuming technical familiarity.',
      publicState: 'The public site and four explanatory films are live. Fayette and Effingham are pilot contexts, not a claim of county adoption. Source-only answers, readiness views, and invitation-only phone participation have distinct limits.',
      nextGate: 'Use the October 6 Effingham town hall to capture questions and follow-ups, then verify the public-record and participation paths against the pilot evidence.',
      pulse: {
        summary: 'County information and contribution activity belonging only to Data Center Direct.',
        scope: 'Data Center Direct Home, Government, Enterprise, and Community',
        rule: 'Explicit Data Center Direct project key required',
        notice: 'Only campaigns explicitly assigned to Data Center Direct appear in this lane.',
        empty: 'No named Data Center Direct campaign is currently projected.',
        aliases: ['dcd', 'data-center-direct', 'datacenterdirect', 'project-effingham']
      },
      spotlight: {
        kicker: 'Four ways into Data Center Direct',
        title: 'Your county. Your future. Your voice.',
        summary: 'Start with the overview, then use the film for your audience. Each lives on its matching page with a thumbnail and optional captions. The live site remains the source for the current cut.',
        stats: [{ value: '4', label: 'Public films' }, { value: '2', label: 'Pilot county contexts' }, { value: '3', label: 'Audience views' }, { value: 'Oct 6', label: 'Effingham town hall' }],
        path: 'Understand the project → inspect the published sources → identify the gaps → find the appropriate participation path',
        referenceUrl: 'https://www.datacenterdirect.ai/',
        referenceLabel: 'Visit Data Center Direct →',
        homeTitle: 'Current films and county records',
        homeDescription: 'Watch on the live product site for the current film, optional captions, and the records discussed. Film publication does not establish pilot acceptance or an operational private workflow.',
        cards: [
          { title: 'Home · 1:02', state: 'Public overview', tone: 'current', image: 'https://www.datacenterdirect.ai/media/dcd/proof-safe-v8-6164a441f6d8/home.png', alt: 'Data Center Direct overview film thumbnail', copy: 'What the service is, how published information is connected, and where questions still need evidence. Ask is bounded to available sources.', href: 'https://www.datacenterdirect.ai/', linkLabel: 'Watch the overview' },
          { title: 'Government · 0:58', state: 'County and public-service view', tone: 'current', image: 'https://www.datacenterdirect.ai/media/dcd/proof-safe-v8-6164a441f6d8/government.png', alt: 'Data Center Direct government film thumbnail', copy: 'A shared view of published project information and review responsibilities. Private review is a separately labeled boundary, not a proven public workflow.', href: 'https://www.datacenterdirect.ai/?view=government', linkLabel: 'Watch Government' },
          { title: 'Enterprise · 1:05', state: 'Project and readiness view', tone: 'current', image: 'https://www.datacenterdirect.ai/media/dcd/proof-safe-v8-6164a441f6d8/enterprise.png', alt: 'Data Center Direct enterprise film thumbnail', copy: 'Project context, published commitments, and readiness questions. The public view does not imply a live enterprise connector or an accepted integration.', href: 'https://www.datacenterdirect.ai/?view=enterprise', linkLabel: 'Watch Enterprise' },
          { title: 'Community · 1:32', state: 'Community and participation view', tone: 'current', image: 'https://www.datacenterdirect.ai/media/dcd/proof-safe-v8-6164a441f6d8/community.png', alt: 'Data Center Direct community film thumbnail', copy: 'Understand the local project and make room for community questions. The voice interview line is a limited invitation-only pilot; public call and receipt completion are not claimed.', href: 'https://www.datacenterdirect.ai/?view=community', linkLabel: 'Watch Community' }
        ]
      },
      studio: {
        title: 'Make the county story understandable.',
        description: 'Explain the project in familiar language. Show where a statement comes from, distinguish a published commitment from a completed outcome, and make participation limits clear. Assume the viewer is new to the subject.',
        referenceUrl: 'https://www.datacenterdirect.ai/',
        referenceLabel: 'Open Data Center Direct',
        scopeQuestion: 'Who needs this explanation?',
        scopeDescription: 'Choose government, enterprise, or community. Identify the county, source, date, and current pilot boundary before making a claim.',
        audiences: ['Residents new to data-center projects', 'County staff and public officials', 'Community organizations', 'Project and enterprise teams', 'Journalists and public-record researchers', 'Technical builders and contributors'],
        positive: 'Data Center Direct brings published county project information into a source-linked view. Residents, government, and enterprise can see what is documented and what still needs an answer. Fayette and Effingham are limited pilot contexts; broader adoption is not claimed.',
        positiveWhy: 'Why it works · Names the purpose, uses everyday language, and separates public information from pilot acceptance.',
        negative: 'Data Center Direct is adopted by both counties, verifies every promise, and gives everyone a fully operational AI interview and enterprise integration.',
        negativeWhy: 'Why it fails · Invents adoption, complete verification, unrestricted phone access, and connector readiness.',
        lanes: {
          government: { label: 'Government', summary: 'Published records, commitments, review context, and accountable follow-up.', truth: 'The public Government view and explanatory film are live, with private review boundaries labeled.', boundary: 'Do not imply county endorsement, procurement, completed private review, or a commitment fulfilled merely because it is published.' },
          enterprise: { label: 'Enterprise', summary: 'Project context, readiness questions, and proposed connection paths.', truth: 'The public Enterprise view and film explain readiness from available records.', boundary: 'Do not turn a readiness screen or model-library design into an observed live connector or accepted enterprise integration.' },
          community: { label: 'Community', summary: 'Plain-language project understanding, unanswered questions, and community voice.', truth: 'The Community view and film are public. A voice interview line is part of a limited invitation-only pilot.', boundary: 'Do not claim general phone access, a completed interview receipt, representative public opinion, or verified participant outcomes without the corresponding evidence.' }
        }
      },
      assets: [
        { name: 'Hermetic Labs symbol', source: './assets/ip-library/hermetic-labs-symbol.png', description: 'Company attribution for Data Center Direct content; this is the Hermetic Labs symbol, not a separate product logo.', role: 'Company identity' },
        { name: 'Hermetic Labs banner', source: './assets/ip-library/hermetic-labs-banner.png', description: 'Company wordmark for approved horizontal placements.', role: 'Company banner', wide: true }
      ]
    },
    rd: {
      index: '08',
      state: 'Local research prototype',
      name: 'Hermetic Labs R&D',
      description: 'A research workbench connecting editable geometry, mechanics experiments, electrical simulation, and measured prototype feedback. The aim is to make each step inspectable before making claims about real hardware.',
      products: ['Geometry workspace', 'Mechanics experiments', 'Electrical calibration'],
      job: 'Show the research process and its limits without disclosing private designs or treating a simulation as physical validation.',
      publicState: 'Local workbench demonstrations cover wind and gravity experiments and a Blender-to-viewport geometry bridge. Geometry transfer does not prove robot dynamics; physical validation remains open.',
      nextGate: 'Record measured mass, dimensions, joints, and electrical parameters, then compare bounded simulations with a physical reference.',
      pulse: { summary: 'Sanitized research communication belonging only to Hermetic Labs R&D.', scope: 'Geometry, mechanics, electrical calibration, and measured prototype feedback', rule: 'Explicit R&D project key required', notice: 'Only campaigns explicitly assigned to R&D appear in this lane.', empty: 'No named R&D campaign is currently projected.', aliases: ['robotics-rd', 'hermetic-rd', 'research-and-development'] },
      studio: {
        title: 'Show the experiment. Keep the limits visible.',
        description: 'Explain what was modeled, what was measured, and what remains unknown. Use sanitized demonstration material and keep unreleased designs, implementation details, and sensitive partner work private.',
        referenceUrl: 'https://7hermeticlabs.com/',
        referenceLabel: 'Visit Hermetic Labs',
        scopeQuestion: 'Which research step are you explaining?',
        scopeDescription: 'Choose geometry, simulation, or measured feedback. Name the assumptions and keep local demonstrations separate from physical results.',
        audiences: ['Research collaborators', 'Simulation and robotics teams', 'Technical builders and contributors', 'Educators', 'General public'],
        positive: 'Hermetic Labs is developing a local research workbench for moving editable geometry into an inspectable viewport and running bounded mechanics experiments. Physical validation and calibrated robot dynamics remain future verification steps.',
        positiveWhy: 'Why it works · Describes demonstrated work and leaves physical claims tied to future measurement.',
        negative: 'Our simulator proves flight-ready autonomous robotics and perfectly predicts real-world performance.',
        negativeWhy: 'Why it fails · Invents autonomy, physical validation, deployment readiness, and absolute accuracy.',
        lanes: {
          geometry: { label: 'Geometry workspace', summary: 'Editable models, repeatable transfer, and inspectable components.', truth: 'A local Blender-to-viewport bridge demonstrates repeatable geometry transfer.', boundary: 'Geometry, component names, and transforms are not mass, joints, contact behavior, or validated dynamics.' },
          simulation: { label: 'Mechanics and electrical experiments', summary: 'Bounded wind, gravity, weighted-object, and electrical reference experiments.', truth: 'Local workbench demonstrations and reference checks exist for selected experiments.', boundary: 'Name assumptions and units. Do not claim calibrated full-robot behavior or physical performance from a visual demonstration.' },
          measurement: { label: 'Measured feedback', summary: 'Compare model assumptions with controlled physical observations.', truth: 'Measured parameters and physical references are the next verification gate.', boundary: 'Do not publish hardware validation, field performance, or sensitive design details without approved evidence.' }
        }
      },
      assets: [
        { name: 'Hermetic Labs symbol', source: './assets/ip-library/hermetic-labs-symbol.png', description: 'Company identity for sanitized research communication.', role: 'Company identity' },
        { name: 'Hermetic Labs banner', source: './assets/ip-library/hermetic-labs-banner.png', description: 'Company wordmark for research overview placements.', role: 'Company banner', wide: true }
      ]
    }
  };

  const byId = (id) => document.getElementById(id);
  const tabs = Array.from(document.querySelectorAll('.project-tab'));
  const publicConsole = byId('publicConsole');
  const haltStudio = byId('haltStudio');
  const haltForm = byId('haltContributionForm');
  const studioMailbox = 'Susan@7hermeticlabs.com';
  const lanePicker = byId('studioLanePicker');
  const studioStages = Array.from(document.querySelectorAll('[data-studio-step]'));
  const studioIndicators = Array.from(document.querySelectorAll('[data-step-indicator]'));
  let currentStudioStep = 1;
  let activeProjectId = 'halt';
  let studioProjectId = 'halt';
  let publicBoardSnapshot = null;

  const studioStorageKey = () => `social-health.${studioProjectId}-contribution.v1`;
  const studioProject = () => projects[studioProjectId];
  const studioLanes = () => studioProject().studio.lanes;
  const laneButtons = () => Array.from(lanePicker.querySelectorAll('[data-project-lane]'));

  function localDraft() {
    try {
      return JSON.parse(localStorage.getItem(studioStorageKey()) || '{}');
    } catch (_error) {
      return {};
    }
  }

  function collectHaltDraft() {
    return {
      assignmentCode: byId('haltAssignmentCode').value.trim().toUpperCase(),
      contributionType: byId('haltContributionType').value,
      lane: byId('haltLane').value,
      sourceUrl: byId('haltSourceUrl').value.trim(),
      audience: byId('haltAudience').value,
      claim: byId('haltClaim').value.trim(),
      context: byId('haltContext').value.trim(),
      channels: Array.from(haltForm.querySelectorAll('[name="channels"]:checked')).map((input) => input.value),
      draftCopy: byId('haltDraftCopy').value.trim(),
      assetLinks: byId('haltAssetLinks').value.trim(),
      altText: byId('haltAltText').value.trim(),
      checks: {
        source: byId('checkSource').checked,
        privacy: byId('checkPrivacy').checked,
        medical: byId('checkMedical').checked,
        status: byId('checkStatus').checked
      }
    };
  }

  function saveHaltDraft() {
    try {
      localStorage.setItem(studioStorageKey(), JSON.stringify(collectHaltDraft()));
    } catch (_error) {
      // The composer remains usable when browser storage is unavailable.
    }
  }

  function selectHaltLane(laneId, persist = true) {
    const lane = studioLanes()[laneId];
    if (!lane) return;
    byId('haltLane').value = laneId;
    laneButtons().forEach((button) => button.setAttribute('aria-checked', String(button.dataset.projectLane === laneId)));
    const truth = byId('haltTruthCard');
    const identity = document.createElement('div');
    identity.append(element('small', '', 'Current product truth'), element('strong', '', lane.label));
    const copy = document.createElement('div');
    copy.append(element('p', '', lane.truth), element('p', '', lane.boundary));
    truth.replaceChildren(identity, copy);
    if (persist) saveHaltDraft();
  }

  function configureProjectStudio(projectId) {
    const project = projects[projectId];
    const studio = project.studio;
    studioProjectId = projectId;

    const mark = project.assets[0];
    byId('studioProjectMark').src = mark.source;
    byId('studioProjectMark').alt = `${project.name} mark`;
    byId('studioProjectEyebrow').textContent = `${project.name} contribution studio`;
    byId('studioSteps').setAttribute('aria-label', `${project.name} contribution lifecycle`);
    byId('haltStudioTitle').textContent = studio.title;
    byId('studioProjectDescription').textContent = studio.description;
    byId('studioProjectReference').href = studio.referenceUrl;
    byId('studioProjectReference').firstChild.textContent = `${studio.referenceLabel} `;
    byId('haltBuilds').hidden = projectId !== 'halt';
    byId('haltPlaytesting').hidden = projectId !== 'halt';
    byId('scopeTitle').textContent = studio.scopeQuestion;
    byId('scopeDescription').textContent = studio.scopeDescription;
    byId('haltSourceUrl').placeholder = studio.referenceUrl;
    byId('positiveExampleText').textContent = studio.positive;
    byId('positiveExampleWhy').textContent = studio.positiveWhy;
    byId('negativeExampleText').textContent = studio.negative;
    byId('negativeExampleWhy').textContent = studio.negativeWhy;

    lanePicker.setAttribute('aria-label', `${project.name} product lane`);
    lanePicker.replaceChildren();
    Object.entries(studio.lanes).forEach(([laneId, lane]) => {
      const button = element('button');
      button.type = 'button';
      button.setAttribute('role', 'radio');
      button.setAttribute('aria-checked', 'false');
      button.dataset.projectLane = laneId;
      button.append(element('strong', '', lane.label), element('span', '', lane.summary));
      lanePicker.appendChild(button);
    });

    const audience = byId('haltAudience');
    audience.replaceChildren(new Option('Choose one', ''));
    studio.audiences.forEach((label) => audience.appendChild(new Option(label, label)));

    haltForm.reset();
    byId('haltLane').value = '';
    byId('haltTruthCard').replaceChildren();
    restoreHaltDraft();
    setStudioStep(1, false);
  }

  function restoreHaltDraft() {
    const draft = localDraft();
    const values = {
      haltAssignmentCode: draft.assignmentCode,
      haltContributionType: draft.contributionType,
      haltSourceUrl: draft.sourceUrl,
      haltAudience: draft.audience,
      haltClaim: draft.claim,
      haltContext: draft.context,
      haltDraftCopy: draft.draftCopy,
      haltAssetLinks: draft.assetLinks,
      haltAltText: draft.altText
    };
    Object.entries(values).forEach(([id, value]) => { if (value) byId(id).value = value; });
    (draft.channels || []).forEach((channel) => {
      const input = Array.from(haltForm.querySelectorAll('[name="channels"]')).find((item) => item.value === channel);
      if (input) input.checked = true;
    });
    if (draft.checks) {
      byId('checkSource').checked = Boolean(draft.checks.source);
      byId('checkPrivacy').checked = Boolean(draft.checks.privacy);
      byId('checkMedical').checked = Boolean(draft.checks.medical);
      byId('checkStatus').checked = Boolean(draft.checks.status);
    }
    if (draft.lane) selectHaltLane(draft.lane, false);
    updateHaltCounters();
  }

  function showStudioValidation(message) {
    const panel = byId('studioValidation');
    panel.textContent = message;
    panel.hidden = !message;
    if (message) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function validHttpUrl(value) {
    try {
      const parsed = new URL(value);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch (_error) {
      return false;
    }
  }

  function validateStudioStep(step) {
    const draft = collectHaltDraft();
    if (step === 1) {
      if (!/^SOCIAL-\d{3,}$/i.test(draft.assignmentCode)) return 'Enter the SOCIAL assignment code supplied by Susan.';
      if (!draft.lane) return `Choose the ${studioProject().name} lane this contribution belongs to.`;
      if (!draft.contributionType) return 'Choose the kind of contribution you are preparing.';
    }
    if (step === 2) {
      if (!validHttpUrl(draft.sourceUrl)) return 'Add one current HTTP or HTTPS source URL.';
      if (!draft.audience) return 'Choose the audience this contribution is intended to reach.';
      if (!draft.claim) return 'State the bounded claim your source supports.';
    }
    if (step === 3) {
      if (!draft.channels.length) return 'Choose at least one target channel.';
      if (!draft.draftCopy) return 'Add the draft copy, script, correction, or outreach note.';
      if ((draft.assetLinks || ['visual', 'short-video'].includes(draft.contributionType)) && !draft.altText) {
        return 'Add alt text or a visual description for the proposed asset.';
      }
    }
    if (step === 4 && Object.values(draft.checks).some((checked) => !checked)) {
      return 'Confirm all four contributor safety checks before preparing the handoff.';
    }
    return '';
  }

  function reviewItem(label, value) {
    const wrapper = document.createElement('div');
    wrapper.append(element('span', '', label), element('strong', '', value || 'Not provided'));
    return wrapper;
  }

  function renderHaltReview() {
    const draft = collectHaltDraft();
    const lane = studioLanes()[draft.lane];
    byId('haltReviewSummary').replaceChildren(
      reviewItem('Assignment', draft.assignmentCode),
      reviewItem('Product', lane ? lane.label : ''),
      reviewItem('Contribution', draft.contributionType.replaceAll('-', ' ')),
      reviewItem('Audience', draft.audience),
      reviewItem('Channels', draft.channels.join(', ')),
      reviewItem('Source', draft.sourceUrl)
    );
  }

  function buildHaltPacket() {
    const draft = collectHaltDraft();
    const project = studioProject();
    const lane = studioLanes()[draft.lane];
    return [
      `${project.name.toUpperCase()} CONTRIBUTOR SUBMISSION`,
      '',
      `Assignment: ${draft.assignmentCode}`,
      `Product: ${lane ? lane.label : draft.lane}`,
      `Contribution type: ${draft.contributionType.replaceAll('-', ' ')}`,
      `Audience: ${draft.audience}`,
      `Target channels: ${draft.channels.join(', ')}`,
      '',
      'PRIMARY SOURCE',
      draft.sourceUrl,
      '',
      'SUPPORTED CLAIM',
      draft.claim,
      '',
      'WHY THIS MATTERS NOW',
      draft.context || 'Not provided',
      '',
      'DRAFT CONTRIBUTION',
      draft.draftCopy,
      '',
      'ASSET OR WORKING-FILE LINKS',
      draft.assetLinks || 'No links provided; files may be attached to the email.',
      '',
      'ALT TEXT / VISUAL DESCRIPTION',
      draft.altText || 'Not applicable',
      '',
      'CONTRIBUTOR CHECKS',
      '- Source-bound claim confirmed',
      '- No personal, private-contact, credential, confidential, or regulated data included',
      '- Qualified human review remains explicit',
      '- Product status and validation language checked',
      '',
      'Please attach any files before sending.'
    ].join('\n');
  }

  function prepareHaltSubmission() {
    const packet = buildHaltPacket();
    const draft = collectHaltDraft();
    const project = studioProject();
    const lane = studioLanes()[draft.lane];
    byId('haltSubmissionPacket').textContent = packet;
    const subject = `[${draft.assignmentCode}] ${lane ? lane.label : project.name} contribution submission`;
    byId('openHaltEmail').href = `mailto:${studioMailbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(packet)}`;
  }

  function setStudioStep(step, moveFocus = true) {
    currentStudioStep = step;
    showStudioValidation('');
    studioStages.forEach((stage) => { stage.hidden = Number(stage.dataset.studioStep) !== step; });
    studioIndicators.forEach((indicator) => {
      const indicatorStep = Number(indicator.dataset.stepIndicator);
      indicator.classList.toggle('is-current', indicatorStep === step);
      indicator.classList.toggle('is-complete', indicatorStep < step);
    });
    if (step === 4) renderHaltReview();
    if (step === 5) prepareHaltSubmission();
    const activeStage = studioStages.find((stage) => Number(stage.dataset.studioStep) === step);
    if (moveFocus) {
      activeStage.setAttribute('tabindex', '-1');
      activeStage.focus({ preventScroll: true });
      activeStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function updateHaltCounters() {
    byId('claimCount').textContent = String(byId('haltClaim').value.length);
    byId('contextCount').textContent = String(byId('haltContext').value.length);
    byId('draftCount').textContent = String(byId('haltDraftCopy').value.length);
  }

  async function copyPlainText(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (_error) {
      const helper = document.createElement('textarea');
      helper.value = value;
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      helper.remove();
    }
  }

  function temporaryButtonLabel(button, label) {
    const original = button.dataset.originalLabel || button.textContent;
    button.dataset.originalLabel = original;
    button.textContent = label;
    window.setTimeout(() => { button.textContent = original; }, 2200);
  }

  async function copyHaltPacket() {
    await copyPlainText(buildHaltPacket());
    byId('packetStatus').textContent = 'Copied';
  }

  async function copyIcon(button) {
    const source = button.dataset.copyIcon;
    const label = button.dataset.copyLabel || 'Icon';
    button.setAttribute('aria-busy', 'true');
    try {
      if (!window.ClipboardItem || !navigator.clipboard || !navigator.clipboard.write) throw new Error('Image clipboard unavailable');
      const response = await fetch(source);
      if (!response.ok) throw new Error(`Asset request failed: ${response.status}`);
      const sourceBlob = await response.blob();
      const pngBlob = sourceBlob.type === 'image/png' ? sourceBlob : new Blob([await sourceBlob.arrayBuffer()], { type: 'image/png' });
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob })]);
      temporaryButtonLabel(button, `${label} copied`);
    } catch (_error) {
      await copyPlainText(new URL(source, window.location.href).href);
      temporaryButtonLabel(button, 'Image link copied');
    } finally {
      button.removeAttribute('aria-busy');
    }
  }

  function clearHaltDraft() {
    if (!window.confirm(`Clear the ${studioProject().name} contribution saved in this browser?`)) return;
    try { localStorage.removeItem(studioStorageKey()); } catch (_error) { /* No stored draft to clear. */ }
    haltForm.reset();
    byId('haltLane').value = '';
    laneButtons().forEach((button) => button.setAttribute('aria-checked', 'false'));
    byId('haltTruthCard').replaceChildren();
    updateHaltCounters();
    setStudioStep(1);
  }

  function openHaltStudio() {
    configureProjectStudio(activeProjectId);
    publicConsole.classList.add('is-project-focused');
    haltStudio.hidden = false;
    byId('haltStudioTitle').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeHaltStudio() {
    publicConsole.classList.remove('is-project-focused');
    haltStudio.hidden = true;
    byId(`tab-${studioProjectId}`).focus({ preventScroll: true });
  }

  function setProject(projectId) {
    const project = projects[projectId];
    if (!project) return;
    activeProjectId = projectId;

    tabs.forEach((tab) => {
      const active = tab.dataset.project === projectId;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    const activeTab = tabs.find((tab) => tab.dataset.project === projectId);
    const panel = byId('projectPanel');
    panel.setAttribute('aria-labelledby', activeTab.id);
    byId('projectIndex').textContent = project.index;
    byId('projectState').textContent = project.state;
    byId('projectName').textContent = project.name;
    byId('projectDescription').textContent = project.description;
    byId('projectJob').textContent = project.job;
    byId('projectPublicState').textContent = project.publicState;
    byId('projectNextGate').textContent = project.nextGate;
    byId('openProjectStudio').textContent = `Enter ${project.name} contribution workspace →`;

    const products = byId('projectProducts');
    products.replaceChildren();
    project.products.forEach((product) => {
      const chip = document.createElement('span');
      chip.textContent = product;
      products.appendChild(chip);
    });
    products.hidden = project.products.length === 0;
    renderProjectAssets(project);
    renderProjectPulse(projectId, project);
    renderProjectSpotlight(projectId, project);
  }

  function renderProjectSpotlight(projectId, project) {
    const spotlight = byId('projectSpotlight');
    const model = project.spotlight;
    spotlight.hidden = !model;
    if (!model) return;

    byId('projectSpotlightKicker').textContent = model.kicker;
    byId('projectSpotlightTitle').textContent = model.title;
    byId('projectSpotlightSummary').textContent = model.summary;
    byId('projectSpotlightPath').textContent = model.path;
    byId('projectSpotlightReference').href = model.referenceUrl;
    byId('projectSpotlightReference').textContent = model.referenceLabel || 'Visit the VRF site →';
    byId('projectSpotlightHomeTitle').textContent = model.homeTitle || 'Standalone VRF source of truth';
    byId('projectSpotlightHomeDescription').textContent = model.homeDescription || 'The independent VRF site now carries the public product experience while this workspace keeps contribution context and source boundaries visible.';
    byId('projectSpotlightStats').setAttribute('aria-label', `${project.name} portfolio status`);

    byId('projectSpotlightStats').replaceChildren(...model.stats.map((stat) => {
      const item = element('div');
      item.append(element('strong', '', stat.value), element('span', '', stat.label));
      return item;
    }));

    byId('projectSpotlightGrid').replaceChildren(...model.cards.map((entry) => {
      const card = element('article', `project-spotlight-card is-${entry.tone}`);
      const media = element('a', 'project-spotlight-media');
      media.href = entry.href;
      media.target = '_blank';
      media.rel = 'noopener';
      const image = document.createElement('img');
      image.src = entry.image;
      image.alt = entry.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      media.append(image);

      const copy = element('div', 'project-spotlight-copy');
      copy.append(element('span', 'project-spotlight-state', entry.state), element('h5', '', entry.title), element('p', '', entry.copy));
      const link = element('a', '', `${entry.linkLabel} ↗`);
      link.href = entry.href;
      link.target = '_blank';
      link.rel = 'noopener';
      copy.append(link);
      card.append(media, copy);
      return card;
    }));

    spotlight.setAttribute('aria-label', `${project.name} public portfolio snapshot`);
  }

  function renderProjectPulse(projectId, project) {
    byId('pulseTitle').textContent = `${project.name} campaign pulse`;
    byId('pulseScope').textContent = project.pulse.summary;
    byId('campaignScope').textContent = project.pulse.scope;
    byId('campaignAssociation').textContent = project.pulse.rule;
    byId('boardNotice').textContent = project.pulse.notice;
    if (publicBoardSnapshot) renderBoardForProject(projectId);
  }

  function renderProjectAssets(project) {
    byId('projectAssetsTitle').textContent = `${project.name} icon & IP library`;
    byId('projectAssetsDescription').textContent = project.assetLibraryDescription || `${project.assets.length} approved source ${project.assets.length === 1 ? 'asset' : 'assets'}, kept inside the ${project.name} lane.`;
    const grid = byId('projectAssetGrid');
    grid.replaceChildren();
    grid.classList.toggle('is-single', project.assets.length === 1);

    project.assets.forEach((asset) => {
      const card = element('article', `project-asset-card${asset.wide ? ' is-wide' : ''}`);
      const visual = element('div', 'project-asset-visual');
      const image = document.createElement('img');
      image.src = asset.source;
      image.alt = asset.alt || `${asset.name} identity asset`;
      visual.appendChild(image);

      const copy = element('div', 'project-asset-copy');
      copy.append(element('span', 'asset-status is-found', asset.status || 'Source found'), element('h5', '', asset.name), element('p', '', asset.description), element('small', '', `Role · ${asset.role}`));
      const actions = element('div', 'asset-actions');
      const copyButton = element('button', '', 'Copy PNG');
      copyButton.type = 'button';
      copyButton.dataset.copyIcon = asset.source;
      copyButton.dataset.copyLabel = asset.name;
      copyButton.addEventListener('click', () => copyIcon(copyButton));
      const download = element('a', '', 'Download');
      download.href = asset.source;
      download.setAttribute('download', '');
      actions.append(copyButton, download);
      copy.appendChild(actions);
      card.append(visual, copy);
      grid.appendChild(card);
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      setProject(tab.dataset.project);
    });
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let target = index;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      tabs[target].focus();
      setProject(tabs[target].dataset.project);
    });
  });

  byId('openProjectStudio').addEventListener('click', openHaltStudio);
  byId('closeHaltStudio').addEventListener('click', closeHaltStudio);

  lanePicker.addEventListener('click', (event) => {
    const button = event.target.closest('[data-project-lane]');
    if (button) selectHaltLane(button.dataset.projectLane);
  });
  lanePicker.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    const buttons = laneButtons();
    const index = buttons.indexOf(event.target.closest('[data-project-lane]'));
    if (index < 0) return;
    event.preventDefault();
    const backwards = ['ArrowLeft', 'ArrowUp'].includes(event.key);
    const target = (index + (backwards ? -1 : 1) + buttons.length) % buttons.length;
    buttons[target].focus();
    selectHaltLane(buttons[target].dataset.projectLane);
  });

  haltForm.addEventListener('input', (event) => {
    if (event.target === byId('haltAssignmentCode')) event.target.value = event.target.value.toUpperCase();
    updateHaltCounters();
    saveHaltDraft();
  });
  haltForm.addEventListener('change', saveHaltDraft);

  haltForm.querySelectorAll('[data-next-step]').forEach((button) => {
    button.addEventListener('click', () => {
      const message = validateStudioStep(currentStudioStep);
      if (message) {
        showStudioValidation(message);
        return;
      }
      saveHaltDraft();
      setStudioStep(Number(button.dataset.nextStep));
    });
  });

  haltForm.querySelectorAll('[data-prev-step]').forEach((button) => {
    button.addEventListener('click', () => setStudioStep(Number(button.dataset.prevStep)));
  });

  byId('copyHaltPacket').addEventListener('click', copyHaltPacket);
  byId('clearHaltDraft').addEventListener('click', clearHaltDraft);
  document.querySelectorAll('[data-copy-text-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = byId(button.dataset.copyTextTarget);
      if (!target) return;
      await copyPlainText(target.textContent.trim());
      temporaryButtonLabel(button, 'Positive example copied');
    });
  });
  document.querySelectorAll('[data-copy-icon]').forEach((button) => {
    button.addEventListener('click', () => copyIcon(button));
  });
  const formatStatus = (value) => String(value || 'in progress').replaceAll('_', ' ');
  const formatDate = (value) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '';
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(parsed);
  };

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function renderCampaign(campaign) {
    const card = element('article', 'campaign-card-public');
    const copy = element('div', 'campaign-card-copy');
    copy.appendChild(element('p', 'card-label', formatStatus(campaign.status || 'planning')));
    copy.appendChild(element('h3', '', campaign.title || 'Campaign'));
    copy.appendChild(element('p', '', campaign.summary || 'No public summary is available.'));

    const metadata = element('div', 'campaign-meta');
    (campaign.platforms || []).forEach((platform) => metadata.appendChild(element('span', '', platform)));
    if (campaign.startAt || campaign.endAt) {
      metadata.appendChild(element('span', '', [formatDate(campaign.startAt), formatDate(campaign.endAt)].filter(Boolean).join(' – ')));
    }
    copy.appendChild(metadata);
    card.appendChild(copy);

    const assignments = element('div', 'assignment-list-public');
    const items = Array.isArray(campaign.assignments) ? campaign.assignments : [];
    if (!items.length) {
      assignments.appendChild(element('div', 'assignment-public', 'No public assignments are attached.'));
    } else {
      items.forEach((assignment) => {
        const row = element('div', 'assignment-public');
        const detail = document.createElement('div');
        detail.appendChild(element('strong', '', assignment.title || assignment.assignmentCode || 'Assignment'));
        const due = assignment.dueAt ? ` · due ${formatDate(assignment.dueAt)}` : '';
        detail.appendChild(element('small', '', `${assignment.assignmentCode || 'Work item'}${due}`));
        row.append(detail, element('span', '', formatStatus(assignment.lifecycleStatus || assignment.stage)));
        assignments.appendChild(row);
      });
    }
    card.appendChild(assignments);
    return card;
  }

  const normalizeProjectKey = (value) => String(value || '').trim().toLowerCase().replaceAll('_', '-').replace(/\s+/g, '-');

  function campaignProjectKeys(campaign) {
    const nested = campaign.project && typeof campaign.project === 'object' ? campaign.project : {};
    const scoped = campaign.scope && typeof campaign.scope === 'object' ? campaign.scope : {};
    return [
      campaign.projectId,
      campaign.projectKey,
      campaign.projectCode,
      campaign.projectSlug,
      nested.id,
      nested.key,
      nested.code,
      nested.slug,
      scoped.projectId,
      scoped.projectKey,
      scoped.projectCode
    ].map(normalizeProjectKey).filter(Boolean);
  }

  function renderBoardForProject(projectId) {
    const project = projects[projectId];
    const board = byId('campaignBoard');
    if (!project || !publicBoardSnapshot) return;

    const aliases = project.pulse.aliases.map(normalizeProjectKey);
    const campaigns = Array.isArray(publicBoardSnapshot.campaigns)
      ? publicBoardSnapshot.campaigns.filter((campaign) => {
        if (campaign.id === 'unassigned' || campaign.campaignCode === 'GENERAL') return false;
        return campaignProjectKeys(campaign).some((key) => aliases.includes(key));
      })
      : [];

    board.replaceChildren();
    if (!campaigns.length) board.appendChild(element('div', 'board-empty', project.pulse.empty));
    campaigns.forEach((campaign) => board.appendChild(renderCampaign(campaign)));
    board.setAttribute('aria-busy', 'false');
  }

  async function loadBoard() {
    const board = byId('campaignBoard');
    const refresh = byId('refreshBoard');
    const rail = byId('graphRailStatus');
    board.setAttribute('aria-busy', 'true');
    const loading = element('div', 'board-loading');
    const pulse = document.createElement('span');
    pulse.setAttribute('aria-hidden', 'true');
    loading.append(pulse, document.createTextNode('Loading sanitized public campaign state…'));
    board.replaceChildren(loading);
    refresh.disabled = true;
    publicBoardSnapshot = null;

    try {
      const response = await fetch('https://graph.7hermeticlabs.com/public/contributor-board', {
        headers: { Accept: 'application/json' },
        cache: 'no-store'
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      publicBoardSnapshot = data;
      renderBoardForProject(activeProjectId);
      rail.textContent = 'Public read verified';
      rail.className = 'is-live';
      byId('boardFreshness').textContent = data.generatedAt ? `Read verified · ${formatDate(data.generatedAt)}` : 'Public read verified';
    } catch (_error) {
      board.replaceChildren(element('div', 'board-error', 'The public campaign projection is temporarily unavailable. No cached claim is shown.'));
      rail.textContent = 'Public read unavailable';
      rail.className = 'is-degraded';
      byId('boardFreshness').textContent = 'Public graph unavailable';
    } finally {
      board.setAttribute('aria-busy', 'false');
      refresh.disabled = false;
    }
  }

  byId('refreshBoard').addEventListener('click', loadBoard);
  byId('mainContent').prepend(byId('projects'));
  setProject('halt');
  loadBoard();
})();
