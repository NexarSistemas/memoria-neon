const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function game(initial = {}, random = 0) {
  const storage = { ...initial }, timers = [];
  function element(value = '') {
    const classes = new Set();
    return { value, disabled: false, hidden: false, dataset: {}, textContent: '', className: '', handlers: {}, classList: { add(name) { classes.add(name); }, remove(name) { classes.delete(name); }, contains(name) { return classes.has(name); } },
      setAttribute() {}, addEventListener(type, callback) { this.handlers[type] = callback; } };
  }
  const elements = Object.fromEntries(['round', 'record', 'streak', 'status', 'start', 'sound', 'difficulty', 'board'].map(id => [id, element(id === 'difficulty' ? 'normal' : '')]));
  const pads = Array.from({ length: 6 }, () => element());
  const html = fs.readFileSync('index.html', 'utf8');
  const script = html.match(/<script>\s*\(\(\)=>\{'use strict';[\s\S]*?<\/script>/)[0].replace(/^<script>|<\/script>$/g, '');
  const context = { document: { querySelectorAll: () => pads, getElementById: id => elements[id] },
    localStorage: { getItem: key => storage[key] ?? null, setItem: (key, value) => { storage[key] = value; } },
    window: {}, Math: Object.assign(Object.create(Math), { random: () => random }),
    setTimeout: (fn, ms) => { const timer = { fn, ms }; timers.push(timer); return timer; }, clearTimeout() {} };
  vm.runInNewContext(script, context);
  return { elements, pads, storage, timers };
}

test('máscaras SVG cubren cada segmento y el centro no recibe eventos', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  for (const [level, count] of [['easy', 4], ['normal', 5], ['hard', 6]]) {
    const clips = [...html.matchAll(new RegExp(`<clipPath id="clip-${level}-(\\d+)"`, 'g'))];
    assert.deepEqual(clips.map(match => Number(match[1])), Array.from({ length: count }, (_, i) => i));
  }
  assert.match(html, /\.center\{inset:34%;[^}]*pointer-events:none/);
});

async function advance(g, ms) {
  const index = g.timers.findIndex(timer => timer.ms === ms);
  assert.notEqual(index, -1, `timer ${ms} no encontrado`);
  g.timers.splice(index, 1)[0].fn();
  await Promise.resolve();
}

test('récord anterior, niveles independientes y bloqueo durante la partida', async () => {
  const g = game({ 'memoria-neon-record-v1': '7', 'memoria-neon-record-v1-easy': '2', 'memoria-neon-sonido-v1': 'off' });
  assert.equal(g.elements.record.textContent, 7);
  g.elements.difficulty.value = 'easy'; g.elements.difficulty.handlers.change();
  assert.equal(g.elements.record.textContent, 2);
  g.elements.start.handlers.click();
  assert.equal(g.elements.difficulty.disabled, true);
  await advance(g, 650); await advance(g, 650);
  g.pads[1].handlers.keydown({ key: 'Enter', repeat: false, preventDefault() {} });
  assert.equal(g.elements.difficulty.disabled, false);
  g.elements.difficulty.value = 'normal'; g.elements.difficulty.handlers.change();
  assert.equal(g.elements.record.textContent, 7);
  g.elements.difficulty.value = 'hard'; g.elements.difficulty.handlers.change();
  assert.equal(g.elements.record.textContent, 0);
  g.elements.start.handlers.click();
  await advance(g, 650); await advance(g, 650);
  g.pads[0].handlers.keydown({ key: 'Enter', repeat: false, preventDefault() {} });
  assert.equal(g.storage['memoria-neon-record-v1-hard'], '1');
  assert.equal(g.storage['memoria-neon-record-v1'], '7');
});

for (const [level, count] of [['easy', 4], ['normal', 5], ['hard', 6]]) {
  test(`${level}: ${count} botones y último color elegible`, async () => {
    const g = game({ 'memoria-neon-sonido-v1': 'off' }, 0.999);
    g.elements.difficulty.value = level; g.elements.difficulty.handlers.change();
    assert.equal(g.elements.board.dataset.level, level);
    assert.equal(g.pads.filter(p => !p.hidden).length, count);
    g.elements.start.handlers.click();
    await advance(g, 650); await advance(g, 650);
    assert.equal(g.pads.filter(p => !p.disabled).length, count);
    assert.equal(g.pads[count - 1].classList.contains('lit'), true);
    g.pads[count - 1].handlers.keydown({ key: 'Enter', repeat: false, preventDefault() {} });
    assert.equal(g.elements.streak.textContent, 1);
    assert.equal(g.storage[level === 'normal' ? 'memoria-neon-record-v1' : `memoria-neon-record-v1-${level}`], '1');
  });
}
