
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  backPath?: string;
  backLabel?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description = "This feature is currently under development. Please check back later.",
  backPath,
  backLabel = "Go Back"
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-brand-navy p-3 rounded-lg">
              <Construction className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-brand-navy">{title}</CardTitle>
          <CardDescription className="text-lg">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={handleGoBack} className="btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {backLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
