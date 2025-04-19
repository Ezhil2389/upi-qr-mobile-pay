import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRDisplayProps {
  upiId: string;
  amount: number;
}

// SVG Logos for payment apps
const PaymentAppLogos = {
  gpay: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.32-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
      <path fill="#FBBC05" d="M11.68 28.18c-1.11-3.3-1.11-6.88 0-10.18V12.3H4.34A20.11 20.11 0 0 0 2 24c0 3.24.77 6.3 2.34 9.07l7.34-5.89z"/>
      <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.28l6.31-6.31C34.91 3.29 29.93 1 24 1 15.4 1 7.96 5.93 4.34 12.3l7.34 5.7C13.42 13.62 18.27 9.75 24 9.75z"/>
    </svg>
  ),
  paytm: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
      <path fill="#0F4C81" d="M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0z"/>
      <path fill="#FFFFFF" d="M19.2 12.8h9.6v22.4h-9.6z"/>
      <path fill="#FFFFFF" d="M28.8 22.4h-9.6v9.6h9.6z"/>
    </svg>
  ),
  phonepe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
      <path fill="#5F259F" d="M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0z"/>
      <path fill="#FFFFFF" d="M24 12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S30.627 12 24 12z"/>
    </svg>
  )
};

const QRDisplay = ({ upiId, amount }: QRDisplayProps) => {
  const { toast } = useToast();

  // Generate a UPI QR code using an online service
  const upiUrl = `upi://pay?pa=${upiId}&am=${amount}`;
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiUrl)}&size=256x256`;

  const handleOpenPaymentApp = (app: string) => {
    let appLink: string;
    
    switch (app) {
      case "gpay":
        appLink = `gpay://upi/pay?pa=${upiId}&am=${amount}`;
        break;
      case "paytm":
        appLink = `paytmmp://pay?pa=${upiId}&am=${amount}`;
        break;
      case "phonepe":
        appLink = `phonepe://pay?pa=${upiId}&am=${amount}`;
        break;
      default:
        // When clicking QR code, specifically open Google Pay
        appLink = `gpay://upi/pay?pa=${upiId}&am=${amount}`;
    }
    
    try {
      window.location.href = appLink;
      
      setTimeout(() => {
        toast({
          description: "If the app didn't open, you may need to install it or scan the QR code directly.",
          variant: "default",
        });
      }, 1000);
    } catch (error) {
      console.error("Error opening payment app:", error);
      toast({
        title: "Error",
        description: "Could not open payment app. Try scanning the QR code directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all hover:shadow-3xl">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 text-center">
          <div className="flex justify-center items-center mb-3">
            <CreditCard className="mr-3" size={28} />
            <h2 className="text-2xl font-semibold tracking-tight">UPI Payment</h2>
          </div>
          <p className="text-indigo-100 opacity-90 text-sm">Secure & Instant Digital Payment</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center">
            <div 
              className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
              onClick={() => handleOpenPaymentApp("")}
            >
              <img 
                src={qrImage} 
                alt="UPI QR Code" 
                className="w-56 h-56 object-contain group-hover:opacity-90 transition-opacity"
              />
            </div>
            
            <div className="text-center mt-5 space-y-2">
              <p className="text-xs uppercase tracking-wider text-gray-500">UPI ID</p>
              <p className="text-lg font-medium text-gray-800 tracking-tight">{upiId}</p>
              <p className="text-3xl font-bold text-green-600 tracking-tighter">₹{amount.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "Google Pay", app: "gpay", color: "bg-green-500", logo: PaymentAppLogos.gpay },
              { name: "Paytm", app: "paytm", color: "bg-blue-500", logo: PaymentAppLogos.paytm },
              { name: "PhonePe", app: "phonepe", color: "bg-purple-500", logo: PaymentAppLogos.phonepe }
            ].map(({ name, app, color, logo: Logo }) => (
              <Button 
                key={app}
                variant="outline"
                className={`flex flex-col items-center justify-center p-3 h-auto ${color} text-white hover:opacity-90 transition-opacity space-y-2 group`}
                onClick={() => handleOpenPaymentApp(app)}
              >
                <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all">
                  <Logo />
                </div>
                <span className="text-xs font-medium tracking-tight">{name}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 text-center text-xs text-gray-500 border-t border-gray-200">
          <p>Powered by UPI | Secure Payment Gateway</p>
          <p className="text-[10px] text-gray-400 mt-1">All trademarks belong to their respective owners</p>
        </div>
      </div>
    </div>
  );
};

export default QRDisplay;
