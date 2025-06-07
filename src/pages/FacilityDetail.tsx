// src/pages/FacilityDetail.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ApiService } from '@/services/apiService';
import { ArrowLeft } from 'lucide-react';

// You should define the Facility interface in a shared types file
interface Facility {
    id: string;
    name: string;
    description: string;
    // ... add all other facility fields
}

const FacilityDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [facility, setFacility] = useState<Facility | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchFacility = async () => {
            setLoading(true);
            try {
                // Fetch details for a SINGLE facility from your backend
                const data = await ApiService.getFacilityDetails(id);
                setFacility(data.facility); // Assuming the API returns { facility: { ... } }
            } catch (error) {
                console.error("Failed to fetch facility details", error);
                // Optionally navigate to a not-found page
            } finally {
                setLoading(false);
            }
        };
        fetchFacility();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!facility) {
        return (
            <div className="text-center p-10">
                <h1 className="text-2xl">Facility Not Found</h1>
                <Button onClick={() => navigate('/find-care')}>Back to Search</Button>
            </div>
        );
    }
    
    // Use the code you provided for the FacilityDetail page here,
    // but instead of using mock data, use the `facility` object from the state.
    // For example:
    return (
        <div>
             <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Button variant="ghost" onClick={() => navigate('/find-care')} className="flex items-center space-x-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Listings</span>
                        </Button>
                    </div>
                </div>
            </header>
            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-4xl font-bold">{facility.name}</h1>
                <p className="mt-4 text-lg text-gray-700">{facility.description}</p>
                {/* ... Render all other details from the `facility` state object ... */}
            </div>
        </div>
    );
};

export default FacilityDetail;
