import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle } from "lucide-react";

const subscriptionSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

type SubscriptionForm = z.infer<typeof subscriptionSchema>;

export function SubscriptionForm() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: async (data: SubscriptionForm) => {
      const response = await apiRequest("POST", "/api/subscribe", {
        ...data,
        language,
      });
      return response.json();
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
      <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-2xl shadow-lg">
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
    <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-2xl shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">{t("phone-placeholder")}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder={t("phone-placeholder")}
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
