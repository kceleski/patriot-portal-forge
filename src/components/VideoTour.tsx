
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoTourProps {
  facilityId: string;
  facilityName: string;
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  tourType?: '360' | 'standard' | 'live';
}

const VideoTour: React.FC<VideoTourProps> = ({
  facilityId,
  facilityName,
  isOpen,
  onClose,
  videoUrl,
  tourType = 'standard'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Here you would control the actual video player
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Here you would control the actual video player volume
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Here you would toggle fullscreen mode
  };

  // Mock video tour for demonstration
  const renderVideoPlayer = () => {
    if (videoUrl) {
      return (
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    // Mock player interface
    return (
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Virtual Tour</h3>
            <p className="text-gray-300 mb-4">{facilityName}</p>
            {tourType === '360' && (
              <p className="text-sm text-gray-400">360° Interactive Experience</p>
            )}
            {tourType === 'live' && (
              <p className="text-sm text-green-400">🔴 Live Tour Available</p>
            )}
          </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={handlePlayPause}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={handleMuteToggle}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <div className="text-white text-sm">
                0:00 / 5:30
              </div>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleFullscreen}
              className="text-white hover:bg-white/20"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-2">
            <div className="w-full bg-white/20 rounded-full h-1">
              <div className="bg-brand-red h-1 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Video className="h-5 w-5 mr-2" />
            Virtual Tour - {facilityName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {renderVideoPlayer()}

          {/* Tour Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <span className="text-sm font-medium">Common Areas</span>
              <span className="text-xs text-gray-500">Lobby, Dining, Recreation</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <span className="text-sm font-medium">Living Spaces</span>
              <span className="text-xs text-gray-500">Studios, 1BR, 2BR</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <span className="text-sm font-medium">Amenities</span>
              <span className="text-xs text-gray-500">Gym, Spa, Gardens</span>
            </Button>
          </div>

          {/* Tour Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Tour Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Duration:</span>
                <span className="ml-2 font-medium">5 minutes</span>
              </div>
              <div>
                <span className="text-gray-600">Last Updated:</span>
                <span className="ml-2 font-medium">January 2024</span>
              </div>
              <div>
                <span className="text-gray-600">Tour Type:</span>
                <span className="ml-2 font-medium capitalize">{tourType}</span>
              </div>
              <div>
                <span className="text-gray-600">Available:</span>
                <span className="ml-2 font-medium">24/7</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1">
              Schedule In-Person Tour
            </Button>
            <Button variant="outline" className="flex-1">
              Download Brochure
            </Button>
            <Button variant="outline" className="flex-1">
              Contact Facility
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoTour;
