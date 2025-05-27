
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
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
    successMessage = 'Operation completed successfully!'
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

      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      
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

  return { execute, loading, error };
};
