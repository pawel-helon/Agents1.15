import { Tab } from 'src/types';

const tabStorage = {
  save: (agent: string, tabs: Tab[]): void => {
    try {
      localStorage.setItem(`tabs_${agent}`, JSON.stringify(tabs));
    } catch (error) {
      console.error(`Failed to save tabs_${agent} to localStorage: `, error);
    }
  },

  update: (agent: string, threadId: string, newTitle: string): Tab[] => {
    try {
      const savedTabs = localStorage.getItem(`tabs_${agent}`)
      if (savedTabs) {
        const remainingTabs = JSON.parse(savedTabs).filter((tab: { id: string, title: string, isActive: boolean }) => tab.id !== threadId);
        const updatedTab: Tab = { id: threadId, title: newTitle, isActive: true };
        const updatedTabs = [...remainingTabs, updatedTab] as Tab[];

        localStorage.setItem(`tabs_${agent}`, JSON.stringify(updatedTabs));
        return updatedTabs;
      } else return [];
    } catch (error) {
      console.error(`Failed to update tabs_${agent} in the localStorage: `, error)
      return [];
    }
  },

  load: (agent: string): Tab[] => {
    try {
      const savedTabs = localStorage.getItem(`tabs_${agent}`);
      if (savedTabs) {
        return JSON.parse(savedTabs);
      } else return [];
    } catch (error) {
      console.error(`Failed to load tabs_${agent} from localStorage: `, error);
      return [];
    }
  },

  clear: (agent: string): void => {
    try {
      localStorage.removeItem(`tabs_${agent}`);
    } catch (error) {
      console.error(`Failed to clear tabs_${agent}: `, error);
    }
  },

  getStorageInfo: (agent: string): {
    size: number,
    used: number,
    quota: number,
    percentage: number
  } => {
    try {
      const data = localStorage.getItem(`tabs_${agent}`);
      const size = data ? new Blob([data]).size : 0;
      const used = JSON.stringify(localStorage).length;
      const quota = 5 * 1024 * 1024;

      return {
        size,
        used,
        quota,
        percentage: (used / quota) * 100,
      }
    } catch (error) {
      console.error(`Failed to get tabs storage info for ${agent}: `, error);
      return { size: 0, used: 0, quota: 0, percentage: 0 }
    }
  },
}

export default tabStorage;