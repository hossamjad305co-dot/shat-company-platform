const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/pc/.gemini/antigravity-ide/brain/90b42ce1-7323-42b3-ba40-9dcc6a9f10cb/.system_generated/logs/transcript.jsonl'),
  crlfDelay: Infinity
});

let found = false;
let records = [];

rl.on('line', (line) => {
  if (line.includes('لم تغير الايموجي') || line.includes('لا اريد ايموجي')) {
    found = true;
  }
  if (found) {
    try {
      const obj = JSON.parse(line);
      if (obj.type === 'PLANNER_RESPONSE') {
        records.push({
          step: obj.step_index,
          thinking: (obj.thinking || '').slice(0, 300),
          tools: (obj.tool_calls || []).map(t => t.name + '(' + JSON.stringify(t.args).slice(0, 100) + ')')
        });
      }
    } catch(e) {}
  }
});

rl.on('close', () => {
  console.log('Found records after input 3/5:', records.length);
  records.slice(-20).forEach(r => {
    console.log(`Step ${r.step}: tools:`, r.tools.join(', '));
    if (r.thinking) console.log(`   thinking: ${r.thinking}`);
  });
});
