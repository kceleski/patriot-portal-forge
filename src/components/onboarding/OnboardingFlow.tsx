
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, Building2, Stethoscope, Heart } from 'lucide-react';

interface OnboardingFlowProps {
  userType: 'family' | 'healthcare' | 'agent' | 'facility';
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ userType, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = {
    family: [
      {
        title: "Welcome to HealthProAssist",
        description: "Let's help you find the perfect care solution for your loved one",
        icon: Heart,
        content: "We'll guide you through setting up your profile and finding care options that match your specific needs."
      },
      {
        title: "Tell Us About Your Needs",
        description: "Help us understand what type of care you're looking for",
        icon: Users,
        content: "This information helps us provide personalized recommendations and connect you with the right facilities."
      },
      {
        title: "Explore Your Options",
        description: "Discover our comprehensive facility directory and tools",
        icon: Building2,
        content: "Use our advanced search, facility comparison tools, and virtual tours to make informed decisions."
      }
    ],
    healthcare: [
      {
        title: "Welcome Healthcare Professional",
        description: "Streamline your referral process with our platform",
        icon: Stethoscope,
        content: "Connect with families and coordinate care more effectively with our comprehensive tools."
      },
      {
        title: "Referral Management",
        description: "Learn how to manage and track your patient referrals",
        icon: Users,
        content: "Use our intake forms, client tracking, and communication tools to provide better care coordination."
      },
      {
        title: "Professional Network",
        description: "Connect with care facilities and other professionals",
        icon: Building2,
        content: "Build relationships with verified facilities and expand your professional network."
      }
    ],
    agent: [
      {
        title: "Welcome to Your Agent Portal",
        description: "Grow your business with our comprehensive CRM tools",
        icon: Users,
        content: "Manage clients, track performance, and increase your placement success rate."
      },
      {
        title: "Client Management",
        description: "Learn how to use our CRM and client tracking features",
        icon: Heart,
        content: "Track leads, manage relationships, and monitor your commission pipeline effectively."
      },
      {
        title: "Facility Network",
        description: "Access our extensive network of partner facilities",
        icon: Building2,
        content: "Use our facility maps, contact management, and partnership tools to serve your clients better."
      }
    ],
    facility: [
      {
        title: "Welcome to Your Facility Portal",
        description: "Showcase your services and connect with potential residents",
        icon: Building2,
        content: "Manage your listings, track inquiries, and grow your occupancy rates."
      },
      {
        title: "Listing Management",
        description: "Create compelling facility profiles and virtual tours",
        icon: Heart,
        content: "Upload photos, manage amenities, and create virtual tours to attract the right residents."
      },
      {
        title: "Lead Management",
        description: "Track inquiries and manage the admission process",
        icon: Users,
        content: "Use our inquiry tracking and communication tools to convert leads effectively."
      }
    ]
  };

  const steps = onboardingSteps[userType];
  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-brand-off-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-text-secondary mt-2 text-center">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <Card className="bg-background-card border-ui-border">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-4 bg-brand-navy rounded-full w-16 h-16 flex items-center justify-center">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-h3 font-heading text-text-primary">
              {currentStepData.title}
            </CardTitle>
            <CardDescription className="text-text-secondary text-lg">
              {currentStepData.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-text-secondary text-center leading-relaxed mb-8">
              {currentStepData.content}
            </p>
            
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex-1 sm:flex-none"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="bg-brand-red hover:bg-brand-red/90 text-white flex-1 sm:flex-none"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
