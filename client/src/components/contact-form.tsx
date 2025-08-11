import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle } from "lucide-react";

const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('CBrD_eLhX8oyJVS2l');
    console.log('EmailJS initialized for contact form');
  }, []);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      console.log('Starting contact form submission for:', data.email);
      
      // Send notification email to admin via EmailJS
      try {
        console.log('Sending notification email to admin...');
        const adminEmailResult = await emailjs.send(
          'service_laea0un',
          'template_u5cdk3o', // Template existente para admin
          {
            to_email: 'timesinlisbon@gmail.com',
            from_name: data.name,
            from_email: data.email,
            message: data.message,
            language: language === 'pt' ? 'Português' : 'English',
            contact_date: new Date().toLocaleDateString('pt-PT'),
            subject: `Nova mensagem de contato de ${data.name}`
          }
        );
        console.log('Admin notification sent successfully:', adminEmailResult);
      } catch (emailError) {
        console.error('EmailJS admin notification error:', emailError);
        throw new Error('Failed to send your message. Please try again.');
      }

      // Send confirmation email to user
      try {
        console.log('Sending confirmation email to user...');
        const userEmailResult = await emailjs.send(
          'service_laea0un',
          'template_contact_user', // Precisará criar este template
          {
            to_email: data.email,
            to_name: data.name,
            language: language === 'pt' ? 'Português' : 'English',
            confirmation_message: language === 'pt' 
              ? 'Recebemos a sua mensagem e a nossa equipa entrará em contacto consigo em breve.'
              : 'We have received your message and our team will get back to you soon.'
          }
        );
        console.log('User confirmation sent successfully:', userEmailResult);
      } catch (emailError) {
        console.error('EmailJS user confirmation error:', emailError);
        // Don't throw error here - admin notification was successful
        console.log('Admin was notified but user confirmation failed');
      }
      
      // Try to save to database, but don't fail if it doesn't work
      try {
        const response = await apiRequest("POST", "/api/contact", {
          ...data,
          language,
        });
        return response.json();
      } catch (dbError) {
        console.log('Database save failed, but emails were sent successfully');
        return { success: true };
      }
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      toast({
        title: t("contact-success"),
        variant: "default",
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    },
    onError: (error: any) => {
      toast({
        title: t("contact-error"),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t("contact-success")}
          </h3>
          <p className="text-gray-600">
            We'll respond to your message as soon as possible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact-email")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact-name")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact-message")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    {...field}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-vertical"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={contactMutation.isPending}
            className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {contactMutation.isPending ? "Sending..." : t("send-message")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
