import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  Star, 
  RefreshCw, 
  Loader2,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import EmailTemplateCard from "@/components/EmailTemplateCard";
import ReplyPreview from "@/components/ReplyPreview";
import axios from 'axios';

const Index = () => {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState('compose');
  
  const { toast } = useToast();
  
  // Mock templates
  const templates = [
    { id: '1', name: 'Thank You', content: 'Thank you for your email. I appreciate you taking the time to reach out.' },
    { id: '2', name: 'Follow Up', content: 'I wanted to follow up on our previous conversation about...' },
    { id: '3', name: 'Meeting Request', content: 'I would like to schedule a meeting to discuss...' },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });
      console.log('API Response:', response.data);  // Log the response data
      setGeneratedReply(response.data);  // Assuming the response is directly the generated email
      setError('');
    } catch (err) {
      console.error('Error:', err);  // Log any errors that occur
      setError('Something went wrong while generating the reply.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Reply copied to clipboard",
    });
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleTemplateSelect = (template) => {
    setActiveTemplate(template.id);
    setEmailContent(template.content);
  };
  
  const handleFeedback = (type) => {
    toast({
      title: type === 'positive' ? "Thanks for the feedback!" : "We'll improve",
      description: type === 'positive' 
        ? "We're glad you liked the generated reply."
        : "We'll use your feedback to improve future replies.",
      variant: "default" // Use default for both to fix the type error
    });
  };
  
  const handleReset = () => {
    setEmailContent('');
    setTone('');
    setGeneratedReply('');
    setActiveTemplate(null);
    setCurrentTab('compose');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-purple-200 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <Card className="backdrop-blur-md bg-white/80 shadow-xl rounded-xl border-0">
          <CardHeader className="border-b pb-3">
            <CardTitle className="flex items-center justify-center text-2xl md:text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              <Mail className="mr-2" size={28} />
              AI Email Responder
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="compose" className="text-sm md:text-base">
                  Compose
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-sm md:text-base" disabled={!generatedReply}>
                  Preview
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="compose" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {templates.map((template) => (
                      <EmailTemplateCard
                        key={template.id}
                        template={template}
                        isActive={activeTemplate === template.id}
                        onClick={() => handleTemplateSelect(template)}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email-content" className="text-lg font-medium">
                    Original Email Content
                  </label>
                  <Textarea
                    id="email-content"
                    placeholder="Paste the email you received here..."
                    rows={6}
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    className="resize-none transition-all duration-200 focus:shadow-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="tone" className="text-lg font-medium">
                    Response Tone
                  </label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select a tone (Optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!emailContent || loading} 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Generate Reply
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="flex-none"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="preview">
                <AnimatePresence>
                  {generatedReply && (
                    <ReplyPreview 
                      reply={generatedReply} 
                      onCopy={handleCopy} 
                      isCopied={copied} 
                      onFeedback={handleFeedback}
                    />
                  )}
                </AnimatePresence>
                <div className="flex justify-center mt-6">
                  <Button variant="outline" onClick={() => setCurrentTab('compose')}>
                    Back to Editor
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

