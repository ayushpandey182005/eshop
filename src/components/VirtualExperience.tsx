import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Camera, 
  RotateCcw, 
  Move3D, 
  Home, 
  Smartphone, 
  Eye, 
  Download,
  Share2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize
} from 'lucide-react';

interface VirtualExperienceProps {
  product: {
    id: string;
    name: string;
    category: string;
    image: string;
    images?: string[];
    price: number;
  };
}

const VirtualExperience: React.FC<VirtualExperienceProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('3d');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [zoom, setZoom] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Determine if product supports different virtual experiences
  const supportsAR = ['Fashion', 'Beauty', 'Watches', 'Electronics'].includes(product.category);
  const supports3D = true; // All products can have 3D view
  const supportsRoom = ['Home & Kitchen', 'Electronics'].includes(product.category);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        
        // Create download link
        const link = document.createElement('a');
        link.download = `virtual-try-${product.name}-${Date.now()}.png`;
        link.href = dataURL;
        link.click();
      }
    }
  };

  const rotate3D = (axis: 'x' | 'y' | 'z', direction: number) => {
    setRotation(prev => ({
      ...prev,
      [axis]: prev[axis] + (direction * 15)
    }));
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0, z: 0 });
    setZoom(1);
  };

  const ARTryOn = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">AR Virtual Try-On</h3>
        <p className="text-sm text-muted-foreground">
          Use your camera to see how {product.name} looks on you
        </p>
      </div>
      
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        {cameraStream ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* AR Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-contain opacity-80"
                  style={{
                    transform: `scale(${zoom}) rotateY(${rotation.y}deg)`,
                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                  }}
                />
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                  AR
                </Badge>
              </div>
            </div>
            
            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button size="sm" onClick={capturePhoto}>
                <Camera className="w-4 h-4 mr-1" />
                Capture
              </Button>
              <Button size="sm" variant="outline" onClick={stopCamera}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <Camera className="w-16 h-16 mb-4 opacity-50" />
            <p className="mb-4">Start your virtual try-on experience</p>
            <Button onClick={startCamera}>
              <Smartphone className="w-4 h-4 mr-2" />
              Start Camera
            </Button>
          </div>
        )}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );

  const Product3DViewer = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">3D Product Viewer</h3>
        <p className="text-sm text-muted-foreground">
          Rotate and examine {product.name} from every angle
        </p>
      </div>
      
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
        <div 
          className="relative transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-64 h-64 object-contain drop-shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
        </div>
        
        <Badge className="absolute top-4 right-4 bg-blue-500 text-white">
          3D
        </Badge>
      </div>
      
      {/* 3D Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Rotation</p>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={() => rotate3D('y', -1)}>
              <RotateCcw className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => rotate3D('y', 1)}>
              <RotateCw className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => rotate3D('x', -1)}>
              ↑
            </Button>
            <Button size="sm" variant="outline" onClick={() => rotate3D('x', 1)}>
              ↓
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Zoom</p>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}>
              <ZoomOut className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => setZoom(Math.min(3, zoom + 0.2))}>
              <ZoomIn className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={resetView}>
              <Maximize className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const RoomPreview = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">Room Preview</h3>
        <p className="text-sm text-muted-foreground">
          See how {product.name} fits in your space
        </p>
      </div>
      
      <div className="relative bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 rounded-lg aspect-video overflow-hidden">
        {/* Room Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900"></div>
        </div>
        
        {/* Product in Room */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div 
            className="relative transition-transform duration-300"
            style={{
              transform: `scale(${zoom * 0.8}) rotateY(${rotation.y}deg)`
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-contain drop-shadow-lg"
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black/20 rounded-full blur-sm" />
          </div>
        </div>
        
        <Badge className="absolute top-4 right-4 bg-green-500 text-white">
          Room AR
        </Badge>
      </div>
      
      <div className="flex justify-center gap-2">
        <Button size="sm" variant="outline" onClick={() => rotate3D('y', -1)}>
          <RotateCcw className="w-3 h-3 mr-1" />
          Rotate
        </Button>
        <Button size="sm" variant="outline" onClick={() => setZoom(zoom === 1 ? 1.5 : 1)}>
          <Move3D className="w-3 h-3 mr-1" />
          Resize
        </Button>
        <Button size="sm" onClick={() => console.log('Room scan simulation')}>
          <Camera className="w-3 h-3 mr-1" />
          Scan Room
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Try Before You Buy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Move3D className="w-5 h-5" />
            Virtual Experience - {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {supportsAR && (
              <TabsTrigger value="ar" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                AR Try-On
              </TabsTrigger>
            )}
            {supports3D && (
              <TabsTrigger value="3d" className="flex items-center gap-2">
                <Move3D className="w-4 h-4" />
                3D Viewer
              </TabsTrigger>
            )}
            {supportsRoom && (
              <TabsTrigger value="room" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Room Preview
              </TabsTrigger>
            )}
          </TabsList>
          
          {supportsAR && (
            <TabsContent value="ar">
              <Card>
                <CardContent className="p-6">
                  <ARTryOn />
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          {supports3D && (
            <TabsContent value="3d">
              <Card>
                <CardContent className="p-6">
                  <Product3DViewer />
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          {supportsRoom && (
            <TabsContent value="room">
              <Card>
                <CardContent className="p-6">
                  <RoomPreview />
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Share2 className="w-3 h-3 mr-1" />
              Share
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-3 h-3 mr-1" />
              Save
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            ₹{product.price.toLocaleString()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualExperience;
