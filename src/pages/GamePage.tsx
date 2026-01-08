import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

const gamesData = {
  'fs25': {
    title: 'Farming Simulator 25',
    shortName: 'FS 25',
    description: 'Новейшая версия легендарного симулятора фермера с улучшенной графикой и новыми механиками',
    release: '2024',
    features: ['Новый движок', 'Улучшенная физика', 'Больше техники', 'Новые карты'],
    banner: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&auto=format&fit=crop',
  },
  'fs22': {
    title: 'Farming Simulator 22',
    shortName: 'FS 22',
    description: 'Проверенная временем версия с огромным сообществом и тысячами модов',
    release: '2021',
    features: ['Сезонный цикл', 'Production chains', 'Кооператив', 'Crossplay'],
    banner: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600&auto=format&fit=crop',
  },
  'fs19': {
    title: 'Farming Simulator 19',
    shortName: 'FS 19',
    description: 'Классическая версия с огромной библиотекой модификаций',
    release: '2018',
    features: ['Лесное хозяйство', 'Конный спорт', 'Большой выбор техники', 'Стабильность'],
    banner: 'https://images.unsplash.com/photo-1589306060500-adc8edfb5ce4?w=1600&auto=format&fit=crop',
  },
};

const allMods = [
  {
    id: 1,
    title: 'John Deere 9RX Series',
    game: 'FS 25',
    author: 'ModMaster',
    downloads: 12543,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
    category: 'Трактора',
    featured: true
  },
  {
    id: 2,
    title: 'Claas Lexion 8900',
    game: 'FS 25',
    author: 'ProMod',
    downloads: 15234,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop',
    category: 'Комбайны',
    featured: true
  },
  {
    id: 3,
    title: 'Holmer Terra Dos',
    game: 'FS 25',
    author: 'ProMod',
    downloads: 7654,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop',
    category: 'Техника',
    featured: false
  },
  {
    id: 4,
    title: 'Krone BigX 1180 Harvester',
    game: 'FS 22',
    author: 'FarmFan',
    downloads: 8932,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop',
    category: 'Комбайны',
    featured: true
  },
  {
    id: 5,
    title: 'New Holland T7 HD',
    game: 'FS 22',
    author: 'FarmKing',
    downloads: 11234,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop',
    category: 'Трактора',
    featured: true
  },
  {
    id: 6,
    title: 'Massey Ferguson 8S',
    game: 'FS 22',
    author: 'ModMaster',
    downloads: 9543,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop',
    category: 'Трактора',
    featured: false
  },
  {
    id: 7,
    title: 'Fendt 1000 Vario',
    game: 'FS 19',
    author: 'ModMaster',
    downloads: 9876,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1589306060500-adc8edfb5ce4?w=800&auto=format&fit=crop',
    category: 'Трактора',
    featured: true
  },
  {
    id: 8,
    title: 'Case IH Quadtrac 620',
    game: 'FS 19',
    author: 'FarmPro',
    downloads: 13421,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
    category: 'Трактора',
    featured: true
  },
  {
    id: 9,
    title: 'Valtra T Series',
    game: 'FS 19',
    author: 'ProMod',
    downloads: 7234,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop',
    category: 'Трактора',
    featured: false
  },
];

export default function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');

  const gameData = gamesData[gameId as keyof typeof gamesData];

  if (!gameData) {
    navigate('/');
    return null;
  }

  const gameMods = allMods.filter(mod => mod.game === gameData.shortName);
  const featuredMods = gameMods.filter(mod => mod.featured);
  
  const filteredMods = gameMods.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-[#1a2530] bg-[#0d151a] backdrop-blur">
        <div className="container flex h-16 items-center gap-4 px-4 md:px-8">
          <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <Icon name="Gamepad2" size={28} className="text-primary" />
            <h1 className="text-xl font-bold text-[#ffffff]">ModHub</h1>
          </div>
          
          <nav className="hidden lg:flex items-center gap-4">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors text-[#ffffff] whitespace-nowrap">
              О проекте
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors text-[#ffffff] whitespace-nowrap">
              Новости
            </a>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-[#ffffff] hover:text-primary hover:bg-[#1a2530]">
                  <Icon name="Gamepad2" size={16} className="mr-2" />
                  {gameData.shortName}
                  <Icon name="ChevronDown" size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0d151a] border-[#1a2530]">
                <DropdownMenuItem 
                  onClick={() => navigate('/')}
                  className="text-[#ffffff] focus:bg-[#1a2530] focus:text-primary cursor-pointer"
                >
                  Все игры
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/game/fs25')}
                  className="text-[#ffffff] focus:bg-[#1a2530] focus:text-primary cursor-pointer"
                >
                  Farming Simulator 25
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/game/fs22')}
                  className="text-[#ffffff] focus:bg-[#1a2530] focus:text-primary cursor-pointer"
                >
                  Farming Simulator 22
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/game/fs19')}
                  className="text-[#ffffff] focus:bg-[#1a2530] focus:text-primary cursor-pointer"
                >
                  Farming Simulator 19
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ffffff]/60" />
              <Input
                placeholder="Поиск модов..."
                className="pl-10 bg-[#1a2530] border-[#1a2530] text-[#ffffff] placeholder:text-[#ffffff]/60 focus-visible:ring-primary"
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button onClick={() => navigate('/upload')} className="hidden sm:flex">
              <Icon name="Upload" size={18} className="mr-2" />
              Загрузить мод
            </Button>
            <Button onClick={() => navigate('/upload')} size="icon" className="sm:hidden">
              <Icon name="Upload" size={18} />
            </Button>
            <Avatar className="cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={gameData.banner} 
            alt={gameData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>
        
        <div className="container relative h-full flex flex-col justify-end px-4 md:px-8 pb-12">
          <Badge className="w-fit mb-4 bg-primary text-primary-foreground">
            {gameData.release}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{gameData.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            {gameData.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {gameData.features.map((feature, idx) => (
              <Badge key={idx} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon name="Package" size={24} className="text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">{gameMods.length}</CardTitle>
              <CardDescription>Модов для {gameData.shortName}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon name="Download" size={24} className="text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                {gameMods.reduce((sum, mod) => sum + mod.downloads, 0).toLocaleString()}
              </CardTitle>
              <CardDescription>Всего скачиваний</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon name="Star" size={24} className="text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                {(gameMods.reduce((sum, mod) => sum + mod.rating, 0) / gameMods.length).toFixed(1)}
              </CardTitle>
              <CardDescription>Средний рейтинг</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="featured" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="featured">
              <Icon name="Star" size={16} className="mr-2" />
              Рекомендуемые
            </TabsTrigger>
            <TabsTrigger value="all">
              <Icon name="Grid" size={16} className="mr-2" />
              Все моды
            </TabsTrigger>
            <TabsTrigger value="new">
              <Icon name="Clock" size={16} className="mr-2" />
              Новинки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMods.map((mod) => (
                <Card key={mod.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={mod.image} 
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary">Рекомендуем</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-1">{mod.title}</CardTitle>
                      <div className="flex items-center gap-1 shrink-0">
                        <Icon name="Star" size={16} className="text-primary fill-primary" />
                        <span className="text-sm font-semibold">{mod.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="User" size={14} />
                      {mod.author}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="Download" size={16} />
                      {mod.downloads.toLocaleString()}
                    </div>
                    <Button size="sm">
                      Скачать
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="flex justify-between items-center mb-6">
              <div className="relative flex-1 max-w-md">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по модам..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[160px] ml-4">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="Трактора">Трактора</SelectItem>
                  <SelectItem value="Комбайны">Комбайны</SelectItem>
                  <SelectItem value="Техника">Техника</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMods.map((mod) => (
                <Card key={mod.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={mod.image} 
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-secondary">{mod.category}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-1">{mod.title}</CardTitle>
                      <div className="flex items-center gap-1 shrink-0">
                        <Icon name="Star" size={16} className="text-primary fill-primary" />
                        <span className="text-sm font-semibold">{mod.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="User" size={14} />
                      {mod.author}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="Download" size={16} />
                      {mod.downloads.toLocaleString()}
                    </div>
                    <Button size="sm">
                      Скачать
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameMods.slice(0, 6).map((mod) => (
                <Card key={mod.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={mod.image} 
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-green-500">Новинка</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-1">{mod.title}</CardTitle>
                      <div className="flex items-center gap-1 shrink-0">
                        <Icon name="Star" size={16} className="text-primary fill-primary" />
                        <span className="text-sm font-semibold">{mod.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="User" size={14} />
                      {mod.author}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="Download" size={16} />
                      {mod.downloads.toLocaleString()}
                    </div>
                    <Button size="sm">
                      Скачать
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <footer className="border-t mt-12">
        <div className="container px-4 md:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-semibold mb-3">Платформа</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О проекте</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Правила</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Сообщество</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Форум</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Telegram</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Помощь</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Поддержка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Для авторов</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Загрузить мод</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гайды</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Статистика</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 ModHub. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
