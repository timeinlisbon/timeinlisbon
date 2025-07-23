import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(subscriberData.email);
      if (existingSubscriber) {
        return res.status(400).json({ 
          error: "Email already subscribed",
          message: "This email address is already subscribed to our newsletter."
        });
      }

      const subscriber = await storage.createSubscriber(subscriberData);
      res.status(201).json({ 
        success: true,
        message: "Successfully subscribed to Times in Lisbon newsletter!",
        subscriber: { id: subscriber.id, email: subscriber.email }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation error",
          message: "Please check your input and try again.",
          details: error.errors
        });
      }
      
      console.error("Subscription error:", error);
      res.status(500).json({ 
        error: "Internal server error",
        message: "Something went wrong. Please try again later."
      });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      res.status(201).json({ 
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
        contact: { id: contact.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation error",
          message: "Please check your input and try again.",
          details: error.errors
        });
      }
      
      console.error("Contact form error:", error);
      res.status(500).json({ 
        error: "Internal server error",
        message: "Something went wrong. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
