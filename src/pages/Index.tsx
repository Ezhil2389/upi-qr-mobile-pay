
import { useState } from "react";
import QRDisplay from "@/components/QRDisplay";
import UPIForm from "@/components/UPIForm";

const Index = () => {
  const [upiDetails, setUpiDetails] = useState<{
    upiId: string;
    amount: number;
    description: string;
  } | null>(null);

  const handleUpiSubmit = (upiId: string, amount: number, description: string) => {
    setUpiDetails({ upiId, amount, description });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 pt-8">
      <header className="w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold text-center text-primary">UPI QR Mobile Pay</h1>
        <p className="text-center text-muted-foreground">Generate a UPI QR code for quick payments</p>
      </header>

      <div className="w-full max-w-md space-y-6">
        {!upiDetails ? (
          <UPIForm onSubmit={handleUpiSubmit} />
        ) : (
          <div className="space-y-4">
            <QRDisplay 
              upiId={upiDetails.upiId} 
              amount={upiDetails.amount} 
              description={upiDetails.description} 
            />
            
            <div className="flex justify-center">
              <Button 
                variant="outline"
                onClick={() => setUpiDetails(null)}
                className="mt-4"
              >
                Create Another QR Code
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
