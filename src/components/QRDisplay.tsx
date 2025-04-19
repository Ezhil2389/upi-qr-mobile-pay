
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QRDisplayProps {
  upiId: string;
  amount?: number;
  description?: string;
}

const QRDisplay = ({ upiId, amount = 0, description = "" }: QRDisplayProps) => {
  const [qrImage, setQrImage] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Generate QR code
    const upiLink = generateUpiLink(upiId, amount, description);
    const encodedUpiLink = encodeURIComponent(upiLink);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedUpiLink}`;
    setQrImage(qrCodeUrl);
  }, [upiId, amount, description]);

  const generateUpiLink = (id: string, amt: number, desc: string): string => {
    let upiUrl = `upi://pay?pa=${id}`;
    if (amt > 0) upiUrl += `&am=${amt}`;
    if (desc) upiUrl += `&pn=${encodeURIComponent(desc)}`;
    return upiUrl;
  };

  const handleOpenPaymentApp = (app: string) => {
    const upiLink = generateUpiLink(upiId, amount, description);
    
    let appLink: string;
    
    switch (app) {
      case "gpay":
        appLink = `gpay://upi/pay?pa=${upiId}`;
        if (amount > 0) appLink += `&am=${amount}`;
        if (description) appLink += `&pn=${encodeURIComponent(description)}`;
        break;
      case "paytm":
        appLink = `paytmmp://pay?pa=${upiId}`;
        if (amount > 0) appLink += `&am=${amount}`;
        if (description) appLink += `&pn=${encodeURIComponent(description)}`;
        break;
      case "phonepe":
        appLink = `phonepe://pay?pa=${upiId}`;
        if (amount > 0) appLink += `&am=${amount}`;
        if (description) appLink += `&pn=${encodeURIComponent(description)}`;
        break;
      default:
        appLink = upiLink;
    }
    
    try {
      window.location.href = appLink;
      
      // Set a timeout to check if the app opened
      setTimeout(() => {
        // If we're still on the same page, assume app didn't open
        toast({
          description: "If the app didn't open, you may need to install it or scan the QR code directly.",
          variant: "default",
        });
      }, 1000);
    } catch (error) {
      console.error("Error opening payment app:", error);
      toast({
        title: "Error",
        description: "Could not open payment app. Try scanning the QR directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          {qrImage ? (
            <div 
              className="border-4 border-primary p-2 rounded-xl cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleOpenPaymentApp("")}
            >
              <img 
                src={qrImage} 
                alt="UPI QR Code" 
                className="w-64 h-64 mx-auto"
              />
            </div>
          ) : (
            <div className="w-64 h-64 bg-muted flex items-center justify-center rounded-xl">
              <QrCode size={100} className="text-muted-foreground" />
            </div>
          )}
          
          <div className="text-center mt-2">
            <p className="text-lg font-medium">Scan to pay via UPI</p>
            <p className="text-sm text-muted-foreground mb-4">UPI ID: {upiId}</p>
            {amount > 0 && (
              <p className="text-xl font-bold mb-4">₹{amount.toFixed(2)}</p>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-3 w-full mt-2">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-3 h-auto"
              onClick={() => handleOpenPaymentApp("gpay")}
            >
              <span className="text-xs font-medium">Google Pay</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-3 h-auto"
              onClick={() => handleOpenPaymentApp("paytm")}
            >
              <span className="text-xs font-medium">Paytm</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center p-3 h-auto"
              onClick={() => handleOpenPaymentApp("phonepe")}
            >
              <span className="text-xs font-medium">PhonePe</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRDisplay;
