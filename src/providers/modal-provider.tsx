"use client";

import { TicketDetails } from "@/lib/types";
import { Agency, Contact, User } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ModelProviderProps {
  children: React.ReactNode;
}

export type ModelData = {
  ticket?: TicketDetails[0];  
  user?: User;
  agency?: Agency;
  contact? : Contact
};

type ModeContextType = {
  data: ModelData;
  isOpen: boolean;
  setOpen: (model: React.ReactNode, fetchData?: () => Promise<any>) => void;
  setClose: () => void;
 
};

export const ModelContext = createContext<ModeContextType>({
  data: {},
  isOpen: false,
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
  setClose: () => {},

});

const ModelProvider: React.FC<ModelProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ModelData>({});
  const [showingModel, setShowingModel] = useState<React.ReactNode>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setOpen = async (
    modal: React.ReactNode,
    fetchData?: () => Promise<any>
  ) => {
    if (modal) {
      if (fetchData) {
        setData({ ...data, ...(await fetchData()) } || {});
      }
      setShowingModel(modal);
      setIsOpen(true);
    }
  };

  const setClose = () => {
    setIsOpen(false);
    setData({});
  };

  if (!isMounted) return null;

  return (
    <ModelContext.Provider value={{ data, setOpen, setClose, isOpen }}>
      {children}
      {showingModel}
    </ModelContext.Provider>
  );
};

export const useModal = () => {
    const context = useContext(ModelContext);
    if(!context) {
        throw new Error('useModel must be used within a ModelProvider');
    }
    return context;
}

export default ModelProvider;
