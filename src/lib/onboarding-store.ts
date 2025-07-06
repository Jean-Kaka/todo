import { create } from 'zustand';

interface OnboardingState {
  role: string | null;
  companyDetails: {
    companyName: string;
    companySize: string;
    industry: string;
    location?: string;
    department?: string;
    website?: string;
  } | null;
  objectives: string[];
  kpis: string[];
  dataSources: string[];
  importSampleData: boolean;
  twoFactorEnabled: boolean;
  integrations: string[];

  setRole: (role: string) => void;
  setCompanyDetails: (details: OnboardingState['companyDetails']) => void;
  toggleObjective: (objective: string) => void;
  toggleKpi: (kpi: string) => void;
  toggleDataSource: (source: string) => void;
  setImportSampleData: (value: boolean) => void;
  setTwoFactorEnabled: (value: boolean) => void; // A simplified representation
  toggleIntegration: (integration: string) => void;
  
  getState: () => Omit<OnboardingState, 'getState'>;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  role: null,
  companyDetails: null,
  objectives: [],
  kpis: [],
  dataSources: [],
  importSampleData: true,
  twoFactorEnabled: false,
  integrations: [],

  setRole: (role) => set({ role }),
  setCompanyDetails: (details) => set({ companyDetails: details }),
  toggleObjective: (objective) => set((state) => ({
    objectives: state.objectives.includes(objective)
      ? state.objectives.filter((o) => o !== objective)
      : [...state.objectives, objective],
  })),
  toggleKpi: (kpi) => set((state) => ({
    kpis: state.kpis.includes(kpi)
      ? state.kpis.filter((k) => k !== kpi)
      : [...state.kpis, kpi],
  })),
  toggleDataSource: (source) => set((state) => ({
    dataSources: state.dataSources.includes(source)
        ? state.dataSources.filter((s) => s !== source)
        : [...state.dataSources, source],
  })),
  setImportSampleData: (value) => set({ importSampleData: value }),
  setTwoFactorEnabled: (value) => set({ twoFactorEnabled: value }),
  toggleIntegration: (integration) => set((state) => ({
    integrations: state.integrations.includes(integration)
        ? state.integrations.filter((i) => i !== integration)
        : [...state.integrations, integration],
  })),
  
  getState: () => {
    const { getState, ...rest } = get();
    return rest;
  },
}));
