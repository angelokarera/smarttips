import { useState, useEffect, useRef } from 'react';
import { 
  Palette, Copy, RefreshCw, Download, Heart, 
  CheckCircle2, Type, LayoutTemplate, 
  Wand2, Search, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import html2canvas from 'html2canvas';

// Helper to convert HSL to HEX
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

// Helper to calculate luminance
const getLuminance = (hex: string) => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;
  
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Contrast ratio
const getContrastRatio = (hex1: string, hex2: string) => {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  fontPairing: string;
  style: string;
  tags: string[];
}

const FONT_PAIRINGS = [
  'Inter & Roboto',
  'Playfair Display & Source Sans Pro',
  'Montserrat & Merriweather',
  'Oswald & Lato',
  'Poppins & Open Sans'
];

const TRENDING_PALETTES: ColorPalette[] = [
  { id: 't1', name: 'Midnight Neon', primary: '#6366F1', secondary: '#EC4899', accent: '#10B981', background: '#0F172A', text: '#F8FAFC', fontPairing: 'Inter & Roboto', style: 'Neon', tags: ['dark', 'neon', 'startup'] },
  { id: 't2', name: 'Earth Minimal', primary: '#8B5E3C', secondary: '#D4A373', accent: '#E9EDC9', background: '#FAEDCD', text: '#344E41', fontPairing: 'Playfair Display & Source Sans Pro', style: 'Minimal', tags: ['light', 'minimal', 'portfolio'] },
  { id: 't3', name: 'Corporate Trust', primary: '#0ea5e9', secondary: '#0284c7', accent: '#f59e0b', background: '#ffffff', text: '#0f172a', fontPairing: 'Montserrat & Merriweather', style: 'Corporate', tags: ['business', 'clean', 'corporate'] },
  { id: 't4', name: 'Cyberpunk Tech', primary: '#facc15', secondary: '#e11d48', accent: '#06b6d4', background: '#09090b', text: '#fafafa', fontPairing: 'Oswald & Lato', style: 'Tech', tags: ['gaming', 'tech', 'dark'] },
];

export default function ColorPaletteGenerator() {
  const [themeStyle, setThemeStyle] = useState('Modern');
  const [preferredColor, setPreferredColor] = useState('#4f46e5');
  const [websiteType, setWebsiteType] = useState('Portfolio');
  
  const [currentPalette, setCurrentPalette] = useState<ColorPalette>(TRENDING_PALETTES[0]);
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>([]);
  const [recentPalettes, setRecentPalettes] = useState<ColorPalette[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('All');
  
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('savedPalettes');
    const recent = localStorage.getItem('recentPalettes');
    if (saved) setSavedPalettes(JSON.parse(saved));
    if (recent) setRecentPalettes(JSON.parse(recent));
    generatePalette();
  }, []);

  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const generatePalette = () => {
    // A complex simulation of AI palette generation based on inputs
    const baseHue = Math.floor(Math.random() * 360);
    
    let p, s, a, b, t;
    
    switch (themeStyle) {
      case 'Dark':
        p = hslToHex(baseHue, 70, 60);
        s = hslToHex((baseHue + 30) % 360, 60, 50);
        a = hslToHex((baseHue + 150) % 360, 80, 60);
        b = hslToHex(baseHue, 20, 10);
        t = hslToHex(baseHue, 10, 95);
        break;
      case 'Minimal':
        p = hslToHex(baseHue, 15, 40);
        s = hslToHex(baseHue, 20, 60);
        a = hslToHex((baseHue + 180) % 360, 30, 50);
        b = hslToHex(baseHue, 10, 98);
        t = hslToHex(baseHue, 15, 20);
        break;
      case 'Neon':
        p = hslToHex(baseHue, 100, 50);
        s = hslToHex((baseHue + 60) % 360, 100, 50);
        a = hslToHex((baseHue + 180) % 360, 100, 50);
        b = hslToHex(0, 0, 5);
        t = hslToHex(0, 0, 100);
        break;
      case 'Corporate':
        p = hslToHex(210, 80, 40); // Blueish
        s = hslToHex(210, 50, 60);
        a = hslToHex(30, 80, 50); // Orange accent
        b = hslToHex(0, 0, 100);
        t = hslToHex(210, 20, 20);
        break;
      case 'Creative':
        p = hslToHex(baseHue, 80, 50);
        s = hslToHex((baseHue + 120) % 360, 70, 50);
        a = hslToHex((baseHue + 240) % 360, 80, 50);
        b = hslToHex(baseHue, 10, 95);
        t = hslToHex(baseHue, 20, 15);
        break;
      case 'Tech':
        p = hslToHex(190, 90, 50); // Cyan
        s = hslToHex(280, 80, 60); // Purple
        a = hslToHex(320, 90, 60); // Pink
        b = hslToHex(220, 30, 10);
        t = hslToHex(190, 20, 90);
        break;
      case 'Modern':
      default:
        p = hslToHex(baseHue, 70, 50);
        s = hslToHex((baseHue + 45) % 360, 60, 45);
        a = hslToHex((baseHue + 180) % 360, 80, 55);
        b = hslToHex(baseHue, 10, 98);
        t = hslToHex(baseHue, 20, 15);
        break;
    }

    const newPalette: ColorPalette = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${websiteType} ${themeStyle}`,
      primary: p,
      secondary: s,
      accent: a,
      background: b,
      text: t,
      fontPairing: FONT_PAIRINGS[Math.floor(Math.random() * FONT_PAIRINGS.length)],
      style: themeStyle,
      tags: [themeStyle.toLowerCase(), websiteType.toLowerCase(), 'generated']
    };

    setCurrentPalette(newPalette);
    
    const newRecent = [newPalette, ...recentPalettes].slice(0, 10);
    setRecentPalettes(newRecent);
    saveToLocalStorage('recentPalettes', newRecent);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const savePalette = () => {
    if (!savedPalettes.find(p => p.id === currentPalette.id)) {
      const newSaved = [currentPalette, ...savedPalettes];
      setSavedPalettes(newSaved);
      saveToLocalStorage('savedPalettes', newSaved);
    }
  };

  const downloadAsPNG = async () => {
    if (paletteRef.current) {
      const canvas = await html2canvas(paletteRef.current, { scale: 2 });
      const link = document.createElement('a');
      link.download = `palette-${currentPalette.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const downloadAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentPalette, null, 2));
    const link = document.createElement('a');
    link.download = `palette-${currentPalette.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    link.href = dataStr;
    link.click();
  };

  const renderColorCard = (label: string, color: string) => (
    <div className="flex flex-col gap-2 group">
      <div 
        className="h-24 sm:h-32 rounded-xl shadow-sm border border-border/50 relative overflow-hidden transition-transform group-hover:scale-105 group-hover:shadow-md cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => copyToClipboard(color)}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Copy className="h-6 w-6 text-white drop-shadow-md" />
        </div>
        {copiedColor === color && (
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-green-800 drop-shadow-md" />
          </div>
        )}
      </div>
      <div>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</div>
        <div className="font-mono font-medium flex items-center gap-2">
          {color}
        </div>
      </div>
    </div>
  );

  const primaryContrast = getContrastRatio(currentPalette.background, currentPalette.primary);
  const textContrast = getContrastRatio(currentPalette.background, currentPalette.text);

  const getFilteredPalettes = (palettes: ColorPalette[]) => {
    return palettes.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.tags.some(t => t.includes(searchQuery.toLowerCase()));
      const matchesTag = filterTag === 'All' || p.tags.includes(filterTag.toLowerCase()) || p.style === filterTag;
      return matchesSearch && matchesTag;
    });
  };

  return (
    <div className="space-y-10" itemScope itemType="https://schema.org/SoftwareApplication">
      <meta itemProp="name" content="SEO Optimized Color Palette Generator" />
      <meta itemProp="applicationCategory" content="DesignApplication" />
      <meta itemProp="operatingSystem" content="All" />
      
      {/* Input Section */}
      <Card className="border-primary/20 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><LayoutTemplate className="w-4 h-4" /> Website Type</Label>
              <Input 
                value={websiteType} 
                onChange={e => setWebsiteType(e.target.value)} 
                placeholder="e.g. E-commerce, Portfolio" 
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Theme Style</Label>
              <Select value={themeStyle} onValueChange={setThemeStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Modern', 'Dark', 'Minimal', 'Neon', 'Corporate', 'Creative', 'Tech'].map(style => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Palette className="w-4 h-4" /> Base Hue (Optional)</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  value={preferredColor} 
                  onChange={e => setPreferredColor(e.target.value)} 
                  className="w-12 h-10 p-1 rounded-md cursor-pointer"
                />
                <Input 
                  value={preferredColor} 
                  onChange={e => setPreferredColor(e.target.value)} 
                  className="flex-1 font-mono"
                />
              </div>
            </div>
            <Button onClick={generatePalette} size="lg" className="w-full font-bold group">
              <Wand2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Generate Palette
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Palette Display */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
              {currentPalette.name}
              <Badge variant="outline" className="text-xs font-mono">{currentPalette.style}</Badge>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={savePalette}>
              <Heart className={`w-4 h-4 mr-2 ${savedPalettes.find(p => p.id === currentPalette.id) ? 'fill-red-500 text-red-500' : ''}`} />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={downloadAsPNG}>
              <Download className="w-4 h-4 mr-2" /> PNG
            </Button>
            <Button variant="outline" size="sm" onClick={downloadAsJSON}>
              <Type className="w-4 h-4 mr-2" /> JSON
            </Button>
            <Button variant="default" size="sm" onClick={generatePalette}>
              <RefreshCw className="w-4 h-4 mr-2" /> New
            </Button>
          </div>
        </div>

        {/* Colors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {renderColorCard('Primary', currentPalette.primary)}
          {renderColorCard('Secondary', currentPalette.secondary)}
          {renderColorCard('Accent', currentPalette.accent)}
          {renderColorCard('Background', currentPalette.background)}
          {renderColorCard('Text', currentPalette.text)}
        </div>

        {/* Live Preview Card */}
        <Card className="overflow-hidden border-2" ref={paletteRef}>
          <div 
            className="p-8 sm:p-12 transition-colors duration-500 relative" 
            style={{ backgroundColor: currentPalette.background, color: currentPalette.text }}
          >
            {/* Background decorative blob */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
              style={{ backgroundColor: currentPalette.primary }}
            />
            <div 
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-20 blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"
              style={{ backgroundColor: currentPalette.accent }}
            />

            <div className="max-w-3xl mx-auto relative z-10">
              <div className="flex items-center justify-between mb-12">
                <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: currentPalette.primary }}></div>
                  BrandLogo
                </div>
                <div className="hidden sm:flex items-center gap-6 text-sm font-medium opacity-80">
                  <span className="hover:opacity-100 cursor-pointer">Features</span>
                  <span className="hover:opacity-100 cursor-pointer">Pricing</span>
                  <span className="hover:opacity-100 cursor-pointer">About</span>
                  <div 
                    className="px-4 py-2 rounded-full font-bold text-sm cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: currentPalette.primary, color: currentPalette.background }}
                  >
                    Get Started
                  </div>
                </div>
              </div>

              <div className="space-y-6 max-w-xl">
                <Badge 
                  className="px-3 py-1 text-xs uppercase tracking-widest font-bold"
                  style={{ backgroundColor: `${currentPalette.accent}20`, color: currentPalette.accent }}
                >
                  New Feature
                </Badge>
                <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
                  Design that <span style={{ color: currentPalette.primary }}>inspires</span> your audience.
                </h1>
                <p className="text-lg sm:text-xl opacity-80 leading-relaxed max-w-lg">
                  Beautiful color combinations crafted algorithmically to ensure perfect harmony and readability across your modern web application.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    className="px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
                    style={{ backgroundColor: currentPalette.primary, color: currentPalette.background }}
                  >
                    Start Free Trial
                  </button>
                  <button 
                    className="px-8 py-3 rounded-xl font-bold transition-all hover:bg-black/5"
                    style={{ border: `2px solid ${currentPalette.secondary}`, color: currentPalette.text }}
                  >
                    View Documentation
                  </button>
                </div>
              </div>

              {/* Sample UI Elements */}
              <div className="mt-16 grid sm:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="p-6 rounded-2xl shadow-sm backdrop-blur-md border border-white/10"
                    style={{ backgroundColor: `${currentPalette.text}08` }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${currentPalette.secondary}20`, color: currentPalette.secondary }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Feature {i}</h3>
                    <p className="text-sm opacity-70">Experience the seamless integration of harmonious colors designed to convert users.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Accessibility, Typography & Gradient Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Readability & Contrast</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div className="text-sm font-medium">Text on BG</div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">{textContrast.toFixed(2)}:1</span>
                    <Badge variant={textContrast >= 4.5 ? 'default' : 'destructive'}>
                      {textContrast >= 4.5 ? 'Pass (AA)' : 'Fail'}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div className="text-sm font-medium">Primary on BG</div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">{primaryContrast.toFixed(2)}:1</span>
                    <Badge variant={primaryContrast >= 3 ? 'default' : 'secondary'}>
                      {primaryContrast >= 3 ? 'Pass (Large)' : 'Low Contrast'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2"><Type className="w-4 h-4 text-primary" /> Font Pairing</h3>
              <div className="p-4 rounded-xl border border-border bg-muted/20">
                <div className="text-2xl font-bold mb-2 font-serif truncate">{currentPalette.fontPairing.split(' & ')[0]}</div>
                <div className="text-sm opacity-80 font-sans truncate">{currentPalette.fontPairing.split(' & ')[1]}</div>
              </div>
              <p className="text-xs text-muted-foreground">
                This combination provides excellent hierarchy and readability for the {currentPalette.style} aesthetic.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2"><Palette className="w-4 h-4 text-pink-500" /> CSS Gradient</h3>
              <div 
                className="h-20 w-full rounded-xl border border-border/50 relative overflow-hidden group cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${currentPalette.primary}, ${currentPalette.secondary})` }}
                onClick={() => copyToClipboard(`linear-gradient(135deg, ${currentPalette.primary}, ${currentPalette.secondary})`)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Copy className="h-6 w-6 text-white drop-shadow-md" />
                </div>
                {copiedColor === `linear-gradient(135deg, ${currentPalette.primary}, ${currentPalette.secondary})` && (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-800 drop-shadow-md" />
                  </div>
                )}
              </div>
              <div className="p-2 rounded-lg bg-muted/50 font-mono text-[10px] text-muted-foreground break-all cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => copyToClipboard(`background: linear-gradient(135deg, ${currentPalette.primary}, ${currentPalette.secondary});`)}
              >
                background: linear-gradient(135deg, {currentPalette.primary}, {currentPalette.secondary});
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Explorer / Tabs */}
      <div className="pt-10 border-t border-border">
        <Tabs defaultValue="trending" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="saved">Saved ({savedPalettes.length})</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search palettes..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-[110px] h-9">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Styles</SelectItem>
                  <SelectItem value="Modern">Modern</SelectItem>
                  <SelectItem value="Dark">Dark</SelectItem>
                  <SelectItem value="Minimal">Minimal</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {['trending', 'recent', 'saved'].map((tab) => {
            const list = tab === 'trending' ? TRENDING_PALETTES : tab === 'recent' ? recentPalettes : savedPalettes;
            const filtered = getFilteredPalettes(list);
            
            return (
              <TabsContent key={tab} value={tab} className="mt-0">
                {filtered.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-2xl border border-dashed">
                    No palettes found. {tab === 'saved' ? 'Save some palettes you like!' : ''}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((palette) => (
                      <Card 
                        key={palette.id} 
                        className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer group"
                        onClick={() => setCurrentPalette(palette)}
                      >
                        <div className="flex h-24">
                          {[palette.primary, palette.secondary, palette.accent, palette.background, palette.text].map((color, i) => (
                            <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{palette.name}</h4>
                            <Badge variant="secondary" className="text-[10px]">{palette.style}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{palette.tags.join(', ')}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
