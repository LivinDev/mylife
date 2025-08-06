import { c as createComponent, d as createAstro, f as addAttribute, i as renderHead, j as renderSlot, r as renderTemplate, k as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DkTedR1d.mjs';
import 'kleur/colors';
import fs from 'fs/promises';
import path from 'path';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro Basics</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/livingstone/Desktop/mylife/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const scoresFile = path.join(process.cwd(), "src/data/scores.json");
  try {
    await fs.access(scoresFile);
  } catch {
    await fs.mkdir(path.dirname(scoresFile), { recursive: true });
    await fs.writeFile(
      scoresFile,
      JSON.stringify({
        good: { total: 0, history: [] },
        bad: { total: 0, history: [] }
      })
    );
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const type = formData.get("type");
    const action = formData.get("action");
    const customValue = formData.get("customValue");
    let scoreChange = 0;
    if (action === "increment") scoreChange = 1;
    else if (action === "decrement") scoreChange = -1;
    else if (action === "custom") scoreChange = parseInt(customValue) || 0;
    const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    const scoresData2 = await fs.readFile(scoresFile, "utf8");
    const scores2 = JSON.parse(scoresData2);
    if ((type === "good" || type === "bad") && scoreChange !== 0) {
      scores2[type].total += scoreChange;
      scores2[type].history.push({
        amount: scoreChange,
        date: currentDate,
        time: currentTime,
        timestamp: Date.now()
      });
    }
    await fs.writeFile(scoresFile, JSON.stringify(scores2, null, 2));
    return Astro2.redirect("/");
  }
  const scoresData = await fs.readFile(scoresFile, "utf8");
  const scores = JSON.parse(scoresData);
  function getDailyTotals(history) {
    const dailyTotals = {};
    history.forEach((item) => {
      if (!dailyTotals[item.date]) {
        dailyTotals[item.date] = 0;
      }
      dailyTotals[item.date] += item.amount;
    });
    return Object.entries(dailyTotals).map(([date, total]) => ({ date, total })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 7);
  }
  const goodDailyTotals = getDailyTotals(scores.good.history);
  const badDailyTotals = getDailyTotals(scores.bad.history);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Good vs Bad", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="container" data-astro-cid-j7pv25f6> <div class="header" data-astro-cid-j7pv25f6> <h1 class="title" data-astro-cid-j7pv25f6>Good vs Bad</h1> <p class="subtitle" data-astro-cid-j7pv25f6>Track your daily progress</p> </div> <!-- Good Section --> <div class="section" data-astro-cid-j7pv25f6> <div class="section-header" data-astro-cid-j7pv25f6> <div class="section-title good-title" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>😇</span> <span data-astro-cid-j7pv25f6>Good Actions</span> </div> <div class="score" data-astro-cid-j7pv25f6>${scores.good.total}</div> </div> <div class="controls" data-astro-cid-j7pv25f6> <div class="button-row" data-astro-cid-j7pv25f6> <form method="POST" style="display: inline;" data-astro-cid-j7pv25f6> <input type="hidden" name="type" value="good" data-astro-cid-j7pv25f6> <input type="hidden" name="action" value="increment" data-astro-cid-j7pv25f6> <button type="submit" class="btn plus-btn" data-astro-cid-j7pv25f6>+</button> </form> <form method="POST" style="display: inline;" data-astro-cid-j7pv25f6> <input type="hidden" name="type" value="good" data-astro-cid-j7pv25f6> <input type="hidden" name="action" value="decrement" data-astro-cid-j7pv25f6> <button type="submit" class="btn minus-btn" data-astro-cid-j7pv25f6>−</button> </form> </div> <form method="POST" class="custom-row" data-astro-cid-j7pv25f6> <input type="hidden" name="type" value="good" data-astro-cid-j7pv25f6> <input type="hidden" name="action" value="custom" data-astro-cid-j7pv25f6> <input type="number" name="customValue" class="number-input" placeholder="0" data-astro-cid-j7pv25f6> <button type="submit" class="add-btn" data-astro-cid-j7pv25f6>Add Points</button> </form> </div> <div class="daily-summary" data-astro-cid-j7pv25f6> <div class="summary-title" data-astro-cid-j7pv25f6>Daily Totals</div> ${goodDailyTotals.length === 0 ? renderTemplate`<div class="empty" data-astro-cid-j7pv25f6>No activity yet</div>` : goodDailyTotals.map((day, index) => renderTemplate`<div class="daily-item" data-astro-cid-j7pv25f6> <div class="daily-date" data-astro-cid-j7pv25f6> ${new Date(day.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  })} ${index === 0 && renderTemplate`<span class="today-label" data-astro-cid-j7pv25f6>Today</span>`} </div> <div${addAttribute(`daily-total ${day.total > 0 ? "good-total" : day.total < 0 ? "bad-total" : "neutral-total"}`, "class")} data-astro-cid-j7pv25f6> ${day.total > 0 ? "+" : ""} ${day.total} </div> </div>`)} </div> </div> <!-- Bad Section --> <div class="section" data-astro-cid-j7pv25f6> <div class="section-header" data-astro-cid-j7pv25f6> <div class="section-title bad-title" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>😈</span> <span data-astro-cid-j7pv25f6>Bad Actions</span> </div> <div class="score" data-astro-cid-j7pv25f6>${scores.bad.total}</div> </div> <div class="controls" data-astro-cid-j7pv25f6> <div class="button-row" data-astro-cid-j7pv25f6> <form method="POST" style="display: inline;" data-astro-cid-j7pv25f6> <input type="hidden" name="type" value="bad" data-astro-cid-j7pv25f6> <input type="hidden" name="action" value="increment" data-astro-cid-j7pv25f6> <button type="submit" class="btn plus-btn" data-astro-cid-j7pv25f6>+</button> </form> <form method="POST" style="display: inline;" data-astro-cid-j7pv25f6> <input type="hidden" name="type" value="bad" data-astro-cid-j7pv25f6> <input type="hidden" name="action" value="decrement" data-astro-cid-j7pv25f6> <button type="submit" class="btn minus-btn" data-astro-cid-j7pv25f6>−</button> </form> </div> <form method="POST" class="custom-row" data-astro-cid-j7pv25f6> <input type="hidden" name="type" value="bad" data-astro-cid-j7pv25f6> <input type="hidden" name="action" value="custom" data-astro-cid-j7pv25f6> <input type="number" name="customValue" class="number-input" placeholder="0" data-astro-cid-j7pv25f6> <button type="submit" class="add-btn" data-astro-cid-j7pv25f6>Add Points</button> </form> </div> <div class="daily-summary" data-astro-cid-j7pv25f6> <div class="summary-title" data-astro-cid-j7pv25f6>Daily Totals</div> ${badDailyTotals.length === 0 ? renderTemplate`<div class="empty" data-astro-cid-j7pv25f6>No activity yet</div>` : badDailyTotals.map((day, index) => renderTemplate`<div class="daily-item" data-astro-cid-j7pv25f6> <div class="daily-date" data-astro-cid-j7pv25f6> ${new Date(day.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  })} ${index === 0 && renderTemplate`<span class="today-label" data-astro-cid-j7pv25f6>Today</span>`} </div> <div${addAttribute(`daily-total ${day.total > 0 ? "bad-total" : day.total < 0 ? "good-total" : "neutral-total"}`, "class")} data-astro-cid-j7pv25f6> ${day.total > 0 ? "+" : ""} ${day.total} </div> </div>`)} </div> </div> </div> ` })}`;
}, "/Users/livingstone/Desktop/mylife/src/pages/index.astro", void 0);

const $$file = "/Users/livingstone/Desktop/mylife/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
