"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type {
  ContentFormData,
  ProjectInfo,
  PageDefinition,
  SectionDefinition,
  ExtrasInfo,
} from "@/lib/content-form-types";
import { createDefaultFormData } from "@/lib/content-form-defaults";

const STORAGE_KEY = "wilckeweb-content-form";

interface ContentFormContextType {
  data: ContentFormData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateProject: (project: Partial<ProjectInfo>) => void;
  setPages: (pages: PageDefinition[]) => void;
  addPage: (page: PageDefinition) => void;
  removePage: (pageId: string) => void;
  updatePage: (pageId: string, updates: Partial<PageDefinition>) => void;
  movePage: (pageId: string, direction: "up" | "down") => void;
  addSection: (pageId: string, section: SectionDefinition) => void;
  removeSection: (pageId: string, sectionId: string) => void;
  updateSection: (pageId: string, sectionId: string, updates: Partial<SectionDefinition>) => void;
  moveSection: (pageId: string, sectionId: string, direction: "up" | "down") => void;
  updateExtras: (extras: Partial<ExtrasInfo>) => void;
  resetForm: () => void;
}

const ContentFormContext = createContext<ContentFormContextType | null>(null);

export function ContentFormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ContentFormData>(createDefaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.version) {
          setData(parsed);
        }
      }
      const savedStep = localStorage.getItem(STORAGE_KEY + "-step");
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY + "-step", String(currentStep));
  }, [currentStep, hydrated]);

  const updateProject = useCallback((updates: Partial<ProjectInfo>) => {
    setData((prev) => ({
      ...prev,
      project: { ...prev.project, ...updates },
    }));
  }, []);

  const setPages = useCallback((pages: PageDefinition[]) => {
    setData((prev) => ({ ...prev, pages }));
  }, []);

  const addPage = useCallback((page: PageDefinition) => {
    setData((prev) => ({ ...prev, pages: [...prev.pages, page] }));
  }, []);

  const removePage = useCallback((pageId: string) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.filter((p) => p.id !== pageId),
    }));
  }, []);

  const updatePage = useCallback((pageId: string, updates: Partial<PageDefinition>) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === pageId ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  const movePage = useCallback((pageId: string, direction: "up" | "down") => {
    setData((prev) => {
      const pages = [...prev.pages];
      const idx = pages.findIndex((p) => p.id === pageId);
      if (idx < 0) return prev;
      const target = direction === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= pages.length) return prev;
      [pages[idx], pages[target]] = [pages[target], pages[idx]];
      return { ...prev, pages: pages.map((p, i) => ({ ...p, sortOrder: i })) };
    });
  }, []);

  const addSection = useCallback((pageId: string, section: SectionDefinition) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === pageId ? { ...p, sections: [...p.sections, section] } : p
      ),
    }));
  }, []);

  const removeSection = useCallback((pageId: string, sectionId: string) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === pageId
          ? { ...p, sections: p.sections.filter((s) => s.id !== sectionId) }
          : p
      ),
    }));
  }, []);

  const updateSection = useCallback(
    (pageId: string, sectionId: string, updates: Partial<SectionDefinition>) => {
      setData((prev) => ({
        ...prev,
        pages: prev.pages.map((p) =>
          p.id === pageId
            ? {
                ...p,
                sections: p.sections.map((s) =>
                  s.id === sectionId ? { ...s, ...updates } : s
                ),
              }
            : p
        ),
      }));
    },
    []
  );

  const moveSection = useCallback(
    (pageId: string, sectionId: string, direction: "up" | "down") => {
      setData((prev) => ({
        ...prev,
        pages: prev.pages.map((p) => {
          if (p.id !== pageId) return p;
          const sections = [...p.sections];
          const idx = sections.findIndex((s) => s.id === sectionId);
          if (idx < 0) return p;
          const target = direction === "up" ? idx - 1 : idx + 1;
          if (target < 0 || target >= sections.length) return p;
          [sections[idx], sections[target]] = [sections[target], sections[idx]];
          return { ...p, sections };
        }),
      }));
    },
    []
  );

  const updateExtras = useCallback((updates: Partial<ExtrasInfo>) => {
    setData((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        ...updates,
        legal: { ...prev.extras.legal, ...(updates.legal || {}) },
        contact: { ...prev.extras.contact, ...(updates.contact || {}) },
        socialMedia: { ...prev.extras.socialMedia, ...(updates.socialMedia || {}) },
        features: { ...prev.extras.features, ...(updates.features || {}) },
      },
    }));
  }, []);

  const resetForm = useCallback(() => {
    setData(createDefaultFormData());
    setCurrentStep(0);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY + "-step");
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <ContentFormContext.Provider
      value={{
        data,
        currentStep,
        setCurrentStep,
        updateProject,
        setPages,
        addPage,
        removePage,
        updatePage,
        movePage,
        addSection,
        removeSection,
        updateSection,
        moveSection,
        updateExtras,
        resetForm,
      }}
    >
      {children}
    </ContentFormContext.Provider>
  );
}

export function useContentForm() {
  const ctx = useContext(ContentFormContext);
  if (!ctx) throw new Error("useContentForm must be used within ContentFormProvider");
  return ctx;
}
