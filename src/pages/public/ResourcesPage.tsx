
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Rss, Search, ExternalLink, Calendar, User } from 'lucide-react';

interface RSSFeed {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  lastUpdated: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featured: boolean;
}

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const rssFeeds: RSSFeed[] = [
    {
      id: '1',
      title: 'Medicare.gov Health Tips',
      url: 'https://www.medicare.gov/rss',
      description: 'Latest updates and health tips from Medicare',
      category: 'Medicare',
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      title: 'AARP Health News',
      url: 'https://www.aarp.org/health/rss',
      description: 'Health news and tips for seniors',
      category: 'Senior Health',
      lastUpdated: '4 hours ago'
    },
    {
      id: '3',
      title: 'NIH Senior Health',
      url: 'https://nihseniorhealth.gov/rss',
      description: 'Evidence-based health information for seniors',
      category: 'Medical Research',
      lastUpdated: '6 hours ago'
    },
    {
      id: '4',
      title: 'Alzheimer\'s Association',
      url: 'https://www.alz.org/rss',
      description: 'Latest research and care tips for dementia',
      category: 'Memory Care',
      lastUpdated: '8 hours ago'
    },
    {
      id: '5',
      title: 'Assisted Living Federation',
      url: 'https://www.alfa.org/rss',
      description: 'Industry news and best practices',
      category: 'Industry News',
      lastUpdated: '12 hours ago'
    },
    {
      id: '6',
      title: 'CDC Healthy Aging',
      url: 'https://www.cdc.gov/aging/rss',
      description: 'Public health information for healthy aging',
      category: 'Prevention',
      lastUpdated: '1 day ago'
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'How to Choose the Right Memory Care Facility',
      excerpt: 'A comprehensive guide to evaluating memory care options for your loved one...',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      category: 'Memory Care',
      readTime: '8 min read',
      featured: true
    },
    {
      id: '2',
      title: '10 Questions to Ask During a Facility Tour',
      excerpt: 'Essential questions that will help you make an informed decision...',
      author: 'Mike Chen',
      date: '2024-01-12',
      category: 'Tips & Guides',
      readTime: '5 min read',
      featured: false
    },
    {
      id: '3',
      title: 'Understanding Medicare Coverage for Long-Term Care',
      excerpt: 'Navigate the complex world of Medicare benefits and coverage options...',
      author: 'Jennifer Williams',
      date: '2024-01-10',
      category: 'Medicare',
      readTime: '12 min read',
      featured: true
    },
    {
      id: '4',
      title: 'Creating a Safe Home Environment for Seniors',
      excerpt: 'Simple modifications that can prevent falls and injuries...',
      author: 'Dr. Robert Kim',
      date: '2024-01-08',
      category: 'Safety',
      readTime: '6 min read',
      featured: false
    }
  ];

  const categories = ['all', 'Medicare', 'Senior Health', 'Memory Care', 'Industry News', 'Prevention', 'Tips & Guides', 'Safety'];

  const filteredFeeds = rssFeeds.filter(feed => {
    const matchesSearch = feed.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feed.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || feed.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-brand-off-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-brand-navy mb-4">Healthcare Resources</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest healthcare news, tips, and research from trusted sources
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Blog Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* RSS Feeds Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">RSS Feeds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeeds.map((feed) => (
              <Card key={feed.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Rss className="h-5 w-5 text-brand-red" />
                    <Badge variant="outline">{feed.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{feed.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feed.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Updated: {feed.lastUpdated}</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Feed
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Blog Posts */}
        <section>
          <h2 className="text-2xl font-bold text-brand-navy mb-6">All Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResourcesPage;
