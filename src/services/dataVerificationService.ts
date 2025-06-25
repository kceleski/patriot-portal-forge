
import { supabase } from '@/integrations/supabase/client';

export class DataVerificationService {
  static async verifyAllTables() {
    const results = {
      tables: {},
      errors: [],
      summary: {
        totalTables: 0,
        accessibleTables: 0,
        tablesWithData: 0
      }
    };

    // Use exact table names from Supabase types - no dynamic string concatenation
    const tablesToCheck = [
      'Storepoint',
      'facility', 
      'clients',
      'appointments',
      'Combined Data',
      'Home_Health_Providers',
      'VA_Providers',
      'nationwide_facilities',
      'medical_supply_companies',
      'subscribed',
      'images of providers',
      'analytics',
      'contacts',
      'interactions',
      'intake_forms',
      'agent_users',
      'agent_profiles',
      'placements',
      'payments',
      'invoices'
    ];

    for (const tableName of tablesToCheck) {
      try {
        results.summary.totalTables++;
        
        // Check table access and count - use literal table names only
        let count = 0;
        let error = null;
        
        if (tableName === 'Storepoint') {
          const result = await supabase.from('Storepoint').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'facility') {
          const result = await supabase.from('facility').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'clients') {
          const result = await supabase.from('clients').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'appointments') {
          const result = await supabase.from('appointments').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'Combined Data') {
          const result = await supabase.from('Combined Data').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'Home_Health_Providers') {
          const result = await supabase.from('Home_Health_Providers').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'VA_Providers') {
          const result = await supabase.from('VA_Providers').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'nationwide_facilities') {
          const result = await supabase.from('nationwide_facilities').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'medical_supply_companies') {
          const result = await supabase.from('medical_supply_companies').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'images of providers') {
          const result = await supabase.from('images of providers').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'analytics') {
          const result = await supabase.from('analytics').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'contacts') {
          const result = await supabase.from('contacts').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'interactions') {
          const result = await supabase.from('interactions').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'intake_forms') {
          const result = await supabase.from('intake_forms').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'agent_users') {
          const result = await supabase.from('agent_users').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'agent_profiles') {
          const result = await supabase.from('agent_profiles').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'placements') {
          const result = await supabase.from('placements').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'payments') {
          const result = await supabase.from('payments').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else if (tableName === 'invoices') {
          const result = await supabase.from('invoices').select('*', { count: 'exact', head: true });
          count = result.count;
          error = result.error;
        } else {
          // Handle unknown tables
          error = { message: 'Table not recognized' };
        }

        if (error) {
          results.errors.push(`${tableName}: ${error.message}`);
          results.tables[tableName] = {
            accessible: false,
            count: 0,
            error: error.message
          };
          continue;
        }

        results.summary.accessibleTables++;
        
        if (count && count > 0) {
          results.summary.tablesWithData++;
        }

        // Get sample data for accessible tables
        let sampleData = null;
        let sampleError = null;

        if (tableName === 'Storepoint') {
          const result = await supabase.from('Storepoint').select('*').limit(1);
          sampleData = result.data;
          sampleError = result.error;
        } else if (tableName === 'facility') {
          const result = await supabase.from('facility').select('*').limit(1);
          sampleData = result.data;
          sampleError = result.error;
        }
        // Add other table sample queries as needed

        results.tables[tableName] = {
          accessible: true,
          count: count || 0,
          hasData: (count || 0) > 0,
          sampleColumns: sampleData && sampleData.length > 0 ? Object.keys(sampleData[0]) : [],
          error: sampleError?.message || null
        };

      } catch (error: any) {
        results.errors.push(`${tableName}: ${error.message}`);
        results.tables[tableName] = {
          accessible: false,
          count: 0,
          error: error.message
        };
      }
    }

    return results;
  }

  static async verifyEdgeFunctions() {
    const functions = [
      'user-service',
      'facility-service', 
      'payment-service',
      'ava-assistant',
      'voice-synthesis',
      'submit-intake-form',
      'elevenlabs-config'
    ];

    const results = {
      functions: {},
      errors: [],
      summary: {
        totalFunctions: functions.length,
        workingFunctions: 0
      }
    };

    for (const functionName of functions) {
      try {
        const { data, error } = await supabase.functions.invoke(functionName, {
          body: { action: 'health_check' }
        });

        if (error) {
          results.errors.push(`${functionName}: ${error.message}`);
          results.functions[functionName] = {
            working: false,
            error: error.message
          };
        } else {
          results.summary.workingFunctions++;
          results.functions[functionName] = {
            working: true,
            response: data
          };
        }
      } catch (error: any) {
        results.errors.push(`${functionName}: ${error.message}`);
        results.functions[functionName] = {
          working: false,
          error: error.message
        };
      }
    }

    return results;
  }

  static async generateProductionReadinessReport() {
    console.log('🔍 Starting production readiness verification...');
    
    const [tableResults, functionResults] = await Promise.all([
      this.verifyAllTables(),
      this.verifyEdgeFunctions()
    ]);

    const report = {
      timestamp: new Date().toISOString(),
      database: tableResults,
      edgeFunctions: functionResults,
      readinessScore: 0,
      criticalIssues: [],
      recommendations: []
    };

    // Calculate readiness score
    const dbScore = (tableResults.summary.accessibleTables / tableResults.summary.totalTables) * 50;
    const functionScore = (functionResults.summary.workingFunctions / functionResults.summary.totalFunctions) * 50;
    report.readinessScore = Math.round(dbScore + functionScore);

    // Identify critical issues
    if (tableResults.summary.accessibleTables < tableResults.summary.totalTables * 0.8) {
      report.criticalIssues.push('Multiple database tables are inaccessible');
    }

    if (functionResults.summary.workingFunctions < functionResults.summary.totalFunctions * 0.7) {
      report.criticalIssues.push('Multiple edge functions are not working');
    }

    if (!report.database.tables['Storepoint']?.hasData) {
      report.criticalIssues.push('Storepoint table has no data despite 7000 rows expected');
    }

    // Generate recommendations
    if (report.readinessScore < 80) {
      report.recommendations.push('Address database connectivity issues before production');
    }

    if (report.database.errors.length > 0) {
      report.recommendations.push('Fix database access errors');
    }

    if (report.edgeFunctions.errors.length > 0) {
      report.recommendations.push('Fix edge function errors');
    }

    console.log('📊 Production Readiness Report:', report);
    return report;
  }
}
