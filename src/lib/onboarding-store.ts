
import { create } from 'zustand';

export interface OnboardingFile {
  file: File;
  name: string;
  description: string;
  tags: string[];
}

interface OnboardingState {
  role: string | null;
  otherRole: string;
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
  onboardingFiles: OnboardingFile[];
  twoFactorEnabled: boolean;
  integrations: string[];
  invitedFriends: string[];

  setRole: (role: string) => void;
  setOtherRole: (otherRole: string) => void;
  setCompanyDetails: (details: OnboardingState['companyDetails']) => void;
  toggleObjective: (objective: string) => void;
  toggleKpi: (kpi: string) => void;
  toggleDataSource: (source: string) => void;
  setImportSampleData: (value: boolean) => void;
  
  addUploadedFiles: (files: File[]) => void;
  removeUploadedFile: (index: number) => void;
  updateUploadedFile: (index: number, data: Partial<Omit<OnboardingFile, 'file'>>) => void;

  setTwoFactorEnabled: (value: boolean) => void;
  toggleIntegration: (integration: string) => void;
  addInvitedFriend: (email: string) => void;
  
  getState: () => Omit<OnboardingState, 'getState' | 'setState'>;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  role: null,
  otherRole: '',
  companyDetails: null,
  objectives: [],
  kpis: [],
  dataSources: [],
  importSampleData: true,
  onboardingFiles: [],
  twoFactorEnabled: false,
  integrations: [],
  invitedFriends: [],

  setRole: (role) => {
    if (role !== 'other') {
      set({ role, otherRole: '' });
    } else {
      set({ role });
    }
  },
  setOtherRole: (otherRole) => set({ otherRole }),
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
  
  addUploadedFiles: (filesToAdd: File[]) => set(state => {
    const newFiles = filesToAdd.map(file => ({
        file,
        name: "",
        description: "",
        tags: []
    }));
    return { onboardingFiles: [...state.onboardingFiles, ...newFiles] };
  }),

  removeUploadedFile: (indexToRemove: number) => set(state => ({
      onboardingFiles: state.onboardingFiles.filter((_, index) => index !== indexToRemove)
  })),

  updateUploadedFile: (indexToUpdate: number, data: Partial<Omit<OnboardingFile, 'file'>>) => {
    set(state => ({
      onboardingFiles: state.onboardingFiles.map((item, index) =>
        index === indexToUpdate ? { ...item, ...data } : item
      ),
    }));
  },

  setTwoFactorEnabled: (value) => set({ twoFactorEnabled: value }),
  toggleIntegration: (integration) => set((state) => ({
    integrations: state.integrations.includes(integration)
        ? state.integrations.filter((i) => i !== integration)
        : [...state.integrations, integration],
  })),
  addInvitedFriend: (email) => set((state) => ({
    invitedFriends: state.invitedFriends.includes(email) 
      ? state.invitedFriends 
      : [...state.invitedFriends, email],
  })),
  
  getState: () => {
    const { getState, ...rest } = get();
    return rest;
  },
}));
