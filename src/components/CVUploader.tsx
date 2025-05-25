
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, User, Briefcase, GraduationCap, Award, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CVUploaderProps {
  onCVUpload: (cvData: any) => void;
}

export const CVUploader = ({ onCVUpload }: CVUploaderProps) => {
  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveCV = async () => {
    if (!cvData.name || !cvData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    onCVUpload(cvData);
    setIsUploaded(true);
    setIsLoading(false);
    
    toast({
      title: "CV Saved Successfully!",
      description: "Your CV data has been processed and is ready for chat.",
    });
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file parsing
      toast({
        title: "File Upload",
        description: "File parsing is simulated. Please use the form below to enter your CV data.",
      });
    }
  }, [toast]);

  const sampleCV = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    summary: "Experienced Senior Software Developer with 6+ years in full-stack development. Passionate about creating scalable web applications and leading development teams.",
    experience: "Senior Software Developer at TechCorp Inc. (2021-Present)\n• Led a team of 5 developers\n• Built scalable web applications using React and Node.js\n• Improved system performance by 40%\n\nSoftware Developer at StartupXYZ (2019-2021)\n• Developed REST APIs and microservices\n• Implemented CI/CD pipelines\n• Collaborated with cross-functional teams",
    education: "Bachelor of Science in Computer Science\nState University (2014-2018)\n• Magna Cum Laude\n• Relevant Coursework: Data Structures, Algorithms, Database Systems",
    skills: "Technical: JavaScript, TypeScript, React, Node.js, PostgreSQL, Docker, AWS, Git\nSoft Skills: Team Leadership, Project Management, Agile/Scrum, Problem Solving"
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>CV Manager</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* File Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Upload CV File</h3>
            <p className="text-sm text-gray-500 mb-4">Support for PDF, DOC, DOCX files (simulated)</p>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="max-w-xs mx-auto"
            />
          </div>

          <div className="text-center text-gray-500">
            <span className="text-sm">OR</span>
          </div>

          {/* Manual CV Entry Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={cvData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={cvData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={cvData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="summary" className="text-sm font-medium text-gray-700">
                Professional Summary
              </Label>
              <Textarea
                id="summary"
                placeholder="Brief overview of your professional background..."
                value={cvData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                className="mt-1 min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="experience" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Briefcase className="w-4 h-4" />
                <span>Work Experience</span>
              </Label>
              <Textarea
                id="experience"
                placeholder="List your work experience, roles, and achievements..."
                value={cvData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                className="mt-1 min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="education" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </Label>
              <Textarea
                id="education"
                placeholder="Educational background, degrees, certifications..."
                value={cvData.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                className="mt-1 min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="skills" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Award className="w-4 h-4" />
                <span>Skills</span>
              </Label>
              <Textarea
                id="skills"
                placeholder="Technical skills, programming languages, tools, soft skills..."
                value={cvData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>

          {isUploaded && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700">
                CV data saved successfully! You can now use the CV Chat feature.
              </span>
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              onClick={handleSaveCV}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <span>Save CV Data</span>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setCvData(sampleCV);
                toast({
                  title: "Sample CV Loaded",
                  description: "Sample CV data has been loaded into the form.",
                });
              }}
              className="hover:bg-blue-50"
            >
              Load Sample
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
