import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Leaf, 
  Recycle, 
  Heart, 
  Award, 
  Info,
  TreePine,
  Droplets,
  Factory
} from 'lucide-react';

export interface SustainabilityData {
  ecoScore: number; // 0-100
  carbonFootprint: {
    value: number; // kg CO2
    rating: 'low' | 'medium' | 'high';
  };
  recyclablePercentage: number; // 0-100
  fairTrade: boolean;
  sustainableMaterials: string[];
  certifications: string[];
  waterUsage?: number; // liters
  renewableEnergy?: boolean;
}

interface SustainabilityScoreProps {
  data: SustainabilityData;
  variant?: 'compact' | 'detailed' | 'badge';
  showTooltip?: boolean;
}

const SustainabilityScore: React.FC<SustainabilityScoreProps> = ({ 
  data, 
  variant = 'compact',
  showTooltip = true 
}) => {
  const getEcoScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getEcoScoreGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    return 'D';
  };

  const getCarbonFootprintColor = (rating: string) => {
    switch (rating) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (variant === 'badge') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline" 
              className={`${getEcoScoreColor(data.ecoScore)} cursor-help`}
            >
              <Leaf className="w-3 h-3 mr-1" />
              Eco {getEcoScoreGrade(data.ecoScore)}
            </Badge>
          </TooltipTrigger>
          {showTooltip && (
            <TooltipContent>
              <div className="text-sm">
                <p className="font-medium">Sustainability Score: {data.ecoScore}/100</p>
                <p>Carbon Footprint: {data.carbonFootprint.value}kg CO₂</p>
                <p>Recyclable: {data.recyclablePercentage}%</p>
                {data.fairTrade && <p>✓ Fair Trade Certified</p>}
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full border ${getEcoScoreColor(data.ecoScore)}`}>
          <Leaf className="w-3 h-3" />
          <span className="font-medium">{getEcoScoreGrade(data.ecoScore)}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Factory className={`w-3 h-3 ${getCarbonFootprintColor(data.carbonFootprint.rating)}`} />
          <span className="text-xs text-muted-foreground">{data.carbonFootprint.value}kg CO₂</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Recycle className="w-3 h-3 text-green-600" />
          <span className="text-xs text-muted-foreground">{data.recyclablePercentage}%</span>
        </div>
        
        {data.fairTrade && (
          <Badge variant="outline" className="text-xs px-1 py-0">
            <Heart className="w-2 h-2 mr-1" />
            Fair Trade
          </Badge>
        )}
      </div>
    );
  }

  // Detailed variant
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Sustainability Score
            </h3>
            <div className={`px-3 py-1 rounded-full border ${getEcoScoreColor(data.ecoScore)}`}>
              <span className="font-bold text-lg">{getEcoScoreGrade(data.ecoScore)}</span>
              <span className="text-sm ml-1">({data.ecoScore}/100)</span>
            </div>
          </div>

          {/* Eco Score Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Eco Score</span>
              <span className="font-medium">{data.ecoScore}/100</span>
            </div>
            <Progress value={data.ecoScore} className="h-2" />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Carbon Footprint */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Factory className={`w-4 h-4 ${getCarbonFootprintColor(data.carbonFootprint.rating)}`} />
                <span className="text-sm font-medium">Carbon Footprint</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>CO₂ emissions from production and transport</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">
                <span className={`font-medium ${getCarbonFootprintColor(data.carbonFootprint.rating)}`}>
                  {data.carbonFootprint.value}kg CO₂
                </span>
                <Badge variant="outline" className={`ml-2 text-xs ${getCarbonFootprintColor(data.carbonFootprint.rating)}`}>
                  {data.carbonFootprint.rating}
                </Badge>
              </div>
            </div>

            {/* Recyclable Materials */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Recycle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Recyclable</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-green-600">{data.recyclablePercentage}%</span>
                <Progress value={data.recyclablePercentage} className="h-1 mt-1" />
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          {(data.waterUsage || data.renewableEnergy) && (
            <div className="grid grid-cols-2 gap-4">
              {data.waterUsage && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Water Usage</span>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">{data.waterUsage}L</span>
                </div>
              )}
              
              {data.renewableEnergy && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TreePine className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Renewable Energy</span>
                  </div>
                  <Badge variant="outline" className="text-xs text-green-600">
                    ✓ 100% Clean
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Certifications & Features */}
          <div className="space-y-3">
            {data.fairTrade && (
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <Badge variant="outline" className="text-red-600 border-red-200">
                  Fair Trade Certified
                </Badge>
              </div>
            )}

            {data.certifications.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium">Certifications</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {data.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {data.sustainableMaterials.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Sustainable Materials</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {data.sustainableMaterials.map((material, index) => (
                    <Badge key={index} variant="outline" className="text-xs text-green-600 border-green-200">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SustainabilityScore;
