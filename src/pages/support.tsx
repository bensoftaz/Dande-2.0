import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle, HeadphonesIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";

export default function Support() {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiRequest("POST", "/api/support/contact", contactForm);
      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-inter mb-4">Support & Contact</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help you with all your Zimbabwe travel needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeadphonesIcon className="h-5 w-5 text-booking-primary" />
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Multiple ways to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-booking-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-booking-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone Support</h3>
                    <p className="text-gray-600">+263 4 123 456</p>
                    <p className="text-sm text-gray-500">24/7 Emergency Line</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-booking-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-booking-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-gray-600">support@dande.co.zw</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-booking-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-booking-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Office Location</h3>
                    <p className="text-gray-600">123 Samora Machel Avenue</p>
                    <p className="text-gray-600">Harare, Zimbabwe</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-booking-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-booking-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sat - Sun: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-booking-primary" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">How do I cancel my booking?</h4>
                  <p className="text-sm text-gray-600">
                    You can cancel your booking up to 24 hours before your travel date. 
                    Contact our support team for assistance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
                  <p className="text-sm text-gray-600">
                    We accept all major credit cards, mobile money, and bank transfers.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Do you offer travel insurance?</h4>
                  <p className="text-sm text-gray-600">
                    Yes, we partner with leading insurance providers to offer comprehensive 
                    travel insurance for all our bookings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What can we help you with?"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your question or concern..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-booking-primary hover:bg-booking-secondary text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}