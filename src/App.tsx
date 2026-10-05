import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { InventoryManager } from './components/InventoryManager';
import { SmartMatchmaker } from './components/SmartMatchmaker';
import { SymbiosisMap } from './components/SymbiosisMap';
import { ContractsManager } from './components/ContractsManager';
import { IoTSensorManager } from './components/IoTSensorManager';
import { LogisticsPermitManager } from './components/LogisticsPermitManager';
import { B2BAuctionMarketplace } from './components/B2BAuctionMarketplace';
import { NegotiationModal } from './components/NegotiationModal';
import { ESGCalculatorModal } from './components/ESGCalculatorModal';
import { AIConsultantModal } from './components/AIConsultantModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_RESOURCES, 
  INITIAL_MATCH_PROPOSALS, 
  INITIAL_SYSTEM_STATS, 
  INITIAL_INDUSTRIAL_ZONES,
  INITIAL_IOT_SENSORS,
  INITIAL_LOGISTICS_ORDERS,
  INITIAL_AUCTION_ITEMS
} from './data/mockData';
import { 
  ResourceItem, 
  MatchProposal, 
  SymbiosisContract, 
  SystemStats,
  IoTSensorData,
  LogisticsOrder,
  B2BAuctionItem
} from './types';
import { 
  seedFirestoreIfEmpty, 
  subscribeResources, 
  subscribeContracts, 
  saveResourceToFirestore, 
  saveContractToFirestore 
} from './services/firestoreService';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'matchmaker' | 'map' | 'contracts' | 'iot' | 'logistics' | 'marketplace'>('dashboard');
  
  // App state
  const [stats, setStats] = useState<SystemStats>(INITIAL_SYSTEM_STATS);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [matches, setMatches] = useState<MatchProposal[]>(INITIAL_MATCH_PROPOSALS);
  const [contracts, setContracts] = useState<SymbiosisContract[]>([]);
  const [zones] = useState(INITIAL_INDUSTRIAL_ZONES);
  const [iotSensors] = useState<IoTSensorData[]>(INITIAL_IOT_SENSORS);
  const [logisticsOrders] = useState<LogisticsOrder[]>(INITIAL_LOGISTICS_ORDERS);
  const [auctionItems] = useState<B2BAuctionItem[]>(INITIAL_AUCTION_ITEMS);

  // Modals & Active Selections
  const [selectedMatchForNegotiation, setSelectedMatchForNegotiation] = useState<MatchProposal | null>(null);
  const [showAddResourceModal, setShowAddResourceModal] = useState<boolean>(false);
  const [showESGModal, setShowESGModal] = useState<boolean>(false);
  const [showAIConsultantModal, setShowAIConsultantModal] = useState<boolean>(false);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);

  // Initialize Firestore on mount
  useEffect(() => {
    seedFirestoreIfEmpty();

    const unsubRes = subscribeResources((data) => {
      if (data && data.length > 0) setResources(data);
    });

    const unsubContracts = subscribeContracts((data) => {
      if (data) setContracts(data);
    });

    return () => {
      unsubRes();
      unsubContracts();
    };
  }, []);

  // Add new Resource to Inventory & Firestore
  const handleAddResource = (newItem: Omit<ResourceItem, 'id' | 'createdAt' | 'status'>) => {
    const created: ResourceItem = {
      ...newItem,
      id: `res-${Date.now()}`,
      status: 'ready',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setResources((prev) => [created, ...prev]);
    saveResourceToFirestore(created);

    // Update system stats
    setStats((prev) => ({
      ...prev,
      participatingFactories: prev.participatingFactories + 1,
    }));

    // Auto navigate to Matchmaker with message
    setActiveTab('matchmaker');
    runAIMatchmakerEngine({
      newResource: created,
      resourceCount: resources.length + 1,
    });
  };

  // Delete Resource
  const handleDeleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  // Trigger AI Matchmaker API call (Calls server.ts /api/matchmake)
  const runAIMatchmakerEngine = async (searchCriteria?: any) => {
    setIsLoadingAI(true);
    try {
      const response = await fetch('/api/matchmake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resources,
          searchCriteria: searchCriteria || { priorityFocus: 'co2', maxDistanceKm: 25 },
        }),
      });

      const data = await response.json();

      if (data.success && Array.isArray(data.matches) && data.matches.length > 0) {
        setMatches(data.matches);
        setStats((prev) => ({
          ...prev,
          activeMatches: data.matches.length,
        }));
      }
    } catch (err) {
      console.error('Error invoking AI matchmaker endpoint:', err);
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Trigger AI Match for a specific item from Inventory
  const handleTriggerAIMatchForResource = (item: ResourceItem) => {
    setActiveTab('matchmaker');
    runAIMatchmakerEngine({ targetResource: item.name, category: item.category });
  };

  // Save new Contract from Negotiation Modal
  const handleSaveContract = (contract: SymbiosisContract) => {
    setContracts((prev) => [contract, ...prev]);
    saveContractToFirestore(contract);

    // Update global system metrics
    setStats((prev) => ({
      ...prev,
      recycledVolumeTons: prev.recycledVolumeTons + contract.agreedVolume,
      co2SavedTons: prev.co2SavedTons + contract.co2SavedYear,
      economicValueBillionVnd: Number((prev.economicValueBillionVnd + (contract.costSavedMonth * 12) / 1000000000).toFixed(2)),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddResource={() => {
          setActiveTab('inventory');
          setShowAddResourceModal(true);
        }}
        onOpenESGModal={() => setShowESGModal(true)}
        onOpenAIConsultant={() => setShowAIConsultantModal(true)}
        totalResourcesCount={resources.length}
        totalMatchesCount={matches.length}
      />

      {/* Main Body View Switching */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            stats={stats}
            zones={zones}
            recentMatches={matches}
            resources={resources}
            onNavigateToMatchmaker={() => setActiveTab('matchmaker')}
            onNavigateToInventory={() => {
              setActiveTab('inventory');
              setShowAddResourceModal(false);
            }}
            onSelectMatchToNegotiate={(match) => setSelectedMatchForNegotiation(match)}
            onOpenESGModal={() => setShowESGModal(true)}
            onOpenAIConsultant={() => setShowAIConsultantModal(true)}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryManager
            resources={resources}
            onAddResource={handleAddResource}
            onDeleteResource={handleDeleteResource}
            onTriggerAIMatchForResource={handleTriggerAIMatchForResource}
            showAddModalDirectly={showAddResourceModal}
            onCloseAddModalDirectly={() => setShowAddResourceModal(false)}
          />
        )}

        {activeTab === 'matchmaker' && (
          <SmartMatchmaker
            matches={matches}
            resources={resources}
            onTriggerRunAI={runAIMatchmakerEngine}
            isLoadingAI={isLoadingAI}
            onSelectMatchToNegotiate={(match) => setSelectedMatchForNegotiation(match)}
          />
        )}

        {activeTab === 'map' && (
          <SymbiosisMap
            zones={zones}
            matches={matches}
            onSelectMatch={(match) => setSelectedMatchForNegotiation(match)}
          />
        )}

        {activeTab === 'contracts' && (
          <ContractsManager
            contracts={contracts}
            matches={matches}
            onSelectMatchToNegotiate={(match) => setSelectedMatchForNegotiation(match)}
          />
        )}

        {activeTab === 'iot' && (
          <IoTSensorManager
            sensors={iotSensors}
          />
        )}

        {activeTab === 'logistics' && (
          <LogisticsPermitManager
            orders={logisticsOrders}
          />
        )}

        {activeTab === 'marketplace' && (
          <B2BAuctionMarketplace
            auctionItems={auctionItems}
          />
        )}
      </main>

      {/* Global Modals */}
      {selectedMatchForNegotiation && (
        <NegotiationModal
          match={selectedMatchForNegotiation}
          onClose={() => setSelectedMatchForNegotiation(null)}
          onSaveContract={handleSaveContract}
        />
      )}

      {showESGModal && (
        <ESGCalculatorModal
          onClose={() => setShowESGModal(false)}
          resources={resources}
          contracts={contracts}
        />
      )}

      {showAIConsultantModal && (
        <AIConsultantModal
          onClose={() => setShowAIConsultantModal(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
