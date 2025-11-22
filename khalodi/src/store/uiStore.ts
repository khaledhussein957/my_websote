import { create } from 'zustand';

interface UIState {
  isMenuOpen: boolean;
  activeSection: string;
  isProjectModalOpen: boolean;
  selectedProject: string | null;
  
  // Actions
  toggleMenu: () => void;
  setActiveSection: (section: string) => void;
  openProjectModal: (projectId: string) => void;
  closeProjectModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  activeSection: 'home',
  isProjectModalOpen: false,
  selectedProject: null,
  
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
  openProjectModal: (projectId) => set({ 
    isProjectModalOpen: true, 
    selectedProject: projectId 
  }),
  closeProjectModal: () => set({ 
    isProjectModalOpen: false, 
    selectedProject: null 
  }),
}));
