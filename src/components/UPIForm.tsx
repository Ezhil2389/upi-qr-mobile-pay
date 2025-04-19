
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface UPIFormProps {
  onSubmit: (upiId: string, amount: number, description: string) => void;
}

const UPIForm = ({ onSubmit }: UPIFormProps) => {
  const [upiId, setUpiId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId.trim()) return;
    
    setIsSubmitting(true);
    onSubmit(
      upiId, 
      amount ? parseFloat(amount) : 0, 
      description
    );
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-center">Enter UPI Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID (required)</Label>
            <Input
              id="upiId"
              placeholder="e.g., 9876543210@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (optional)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g., 500.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              placeholder="e.g., Payment for services"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting || !upiId.trim()}>
            Generate QR Code
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UPIForm;
