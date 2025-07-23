import { subscribers, contacts, type Subscriber, type Contact, type InsertSubscriber, type InsertContact } from "@shared/schema";

export interface IStorage {
  getSubscriber(id: number): Promise<Subscriber | undefined>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private subscribers: Map<number, Subscriber>;
  private contacts: Map<number, Contact>;
  private currentSubscriberId: number;
  private currentContactId: number;

  constructor() {
    this.subscribers = new Map();
    this.contacts = new Map();
    this.currentSubscriberId = 1;
    this.currentContactId = 1;
  }

  async getSubscriber(id: number): Promise<Subscriber | undefined> {
    return this.subscribers.get(id);
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const subscriber: Subscriber = { 
      ...insertSubscriber,
      name: insertSubscriber.name || null,
      phone: insertSubscriber.phone || null,
      language: insertSubscriber.language || "en",
      id,
      createdAt: new Date()
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact,
      language: insertContact.language || "en",
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
