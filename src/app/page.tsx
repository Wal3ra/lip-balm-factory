'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Check, X, Volume2, VolumeX, Sparkles, Package, Palette, Type, ShoppingCart, Copy, ChevronDown, ChevronUp, Star, Heart, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface Base {
  id: string;
  name: string;
  profile: string;
  img: string;
  ingredients: Array<{ name: string; type: string }>;
  description: string;
}

interface Flavor {
  id: string;
  name: string;
  aroma: string;
  img: string;
  category: string;
}

interface Packaging {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
}

const BASES: Base[] = [
  {
    id: 'classic',
    name: 'Classic',
    profile: 'Our original formula with natural beeswax for ultimate hydration and protection.',
    img: 'https://static.wixstatic.com/media/d0044c_8407143dcedf44dca1bf1477934a4676~mv2.jpg',
    ingredients: [
      { name: 'Coconut Oil', type: 'moisturizing base' },
      { name: 'Beeswax', type: 'protective barrier' },
      { name: 'Sunflower Seed Oil', type: 'lightweight oil' },
      { name: 'Sweet Almond Oil', type: 'nourishing oil' },
      { name: '(Shea) Butter', type: 'moisturizing butter' },
      { name: 'Castor Oil', type: 'emollient oil' },
      { name: 'Vitamin E Oil', type: 'antioxidant' },
      { name: 'Plant Derived Natural Flavoring', type: 'flavor' },
      { name: 'Natural Stevia Sweetener', type: 'sweetener' }
    ],
    description: 'The perfect balance of moisture and protection for everyday lip care.'
  },
  {
    id: 'vegan',
    name: 'Vegan',
    profile: 'Plant-based formula with candelilla wax instead of beeswax for ethical beauty.',
    img: 'https://static.wixstatic.com/media/d0044c_01e39e61e8b244e3a4a8f9627f358145~mv2.jpg',
    ingredients: [
      { name: 'Coconut Oil', type: 'moisturizing base' },
      { name: 'Candelilla Wax', type: 'vegan wax' },
      { name: 'Sunflower Seed Oil', type: 'lightweight oil' },
      { name: 'Sweet Almond Oil', type: 'nourishing oil' },
      { name: '(Shea) Butter', type: 'moisturizing butter' },
      { name: 'Castor Oil', type: 'emollient oil' },
      { name: 'Vitamin E Oil', type: 'antioxidant' },
      { name: 'Plant Derived Natural Flavoring', type: 'flavor' },
      { name: 'Natural Stevia Sweetener', type: 'sweetener' }
    ],
    description: 'Cruelty-free formula that provides excellent moisture without animal products.'
  }
];

const FLAVOR_CATEGORIES = {
  nutty: {
    name: 'Nutty & Buttery',
    icon: '🥜',
    flavors: [
      { id: 'n1', name: 'Macadamia Praline', aroma: 'sweet nutty', img: 'https://static.wixstatic.com/media/d0044c_9322e272450e4ae693dfe9e73407716f~mv2.jpg', category: 'nutty' },
      { id: 'n2', name: 'Cashew', aroma: 'creamy nut', img: 'https://static.wixstatic.com/media/d0044c_472cb607b5b54b39bd49a07625bf7e2a~mv2.jpg', category: 'nutty' },
      { id: 'n3', name: 'Walnut', aroma: 'rich nutty', img: 'https://static.wixstatic.com/media/d0044c_95bd2e74a0474539b69874c349dfa16b~mv2.jpg', category: 'nutty' },
      { id: 'n4', name: 'Almond', aroma: 'sweet almond', img: 'https://static.wixstatic.com/media/d0044c_7e8af86c87174d84b8fdf31405e444f4~mv2.jpg', category: 'nutty' },
      { id: 'n5', name: 'Pistachio', aroma: 'nutty green', img: 'https://static.wixstatic.com/media/d0044c_2995941037174955be41b48b0145cb04~mv2.jpg', category: 'nutty' },
      { id: 'n6', name: 'Pecan Praline', aroma: 'sweet pecan', img: 'https://static.wixstatic.com/media/d0044c_ee2f3d363ac5424e8a66c03c9811cb58~mv2.jpg', category: 'nutty' },
      { id: 'n7', name: 'Butter Pecan', aroma: 'buttery nut', img: 'https://static.wixstatic.com/media/d0044c_7f607fd346ea4f53947e5e88ac7b7f01~mv2.jpg', category: 'nutty' },
      { id: 'n8', name: 'Toasted Coconut', aroma: 'toasted coconut', img: 'https://static.wixstatic.com/media/d0044c_c04cc76a5d54474f972f4ea0d28e386c~mv2.jpg', category: 'nutty' }
    ]
  },
  vanilla: {
    name: 'Vanilla',
    icon: '🍦',
    flavors: [
      { id: 'v1', name: 'French Vanilla', aroma: 'rich vanilla', img: 'https://static.wixstatic.com/media/d0044c_dce60a4250e84783ab43ed24b5157cef~mv2.jpg', category: 'vanilla' },
      { id: 'v2', name: 'Vanilla', aroma: 'classic vanilla', img: 'https://static.wixstatic.com/media/d0044c_4c07788ba7844665af12c9b9251d2e48~mv2.jpg', category: 'vanilla' }
    ]
  },
  chocolate: {
    name: 'Chocolate',
    icon: '🍫',
    flavors: [
      { id: 'c1', name: 'Chocolate Mint', aroma: 'chocolate mint', img: 'https://static.wixstatic.com/media/d0044c_cf043d6b5b6f4d4eaba45af5ca0b5885~mv2.jpg', category: 'chocolate' },
      { id: 'c2', name: 'White Chocolate', aroma: 'creamy white chocolate', img: 'https://static.wixstatic.com/media/d0044c_25ba4012dc1846dba79bf432e5da0a99~mv2.jpg', category: 'chocolate' },
      { id: 'c3', name: 'Chocolate Hazelnut', aroma: 'chocolate hazelnut', img: 'https://static.wixstatic.com/media/d0044c_73f8a1d4992b41a8a8d42f600fae39dd~mv2.jpg', category: 'chocolate' }
    ]
  },
  fruity: {
    name: 'Fruity',
    icon: '🍓',
    flavors: [
      { id: 'f1', name: 'Fruit Punch', aroma: 'tropical fruit', img: 'https://static.wixstatic.com/media/d0044c_461e39e06aac4da7a9f27e4cb377cffa~mv2.jpg', category: 'fruity' },
      { id: 'f2', name: 'Citrus Punch', aroma: 'citrus blend', img: 'https://static.wixstatic.com/media/d0044c_6ad540f738b14b1897893e05c5fbc1a3~mv2.jpg', category: 'fruity' },
      { id: 'f3', name: 'Mango', aroma: 'sweet mango', img: 'https://static.wixstatic.com/media/d0044c_625cfa06d1f941a6acd6b8022c45c4fa~mv2.jpg', category: 'fruity' },
      { id: 'f4', name: 'Cranberry Orange', aroma: 'cranberry orange', img: 'https://static.wixstatic.com/media/d0044c_dcd8d62164314ec4870eeac904ed5a21~mv2.jpg', category: 'fruity' },
      { id: 'f6', name: 'Pina Colada', aroma: 'pineapple coconut', img: 'https://static.wixstatic.com/media/d0044c_47328db807d14482b18f06e3719e0888~mv2.jpg', category: 'fruity' },
      { id: 'f9', name: 'Pomegranate', aroma: 'tart pomegranate', img: 'https://static.wixstatic.com/media/d0044c_0c8b617dacfa45ebb235d492d8347865~mv2.jpg', category: 'fruity' },
      { id: 'f10', name: 'Apricot', aroma: 'sweet apricot', img: 'https://static.wixstatic.com/media/d0044c_43aba283ff0f40e78d54ee6632b40141~mv2.jpg', category: 'fruity' },
      { id: 'f11', name: 'Nectarine', aroma: 'sweet nectarine', img: 'https://static.wixstatic.com/media/d0044c_c8eefe2fa1eb4414a77edbdd9f5a582e~mv2.jpg', category: 'fruity' },
      { id: 'f12', name: 'Strawberry', aroma: 'sweet berry', img: 'https://static.wixstatic.com/media/d0044c_684993a4bf424835b1cfeba23cb54ab7~mv2.jpg', category: 'fruity' },
      { id: 'f13', name: 'Berry', aroma: 'mixed berry', img: 'https://static.wixstatic.com/media/d0044c_3403c865d7bb41dd965b7cc71f5ad2c2~mv2.jpg', category: 'fruity' },
      { id: 'f14', name: 'Raspberry', aroma: 'tart raspberry', img: 'https://static.wixstatic.com/media/d0044c_787ff852acc24bbd81cec0d70ce3fc6f~mv2.jpg', category: 'fruity' },
      { id: 'f15', name: 'Pineapple', aroma: 'tropical pineapple', img: 'https://static.wixstatic.com/media/d0044c_eb3c83363bda4df0b482919fac6b7a76~mv2.jpg', category: 'fruity' },
      { id: 'f16', name: 'Honeydew Melon', aroma: 'sweet melon', img: 'https://static.wixstatic.com/media/d0044c_2cbd00fdef46458ea3857e0305d2b023~mv2.jpg', category: 'fruity' },
      { id: 'f17', name: 'Pear', aroma: 'sweet pear', img: 'https://static.wixstatic.com/media/d0044c_f00ea255fe80470585e0aee7914031c0~mv2.jpg', category: 'fruity' },
      { id: 'f18', name: 'Ginger Peach', aroma: 'spicy peach', img: 'https://static.wixstatic.com/media/d0044c_ca177294e70743cc8d095989fb19336a~mv2.jpg', category: 'fruity' },
      { id: 'f19', name: 'Cherry', aroma: 'sweet cherry', img: 'https://static.wixstatic.com/media/d0044c_233334db49a04188b144dee146e1abcb~mv2.jpg', category: 'fruity' },
      { id: 'f20', name: 'Dragonfruit', aroma: 'exotic dragonfruit', img: 'https://static.wixstatic.com/media/d0044c_0a4ed84d8057465bbe698d23fe6e3af6~mv2.jpg', category: 'fruity' },
      { id: 'f21', name: 'Fig', aroma: 'sweet fig', img: 'https://static.wixstatic.com/media/d0044c_2d6093d2563141f39b314534dfaa53e2~mv2.jpg', category: 'fruity' },
      { id: 'f22', name: 'Passion Fruit', aroma: 'tart passion fruit', img: 'https://static.wixstatic.com/media/d0044c_8b3dda1b3e6141cabf6ecdc63d1e6f06~mv2.jpg', category: 'fruity' },
      { id: 'f23', name: 'Watermelon Basil', aroma: 'watermelon herb', img: 'https://static.wixstatic.com/media/d0044c_31efb3707ec34f398e5432bdccbf1e9a~mv2.jpg', category: 'fruity' },
      { id: 'f24', name: 'Guava', aroma: 'tropical guava', img: 'https://static.wixstatic.com/media/d0044c_b2fa51ebcb224c8283fca9410338f39e~mv2.jpg', category: 'fruity' },
      { id: 'f25', name: 'Watermelon', aroma: 'sweet watermelon', img: 'https://static.wixstatic.com/media/d0044c_33f9e186791c4544adc226c320455c70~mv2.jpg', category: 'fruity' },
      { id: 'f26', name: 'Red Apple', aroma: 'crisp apple', img: 'https://static.wixstatic.com/media/d0044c_8f93cd62c2334927a719017ade9c63d3~mv2.jpg', category: 'fruity' }
    ]
  },
  floral: {
    name: 'Floral',
    icon: '🌹',
    flavors: [
      { id: 'fl1', name: 'Rose', aroma: 'floral rose', img: 'https://static.wixstatic.com/media/d0044c_adc2f8384ffa433c95bb96066390605b~mv2.jpg', category: 'floral' },
      { id: 'fl2', name: 'Hibiscus', aroma: 'floral tart', img: 'https://static.wixstatic.com/media/d0044c_964341f7b27a438fa1cd78325f1a4e6b~mv2.jpg', category: 'floral' }
    ]
  },
  minty: {
    name: 'Minty',
    icon: '🌿',
    flavors: [
      { id: 'm1', name: 'Peppermint', aroma: 'cool mint', img: 'https://static.wixstatic.com/media/d0044c_f342dba10f0d44d5857920482feb0622~mv2.jpg', category: 'minty' },
      { id: 'm2', name: 'Lemongrass', aroma: 'citrus herb', img: 'https://static.wixstatic.com/media/d0044c_c16762ae88ac465ca348f8ed7d7e7ce5~mv2.jpg', category: 'minty' },
      { id: 'm3', name: 'Mint', aroma: 'fresh mint', img: 'https://static.wixstatic.com/media/d0044c_14e8136ef4f241e1b4bfda0541ee17bd~mv2.jpg', category: 'minty' },
      { id: 'm4', name: 'Candy Cane', aroma: 'peppermint sweet', img: 'https://static.wixstatic.com/media/d0044c_64177e5cdeb5438e926a1781454e9f11~mv2.jpg', category: 'minty' }
    ]
  },
  spicy: {
    name: 'Spicy & Herbal',
    icon: '🌶️',
    flavors: [
      { id: 's1', name: 'Cinnamon', aroma: 'warm spice', img: 'https://static.wixstatic.com/media/d0044c_4907c652de5e465ebefd89f0e52dda73~mv2.jpg', category: 'spicy' },
      { id: 's2', name: 'Green Tea', aroma: 'herbal tea', img: 'https://static.wixstatic.com/media/d0044c_dcc1915495d74fce9c5f0135a29b58d5~mv2.jpg', category: 'spicy' },
      { id: 's3', name: 'Earl Grey', aroma: 'bergamot tea', img: 'https://static.wixstatic.com/media/d0044c_50bed03b06784e4691cbea1d7604177c~mv2.jpg', category: 'spicy' },
      { id: 's4', name: 'Chai', aroma: 'spiced tea', img: 'https://static.wixstatic.com/media/d0044c_63428385ba16453a9043f1a077a5824d~mv2.jpg', category: 'spicy' }
    ]
  },
  dessert: {
    name: 'Dessert & Sweet',
    icon: '🍰',
    flavors: [
      { id: 'd1', name: 'Cotton Candy', aroma: 'sweet spun sugar', img: 'https://static.wixstatic.com/media/d0044c_bd54455a17b4443681fa722ca9f806a0~mv2.jpg', category: 'dessert' },
      { id: 'd2', name: 'Bubblegum', aroma: 'sweet bubblegum', img: 'https://static.wixstatic.com/media/d0044c_268a6a531ceb47c5adea8a738e88b935~mv2.jpg', category: 'dessert' },
      { id: 'd3', name: 'Marshmallow', aroma: 'sweet marshmallow', img: 'https://static.wixstatic.com/media/d0044c_4c1198cee4ca4701a526be10eb5a3956~mv2.jpg', category: 'dessert' },
      { id: 'd4', name: 'Lemon Meringue', aroma: 'lemon cream', img: 'https://static.wixstatic.com/media/d0044c_061e0b6cdc5e49ae99d77bede8644552~mv2.jpg', category: 'dessert' },
      { id: 'd5', name: 'Caramel Cream', aroma: 'creamy caramel', img: 'https://static.wixstatic.com/media/d0044c_fdb0179180924b77b5d48999bb596a37~mv2.jpg', category: 'dessert' },
      { id: 'd6', name: 'Butterscotch', aroma: 'buttery sweet', img: 'https://static.wixstatic.com/media/d0044c_9e1a73566504452a9f0fae8006a575d0~mv2.jpg', category: 'dessert' },
      { id: 'd7', name: 'Burnt Sugar', aroma: 'caramelized sugar', img: 'https://static.wixstatic.com/media/d0044c_37fa22d4e42244a18624e3992e8937ca~mv2.jpg', category: 'dessert' },
      { id: 'd8', name: 'Toffee', aroma: 'buttery toffee', img: 'https://static.wixstatic.com/media/d0044c_751ac193c0cb41f89529c06bbcad757d~mv2.jpg', category: 'dessert' },
      { id: 'd9', name: 'Maple', aroma: 'sweet maple', img: 'https://static.wixstatic.com/media/d0044c_7a70e54214ae41faa64bed13592ff9fb~mv2.jpg', category: 'dessert' },
      { id: 'd10', name: 'Cappuccino', aroma: 'coffee cream', img: 'https://static.wixstatic.com/media/d0044c_ea0bf48f45274464a295b232eef8858b~mv2.jpg', category: 'dessert' }
    ]
  },
  spirits: {
    name: 'Spirits',
    icon: '🍾',
    flavors: [
      { id: 'sp1', name: 'Champagne', aroma: 'sparkling wine', img: 'https://static.wixstatic.com/media/d0044c_8f20615b3e874abfb4133df19689d084~mv2.jpg', category: 'spirits' },
      { id: 'sp2', name: 'Brandy', aroma: 'fruit brandy', img: 'https://static.wixstatic.com/media/d0044c_6cfbe4dbd8bd4ae09857deb9eb7f0650~mv2.jpg', category: 'spirits' },
      { id: 'sp3', name: 'Sangria', aroma: 'fruit wine', img: 'https://static.wixstatic.com/media/d0044c_5e415c9b59c7452f913735505ba9b4b7~mv2.jpg', category: 'spirits' },
      { id: 'sp4', name: 'Irish Cream', aroma: 'creamy liqueur', img: 'https://static.wixstatic.com/media/d0044c_1f5f0af7310a49cdb40186e5b463273a~mv2.jpg', category: 'spirits' },
      { id: 'sp5', name: 'Amaretto', aroma: 'almond liqueur', img: 'https://static.wixstatic.com/media/d0044c_1f1ae660a2ab4a219f49d1740583cca8~mv2.jpg', category: 'spirits' }
    ]
  }
};

const PACKAGING: Packaging[] = [
  {
    id: 'tube',
    name: 'Classic 6-Pack',
    description: 'Traditional twist-up tubes, perfect for on-the-go application',
    price: 26,
    url: 'https://www.lathergreen.com/product-page/lathergreen-6-pack-natural-lip-balm-set'
  },
  {
    id: 'luxury',
    name: 'Luxury Gold 6-Pack',
    description: 'Elegant gold-plated containers for a premium experience',
    price: 39,
    url: 'https://www.lathergreen.com/product-page/lathergreen-luxury-gold-6-pack-natural-lip-balm-set'
  }
];

export default function Home() {
  const [base, setBase] = useState<string | null>(null);
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [packaging, setPackaging] = useState<string | null>(null);
  const [creationName, setCreationName] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [expandedIngredients, setExpandedIngredients] = useState<Set<string>>(new Set());
  const [activeFlavorTab, setActiveFlavorTab] = useState('nutty');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedEffects, setSelectedEffects] = useState<Set<string>>(new Set());

  const toggleIngredientAccordion = (baseId: string) => {
    const newExpanded = new Set(expandedIngredients);
    if (newExpanded.has(baseId)) {
      newExpanded.delete(baseId);
    } else {
      newExpanded.add(baseId);
    }
    setExpandedIngredients(newExpanded);
  };

  const toggleFlavor = (flavor: Flavor) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    const existingIndex = flavors.findIndex(f => f.id === flavor.id);
    if (existingIndex > -1) {
      setFlavors(flavors.filter(f => f.id !== flavor.id));
      toast(`💋 Removed ${flavor.name} from your blend`);
    } else {
      if (flavors.length >= 2) {
        toast.error('⚠️ Maximum 2 flavors allowed! Remove one first.');
        return;
      }
      setFlavors([...flavors, flavor]);
      setSelectedEffects(new Set([`flavor-${flavor.id}`]));
      setTimeout(() => setSelectedEffects(new Set()), 1000);
      
      const flavorEmojis = {
        nutty: '🥜',
        vanilla: '🍦', 
        chocolate: '🍫',
        fruity: '🍓',
        floral: '🌹',
        minty: '🌿',
        spicy: '🌶️',
        dessert: '🍰',
        spirits: '🍾'
      };
      
      const emoji = flavorEmojis[flavor.category as keyof typeof flavorEmojis] || '✨';
      toast.success(`${emoji} ${flavor.name} added! Delicious choice!`);
      
      if (flavors.length === 1) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    }
  };

  const handleOrder = () => {
    if (!base) {
      toast.error('Please select a lip balm base');
      return;
    }

    // Celebration effect if user has completed everything
    if (base && flavors.length > 0 && packaging && creationName) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      toast.success('🎉 Perfect! Your custom lip balm creation is complete!');
    }

    const selectedPackaging = PACKAGING.find(p => p.id === packaging) || PACKAGING[0];
    
    // Direct checkout - simple and reliable
    toast.success('Opening checkout...');
    window.open(selectedPackaging.url, '_blank', 'noopener,noreferrer');
  };

  const copySummary = async () => {
    const selectedBase = BASES.find(b => b.id === base);
    const selectedPackaging = PACKAGING.find(p => p.id === packaging);
    
    const summary = [
      'LatherGreen — Your Custom Lip Balm',
      `Name: ${creationName || 'Unnamed Creation'}`,
      `Base: ${selectedBase?.name || 'None'}`,
      `Flavors: ${flavors.map(f => f.name).join(', ') || 'None'}`,
      `Packaging: ${selectedPackaging?.name || 'None'}`,
      `Price: $${selectedPackaging?.price || 26}`,
      '',
      '6 lip balms of your unique creation will be made for you.'
    ].join('\n');

    console.log('Attempting to copy summary:', summary);

    // Method 1: Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(summary);
        console.log('✅ Copied using modern Clipboard API');
        toast.success('Summary copied to clipboard!');
        return;
      } catch (err) {
        console.log('❌ Clipboard API failed:', err);
      }
    }

    // Method 2: Try execCommand fallback
    try {
      const textArea = document.createElement('textarea');
      textArea.value = summary;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        console.log('✅ Copied using execCommand fallback');
        toast.success('Summary copied to clipboard!');
        return;
      } else {
        console.log('❌ execCommand failed');
      }
    } catch (err) {
      console.log('❌ execCommand error:', err);
    }

    // Method 3: Manual copy prompt
    try {
      // Create a temporary input to show user what to copy
      const textArea = document.createElement('textarea');
      textArea.value = summary;
      textArea.style.position = 'fixed';
      textArea.style.left = '50%';
      textArea.style.top = '50%';
      textArea.style.transform = 'translate(-50%, -50%)';
      textArea.style.width = '400px';
      textArea.style.height = '200px';
      textArea.style.padding = '10px';
      textArea.style.fontSize = '14px';
      textArea.style.border = '2px solid #059669';
      textArea.style.borderRadius = '8px';
      textArea.style.zIndex = '9999';
      textArea.readOnly = false;
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      // Show instruction
      toast.info('Please press Ctrl+C (or Cmd+C on Mac) to copy');
      
      // Remove after 5 seconds
      setTimeout(() => {
        if (document.body.contains(textArea)) {
          document.body.removeChild(textArea);
        }
      }, 5000);
      
      console.log('📋 Manual copy mode activated');
    } catch (err) {
      console.log('❌ Manual copy failed:', err);
      
      // Last resort: Show in alert
      alert('Copy failed. Here is your summary:\n\n' + summary);
      toast.error('Could not copy automatically. Text shown in alert.');
    }
  };

  const totalPrice = PACKAGING.find(p => p.id === packaging)?.price || 26;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-stone-50/20 to-emerald-50/30 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '✨', '🌟', '💫', '⭐', '🎊', '💛', '💚'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}

      {/* VIDEO SECTION - COMPLETELY CLEAN */}
      <div className="bg-black" style={{ height: '600px', position: 'relative' }}>
        <video
          style={{ 
            width: '100%', 
            height: '600px', 
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          src="https://video.wixstatic.com/video/d0044c_f3d9ec42efca48c2879fbcbe6439db88/1080p/mp4/file.mp4?v=3"
        />
        <button
          onClick={() => setIsMuted(!isMuted)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '8px 16px',
            borderRadius: '8px',
            zIndex: 100
          }}
        >
          {isMuted ? '🔇 Sound' : '🔊 Mute'}
        </button>
      </div>

      {/* TEXT SECTION - BELOW VIDEO */}
      <div className="bg-white py-8 sm:py-12 lg:py-16 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            LatherGreen Lip Balm Factory
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            Create your custom lip balm with premium ingredients. Mix up to 2 flavors to craft your perfect blend.
          </p>
          <button
            onClick={() => document.getElementById('customizer-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Creating
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-6xl" id="customizer-section">
        {/* Educational Section */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-stone-50 to-gray-50 border-l-4 border-l-stone-400">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-stone-800 text-lg sm:text-xl">Understanding Flavor Categories</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-white rounded-lg border border-stone-200">
                <h4 className="font-semibold text-stone-800 mb-1 sm:mb-2 text-sm sm:text-base">🥜 Nutty & Buttery</h4>
                <p className="text-xs sm:text-sm text-gray-600">Rich, creamy flavors like macadamia, almond, and coconut. Add depth and warmth to your blend.</p>
              </div>
              <div className="p-3 sm:p-4 bg-white rounded-lg border border-stone-200">
                <h4 className="font-semibold text-stone-800 mb-1 sm:mb-2 text-sm sm:text-base">🍓 Fruity & Floral</h4>
                <p className="text-xs sm:text-sm text-gray-600">Bright, refreshing flavors like berries, citrus, and rose. Add a burst of freshness.</p>
              </div>
              <div className="p-3 sm:p-4 bg-white rounded-lg border border-stone-200 sm:col-span-2 lg:col-span-1">
                <h4 className="font-semibold text-stone-800 mb-1 sm:mb-2 text-sm sm:text-base">🌿 Minty & Spicy</h4>
                <p className="text-xs sm:text-sm text-gray-600">Cool, refreshing or warm, aromatic flavors. Provide unique sensations.</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              <strong>Pro Tip:</strong> Try combining flavors from different categories for unique taste experiences! 
              For example, mix chocolate with mint for a classic combination, or try vanilla with berry for a sweet treat.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-gradient-to-br from-gray-50 to-stone-50 border-l-4 border-l-gray-400">
          <CardHeader>
            <CardTitle className="text-stone-800">What is a Lip Balm Base?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              A lip balm <strong>base</strong> is the foundation of your lip balm, providing the moisturizing and protective properties.
              Our premium base is made with natural oils and butters that nourish your lips while carrying the flavors you select.
            </p>
            <p className="text-muted-foreground">
              Our base includes organic coconut oil, shea butter, and vitamin E. You can customize it with up to two flavor notes
              to create your perfect lip balm blend.
            </p>
          </CardContent>
        </Card>

        {/* Mini-Lesson Section */}
        <Card className="mb-8 bg-gradient-to-br from-stone-50 via-gray-50 to-stone-100 border-l-4 border-l-stone-700">
          <CardHeader>
            <CardTitle className="text-stone-800">🎓 Mini-Lesson: The Art of Flavor Pairing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-stone-800 mb-3">Classic Combinations</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-600">•</span>
                    <span><strong>Chocolate + Mint:</strong> Refreshing and indulgent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-600">•</span>
                    <span><strong>Vanilla + Berry:</strong> Sweet and fruity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-600">•</span>
                    <span><strong>Coconut + Pineapple:</strong> Tropical paradise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-600">•</span>
                    <span><strong>Cinnamon + Orange:</strong> Warm and zesty</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-stone-800 mb-3">Adventurous Pairings</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-stone-600">•</span>
                    <span><strong>Lavender + Honey:</strong> Calming and sweet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-600">•</span>
                    <span><strong>Ginger + Peach:</strong> Spicy and sweet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-600">•</span>
                    <span><strong>Rose + Vanilla:</strong> Floral and creamy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-stone-600">•</span>
                    <span><strong>Green Tea + Lemon:</strong> Fresh and tangy</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              Remember: The best flavor combinations are the ones you love! Don't be afraid to experiment.
            </p>
          </CardContent>
        </Card>

        {/* Base Selection */}
        <Card className="mb-8 border-l-4 border-l-emerald-700 bg-gradient-to-br from-amber-50/40 to-stone-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 text-white rounded-full text-sm font-bold shadow-md"
              style={{ background: 'linear-gradient(135deg, rgb(75 85 99), rgb(59 86 71))' }}>1</span>
              Choose Your Lip Balm Base
            </CardTitle>
            <CardDescription>Select one base for your lip balm</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {BASES.map((baseOption) => (
                <div
                  key={baseOption.id}
                  className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                    base === baseOption.id
                      ? 'border-emerald-600 bg-gradient-to-br from-amber-50 to-stone-50 shadow-lg'
                      : 'border-gray-200 hover:border-emerald-500 hover:shadow-md'
                  } ${selectedEffects.has(`base-${baseOption.id}`) ? 'animate-pulse ring-4 ring-yellow-300/50' : ''}`}
                  onClick={() => {
                    setBase(baseOption.id);
                    setSelectedEffects(new Set([`base-${baseOption.id}`]));
                    setTimeout(() => setSelectedEffects(new Set()), 1000);
                    toast.success(`🎉 ${baseOption.name} selected! Perfect choice for your lips!`);
                  }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-stone-800">{baseOption.name}</h3>
                      {base === baseOption.id && (
                        <Badge className="text-white"
              style={{ background: 'linear-gradient(135deg, rgb(212 175 55), rgb(184 134 11))' }}>
                          <Check className="w-3 h-3 mr-1" />
                          Selected
                        </Badge>
                      )}
                    </div>
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={baseOption.img}
                        alt={baseOption.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400">Image not available</div>`;
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{baseOption.profile}</p>
                    
                    <div className="border-t pt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleIngredientAccordion(baseOption.id);
                        }}
                        className="w-full justify-between text-stone-600 hover:text-stone-800"
                      >
                        View Ingredients
                        {expandedIngredients.has(baseOption.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      
                      {expandedIngredients.has(baseOption.id) && (
                        <div className="mt-4 p-4 bg-gradient-to-br from-stone-50 to-gray-50 rounded-lg border border-stone-200">
                          <h4 className="font-semibold mb-2 text-stone-800">Ingredients:</h4>
                          <ul className="text-sm space-y-1">
                            {baseOption.ingredients.map((ing, idx) => (
                              <li key={idx} className="flex justify-between">
                                <span>{ing.name}</span>
                                <span className="text-gray-500">({ing.type})</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-sm text-gray-600 mt-3 italic">{baseOption.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {base && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={() => setBase(null)} className="border-stone-300 text-stone-600 hover:bg-stone-50">
                  Clear Selection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Flavor Selection */}
        <Card className="mb-8 border-l-4 border-l-emerald-700 bg-gradient-to-br from-amber-50/40 to-stone-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 text-white rounded-full text-sm font-bold shadow-md"
              style={{ background: 'linear-gradient(135deg, rgb(75 85 99), rgb(59 86 71))' }}>2</span>
              Pick Your Flavors
            </CardTitle>
            <CardDescription>Choose up to 2 flavors to create your perfect blend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-amber-50 to-stone-50 border-l-4 border-amber-500 p-4 mb-6 rounded">
              <p className="font-medium text-stone-800">
                <Sparkles className="w-4 h-4 inline mr-2" />
                You can pick two flavors to blend together or just one for a single-note experience.
              </p>
            </div>

            <Tabs value={activeFlavorTab} onValueChange={setActiveFlavorTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-9 h-auto bg-gradient-to-r from-stone-100 to-gray-100">
                {Object.entries(FLAVOR_CATEGORIES).map(([key, category]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="text-xs md:text-sm p-2 h-auto flex flex-col gap-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-stone-200 data-[state=active]:to-gray-200"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="hidden md:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(FLAVOR_CATEGORIES).map(([key, category]) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.flavors.map((flavor) => {
                      const isSelected = flavors.some(f => f.id === flavor.id);
                      return (
                        <div
                          key={flavor.id}
                          onClick={() => toggleFlavor(flavor)}
                          className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                            isSelected
                              ? 'border-emerald-600 bg-gradient-to-br from-amber-50 to-stone-50'
                              : 'border-gray-200 hover:border-emerald-500'
                          } ${selectedEffects.has(`flavor-${flavor.id}`) ? 'animate-pulse ring-4 ring-amber-300/50 scale-105' : ''} hover:scale-105`}
                        >
                          {isSelected && (
                            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-600 to-yellow-600">
                              <Check className="w-3 h-3" />
                            </Badge>
                          )}
                          <div className="w-full h-20 mb-3 rounded overflow-hidden bg-gray-100">
                            <img
                              src={flavor.img}
                              alt={flavor.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">Image</div>`;
                              }}
                            />
                          </div>
                          <h4 className="font-semibold text-sm text-stone-800">{flavor.name}</h4>
                          <p className="text-xs text-gray-500">{flavor.aroma}</p>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Selected Flavors */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3 text-stone-800">Your Selected Flavors</h3>
              {flavors.length === 0 ? (
                <p className="text-muted-foreground">No flavors selected yet. You can proceed with just a base if you prefer.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {flavors.map((flavor) => (
                    <Badge
                      key={flavor.id}
                      variant="secondary"
                      className="px-3 py-1 flex items-center gap-2 bg-gradient-to-r from-stone-100 to-gray-100 text-stone-800 hover:from-stone-200 hover:to-gray-200 border border-stone-300"
                    >
                      {flavor.name}
                      <button
                        onClick={() => toggleFlavor(flavor)}
                        className="ml-1 hover:bg-stone-300 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Lip Balm Visualization */}
            <div className="mt-8 flex justify-center">
              <div className="relative">
                <div className={`w-32 h-32 rounded-full shadow-xl flex items-center justify-center transition-all duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}
                style={{ background: 'linear-gradient(135deg, rgb(203 213 225), rgb(107 114 128), rgb(59 86 71))' }}>
                  <div className="w-20 h-20 bg-gradient-to-br from-stone-100 to-gray-100 rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="text-2xl font-bold text-stone-800 z-10">
                      {flavors.length === 0 ? '👄' : flavors.slice(0, 2).map(f => 
                        f.category === 'nutty' ? '🥜' :
                        f.category === 'vanilla' ? '🍦' :
                        f.category === 'chocolate' ? '🍫' :
                        f.category === 'fruity' ? '🍓' :
                        f.category === 'floral' ? '🌹' :
                        f.category === 'minty' ? '🌿' :
                        f.category === 'spicy' ? '🌶️' :
                        f.category === 'dessert' ? '🍰' :
                        f.category === 'spirits' ? '🍾' : '✨'
                      ).join(' ')}
                    </div>
                    {/* Animated flavor bubbles */}
                    {flavors.map((flavor, index) => (
                      <div
                        key={flavor.id}
                        className={`absolute w-3 h-3 rounded-full animate-pulse ${
                          flavor.category === 'nutty' ? 'bg-stone-500' :
                          flavor.category === 'vanilla' ? 'bg-stone-300' :
                          flavor.category === 'chocolate' ? 'bg-gray-700' :
                          flavor.category === 'fruity' ? 'bg-rose-400' :
                          flavor.category === 'floral' ? 'bg-rose-300' :
                          flavor.category === 'minty' ? 'bg-stone-400' :
                          flavor.category === 'spicy' ? 'bg-red-500' :
                          flavor.category === 'dessert' ? 'bg-orange-400' :
                          flavor.category === 'spirits' ? 'bg-purple-500' : 'bg-gray-400'
                        }`}
                        style={{
                          top: `${20 + index * 25}%`,
                          left: `${30 + index * 20}%`,
                          animationDelay: `${index * 0.2}s`,
                          animationDuration: '2s'
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <p className="text-sm text-gray-600 whitespace-nowrap font-medium bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                    {flavors.length === 0 ? 'Your Creation' : flavors.map(f => f.name).join(' + ')}
                  </p>
                </div>
                {/* Enhanced sparkle effects when flavors are selected */}
                {isAnimating && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 animate-ping"
                        style={{
                          top: `${15 + i * 12}%`,
                          left: `${5 + i * 12}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '1.5s',
                          background: [
                            'linear-gradient(45deg, #fbbf24, #f59e0b)',
                            'linear-gradient(45deg, #34d399, #10b981)', 
                            'linear-gradient(45deg, #60a5fa, #3b82f6)',
                            'linear-gradient(45deg, #f87171, #ef4444)',
                            'linear-gradient(45deg, #a78bfa, #8b5cf6)',
                            'linear-gradient(45deg, #fb923c, #f97316)',
                            'linear-gradient(45deg, #fde047, #facc15)',
                            'linear-gradient(45deg, #d4af37, #b8941f)'
                          ][i % 8],
                          borderRadius: '50%'
                        }}
                      />
                    ))}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`star-${i}`}
                        className="absolute text-lg animate-spin"
                        style={{
                          top: `${10 + i * 15}%`,
                          right: `${5 + i * 15}%`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: `${2 + i * 0.5}s`
                        }}
                      >
                        {['✨', '⭐', '🌟', '💫', '🌠', '💛'][i]}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Packaging Selection */}
        <Card className="mb-8 border-l-4 border-l-emerald-700 bg-gradient-to-br from-amber-50/40 to-stone-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 text-white rounded-full text-sm font-bold shadow-md"
            style={{ background: 'linear-gradient(135deg, rgb(75 85 99), rgb(59 86 71))' }}>3</span>
              Choose Your Packaging
            </CardTitle>
            <CardDescription>Select the perfect packaging for your custom lip balm</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {PACKAGING.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => {
                    setPackaging(pkg.id);
                    setSelectedEffects(new Set([`packaging-${pkg.id}`]));
                    setTimeout(() => setSelectedEffects(new Set()), 1000);
                    toast.success(`🎁 ${pkg.name} selected! Your creation will look amazing!`);
                  }}
                  className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all ${
                    packaging === pkg.id
                      ? 'border-emerald-700 bg-gradient-to-br from-amber-50 to-stone-50 shadow-lg'
                      : 'border-gray-200 hover:border-emerald-600 hover:shadow-md'
                  } ${selectedEffects.has(`packaging-${pkg.id}`) ? 'animate-pulse ring-4 ring-amber-300/50 scale-105' : ''} hover:scale-105`}
                >
                  {pkg.id === 'luxury' && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
                      <Sparkles className="w-3 h-3 mr-1" />
                      LUXURY
                    </Badge>
                  )}
                  <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center">
                    <img 
                      src={pkg.id === 'tube' 
                        ? 'https://static.wixstatic.com/media/d0044c_2f115f6f114d461e9383992bbf32d295~mv2.jpg'
                        : 'https://static.wixstatic.com/media/d0044c_fb15dc1ae9a14a39808c3026f1eace4f~mv2.jpg'
                      } 
                      alt={pkg.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-stone-800">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">${pkg.price} for 6</p>
                  {packaging === pkg.id && (
                    <Badge className="mt-3 text-white"
            style={{ background: 'linear-gradient(135deg, rgb(212 175 55), rgb(184 134 11))' }}>
                      <Check className="w-3 h-3 mr-1" />
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            {packaging && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={() => setPackaging(null)} className="border-stone-300 text-stone-600 hover:bg-stone-50">
                  Clear Selection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Name Your Creation */}
        <Card className="mb-8 border-l-4 border-l-emerald-700 bg-gradient-to-br from-amber-50/40 to-stone-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 text-white rounded-full text-sm font-bold shadow-md"
            style={{ background: 'linear-gradient(135deg, rgb(75 85 99), rgb(59 86 71))' }}>4</span>
              Name Your Creation
            </CardTitle>
            <CardDescription>Give your custom lip balm blend a unique name (optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="creationName">Creation Name</Label>
                <Input
                  id="creationName"
                  placeholder="My Lip Balm"
                  value={creationName}
                  onChange={(e) => setCreationName(e.target.value.slice(0, 20))}
                  maxLength={20}
                  className="border-stone-300 focus:border-stone-500"
                />
                <p className="text-sm text-gray-500 mt-1">{creationName.length}/20 characters</p>
              </div>
              <Button onClick={() => toast.success('Name saved!')} className="bg-gradient-to-r from-stone-500 to-stone-700 hover:from-stone-600 hover:to-stone-800">
                <Type className="w-4 h-4 mr-2" />
                Enter Name
              </Button>
            </div>
            {creationName && (
              <div className="mt-4 p-4 bg-gradient-to-r from-stone-50 to-gray-50 rounded-lg border border-stone-200">
                <p className="text-sm">Your creation will be named:</p>
                <p className="font-semibold text-stone-800">{creationName}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview & Order */}
        <Card className="border-l-4 border-l-emerald-700 bg-gradient-to-br from-amber-50/40 to-stone-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 text-white rounded-full text-sm font-bold shadow-md"
          style={{ background: 'linear-gradient(135deg, rgb(75 85 99), rgb(59 86 71))' }}>5</span>
              Preview & Order
            </CardTitle>
            <CardDescription>Review your custom lip balm and place your order</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mobile: Compact View, Desktop: Side-by-side */}
            <div className="block lg:grid lg:grid-cols-2 gap-8">
              {/* Blend Summary - More Compact on Mobile */}
              <div className="mb-6 lg:mb-0">
                <h3 className="font-semibold mb-3 lg:mb-4 text-stone-800 text-base lg:text-lg">Blend Summary</h3>
                <div className="space-y-2 lg:space-y-3">
                  {creationName && (
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-sm lg:text-base">Name:</span>
                      <span className="text-stone-800 text-sm lg:text-base text-right max-w-[60%] truncate">{creationName}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-1">
                    <span className="font-medium text-sm lg:text-base">Base:</span>
                    <span className="text-sm lg:text-base text-right max-w-[60%]">{BASES.find(b => b.id === base)?.name || 'None'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-medium text-sm lg:text-base">Flavors:</span>
                    <span className="text-sm lg:text-base text-right max-w-[60%]">{flavors.length > 0 ? flavors.map(f => f.name).join(', ') : 'None'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-medium text-sm lg:text-base">Packaging:</span>
                    <span className="text-sm lg:text-base text-right max-w-[60%]">{PACKAGING.find(p => p.id === packaging)?.name || 'None'}</span>
                  </div>
                </div>
                
                {base && flavors.length > 0 && packaging && (
                  <div className="mt-4 p-3 lg:p-4 bg-gradient-to-r from-amber-100 via-stone-100 to-amber-100 rounded-lg border border-amber-300">
                    <p className="text-stone-800 font-semibold text-center text-sm lg:text-base">
                      🎉 Your custom blend is ready!
                    </p>
                    <p className="text-stone-600 text-xs lg:text-sm text-center mt-1">
                      Copy summary below to order
                    </p>
                  </div>
                )}
              </div>
              
              {/* Order Details - More Compact on Mobile */}
              <div>
                <h3 className="font-semibold mb-3 lg:mb-4 text-stone-800 text-base lg:text-lg">Order Details</h3>
                <div className="bg-gradient-to-br from-amber-50 to-stone-50 p-3 lg:p-4 rounded-lg border border-amber-200">
                  <div className="space-y-1 lg:space-y-2 mb-3 lg:mb-4 text-sm lg:text-base">
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span className="font-medium">6 lip balms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Base:</span>
                      <span className="font-medium truncate max-w-[50%]">{BASES.find(b => b.id === base)?.name || 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flavors:</span>
                      <span className="font-medium truncate max-w-[50%]">{flavors.length > 0 ? flavors.map(f => f.name).join(', ') : 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Packaging:</span>
                      <span className="font-medium truncate max-w-[50%]">{PACKAGING.find(p => p.id === packaging)?.name || 'Classic'}</span>
                    </div>
                  </div>
                  <Separator className="my-2 lg:my-4" />
                  <div className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent text-center">
                    Total: ${totalPrice}
                  </div>
                </div>
                
                {/* Stacked Buttons on Mobile, Side-by-side on Desktop */}
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 mt-4 lg:mt-6">
                  <Button onClick={handleOrder} className="flex-1 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm lg:text-base py-2 lg:py-3" 
                    style={{ background: 'linear-gradient(135deg, rgb(217 119 6), rgb(180 83 9))' }}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order - ${totalPrice}
                  </Button>
                  <Button onClick={copySummary} variant="outline" className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 text-sm lg:text-base py-2 lg:py-3">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Summary
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}