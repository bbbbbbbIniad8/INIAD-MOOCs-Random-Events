import './index.css';
import { EventManager } from './func/adminFunc';
import { GFEvent } from './event/GF/GF';

const manager = new EventManager();

manager.decideEvent(null);

window.addEventListener('keydown', async (e) => {
  if (manager.processing) return;

  if (e.key === '9' || e.key === 't') {
    let selectedValue: number | null = null;
    
    if (e.key === 't') {
      const inputValue = prompt();
      selectedValue = Number(inputValue);
      if (selectedValue === 1987) {
        GFEvent();
      }
    }
    
    await manager.reload(selectedValue);
  }
});