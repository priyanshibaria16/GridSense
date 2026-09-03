import { create } from 'zustand';
import {
  User,
  Transformer,
  DashboardSummary,
  Outage,
  SimulationParams,
  SimulationResult,
  CopilotMessage
} from '../types';
import { apiService } from '../services/api';
import { DEMO_USERS, MOCK_DASHBOARD_SUMMARY } from '../services/mockData';

interface GridState {
  // Auth state
  currentUser: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  switchRole: (role: User['role']) => void;
  logout: () => void;

  // Selected Asset & Drawer
  selectedAsset: Transformer | null;
  isAssetDrawerOpen: boolean;
  openAssetDrawer: (asset: Transformer) => void;
  closeAssetDrawer: () => void;

  // Global search & command palette
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Notifications Drawer
  isNotificationDrawerOpen: boolean;
  setNotificationDrawerOpen: (open: boolean) => void;

  // Theme mode
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Live Dashboard Summary State
  summary: DashboardSummary;
  isLoadingSummary: boolean;
  fetchSummary: () => Promise<void>;

  // Outages
  outages: Outage[];
  fetchOutages: () => Promise<void>;

  // Simulation State
  simulationParams: SimulationParams;
  simulationResult: SimulationResult | null;
  isSimulating: boolean;
  setSimulationParams: (params: Partial<SimulationParams>) => void;
  runSimulation: () => Promise<void>;

  // Copilot messages
  copilotMessages: CopilotMessage[];
  isCopilotThinking: boolean;
  sendCopilotMessage: (text: string) => Promise<void>;
  clearCopilotMessages: () => void;
}

export const useGridStore = create<GridState>((set, get) => ({
  // Initialize user from localStorage if present
  currentUser: (() => {
    const saved = localStorage.getItem('gridsense_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_USERS[0];
      }
    }
    return DEMO_USERS[0];
  })(),
  isAuthenticated: true,

  setUser: (user) => {
    localStorage.setItem('gridsense_user', JSON.stringify(user));
    set({ currentUser: user, isAuthenticated: true });
  },

  switchRole: (role) => {
    const found = DEMO_USERS.find((u) => u.role === role) || {
      ...get().currentUser,
      role
    };
    localStorage.setItem('gridsense_user', JSON.stringify(found));
    set({ currentUser: found });
  },

  logout: () => {
    localStorage.removeItem('gridsense_token');
    localStorage.removeItem('gridsense_user');
    set({
      currentUser: DEMO_USERS[0],
      isAuthenticated: false
    });
  },

  // Asset Drawer
  selectedAsset: null,
  isAssetDrawerOpen: false,
  openAssetDrawer: (asset) => set({ selectedAsset: asset, isAssetDrawerOpen: true }),
  closeAssetDrawer: () => set({ isAssetDrawerOpen: false }),

  // Command Palette
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),

  // Notifications
  isNotificationDrawerOpen: false,
  setNotificationDrawerOpen: (open) => set({ isNotificationDrawerOpen: open }),

  // Theme
  theme: (localStorage.getItem('gridsense_theme') as 'dark' | 'light') || 'dark',
  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('gridsense_theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    set({ theme: nextTheme });
  },

  // Summary
  summary: MOCK_DASHBOARD_SUMMARY,
  isLoadingSummary: false,
  fetchSummary: async () => {
    set({ isLoadingSummary: true });
    try {
      const summary = await apiService.getDashboardSummary();
      set({ summary, isLoadingSummary: false });
    } catch {
      set({ isLoadingSummary: false });
    }
  },

  // Outages
  outages: [],
  fetchOutages: async () => {
    const outages = await apiService.getOutages();
    set({ outages });
  },

  // Simulation
  simulationParams: {
    temperatureChangeC: 4,
    residentialDemandDeltaPct: 15,
    industrialDemandDeltaPct: 5,
    isHoliday: false,
    evChargingSpikePct: 10,
    peakLoadHour: 19
  },
  simulationResult: null,
  isSimulating: false,
  setSimulationParams: (newParams) => {
    set({
      simulationParams: {
        ...get().simulationParams,
        ...newParams
      }
    });
  },
  runSimulation: async () => {
    set({ isSimulating: true });
    try {
      const result = await apiService.runSimulation(get().simulationParams);
      set({ simulationResult: result, isSimulating: false });
    } catch {
      set({ isSimulating: false });
    }
  },

  // Copilot Assistant
  copilotMessages: [
    {
      id: 'welcome-01',
      sender: 'assistant',
      timestamp: '12:00',
      text: "⚡ **GridSense Copilot online.** I'm monitoring active telemetry across 12 substations and 140+ distribution transformers. Ask me about failure risk, demand peak forecasts, active outages, or request a 'what-if' grid scenario simulation.",
      confidencePct: 100,
      dataSource: 'GridSense Autonomous Intelligence Core'
    }
  ],
  isCopilotThinking: false,
  sendCopilotMessage: async (text: string) => {
    const userMsg: CopilotMessage = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text
    };

    set({
      copilotMessages: [...get().copilotMessages, userMsg],
      isCopilotThinking: true
    });

    try {
      const response = await apiService.queryCopilot(text);
      set({
        copilotMessages: [...get().copilotMessages, response],
        isCopilotThinking: false
      });
    } catch {
      set({ isCopilotThinking: false });
    }
  },
  clearCopilotMessages: () => {
    set({
      copilotMessages: [
        {
          id: 'welcome-fresh',
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: '⚡ Context cleared. How can I assist you with grid analytics and operational decisions?',
          confidencePct: 100,
          dataSource: 'GridSense Autonomous Intelligence Core'
        }
      ]
    });
  }
}));
