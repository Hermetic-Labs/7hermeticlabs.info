import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
await page.addInitScript(() => {
  window.__copiedText = '';
  window.__copiedImages = 0;
  window.ClipboardItem = class ClipboardItem { constructor(data) { this.data = data; } };
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: async (value) => { window.__copiedText = value; },
      write: async (items) => { window.__copiedImages = items.length; }
    }
  });
});

const boardFixture = {
  generatedAt: '2026-08-22T13:00:00.000Z',
  campaigns: [{
    projectId: 'halt',
    title: 'HALT awareness',
    summary: 'Build a consistent social rhythm.',
    platforms: ['LinkedIn'],
    status: 'active',
    startAt: '2026-08-10T00:00:00.000Z',
    endAt: '2026-08-16T00:00:00.000Z',
    assignments: [{ assignmentCode: 'SOCIAL-003', title: 'Contributor onboarding confirmation', lifecycleStatus: 'draft' }]
  }]
};

const scorecardFixture = {
  generatedAt: '2026-08-12T07:44:32.957Z',
  contributor: { id: 'hiteshi-baldev', name: 'Hiteshi Hitu Seo Baldev', timezone: 'Asia/Kolkata' },
  campaign: { title: 'HALT awareness', summary: 'Build a consistent social rhythm.', platforms: ['LinkedIn'], status: 'active', startAt: '2026-08-10T00:00:00.000Z', endAt: '2026-08-16T00:00:00.000Z' },
  thisWeek: { weekOf: '2026-08-10', summary: 'Publish and engage.', score: 72, goals: [{ id: 'g1', title: 'Publish three posts', current: 2, target: 3, unit: 'posts', status: 'in_progress' }] },
  lastWeek: { weekOf: '2026-08-03', summary: 'Foundation week.', score: 84, rank: 1, cohortSize: 3, goals: [], wins: ['Completed profile'], improvements: ['Increase engagement'] },
  managerNote: 'Strong foundation. Keep the cadence steady.',
  lifecycle: [{
    assignmentCode: 'SOCIAL-003', title: 'Contributor onboarding confirmation', lifecycleStatus: 'changes_requested',
    revisionRound: 1, feedback: 'Tighten the opening claim and keep the status bounded.',
    nextAction: 'Review Susan’s feedback, revise the contribution, and reply in the same email thread.',
    milestones: { submittedAt: '2026-08-12T06:00:00.000Z' }, publication: { calendarLinked: false },
    updatedAt: '2026-08-12T07:00:00.000Z'
  }],
  updatedAt: '2026-08-12T07:44:26.452Z'
};

await page.route('https://graph.7hermeticlabs.com/**', async (route) => {
  const body = route.request().url().includes('/public/contributor-scorecard/') ? scorecardFixture : boardFixture;
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
});

const publicUrl = `file://${path.join(root, '..', 'src', 'public', 'index.html')}`;
await page.goto(publicUrl, { waitUntil: 'networkidle' });
await page.locator('.campaign-card-public').waitFor({ state: 'attached' });

if ((await page.title()) !== 'BLANKIT — Social Health') errors.push('Public page title is incorrect');
if (!(await page.locator('link[href*="site.css?v=20261109-1"]').count())) errors.push('Site stylesheet cache marker is missing');
if (!(await page.locator('script[src*="site.js?v=20261109-1"]').count())) errors.push('Site script cache marker is missing');
if (!(await page.locator('#publicConsole').isVisible())) errors.push('Public console is not visible');
if (!(await page.locator('#contributorWorkspace').isHidden())) errors.push('Contributor workspace appeared without a signed link');
if ((await page.locator('.project-tab').count()) !== 8) errors.push('Expected eight project lanes');
if (await page.locator('#tab-veritas').count()) errors.push('Veritas leaked into a separate Social Health project lane');
if ((await page.locator('.campaign-card-public').count()) !== 1) errors.push('Public campaign did not render');
if ((await page.locator('#mainContent > :first-child').getAttribute('id')) !== 'projects') errors.push('Portfolio map is not the first public section');
if (await page.locator('#materials').count()) errors.push('Mixed-project asset register remains on the landing page');
if ((await page.locator('#pulseTitle').textContent()) !== 'HALT campaign pulse') errors.push('Campaign pulse is not scoped to HALT by default');
if (await page.locator('#projectPanel .project-assets, #projectPanel .project-pulse').count()) errors.push('Project details remain exposed in the summary');
if ((await page.locator('#tab-halt').getAttribute('href')) !== null) errors.push('HALT tab still carries a page link');
if (await page.evaluate(() => Array.from(document.querySelectorAll('[download]')).some((node) => !node.closest('.project-assets')))) errors.push('A download control remains outside Project iconology');
if ((await page.locator('#projectAssetGrid .project-asset-card').count()) !== 9) errors.push('HALT icon and IP library did not render all nine source assets in its lane');
if (!(await page.locator('#projectAssetGrid img[src$="halt-mark.png"]').count())) errors.push('HALT mark is not wired into the HALT lane');
if (!(await page.locator('.brand-logo').getAttribute('src')).includes('blankit-mark.svg')) errors.push('BLANKIT site logo is not wired into the header');

await page.locator('#tab-vulpine').click();
if ((await page.locator('#projectName').textContent()) !== 'Courier Services') errors.push('Courier rename did not update the panel');
if ((await page.locator('#projectState').textContent()) !== 'Release hardening') errors.push('Vulpine release state is stale');
if (!(await page.locator('#projectPublicState').textContent()).includes('create/cancel proof')) errors.push('Vulpine verified provider proof is missing');
if (!(await page.locator('#projectNextGate').textContent()).includes('full synthetic lifecycle')) errors.push('Vulpine lifecycle boundary is missing');
if (!(await page.locator('#projectAssetGrid img[src$="vulpine-mark.png"]').count())) errors.push('Vulpine mark is not contained in the Vulpine lane');
if ((await page.locator('#pulseTitle').textContent()) !== 'Courier Services campaign pulse') errors.push('Campaign pulse did not switch to Courier');
await page.locator('#openProjectStudio').click();
if ((await page.locator('#studioProjectEyebrow').textContent()) !== 'Courier Services contribution studio') errors.push('Courier workspace did not inherit its identity');
if ((await page.locator('#studioProjectReference').getAttribute('href')) !== 'https://7hermeticlabs.services/') errors.push('Courier still uses its broken legacy URL');
if ((await page.locator('#studioLanePicker [data-project-lane]').count()) !== 3) errors.push('Vulpine workspace lanes did not render');
if (!(await page.locator('#positiveExampleText').textContent()).includes('release hardening')) errors.push('Vulpine bounded claim is missing');
if (!(await page.locator('#negativeExampleText').textContent()).includes('deployed with Onfleet')) errors.push('Vulpine partnership guardrail is missing');
await page.locator('#haltAssignmentCode').fill('SOCIAL-201');
if (!(await page.evaluate(() => localStorage.getItem('social-health.vulpine-contribution.v1')))) errors.push('Vulpine draft was not isolated in project storage');
await page.locator('#closeHaltStudio').click();

await page.locator('#tab-abbe').click();
if ((await page.locator('#projectName').textContent()) !== 'Abbé Faria') errors.push('Abbé Faria project tab did not update the panel');
if ((await page.locator('#projectState').textContent()) !== 'Private demonstration') errors.push('Abbé Faria demonstration state is stale');
if (!(await page.locator('#projectPublicState').textContent()).includes('project team reports')) errors.push('Abbé Faria owner-report distinction is missing');
if (!(await page.locator('#projectAssetGrid img[src$="abbe-faria-mark.png"]').count())) errors.push('Abbé Faria mark is not contained in its lane');
if ((await page.locator('#pulseTitle').textContent()) !== 'Abbé Faria campaign pulse') errors.push('Campaign pulse did not switch to Abbé Faria');
await page.locator('#openProjectStudio').click();
if ((await page.locator('#studioProjectEyebrow').textContent()) !== 'Abbé Faria contribution studio') errors.push('Abbé Faria workspace did not inherit its identity');
if ((await page.locator('#studioLanePicker [data-project-lane]').count()) !== 3) errors.push('Abbé Faria workspace lanes did not render');
if (!(await page.locator('#positiveExampleText').textContent()).includes('have not been established')) errors.push('Abbé Faria deployment boundary is missing');
if (!(await page.locator('#studioProjectDescription').textContent()).includes('Practice OS')) errors.push('Abbé Faria practice experience is missing');
if ((await page.locator('#studioProjectReference').getAttribute('href')) !== 'https://abbefaria.app/') errors.push('Abbé Faria public URL is stale');
if (!(await page.locator('#negativeExampleText').textContent()).includes('approved Securus')) errors.push('Abbé Faria vendor-relationship guardrail is missing');
await page.locator('#haltAssignmentCode').fill('SOCIAL-202');
if (!(await page.evaluate(() => localStorage.getItem('social-health.abbe-contribution.v1')))) errors.push('Abbé Faria draft was not isolated in project storage');
await page.locator('#closeHaltStudio').click();

await page.locator('#tab-dcd').click();
if ((await page.locator('#projectName').textContent()) !== 'Data Center Direct') errors.push('DCD project panel is missing');
if (!(await page.locator('#projectPublicState').textContent()).includes('not a claim of county adoption')) errors.push('DCD pilot boundary is missing');
if (await page.locator('.campaign-card-public').count()) errors.push('HALT campaign leaked into DCD');
await page.locator('#openProjectStudio').click();
if ((await page.locator('#projectSpotlightGrid .project-spotlight-card').count()) !== 4) errors.push('DCD film shelf does not contain four films');
if (!(await page.locator('#projectSpotlightGrid').textContent()).includes('voice interview line')) errors.push('DCD voice participation was omitted');
if ((await page.locator('#projectSpotlightReference').getAttribute('href')) !== 'https://www.datacenterdirect.ai/') errors.push('DCD film shelf has the wrong reference');
if (!(await page.locator('#projectSpotlightHomeTitle').textContent()).includes('county records')) errors.push('DCD inherited VRF footer wording');
if (!(await page.locator('#haltBuilds').isHidden())) errors.push('HALT builds leaked into DCD');
for (const [film, view] of [['home', ''], ['government', '?view=government'], ['enterprise', '?view=enterprise'], ['community', '?view=community']]) {
  const card = page.locator('.project-spotlight-card').filter({ has: page.locator(`img[src$="/${film}.png"]`) });
  if ((await card.locator('a').first().getAttribute('href')) !== `https://www.datacenterdirect.ai/${view}`) errors.push(`DCD ${film} points to the wrong audience page`);
}
await page.locator('#haltAssignmentCode').fill('SOCIAL-DCD');
if (!(await page.evaluate(() => localStorage.getItem('social-health.dcd-contribution.v1')))) errors.push('DCD draft is not isolated');
await page.locator('#closeHaltStudio').click();
await page.locator('#tab-rd').click();
if (!(await page.locator('#projectPublicState').textContent()).includes('physical validation remains open')) errors.push('R&D physical-validation boundary is missing');
await page.locator('#openProjectStudio').click();
if ((await page.locator('#studioLanePicker [data-project-lane]').count()) !== 3) errors.push('R&D research lanes did not render');
if (!(await page.locator('#projectSpotlight').isHidden())) errors.push('DCD films leaked into R&D');
if ((await page.locator('#haltAssignmentCode').inputValue()) !== '') errors.push('DCD draft leaked into R&D');
await page.locator('#closeHaltStudio').click();

await page.locator('#tab-fefe').click();
if ((await page.locator('#projectName').textContent()) !== 'FEFE Connect') errors.push('Project tab did not update the panel');
if ((await page.locator('#projectState').textContent()) !== 'Public foundation') errors.push('FEFE Connect foundation state is stale');
if (!(await page.locator('#projectPublicState').textContent()).includes('Live verification')) errors.push('FEFE Connect service boundary is missing');
if (!(await page.locator('#haltStudio').isHidden())) errors.push('A project tab opened the workspace instead of its summary');
if (!(await page.locator('#projectAssetGrid img[src$="fefe-connect-mark.png"]').count())) errors.push('FEFE Connect mark is not contained in the FEFE lane');
if ((await page.locator('#pulseTitle').textContent()) !== 'FEFE Connect campaign pulse') errors.push('Campaign pulse did not switch to FEFE Connect');
if (await page.locator('.campaign-card-public').count()) errors.push('HALT campaign leaked into the FEFE Connect scope');
if (!(await page.locator('#campaignBoard').textContent()).includes('No named FEFE Connect campaign')) errors.push('FEFE Connect empty state is not project-specific');
await page.locator('#openProjectStudio').click();
if ((await page.locator('#studioProjectEyebrow').textContent()) !== 'FEFE Connect contribution studio') errors.push('FEFE Connect workspace did not inherit its identity');
if (!(await page.locator('#haltPlaytesting').isHidden())) errors.push('HALT playtesting leaked into the FEFE Connect workspace');
if (!(await page.locator('#haltStudio .project-assets').isVisible()) || !(await page.locator('#haltStudio .project-pulse').isVisible())) errors.push('FEFE Connect iconology and campaign pulse did not move into its workspace');
if ((await page.locator('#studioLanePicker [data-project-lane]').count()) !== 3) errors.push('FEFE Connect workspace lanes did not render');
await page.locator('#haltAssignmentCode').fill('SOCIAL-101');
if (!(await page.evaluate(() => localStorage.getItem('social-health.fefe-contribution.v1')))) errors.push('FEFE Connect draft was not isolated in project storage');
await page.locator('#closeHaltStudio').click();
await page.locator('#tab-vrf').click();
if (!(await page.locator('#projectAssetGrid img[src$="vrf-mark.png"]').count())) errors.push('VRF mark is not contained in the VRF lane');
if ((await page.locator('#pulseTitle').textContent()) !== 'VRF campaign pulse') errors.push('Campaign pulse did not switch to VRF');
if ((await page.locator('#projectState').textContent()) !== 'Public catalog active') errors.push('VRF public state still reads as reserved');
if ((await page.locator('#projectProducts > span').count()) !== 8) errors.push('VRF portfolio shape did not render');
if (!(await page.locator('#projectProducts').textContent()).includes('Veritas')) errors.push('VRF outbound gateway is missing from the portfolio summary');
if (!(await page.locator('#projectPublicState').textContent()).includes('three routes into the live VRF Discord')) errors.push('VRF public touchpoints are not summarized');
if (!(await page.locator('#projectSpotlight').isHidden())) errors.push('VRF public map remains exposed on the landing-page summary');
await page.locator('#openProjectStudio').click();
if ((await page.locator('#studioProjectEyebrow').textContent()) !== 'VRF contribution studio') errors.push('VRF workspace did not inherit its identity');
if (!(await page.locator('#projectSpotlight').isVisible())) errors.push('VRF public portfolio map is not visible inside the workspace');
if ((await page.locator('#projectSpotlightReference').getAttribute('href')) !== 'https://virtualrealityfatality.com/') errors.push('VRF public map does not point to the standalone site');
if ((await page.locator('#projectSpotlightGrid .project-spotlight-card').count()) !== 6) errors.push('VRF public media set did not render');
if ((await page.locator('#projectSpotlightGrid .is-current').count()) !== 3) errors.push('VRF current Fab packs are not visually distinguished');
if (!(await page.locator('#projectSpotlightPath').textContent()).includes('Veritas outbound')) errors.push('VRF system direction is missing from the spotlight');
if ((await page.locator('#projectAssetGrid .project-asset-card').count()) !== 5) errors.push('Susan’s VRF identity kit did not render all five assets');
if (!(await page.locator('#projectAssetsDescription').textContent()).includes('Susan')) errors.push('VRF identity kit is not described for Susan’s workflow');
if ((await page.locator('#haltAssignmentCode').inputValue()) !== '') errors.push('FEFE Connect draft leaked into the VRF workspace');
if ((await page.locator('#studioLanePicker [data-project-lane]').count()) !== 3) errors.push('VRF workspace lanes did not render');
if (!(await page.locator('#studioLanePicker').textContent()).includes('Foundation packs')) errors.push('VRF foundation lane did not render');
if (!(await page.locator('#studioLanePicker').textContent()).includes('Expansion and embodiment')) errors.push('VRF expansion lane did not render');
await page.locator('#closeHaltStudio').click();
await page.locator('#tab-eve').click();
if ((await page.locator('#projectState').textContent()) !== 'Platform lane active') errors.push('Eve OS / Exchange platform state is stale');
if (!(await page.locator('#projectPublicState').textContent()).includes('Private orchestration records')) errors.push('Eve OS / Exchange public boundary is missing');
if ((await page.locator('#projectAssetGrid .project-asset-card').count()) !== 3) errors.push('Eve OS and Exchange marks are not grouped in their shared lane');
if ((await page.locator('#pulseTitle').textContent()) !== 'Eve OS / Exchange campaign pulse') errors.push('Campaign pulse did not switch to Eve OS / Exchange');
await page.locator('#openProjectStudio').click();
if (!(await page.locator('#haltStudio').isVisible())) errors.push('Eve OS / Exchange summary did not open its contribution workspace');
if ((await page.locator('#studioProjectEyebrow').textContent()) !== 'Eve OS / Exchange contribution studio') errors.push('Contribution workspace did not inherit the Eve OS / Exchange identity');
if ((await page.locator('#studioSteps').getAttribute('aria-label')) !== 'Eve OS / Exchange contribution lifecycle') errors.push('Contribution lifecycle kept the wrong project label');
if ((await page.locator('#studioLanePicker [data-project-lane]').count()) !== 3) errors.push('Eve OS / Exchange workspace lanes did not render');
if ((await page.locator('.project-asset-scroll').evaluate((node) => getComputedStyle(node).overflowX)) !== 'auto') errors.push('Project iconology asset rail is not horizontally scrollable');
await page.locator('.project-assets > summary').click();
if (await page.locator('.project-assets').getAttribute('open') !== null) errors.push('Project iconology did not collapse');
await page.locator('.project-assets > summary').click();
if (await page.locator('.project-assets').getAttribute('open') === null) errors.push('Project iconology did not expand');
await page.locator('#closeHaltStudio').click();

await page.locator('#tab-halt').click();
if (!(await page.locator('#haltStudio').isHidden())) errors.push('HALT tab bypassed its summary');
if (!(await page.locator('#openProjectStudio').textContent()).includes('HALT')) errors.push('HALT summary did not expose its workspace action');
await page.locator('#openProjectStudio').click();
if (!(await page.locator('#haltBuilds').isVisible())) errors.push('HALT build downloads are not visible in the HALT workspace');
if ((await page.locator('#haltBuilds .halt-build-card').count()) !== 3) errors.push('HALT build area does not expose all three product packages');
if ((await page.locator('#haltBuilds .build-ready-stamp').count()) !== 3) errors.push('HALT build readiness timestamps are missing');
if (await page.locator('#haltBuilds .build-ready-stamp').evaluateAll((stamps) => stamps.some((stamp) => !stamp.textContent?.includes('Ready') || !stamp.querySelector('time')?.dateTime))) errors.push('HALT build readiness timestamps are incomplete');
if (!(await page.locator('#haltBuilds a[href$="/builds/HALT_1.2.22_setup.exe"]').count())) errors.push('HALT Organization 1.2.22 package is missing');
if (!(await page.locator('#haltBuilds a[href$="/builds/HALT_Caregiver_1.2.22_setup.exe"]').count())) errors.push('HALT Caregiver 1.2.22 package is missing');
if (!(await page.locator('#haltBuilds a[href$="/builds/HALT_Community_1.2.22_setup.exe"]').count())) errors.push('HALT Community 1.2.22 package is missing');
if (await page.locator('#haltBuilds a[href*="Caregiver_latest"], #haltBuilds a[href*="Community_latest"]').count()) errors.push('Unpublished Caregiver or Community latest alias was inferred');
if ((await page.locator('#haltBuilds .build-playtest-link[href="#haltPlaytesting"]').count()) !== 3) errors.push('Each HALT package is missing its matching Playtesting link');
if (await page.locator('#haltBuilds').getByText(/immutable/i).count()) errors.push('Release-management language leaked into the tester package shelf');
if (!(await page.locator('#haltBuilds').getByText('Caregiver · PT-002').count())) errors.push('Active Caregiver playtest lane is not identified');
if (!(await page.locator('#haltStudio').isVisible())) errors.push('HALT summary did not open the focused contribution studio');
if (!(await page.locator('#haltPlaytesting').isVisible())) errors.push('HALT playtesting summary is not visible in the HALT workspace');
if ((await page.locator('#haltPlaytesting .playtest-gallery-card').count()) !== 3) errors.push('Playtesting contribution gallery does not contain three evidence cards');
if (!(await page.locator('#pt001Cycle .playtest-report').first().locator(':scope > .playtest-report-list > .playtest-report-evidence > .playtest-gallery').count())) errors.push('PT-001 evidence gallery is not inside the extracted findings list');
if (await page.locator('#haltPlaytesting > .playtest-gallery').count()) errors.push('PT-001 evidence gallery remains outside the report history');
const extractedReportOrder = await page.locator('#pt001Cycle .playtest-report').first().locator(':scope > .playtest-report-list').evaluate((list) => ({ evidenceFirst: list.firstElementChild?.classList.contains('playtest-report-evidence'), firstFinding: list.children[1]?.querySelector('.finding-code')?.textContent }));
if (!extractedReportOrder.evidenceFirst || extractedReportOrder.firstFinding !== 'F-001') errors.push('PT-001 evidence does not appear immediately before F-001');
if ((await page.locator('#haltPlaytesting .playtest-history').getAttribute('open')) === null) errors.push('Latest playtesting history is hidden by default');
await page.locator('#pt001Cycle > summary').click();
if ((await page.locator('#haltPlaytesting .playtest-gallery-card img').count()) !== 3) errors.push('Playtesting evidence images are missing');
if (await page.locator('#haltPlaytesting .playtest-gallery-card img').evaluateAll((images) => images.some((image) => !image.getAttribute('alt')?.trim()))) errors.push('Playtesting evidence image alt text is missing');
await page.locator('#haltPlaytesting .playtest-gallery-card:last-child').scrollIntoViewIfNeeded();
await page.waitForFunction(() => Array.from(document.querySelectorAll('#haltPlaytesting .playtest-gallery-card img')).every((image) => image.complete && image.naturalWidth > 0));
if (await page.locator('#haltPlaytesting .playtest-gallery-card img').evaluateAll((images) => images.some((image) => !image.complete || image.naturalWidth === 0))) errors.push('A playtesting evidence image failed to load');
if (!(await page.locator('#haltPlaytesting img[src$="playtest-caregiver-field-run-v8a.jpg"]').count())) errors.push('Caregiver field-run evidence is missing');
if (!(await page.locator('#haltPlaytesting img[src$="playtest-whisper-failure-v8a.jpg"]').count())) errors.push('Whisper failure evidence is missing');
if (!(await page.locator('#haltPlaytesting img[src$="playtest-summary-v8a.png"]').count())) errors.push('Playtesting summary evidence is missing');
if ((await page.locator('#haltPlaytesting .playtest-loop li').count()) !== 4) errors.push('Playtesting loop does not show all four stages');
if ((await page.locator('#haltPlaytesting .playtest-loop strong').allTextContents()).join(',') !== '23,23,21,1') errors.push('Cumulative playtesting loop counts are incorrect');
if ((await page.locator('#pt001Cycle .playtest-report-list:not(.is-response) article').count()) !== 11) errors.push('PT-001 extracted report does not contain 11 findings');
if ((await page.locator('#pt002Cycle .playtest-report-list:not(.is-response) article').count()) !== 12) errors.push('PT-002 extracted report does not contain 12 findings');
if (!(await page.locator('#pt002Cycle .playtest-contribution-summary').count())) errors.push('PT-002 contributor impact is not captured above the findings');
if ((await page.locator('#pt001Cycle .playtest-report-list.is-response article').count()) !== 11) errors.push('PT-001 build response does not pair all 11 findings');
if ((await page.locator('#haltPlaytesting .playtest-report-list.is-response .finding-status.is-fixed').count()) !== 19) errors.push('Build responses do not mark all nineteen implemented fixes');
if ((await page.locator('#haltPlaytesting .playtest-report-list.is-response .finding-status.is-verified').count()) !== 1) errors.push('Build response does not preserve the independently verified dashboard close');
if (!(await page.locator('#haltPlaytesting .playtest-response-release a[href$="/builds/HALT_Caregiver_1.2.21_setup.exe"]').count())) errors.push('PT-001 response build link is missing');
if (!(await page.locator('#pt002Cycle .playtest-response-release a[href$="/builds/HALT_Caregiver_1.2.22_setup.exe"]').count())) errors.push('PT-002 response build link is missing');
if ((await page.locator('#haltBuilds').getByText('Do not replace a Partner Center package URL after submission').count())) errors.push('Internal Partner Center warning leaked into the tester download shelf');
if (!(await page.locator('#haltStudio .project-assets').isVisible()) || !(await page.locator('#haltStudio .project-pulse').isVisible())) errors.push('HALT iconology and campaign pulse did not move into its workspace');
const studioOrder = await page.locator('#haltStudio').evaluate((studio) => Array.from(studio.children).map((node) => node.id || node.className || node.tagName));
if (studioOrder[1] !== 'haltBuilds' || studioOrder[2] !== 'haltPlaytesting' || !String(studioOrder[3]).includes('project-pulse') || studioOrder[4] !== 'studioSteps' || studioOrder[5] !== 'haltContributionForm' || studioOrder[6] !== 'studio-project-context') errors.push('HALT build shelf, playtesting, and campaign pulse are not ordered correctly');
if (!(await page.locator('.studio-project-context').evaluate((context) => context.lastElementChild?.classList.contains('project-assets')))) errors.push('Project iconology is not the final workspace section');
if (!(await page.locator('#framework').isHidden())) errors.push('Long-form page sections remained visible in HALT focus mode');
await page.locator('[data-next-step="2"]').click();
if (!(await page.locator('#studioValidation').isVisible())) errors.push('HALT scope validation did not stop an incomplete draft');

await page.locator('#haltAssignmentCode').fill('social-003');
await page.locator('#haltContributionType').selectOption('social-copy');
await page.locator('[data-project-lane="organization"]').click();
await page.locator('[data-next-step="2"]').click();
await page.locator('#haltSourceUrl').fill('https://7hermeticlabs.health/');
await page.locator('#haltAudience').selectOption({ label: 'Medical and humanitarian organizations' });
await page.locator('#haltClaim').fill('HALT is an offline-capable medical coordination system in closed beta.');
await page.locator('[data-next-step="3"]').click();
if ((await page.locator('.post-example.is-positive').count()) !== 1 || (await page.locator('.post-example.is-negative').count()) !== 1) errors.push('Positive and negative post examples are not paired in the build step');
if ((await page.locator('.post-example.is-negative button').count()) !== 0) errors.push('The negative post example should not expose a copy control');
await page.locator('[data-copy-text-target="positiveExampleText"]').click();
if (!(await page.evaluate(() => window.__copiedText)).startsWith('HALT is a working closed-beta')) errors.push('Positive post example did not copy');
await page.locator('.channel-picker label').filter({ hasText: 'LinkedIn' }).click();
await page.locator('#haltDraftCopy').fill('A source-grounded HALT contribution for review.');
await page.locator('[data-next-step="4"]').click();
for (const id of ['checkSource', 'checkPrivacy', 'checkMedical', 'checkStatus']) await page.locator(`#${id}`).check();
await page.locator('[data-next-step="5"]').click();
if (!(await page.locator('#haltSubmissionPacket').textContent()).includes('SOCIAL-003')) errors.push('HALT submission packet omitted the assignment code');
if (!(await page.locator('#openHaltEmail').getAttribute('href')).startsWith('mailto:Susan@7hermeticlabs.com')) errors.push('HALT submission email handoff is not prepared');
if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) errors.push('HALT studio has horizontal overflow at mobile width');
if (!(await page.evaluate(() => localStorage.getItem('social-health.halt-contribution.v1')))) errors.push('HALT local draft was not persisted');
await page.locator('#closeHaltStudio').click();
if (!(await page.locator('#projectPanel').isVisible()) || !(await page.locator('#haltStudio').isHidden())) errors.push('HALT studio did not return to the project summary');

const pageText = await page.locator('body').innerText();
for (const privateOrStaleText of ['805 S Glynn', 'frontdesk@', '146 curated hashtags', 'HALT qualifies', '93%', 'Warren', 'Nadeem', 'Nodeem']) {
  if (pageText.includes(privateOrStaleText)) errors.push(`Public page exposes stale or private text: ${privateOrStaleText}`);
}

const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
if (hasHorizontalOverflow) errors.push('Public page has horizontal overflow at mobile width');

const scorecardUrl = `${publicUrl}?contributor=hiteshi-baldev&expires=9999999999999&signature=test`;
await page.goto(scorecardUrl, { waitUntil: 'networkidle' });
await page.locator('#scorecardContent').waitFor({ state: 'visible' });

if ((await page.locator('#scorecardTitle').textContent()) !== 'Hiteshi Hitu Seo Baldev') errors.push('Contributor name did not render');
if ((await page.locator('#thisWeekScore').textContent()) !== '72') errors.push('This-week score did not render');
if ((await page.locator('#thisWeekGoals .goal-card').count()) !== 1) errors.push('Goal card did not render');
if ((await page.locator('#lifecycleList .lifecycle-item').count()) !== 1) errors.push('Lifecycle item did not render');
if ((await page.locator('#lifecycleList .submission-track li').count()) !== 4) errors.push('Contributor submission progress did not render');
if (!(await page.locator('#lifecycleList .assignment-feedback').textContent()).includes('Tighten the opening claim')) errors.push('Susan feedback did not render');
if (!(await page.locator('#lifecycleList .lifecycle-next-action').textContent()).includes('Review Susan’s feedback')) errors.push('Contributor next action did not render');
if (!(await page.locator('#publicConsole').isHidden())) errors.push('Public console remained visible in scorecard mode');
if (!(await page.locator('#scorecardLoading').isHidden())) errors.push('Loading panel remained visible after success');
if (!(await page.locator('#scorecardError').isHidden())) errors.push('Error panel remained visible after success');
if (!(await page.locator('#campaignFacts').textContent()).includes('Aug 10, 2026')) errors.push('Campaign dates shifted out of UTC calendar date');

await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('BLANKIT Social Health migration browser checks passed.');
