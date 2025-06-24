
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Database, Zap, RefreshCw } from 'lucide-react';
import { useDataVerification } from '@/hooks/useApi';

const ProductionReadinessCheck = () => {
  const { verify, verifying, verificationResult } = useDataVerification();
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    // Run initial verification
    verify();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        verify();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh, verify]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Production Readiness Check</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            Auto Refresh {autoRefresh ? 'On' : 'Off'}
          </Button>
          <Button
            onClick={verify}
            disabled={verifying}
            size="sm"
          >
            {verifying ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-2" />
            )}
            Run Check
          </Button>
        </div>
      </div>

      {verificationResult && (
        <>
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall Readiness Score</span>
                <Badge variant={getScoreBadgeVariant(verificationResult.readinessScore)} className="text-lg px-4 py-2">
                  {verificationResult.readinessScore}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationResult.criticalIssues.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Critical Issues
                    </h4>
                    <ul className="text-red-700 space-y-1">
                      {verificationResult.criticalIssues.map((issue, idx) => (
                        <li key={idx}>• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {verificationResult.recommendations.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Recommendations
                    </h4>
                    <ul className="text-yellow-700 space-y-1">
                      {verificationResult.recommendations.map((rec, idx) => (
                        <li key={idx}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Database Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Database Tables
                <Badge variant="outline" className="ml-2">
                  {verificationResult.database.summary.accessibleTables}/{verificationResult.database.summary.totalTables} Accessible
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(verificationResult.database.tables).map(([tableName, status]: [string, any]) => (
                  <div key={tableName} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{tableName}</h4>
                      {status.accessible ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    
                    {status.accessible && (
                      <div className="text-xs text-gray-600">
                        <div>Rows: {status.count.toLocaleString()}</div>
                        {status.sampleColumns.length > 0 && (
                          <div>Columns: {status.sampleColumns.length}</div>
                        )}
                      </div>
                    )}
                    
                    {status.error && (
                      <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                        {status.error}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Edge Functions Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Edge Functions
                <Badge variant="outline" className="ml-2">
                  {verificationResult.edgeFunctions.summary.workingFunctions}/{verificationResult.edgeFunctions.summary.totalFunctions} Working
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(verificationResult.edgeFunctions.functions).map(([functionName, status]: [string, any]) => (
                  <div key={functionName} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{functionName}</h4>
                      {status.working ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    
                    {status.error && (
                      <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                        {status.error}
                      </div>
                    )}
                    
                    {status.response && (
                      <div className="text-xs text-gray-600">
                        Response received
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Errors */}
          {(verificationResult.database.errors.length > 0 || verificationResult.edgeFunctions.errors.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Detailed Error Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...verificationResult.database.errors, ...verificationResult.edgeFunctions.errors].map((error, idx) => (
                    <div key={idx} className="text-xs bg-red-50 border border-red-200 rounded p-2 font-mono">
                      {error}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {verifying && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin mr-4" />
            <span>Running production readiness check...</span>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductionReadinessCheck;
