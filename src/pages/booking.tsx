import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertBookingSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { z } from "zod";
import type { Hotel, Flight, Transport } from "@shared/schema";

const bookingFormSchema = insertBookingSchema.extend({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export default function Booking() {
  const params = useParams<{ type: string; id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [bookingComplete, setBookingComplete] = useState(false);

  const { type, id } = params;
  const itemId = parseInt(id);

  // Fetch the item based on type
  const { data: item, isLoading } = useQuery({
    queryKey: [`/api/${type}`, itemId],
    enabled: !!type && !!itemId,
  });

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      type,
      itemId,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      status: "pending",
      totalPrice: item?.price || "0",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: (booking) => {
      toast({
        title: "Booking Confirmed!",
        description: `Your booking has been confirmed. Booking ID: ${booking.id}`,
      });
      setBookingComplete(true);
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
      console.error("Booking error:", error);
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate({
      ...data,
      totalPrice: item?.price || "0",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h1>
            <p className="text-gray-600 mb-8">The item you're trying to book could not be found.</p>
            <Button onClick={() => setLocation("/")}>Go Back Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">Thank you for your booking. We'll send you a confirmation email shortly.</p>
            <Button onClick={() => setLocation("/")}>Return to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-inter mb-8">Complete Your Booking</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Item Details */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  {type === "hotel" && (
                    <p className="text-gray-600">{(item as Hotel).location}</p>
                  )}
                  {type === "flight" && (
                    <p className="text-gray-600">
                      {(item as Flight).from} → {(item as Flight).to}
                    </p>
                  )}
                  {type === "transport" && (
                    <p className="text-gray-600">{(item as Transport).description}</p>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Price:</span>
                    <span className="text-2xl font-bold text-booking-primary">
                      ${item.price}
                      {type === "hotel" && "/night"}
                      {type === "transport" && "/hour"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+263 123 456 789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {type === "hotel" && (
                    <>
                      <FormField
                        control={form.control}
                        name="checkIn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Check-in Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="checkOut"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Check-out Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Guests</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {type === "flight" && (
                    <FormField
                      control={form.control}
                      name="passengers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Passengers</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {type === "transport" && (
                    <>
                      <FormField
                        control={form.control}
                        name="pickupLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pick-up Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Airport, hotel, address..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dropoffLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Drop-off Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Destination address..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-booking-blue hover:bg-blue-600 text-white py-3"
                    disabled={bookingMutation.isPending}
                  >
                    {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
