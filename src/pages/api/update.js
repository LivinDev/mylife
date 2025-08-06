import fs from 'fs/promises';
import path from 'path';

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const type = formData.get('type');
    const action = formData.get('action');
    const customValue = formData.get('customValue');

    let scoreChange = 0;
    if (action === 'increment') scoreChange = 1;
    else if (action === 'decrement') scoreChange = -1;
    else if (action === 'custom') scoreChange = parseInt(customValue) || 0;

    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString();

    const scoresFile = path.join(process.cwd(), 'src/data/scores.json');
    
    // Initialize scores file if it doesn't exist
    try {
      await fs.access(scoresFile);
    } catch {
      await fs.mkdir(path.dirname(scoresFile), { recursive: true });
      await fs.writeFile(scoresFile, JSON.stringify({ 
        good: { total: 0, history: [] }, 
        bad: { total: 0, history: [] } 
      }));
    }

    const scoresData = await fs.readFile(scoresFile, 'utf8');
    const scores = JSON.parse(scoresData);

    if ((type === 'good' || type === 'bad') && scoreChange !== 0) {
      scores[type].total += scoreChange;
      scores[type].history.push({
        amount: scoreChange,
        date: currentDate,
        time: currentTime,
        timestamp: Date.now()
      });
    }

    await fs.writeFile(scoresFile, JSON.stringify(scores, null, 2));

    return new Response(JSON.stringify({ 
      success: true, 
      newTotal: scores[type].total 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}