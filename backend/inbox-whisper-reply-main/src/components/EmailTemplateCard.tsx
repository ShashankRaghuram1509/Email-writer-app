
import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface EmailTemplateProps {
  template: {
    id: string;
    name: string;
    content: string;
  };
  isActive: boolean;
  onClick: () => void;
}

const EmailTemplateCard = ({ template, isActive, onClick }: EmailTemplateProps) => {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "cursor-pointer p-4 transition-all duration-200 hover:shadow-md border",
        isActive 
          ? "border-blue-500 bg-blue-50 shadow-sm" 
          : "hover:border-blue-200"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{template.name}</h3>
        {isActive && <Star size={16} className="text-yellow-500 fill-yellow-500" />}
      </div>
      <p className="text-sm text-gray-500 mt-1 truncate">
        {template.content.substring(0, 45)}...
      </p>
    </Card>
  );
};

export default EmailTemplateCard;
