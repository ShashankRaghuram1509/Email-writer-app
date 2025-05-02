
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";

interface ReplyPreviewProps {
  reply: string;
  onCopy: () => void;
  isCopied: boolean;
  onFeedback: (type: 'positive' | 'negative') => void;
}

const ReplyPreview = ({ reply, onCopy, isCopied, onFeedback }: ReplyPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-medium">Generated Reply</h3>
      
      <Card className="p-4 bg-white border shadow-sm">
        <pre className="whitespace-pre-wrap font-sans text-gray-800">
          {reply}
        </pre>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onCopy} 
          variant={isCopied ? "default" : "outline"}
          className={isCopied ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {isCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </Button>
        
        <div className="ml-auto flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-green-50 hover:text-green-600 rounded-full"
            onClick={() => onFeedback('positive')}
            title="This reply was helpful"
          >
            <ThumbsUp size={18} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-red-50 hover:text-red-600 rounded-full"
            onClick={() => onFeedback('negative')}
            title="This reply needs improvement"
          >
            <ThumbsDown size={18} />
          </Button>
        </div>
      </div>
      
      <div className="py-2 px-4 bg-blue-50 border border-blue-100 rounded-md">
        <p className="text-sm text-blue-700">
          <strong>Tip:</strong> You can refine your results by providing more context in the original email.
        </p>
      </div>
    </motion.div>
  );
};

export default ReplyPreview;
