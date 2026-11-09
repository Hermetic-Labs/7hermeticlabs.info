(function () {
  'use strict';

  const API_ORIGIN = 'https://graph.7hermeticlabs.com';
  const params = new URLSearchParams(window.location.search);
  const access = {
    contributor: params.get('contributor') || '',
    expires: params.get('expires') || '',
    signature: params.get('signature') || ''
  };

  if (!access.contributor && !access.expires && !access.signature) return;

  const workspace = document.getElementById('contributorWorkspace');
  const loading = document.getElementById('scorecardLoading');
  const errorPanel = document.getElementById('scorecardError');
  const content = document.getElementById('scorecardContent');
  const refreshButton = document.getElementById('refreshScorecard');
  workspace.hidden = false;
  document.body.classList.add('scorecard-mode');

  const byId = (id) => document.getElementById(id);
  const setText = (id, value, fallback = '—') => { byId(id).textContent = value === undefined || value === null || value === '' ? fallback : String(value); };
  const formatStatus = (value) => String(value || 'not started').replaceAll('_', ' ');
  const formatDate = (value, options) => {
    if (!value) return '';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '';
    return new Intl.DateTimeFormat(undefined, options || { month: 'short', day: 'numeric', year: 'numeric' }).format(parsed);
  };
  const formatCalendarDate = (value, options) => formatDate(value, {
    timeZone: 'UTC',
    ...(options || { month: 'short', day: 'numeric', year: 'numeric' })
  });
  const clear = (element) => { while (element.firstChild) element.removeChild(element.firstChild); };
  const statusLabels = {
    draft: 'Preparing assignment', sent: 'Ready for you', acknowledged: 'In progress', replied: 'More material needed',
    submitted: 'Received by Susan', changes_requested: 'Revision requested', resubmitted: 'Revision received',
    accepted: 'Accepted', completed: 'Complete', blocked: 'Needs attention', cancelled: 'Closed'
  };

  function addFact(container, label, value) {
    if (!value) return;
    const wrapper = document.createElement('div');
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    wrapper.append(term, description);
    container.appendChild(wrapper);
  }

  function renderCampaign(campaign) {
    const facts = byId('campaignFacts');
    const platforms = byId('campaignPlatforms');
    clear(facts);
    clear(platforms);
    if (!campaign) {
      setText('campaignTitle', 'Campaign details pending');
      setText('campaignStatus', 'Planning');
      setText('campaignSummary', 'Susan can add the current campaign summary directly from chat.');
      setText('campaignDetails', '', '');
      return;
    }
    setText('campaignTitle', campaign.title);
    setText('campaignStatus', formatStatus(campaign.status || 'active'));
    setText('campaignSummary', campaign.summary);
    setText('campaignDetails', campaign.details, '');
    addFact(facts, 'Objective', campaign.objective);
    addFact(facts, 'Audience', campaign.audience);
    const range = [formatCalendarDate(campaign.startAt), formatCalendarDate(campaign.endAt)].filter(Boolean).join(' – ');
    addFact(facts, 'Campaign window', range);
    (campaign.platforms || []).forEach((platform) => {
      const chip = document.createElement('span');
      chip.textContent = platform;
      platforms.appendChild(chip);
    });
  }

  function renderGoal(goal) {
    const card = document.createElement('article');
    card.className = 'goal-card';
    const head = document.createElement('div');
    head.className = 'goal-head';
    const copy = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'goal-title';
    title.textContent = goal.title;
    copy.appendChild(title);
    if (goal.description) {
      const description = document.createElement('p');
      description.className = 'goal-description';
      description.textContent = goal.description;
      copy.appendChild(description);
    }
    const status = document.createElement('span');
    status.className = 'goal-status';
    status.dataset.status = goal.status || 'not_started';
    status.textContent = formatStatus(goal.status);
    head.append(copy, status);
    card.appendChild(head);

    if (goal.target !== undefined || goal.current !== undefined || goal.metric) {
      const current = Number(goal.current || 0);
      const target = Number(goal.target || 0);
      const percentage = target > 0 ? Math.max(0, Math.min(100, (current / target) * 100)) : 0;
      const progress = document.createElement('div');
      progress.className = 'goal-progress';
      const progressCopy = document.createElement('div');
      progressCopy.className = 'goal-progress-copy';
      const metric = document.createElement('span');
      metric.textContent = goal.metric || 'Progress';
      const values = document.createElement('span');
      const unit = goal.unit ? ` ${goal.unit}` : '';
      values.textContent = target > 0 ? `${current}${unit} / ${target}${unit}` : `${current}${unit}`;
      progressCopy.append(metric, values);
      const track = document.createElement('div');
      track.className = 'goal-track';
      const fill = document.createElement('div');
      fill.className = 'goal-fill';
      fill.style.width = `${percentage}%`;
      track.appendChild(fill);
      progress.append(progressCopy, track);
      card.appendChild(progress);
    }
    return card;
  }

  function renderList(id, values) {
    const list = byId(id);
    clear(list);
    (values || []).forEach((value) => {
      const item = document.createElement('li');
      item.textContent = value;
      list.appendChild(item);
    });
    list.parentElement.hidden = !values || values.length === 0;
  }

  function renderWeek(prefix, week) {
    const goalList = byId(`${prefix}Goals`);
    const empty = byId(`${prefix}Empty`);
    clear(goalList);
    setText(`${prefix}Date`, week ? `Week of ${formatCalendarDate(week.weekOf, { month: 'short', day: 'numeric' })}` : '', '');
    setText(`${prefix}Summary`, week && week.summary, '');
    const goals = week && Array.isArray(week.goals) ? week.goals : [];
    goals.forEach((goal) => goalList.appendChild(renderGoal(goal)));
    empty.hidden = goals.length > 0;
  }

  function renderLifecycle(assignments) {
    const list = byId('lifecycleList');
    const empty = byId('lifecycleEmpty');
    clear(list);
    (assignments || []).forEach((assignment) => {
      const item = document.createElement('article');
      item.className = 'lifecycle-item';
      item.dataset.status = assignment.lifecycleStatus || 'draft';
      const head = document.createElement('div');
      head.className = 'lifecycle-head';
      const dot = document.createElement('span');
      dot.className = 'lifecycle-dot';
      dot.setAttribute('aria-hidden', 'true');
      const copy = document.createElement('div');
      copy.className = 'lifecycle-copy';
      const title = document.createElement('strong');
      title.textContent = assignment.title || assignment.assignmentCode;
      const detail = document.createElement('small');
      const due = assignment.dueAt ? ` · due ${formatDate(assignment.dueAt)}` : '';
      detail.textContent = `${assignment.assignmentCode || 'Assignment'}${due}`;
      copy.append(title, detail);
      const status = document.createElement('span');
      status.className = 'lifecycle-status';
      status.textContent = statusLabels[assignment.lifecycleStatus] || formatStatus(assignment.lifecycleStatus);
      head.append(dot, copy, status);

      const metadata = document.createElement('div');
      metadata.className = 'lifecycle-metadata';
      if (assignment.updatedAt) {
        const updated = document.createElement('span');
        updated.textContent = `Updated ${formatDate(assignment.updatedAt, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`;
        metadata.appendChild(updated);
      }
      if (assignment.revisionRound) {
        const revision = document.createElement('span');
        revision.textContent = `Revision ${assignment.revisionRound}`;
        metadata.appendChild(revision);
      }

      const track = document.createElement('ol');
      track.className = 'submission-track';
      track.setAttribute('aria-label', `${assignment.assignmentCode || 'Assignment'} progress`);
      const currentStatus = assignment.lifecycleStatus || 'draft';
      const submitted = Boolean(assignment.milestones && assignment.milestones.submittedAt) || ['submitted', 'changes_requested', 'resubmitted', 'accepted', 'completed'].includes(currentStatus);
      const reviewed = ['changes_requested', 'resubmitted', 'accepted', 'completed'].includes(currentStatus);
      const accepted = Boolean(assignment.milestones && assignment.milestones.acceptedAt) || ['accepted', 'completed'].includes(currentStatus);
      const promoted = Boolean(assignment.publication && assignment.publication.calendarLinked);
      [['Received', submitted], ['Reviewed', reviewed], ['Accepted', accepted], ['Publication workflow', promoted]].forEach(([label, complete]) => {
        const step = document.createElement('li');
        if (complete) step.className = 'is-complete';
        const marker = document.createElement('span');
        marker.setAttribute('aria-hidden', 'true');
        const text = document.createElement('strong');
        text.textContent = label;
        step.append(marker, text);
        track.appendChild(step);
      });

      const next = document.createElement('div');
      next.className = 'lifecycle-next-action';
      const nextLabel = document.createElement('span');
      nextLabel.textContent = 'Next action';
      const nextCopy = document.createElement('p');
      nextCopy.textContent = assignment.nextAction || 'Check the assignment email thread or contact Susan for the next step.';
      next.append(nextLabel, nextCopy);

      item.append(head, metadata, track, next);
      if (assignment.feedback) {
        const feedback = document.createElement('blockquote');
        feedback.className = 'assignment-feedback';
        const feedbackLabel = document.createElement('span');
        feedbackLabel.textContent = 'Feedback from Susan';
        const feedbackCopy = document.createElement('p');
        feedbackCopy.textContent = assignment.feedback;
        feedback.append(feedbackLabel, feedbackCopy);
        item.appendChild(feedback);
      }
      list.appendChild(item);
    });
    empty.hidden = Boolean(assignments && assignments.length);
  }

  function renderScorecard(data) {
    const contributorName = data.contributor && data.contributor.name ? data.contributor.name : 'Contributor';
    document.title = `${contributorName} · BLANKIT contributor scorecard`;
    setText('scorecardTitle', contributorName);
    setText('scorecardSubtitle', 'Track receipt, review, feedback, and the next action for every contribution.');
    setText('scorecardFreshness', `Live · ${formatDate(data.generatedAt, { hour: 'numeric', minute: '2-digit' })}`);
    byId('scorecardFreshness').classList.add('is-live');

    renderCampaign(data.campaign);
    renderWeek('thisWeek', data.thisWeek);
    renderWeek('lastWeek', data.lastWeek);
    renderList('lastWeekWins', data.lastWeek && data.lastWeek.wins);
    renderList('lastWeekImprovements', data.lastWeek && data.lastWeek.improvements);
    renderLifecycle(data.lifecycle || []);

    setText('thisWeekScore', data.thisWeek && data.thisWeek.score !== undefined ? data.thisWeek.score : '—');
    setText('lastWeekScore', data.lastWeek && data.lastWeek.score !== undefined ? data.lastWeek.score : '—');
    setText('lastWeekRank', data.lastWeek && data.lastWeek.rank !== undefined ? `#${data.lastWeek.rank}` : '—');
    setText('lastWeekRankCohort', data.lastWeek && data.lastWeek.cohortSize ? `of ${data.lastWeek.cohortSize}` : 'not ranked');
    setText('activeAssignmentCount', (data.lifecycle || []).filter((item) => !['completed', 'cancelled'].includes(item.lifecycleStatus)).length);
    setText('managerNote', data.managerNote, 'No manager note has been added.');
    setText('scorecardUpdatedAt', data.updatedAt ? `Updated ${formatDate(data.updatedAt, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}` : '', '');
  }

  function showError(title, message) {
    loading.hidden = true;
    content.hidden = true;
    errorPanel.hidden = false;
    setText('scorecardTitle', 'Contributor workspace');
    setText('scorecardSubtitle', 'Secure access to weekly campaign progress.');
    setText('scorecardErrorTitle', title);
    setText('scorecardErrorMessage', message);
    setText('scorecardFreshness', 'Access required');
    byId('scorecardFreshness').classList.remove('is-live');
  }

  async function loadScorecard() {
    if (!access.contributor || !access.expires || !access.signature) {
      showError('Secure link incomplete', 'Ask Susan for a fresh contributor scorecard link, then open that link directly.');
      return;
    }
    loading.hidden = false;
    content.hidden = true;
    errorPanel.hidden = true;
    refreshButton.disabled = true;
    try {
      const endpoint = new URL(`/public/contributor-scorecard/${encodeURIComponent(access.contributor)}`, API_ORIGIN);
      endpoint.searchParams.set('expires', access.expires);
      endpoint.searchParams.set('signature', access.signature);
      const response = await fetch(endpoint, { headers: { Accept: 'application/json' }, cache: 'no-store' });
      if (!response.ok) {
        if (response.status === 401) throw new Error('This secure link is invalid or has expired. Ask Susan for a fresh scorecard link.');
        throw new Error('The contributor graph is temporarily unavailable. Please try again shortly.');
      }
      const data = await response.json();
      renderScorecard(data);
      loading.hidden = true;
      content.hidden = false;
    } catch (error) {
      showError('Unable to load the scorecard', error && error.message ? error.message : 'Please try again shortly.');
    } finally {
      refreshButton.disabled = false;
    }
  }

  refreshButton.addEventListener('click', loadScorecard);
  loadScorecard();
  window.setInterval(() => {
    if (!document.hidden) loadScorecard();
  }, 60000);
})();
