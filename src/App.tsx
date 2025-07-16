import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Hotels from "@/pages/hotels";
import Flights from "@/pages/flights";
import Transport from "@/pages/transport";
import Booking from "@/pages/booking";
import Auth from "@/pages/auth";
import Support from "@/pages/support";
import Search from "@/pages/search";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hotels" component={Hotels} />
      <Route path="/flights" component={Flights} />
      <Route path="/transport" component={Transport} />
      <Route path="/booking/:type/:id" component={Booking} />
      <Route path="/auth" component={Auth} />
      <Route path="/support" component={Support} />
      <Route path="/search" component={Search} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
