
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, User, Building, Briefcase } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-navy to-primary-sky text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Connecting Families with Quality Care Solutions
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            CareConnect simplifies the process of finding and managing care services for your loved ones.
            Whether you're a family, healthcare professional, placement agent, or facility, we have the tools you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/find-care">
              <Button size="lg" className="bg-primary-red hover:bg-red-600 text-white px-8 py-4">
                Find Care Now
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-navy px-8 py-4">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* User Portals Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-dark-gray mb-4">
              Choose Your Portal
            </h2>
            <p className="text-xl text-gray-600">
              Access specialized tools designed for your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-transparent hover:border-primary-sky transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary-red mx-auto mb-4" />
                <CardTitle className="text-text-dark-gray">Families & Clients</CardTitle>
                <CardDescription>Find and manage care services for your loved ones</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/family">
                  <Button className="w-full bg-primary-red hover:bg-red-600">
                    Access Family Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-primary-sky transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <User className="h-12 w-12 text-primary-sky mx-auto mb-4" />
                <CardTitle className="text-text-dark-gray">Healthcare Professionals</CardTitle>
                <CardDescription>Manage clients, referrals, and track placements</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/healthcare">
                  <Button className="w-full bg-primary-sky hover:bg-blue-600">
                    Access Healthcare Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-primary-sky transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Briefcase className="h-12 w-12 text-accent-gold mx-auto mb-4" />
                <CardTitle className="text-text-dark-gray">Placement Agents</CardTitle>
                <CardDescription>CRM tools, performance tracking, and client management</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/agent">
                  <Button className="w-full bg-accent-gold hover:bg-yellow-500 text-text-dark-gray">
                    Access Agent Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-primary-sky transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Building className="h-12 w-12 text-primary-navy mx-auto mb-4" />
                <CardTitle className="text-text-dark-gray">Facilities</CardTitle>
                <CardDescription>Manage listings, analytics, and placement specialists</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/facility">
                  <Button className="w-full bg-primary-navy hover:bg-blue-900">
                    Access Facility Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-dark-gray mb-4">
              Why Choose CareConnect?
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools for every step of the care journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-red/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-red" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark-gray mb-2">
                Streamlined Communication
              </h3>
              <p className="text-gray-600">
                Secure messaging and real-time updates keep everyone connected
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-sky/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Building className="h-8 w-8 text-primary-sky" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark-gray mb-2">
                Comprehensive Directory
              </h3>
              <p className="text-gray-600">
                Access to verified facilities and care providers
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-gold/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-accent-gold" />
              </div>
              <h3 className="text-xl font-semibold text-text-dark-gray mb-2">
                Professional Tools
              </h3>
              <p className="text-gray-600">
                Advanced CRM, analytics, and management capabilities
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
