import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  onSnapshot, 
  addDoc, 
  updateDoc 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  ResourceItem, 
  SymbiosisContract, 
  IoTSensorData, 
  LogisticsOrder, 
  B2BAuctionItem 
} from '../types';
import { 
  INITIAL_RESOURCES, 
  INITIAL_IOT_SENSORS, 
  INITIAL_LOGISTICS_ORDERS, 
  INITIAL_AUCTION_ITEMS 
} from '../data/mockData';

// Firestore collection names
const COLLECTIONS = {
  RESOURCES: 'resources',
  CONTRACTS: 'contracts',
  IOT_SENSORS: 'iot_sensors',
  LOGISTICS: 'logistics_orders',
  AUCTIONS: 'auction_items',
};

// Seed initial data if database is empty
export async function seedFirestoreIfEmpty() {
  try {
    const resSnap = await getDocs(collection(db, COLLECTIONS.RESOURCES));
    if (resSnap.empty) {
      console.log('Seeding Resources to Firestore...');
      for (const res of INITIAL_RESOURCES) {
        await setDoc(doc(db, COLLECTIONS.RESOURCES, res.id), res);
      }
    }

    const iotSnap = await getDocs(collection(db, COLLECTIONS.IOT_SENSORS));
    if (iotSnap.empty) {
      console.log('Seeding IoT Sensors to Firestore...');
      for (const sensor of INITIAL_IOT_SENSORS) {
        await setDoc(doc(db, COLLECTIONS.IOT_SENSORS, sensor.id), sensor);
      }
    }

    const logSnap = await getDocs(collection(db, COLLECTIONS.LOGISTICS));
    if (logSnap.empty) {
      console.log('Seeding Logistics Orders to Firestore...');
      for (const order of INITIAL_LOGISTICS_ORDERS) {
        await setDoc(doc(db, COLLECTIONS.LOGISTICS, order.id), order);
      }
    }

    const aucSnap = await getDocs(collection(db, COLLECTIONS.AUCTIONS));
    if (aucSnap.empty) {
      console.log('Seeding Auction Items to Firestore...');
      for (const item of INITIAL_AUCTION_ITEMS) {
        await setDoc(doc(db, COLLECTIONS.AUCTIONS, item.id), item);
      }
    }
  } catch (err) {
    console.error('Firestore seeding warning:', err);
  }
}

// Subscriptions
export function subscribeResources(callback: (data: ResourceItem[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.RESOURCES), (snapshot) => {
    const items: ResourceItem[] = [];
    snapshot.forEach((doc) => {
      items.push(doc.data() as ResourceItem);
    });
    if (items.length > 0) callback(items);
  });
}

export function subscribeContracts(callback: (data: SymbiosisContract[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.CONTRACTS), (snapshot) => {
    const items: SymbiosisContract[] = [];
    snapshot.forEach((doc) => {
      items.push(doc.data() as SymbiosisContract);
    });
    callback(items);
  });
}

export function subscribeIoTSensors(callback: (data: IoTSensorData[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.IOT_SENSORS), (snapshot) => {
    const items: IoTSensorData[] = [];
    snapshot.forEach((doc) => {
      items.push(doc.data() as IoTSensorData);
    });
    if (items.length > 0) callback(items);
  });
}

export function subscribeLogistics(callback: (data: LogisticsOrder[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.LOGISTICS), (snapshot) => {
    const items: LogisticsOrder[] = [];
    snapshot.forEach((doc) => {
      items.push(doc.data() as LogisticsOrder);
    });
    if (items.length > 0) callback(items);
  });
}

export function subscribeAuctions(callback: (data: B2BAuctionItem[]) => void) {
  return onSnapshot(collection(db, COLLECTIONS.AUCTIONS), (snapshot) => {
    const items: B2BAuctionItem[] = [];
    snapshot.forEach((doc) => {
      items.push(doc.data() as B2BAuctionItem);
    });
    if (items.length > 0) callback(items);
  });
}

// Operations
export async function saveResourceToFirestore(resource: ResourceItem) {
  await setDoc(doc(db, COLLECTIONS.RESOURCES, resource.id), resource);
}

export async function saveContractToFirestore(contract: SymbiosisContract) {
  await setDoc(doc(db, COLLECTIONS.CONTRACTS, contract.id), contract);
}

export async function saveLogisticsOrderToFirestore(order: LogisticsOrder) {
  await setDoc(doc(db, COLLECTIONS.LOGISTICS, order.id), order);
}

export async function updateAuctionBidInFirestore(
  auctionId: string, 
  newPrice: number, 
  highestBidderCompany: string, 
  newBidCount: number
) {
  await updateDoc(doc(db, COLLECTIONS.AUCTIONS, auctionId), {
    currentHighestBidVnd: newPrice,
    highestBidderCompany,
    bidCount: newBidCount,
  });
}
