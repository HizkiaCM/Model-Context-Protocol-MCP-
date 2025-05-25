
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const EmailSender = () => {
  const [emailData, setEmailData] = useState({
    recipient: "",
    subject: "",
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastSent, setLastSent] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setEmailData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const simulateEmailSend = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Simulate success/failure
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      toast({
        title: "Email Sent Successfully!",
        description: `Email sent to ${emailData.recipient}`,
      });
      setLastSent(emailData.recipient);
      setEmailData({ recipient: "", subject: "", body: "" });
    } else {
      toast({
        title: "Failed to Send Email",
        description: "Please check your email configuration and try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleSendEmail = async () => {
    if (!emailData.recipient || !emailData.subject || !emailData.body) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending.",
        variant: "destructive",
      });
      return;
    }

    if (!emailData.recipient.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    await simulateEmailSend();
  };

  const emailTemplates = [
    {
      name: "Professional Introduction",
      subject: "Introduction and Collaboration Opportunity",
      body: "Dear [Name],\n\nI hope this email finds you well. I wanted to reach out to introduce myself and explore potential collaboration opportunities.\n\nI'm a software developer with expertise in full-stack development, and I believe we could create great value together.\n\nI'd love to schedule a brief call to discuss this further.\n\nBest regards,\n[Your Name]"
    },
    {
      name: "Follow-up",
      subject: "Following up on our conversation",
      body: "Hi [Name],\n\nI wanted to follow up on our recent conversation about [topic]. I've given some thought to what we discussed and have a few ideas I'd like to share.\n\nWould you be available for a quick call this week?\n\nLooking forward to hearing from you.\n\nBest,\n[Your Name]"
    },
    {
      name: "Thank You",
      subject: "Thank you for your time",
      body: "Dear [Name],\n\nThank you for taking the time to meet with me today. I really enjoyed our conversation about [topic] and learning more about your work.\n\nI'm excited about the possibility of working together and will follow up with the information we discussed.\n\nBest regards,\n[Your Name]"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-6 h-6 text-blue-600" />
            <span>Email Service</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient" className="text-sm font-medium text-gray-700">
                Recipient Email
              </Label>
              <Input
                id="recipient"
                type="email"
                placeholder="recipient@example.com"
                value={emailData.recipient}
                onChange={(e) => handleInputChange("recipient", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="Enter email subject"
                value={emailData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="body" className="text-sm font-medium text-gray-700">
                Message Body
              </Label>
              <Textarea
                id="body"
                placeholder="Enter your message here..."
                value={emailData.body}
                onChange={(e) => handleInputChange("body", e.target.value)}
                className="mt-1 min-h-[150px]"
              />
            </div>
          </div>
          
          {lastSent && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700">
                Last email sent to: {lastSent}
              </span>
            </div>
          )}
          
          <Button
            onClick={handleSendEmail}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Send Email</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Email Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emailTemplates.map((template, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmailData({
                      ...emailData,
                      subject: template.subject,
                      body: template.body,
                    });
                    toast({
                      title: "Template Applied",
                      description: "Email template has been loaded into the form.",
                    });
                  }}
                  className="text-xs"
                >
                  Use Template
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-2">Subject: {template.subject}</p>
              <p className="text-xs text-gray-500 line-clamp-2">{template.body.substring(0, 100)}...</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
