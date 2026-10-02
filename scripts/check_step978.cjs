const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/pc/.gemini/antigravity-ide/brain/90b42ce1-7323-42b3-ba40-9dcc6a9f10cb/.system_generated/logs/transcript.jsonl'),
  crlfDelay: Infinity
});

let found = [];
rl.on('line', (line) => {
  if (line.includes('"step_index":978') || line.includes('"step_index":979') || line.includes('"step_index":980') || line.includes('"step_index":981') || line.includes('"step_index":982')) {
    try {
      const obj = JSON.parse(line);
      found.push({ step: obj.step_index, thinking: obj.thinking, content: obj.content });
    } catch(e) {}
  }
});
rl.on('close', () => {
  found.forEach(f => console.log('Step ' + f.step + ':\n' + (f.thinking || f.content || '').slice(0, 600)));
});
