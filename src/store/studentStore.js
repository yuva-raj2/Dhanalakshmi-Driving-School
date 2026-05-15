import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStudentStore = create(
  persist(
    (set, get) => ({
      // Cached student list
      students: [],
      lastFetch: null,
      
      // Filters
      filters: {
        search: '',
        status: 'all',
        licenseType: 'all',
      },
      
      // Actions
      setStudents: (students) => set({ students, lastFetch: Date.now() }),
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      
      clearFilters: () => set({
        filters: {
          search: '',
          status: 'all',
          licenseType: 'all',
        }
      }),
      
      // Add/update student in cache
      updateStudent: (student) => set((state) => ({
        students: state.students.map(s => 
          s.id === student.id ? { ...s, ...student } : s
        )
      })),
      
      // Remove student from cache
      removeStudent: (id) => set((state) => ({
        students: state.students.filter(s => s.id !== id)
      })),
      
      // Get student by ID from cache
      getStudent: (id) => {
        return get().students.find(s => s.id === id);
      },
    }),
    {
      name: 'student-storage',
      partialize: (state) => ({ students: state.students, filters: state.filters }),
    }
  )
);

export default useStudentStore;