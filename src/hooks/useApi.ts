
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  logErrors?: boolean;
}

export const useApi = <T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Operation completed successfully!',
    logErrors = true
  } = options;

  const execute = async (...args: any[]): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(...args);
      
      if (showSuccessToast) {
        toast({
          title: "Success",
          description: successMessage,
        });
      }

      if (logErrors) {
        console.log('API call successful:', { 
          function: apiFunction.name, 
          args, 
          result: typeof result === 'object' ? 'Object' : result 
        });
      }

      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      
      if (logErrors) {
        console.error('API call failed:', {
          function: apiFunction.name,
          args,
          error: err,
          message: errorMessage
        });
      }
      
      if (showErrorToast) {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setLoading(false);
  };

  return { execute, loading, error, reset };
};

// Additional hook for data verification
export const useDataVerification = () => {
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const verify = async () => {
    setVerifying(true);
    try {
      const { DataVerificationService } = await import('@/services/dataVerificationService');
      const result = await DataVerificationService.generateProductionReadinessReport();
      setVerificationResult(result);
      return result;
    } catch (error) {
      console.error('Data verification failed:', error);
      return null;
    } finally {
      setVerifying(false);
    }
  };

  return { verify, verifying, verificationResult };
};
