const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/pc/.gemini/antigravity-ide/brain/90b42ce1-7323-42b3-ba40-9dcc6a9f10cb/.system_generated/logs/transcript.jsonl'),
  crlfDelay: Infinity
});

let userInputs = [];
let plannerThinking = [];

rl.on('line', (line) => {
  if (line.includes('"type":"USER_INPUT"')) {
    try {
      const obj = JSON.parse(line);
      userInputs.push(obj.content);
    } catch(e) {}
  } else if (line.includes('"type":"PLANNER_RESPONSE"')) {
    try {
      const obj = JSON.parse(line);
      if (obj.thinking) {
        plannerThinking.push(obj.thinking);
      }
    } catch(e) {}
  }
});

rl.on('close', () => {
  console.log('Total user inputs:', userInputs.length);
  userInputs.forEach((inp, idx) => {
    console.log(`\n=== USER INPUT ${idx + 1} ===\n` + inp);
  });
  console.log('\n=== LAST 3 PLANNER THINKING ===');
  plannerThinking.slice(-3).forEach((th, idx) => {
    console.log(`\n--- THINKING ${idx + 1} ---\n` + th.slice(0, 500));
  });
});
