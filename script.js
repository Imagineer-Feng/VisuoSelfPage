'use strict';

// All content and figure/PDF links remain available without JavaScript.
(() => {
  const dialog = document.getElementById('image-dialog');
  const dialogImage = document.getElementById('dialog-image');
  const imageArea = document.getElementById('dialog-image-area');
  const zoomButton = document.getElementById('dialog-zoom');
  let imageTrigger = null;

  function resetZoom() {
    imageArea.classList.remove('is-zoomed');
    zoomButton.setAttribute('aria-pressed', 'false');
    zoomButton.textContent = 'Zoom in +';
    imageArea.scrollTop = 0;
    imageArea.scrollLeft = 0;
  }

  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-lightbox]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        imageTrigger = link;
        resetZoom();
        dialogImage.src = link.dataset.lightbox;
        dialogImage.alt = link.querySelector('img').alt;
        document.getElementById('dialog-caption').textContent = link.dataset.caption;
        document.getElementById('dialog-pdf').href = link.href;
        dialog.showModal();
        document.body.classList.add('dialog-open');
        document.getElementById('dialog-close').focus();
      });
    });
    document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      resetZoom();
      if (imageTrigger) imageTrigger.focus({ preventScroll: true });
    });
    zoomButton.addEventListener('click', () => {
      const zoomed = imageArea.classList.toggle('is-zoomed');
      zoomButton.setAttribute('aria-pressed', String(zoomed));
      zoomButton.textContent = zoomed ? 'Fit to screen −' : 'Zoom in +';
    });
  }

  const copyButton = document.getElementById('copy-citation');
  copyButton.addEventListener('click', async () => {
    const text = document.getElementById('bibtex').textContent;
    const status = document.getElementById('copy-status');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      copyButton.textContent = 'Copied ✓';
      status.textContent = 'BibTeX citation copied to clipboard.';
      window.setTimeout(() => { copyButton.textContent = 'Copy citation'; }, 2200);
    } catch (_) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('bibtex'));
      selection.removeAllRanges();
      selection.addRange(range);
      copyButton.textContent = 'Citation selected';
      status.textContent = 'Copy is unavailable in this browser. The citation is selected; use your copy shortcut or download the BibTeX file.';
    }
  });

  const commands = ['↑', '↓', '←', '→', '↑', '↓', '←', '→'];
  const scenes = {
    1: {
      question: 'Does each motion follow the current command?',
      title: 'Same-step causality',
      description: 'The self arm executes the current command. The non-self arm reorders the same eight-command multiset, preserving total motion while breaking stepwise correspondence.',
      audit: 'Match or mismatch at every step',
      nonself: [
        ['↓', '↑', '→', '←', '↓', '↑', '→', '←'],
        ['↓', '↑', '→', '←', '↓', '↑', '←', '→'],
        ['↓', '↑', '→', '←', '↑', '↓', '←', '→']
      ]
    },
    2: {
      question: 'Does one hidden mapping remain stable across cycles?',
      title: 'Mapping stability',
      description: 'Command labels need not literally name physical joints. The self arm keeps one scrambled command-to-motion mapping for four cycles; the non-self arm changes its mapping between cycles.',
      audit: 'Each cycle’s mapping relative to cycle 1',
      nonself: [['A', 'B', 'C', 'D'], ['A', 'A', 'B', 'C'], ['A', 'A', 'A', 'B']]
    },
    3: {
      question: 'Is the motion immediate, or is it delayed imitation?',
      title: 'Delayed causality',
      description: 'The self arm follows the current command. The non-self arm reproduces the same command stream after a controlled delay. Similar trajectories therefore have different temporal relationships to the commands.',
      audit: 'Exact temporal lag in steps'
    }
  };
  let currentScene = 1;
  let currentLevel = 1;
  const sceneTabs = [...document.querySelectorAll('[data-scene]')];
  const levelButtons = [...document.querySelectorAll('[data-level]')];
  const directionNames = { '↑': 'up', '↓': 'down', '←': 'left', '→': 'right', '·': 'rest' };

  function renderCells(id, values, compare) {
    const target = document.getElementById(id);
    target.replaceChildren(...values.map((value, index) => {
      const cell = document.createElement('span');
      cell.textContent = value;
      cell.setAttribute('aria-label', directionNames[value] || value);
      if (currentScene === 2) cell.classList.add('cycle-cell');
      if (compare && value !== compare[index]) cell.classList.add('different-cell');
      return cell;
    }));
  }

  function renderScene() {
    const scene = scenes[currentScene];
    sceneTabs.forEach(tab => {
      const selected = Number(tab.dataset.scene) === currentScene;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    levelButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.level) === currentLevel)));
    document.getElementById('scene-panel').setAttribute('aria-labelledby', `scene-tab-${currentScene}`);
    ['question', 'title', 'description', 'audit'].forEach(key => { document.getElementById(`scene-${key}`).textContent = scene[key]; });
    const cycles = currentScene === 2;
    const command = cycles ? ['01', '02', '03', '04'] : commands;
    const self = cycles ? ['A', 'A', 'A', 'A'] : commands;
    const lag = 4 - currentLevel;
    const nonself = currentScene === 3 ? [...Array(lag).fill('·'), ...commands].slice(0, 8) : scene.nonself[currentLevel - 1];
    document.getElementById('trace-heading').textContent = cycles ? 'Cycle' : 'Command';
    renderCells('trace-command', command);
    renderCells('trace-self', self);
    renderCells('trace-nonself', nonself, self);
    const descriptions = {
      1: `${[8, 6, 4][currentLevel - 1]} of 8 non-self actions differ from the current command.`,
      2: `Non-self mappings: ${nonself.join(' → ')}. A–D denote distinct scrambled mappings.`,
      3: `The non-self arm imitates the command stream with a ${lag}-step delay. · denotes rest.`
    };
    document.getElementById('scene-level-note').textContent = `Level ${currentLevel} · ${descriptions[currentScene]}`;
  }
  sceneTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => { currentScene = Number(tab.dataset.scene); renderScene(); });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % sceneTabs.length;
      if (event.key === 'ArrowLeft') next = (index + sceneTabs.length - 1) % sceneTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = sceneTabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      currentScene = Number(sceneTabs[next].dataset.scene);
      renderScene();
      sceneTabs[next].focus();
    });
  });
  levelButtons.forEach(button => button.addEventListener('click', () => { currentLevel = Number(button.dataset.level); renderScene(); }));
  renderScene();

  const tableBody = document.querySelector('#results-table tbody');
  const tableRows = [...tableBody.rows];
  document.getElementById('table-sort').addEventListener('change', event => {
    const criterion = event.target.value;
    const rows = tableRows.filter(row => !row.classList.contains('baseline'));
    if (criterion !== 'paper') rows.sort((a, b) => Number(b.dataset[criterion]) - Number(a.dataset[criterion]));
    rows.forEach(row => tableBody.appendChild(row));
    tableRows.filter(row => row.classList.contains('baseline')).forEach(row => tableBody.appendChild(row));
    document.getElementById('sort-status').textContent = `Table sorted by ${event.target.selectedOptions[0].textContent.toLowerCase()}. Random baseline remains last.`;
  });

  if ('IntersectionObserver' in window) {
    const navLinks = [...document.querySelectorAll('nav a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    navLinks.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }
})();
