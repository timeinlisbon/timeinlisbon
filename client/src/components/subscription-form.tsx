import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle } from "lucide-react";

const subscriptionSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
});

type SubscriptionForm = z.infer<typeof subscriptionSchema>;

export function SubscriptionForm() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('CBrD_eLhX8oyJVS2l');
    console.log('EmailJS initialized with new credentials');
  }, []);

  const form = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: async (data: SubscriptionForm) => {
      console.log('Starting subscription process for:', data.email);
      
      // Send notification email via EmailJS
      try {
        console.log('Sending email via EmailJS...');
        const emailResult = await emailjs.send(
          'service_laea0un',
          'template_m1afili',
          {
            to_email: 'timesinlisbon@gmail.com',
            subscriber_email: data.email,
            subscriber_name: data.name || 'Não fornecido',
            language: language === 'pt' ? 'Português' : 'English',
            subscription_date: new Date().toLocaleDateString('pt-PT'),
            message: `Nova subscrição: ${data.email} (${data.name || 'Sem nome'})`
          }
        );
        console.log('Email sent successfully:', emailResult);
      } catch (emailError) {
        console.error('EmailJS error:', emailError);
        throw new Error('Failed to send notification email. Please try again.');
      }
      
      // Try to save to database, but don't fail if it doesn't work
      try {
        const response = await apiRequest("POST", "/api/subscribe", {
          ...data,
          language,
        });
        return response.json();
      } catch (dbError) {
        console.log('Database save failed, but email was sent successfully');
        return { success: true };
      }
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      toast({
        title: t("success-message"),
        variant: "default",
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    },
    onError: (error: any) => {
      const errorMessage = error.message?.includes("already subscribed") 
        ? t("email-exists")
        : t("subscription-error");
      
      toast({
        title: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SubscriptionForm) => {
    subscriptionMutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t("success-message")}
          </h3>
          <p className="text-gray-600">
            Check your email for confirmation details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">{t("email-placeholder")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("email-placeholder")}
                    {...field}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    required
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
                <FormLabel className="sr-only">{t("name-placeholder")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("name-placeholder")}
                    {...field}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={subscriptionMutation.isPending}
            className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {subscriptionMutation.isPending ? "Subscribing..." : t("subscribe-button")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
