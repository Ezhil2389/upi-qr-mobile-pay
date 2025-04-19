import { useState } from "react";
import QRDisplay from "@/components/QRDisplay";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 pt-8">
      <header className="w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold text-center text-primary">UPI QR Mobile Pay</h1>
        <p className="text-center text-muted-foreground">Scan QR code to pay</p>
      </header>

      <div className="w-full max-w-md space-y-6">
        <QRDisplay 
          upiId="ravichandran.sa@okicici" 
          amount={500} 
        />
      </div>
    </div>
  );
};

export default Index;
