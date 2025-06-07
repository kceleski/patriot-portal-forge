
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, User, Building, Briefcase } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-sky text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 font-heading">
            Connecting Families with Quality Care Solutions
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto font-body">
            HealthProAssist simplifies the process of finding and managing care services for your loved ones.
            Whether you're a family, healthcare professional, placement agent, or facility, we have the tools you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/find-care">
              <Button size="lg" className="bg-brand-red hover:bg-red-600 text-white px-8 py-4 font-body">
                Find Care Now
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-brand-navy hover:bg-red-600 hover:text-brand-navy px-8 py-4 font-body">
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
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">
              Choose Your Portal
            </h2>
            <p className="text-xl text-gray-600 font-body">
              Access specialized tools designed for your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-transparent hover:border-brand-sky transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-brand-red mx-auto mb-4" />
                <CardTitle className="text-text-primary font-heading">Families & Clients</CardTitle>
                <CardDescription className="font-body">Find and manage care services for your loved ones</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/family">
                  <Button className="w-full bg-brand-red hover:bg-red-600 font-body">
                    Access Family Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-brand-sky transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <User className="h-12 w-12 text-brand-sky mx-auto mb-4" />
                <CardTitle className="text-text-primary font-heading">Healthcare Professionals</CardTitle>
                <CardDescription className="font-body">Manage clients, referrals, and track placements</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/healthcare">
                  <Button className="w-full bg-brand-sky hover:bg-blue-600 font-body">
                    Access Healthcare Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-brand-sky transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Briefcase className="h-12 w-12 text-brand-gold mx-auto mb-4" />
                <CardTitle className="text-text-primary font-heading">Placement Agents</CardTitle>
                <CardDescription className="font-body">CRM tools, performance tracking, and client management</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/agent">
                  <Button className="w-full bg-brand-gold hover:bg-yellow-500 text-text-primary font-body">
                    Access Agent Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-brand-sky transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Building className="h-12 w-12 text-brand-navy mx-auto mb-4" />
                <CardTitle className="text-text-primary font-heading">Facilities</CardTitle>
                <CardDescription className="font-body">Manage listings, analytics, and placement specialists</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/facility">
                  <Button className="w-full bg-brand-navy hover:bg-blue-900 font-body">
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
            <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">
              Why Choose HealthProAssist?
            </h2>
            <p className="text-xl text-gray-600 font-body">
              Comprehensive tools for every step of the care journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-red/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2 font-heading">
                Streamlined Communication
              </h3>
              <p className="text-gray-600 font-body">
                Secure messaging and real-time updates keep everyone connected
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-sky/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Building className="h-8 w-8 text-brand-sky" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2 font-heading">
                Comprehensive Directory
              </h3>
              <p className="text-gray-600 font-body">
                Access to verified facilities and care providers
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-gold/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-brand-gold" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2 font-heading">
                Professional Tools
              </h3>
              <p className="text-gray-600 font-body">
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
