import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

const mockMods = [
  {
    id: 1,
    title: 'John Deere 9RX Series',
    game: 'FS 25',
    author: 'ModMaster',
    downloads: 12543,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
    category: 'Трактора'
  },
  {
    id: 2,
    title: 'Krone BigX 1180 Harvester',
    game: 'FS 22',
    author: 'FarmFan',
    downloads: 8932,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop',
    category: 'Комбайны'
  },
  {
    id: 3,
    title: 'Claas Lexion 8900',
    game: 'FS 25',
    author: 'ProMod',
    downloads: 15234,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop',
    category: 'Комбайны'
  },
  {
    id: 4,
    title: 'Fendt 1000 Vario',
    game: 'FS 19',
    author: 'ModMaster',
    downloads: 9876,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1589306060500-adc8edfb5ce4?w=800&auto=format&fit=crop',
    category: 'Трактора'
  },
  {
    id: 5,
    title: 'New Holland T7 HD',
    game: 'FS 22',
    author: 'FarmKing',
    downloads: 11234,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop',
    category: 'Трактора'
  },
  {
    id: 6,
    title: 'Holmer Terra Dos',
    game: 'FS 25',
    author: 'ProMod',
    downloads: 7654,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop',
    category: 'Техника'
  }
];

const mockComments = [
  {
    id: 1,
    author: 'Farmer123',
    avatar: 'F',
    text: 'Отличный мод! Работает без ошибок в последней версии игры.',
    time: '2 часа назад'
  },
  {
    id: 2,
    author: 'ModLover',
    avatar: 'M',
    text: 'Спасибо за мод, но у меня проблема с текстурами. Как исправить?',
    time: '5 часов назад'
  },
  {
    id: 3,
    author: 'ProGamer',
    avatar: 'P',
    text: 'Лучший мод для FS 25! Рекомендую всем.',
    time: '1 день назад'
  }
];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMods = mockMods.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === 'all' || mod.game === selectedGame;
    const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
    return matchesSearch && matchesGame && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-[#1a2530] bg-[#0d151a] backdrop-blur">
        <div className="container flex h-16 items-center gap-4 px-4 md:px-8">
          <div className="flex items-center gap-2 shrink-0">
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
                  {selectedGame === 'all' ? 'Все игры' : selectedGame}
                  <Icon name="ChevronDown" size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0d151a] border-[#1a2530]">
                <DropdownMenuItem 
                  onClick={() => setSelectedGame('all')}
                  className="text-[#ffffff] focus:bg-[#1a2530] focus:text-primary cursor-pointer"
                >
                  Все игры
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSelectedGame('FS 25')}
                  className="text-[#ffffff] focus:bg-[#1a2530] focus:text-primary cursor-pointer"
                >
                  Farming Simulator 25
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSelectedGame('FS 22')}
                  className="text-[#ffffff] focus:bg-[#1a2530] focus:text-primary cursor-pointer"
                >
                  Farming Simulator 22
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSelectedGame('FS 19')}
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

      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-20">
        <div className="container px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">🎮 Платформа #1 для модов</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Модификации для игр. Сделай свою игру ярче.</h2>
            <p className="text-lg text-muted-foreground">
              Более 10,000 модификаций от сообщества. Скачивай, делись и обсуждай.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <div className="relative flex-1">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск модов..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="h-12 px-8">
                <Icon name="Search" size={18} className="mr-2" />
                Найти
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center pt-4">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Трактора
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Комбайны
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Прицепы
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Карты
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Инструменты
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon name="Download" size={24} className="text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">127K+</CardTitle>
              <CardDescription>Скачиваний в месяц</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">8.5K+</CardTitle>
              <CardDescription>Активных авторов</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon name="Package" size={24} className="text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">10.2K+</CardTitle>
              <CardDescription>Модификаций</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Каталог модов</h3>
          
          <div className="flex gap-3">
            <Select value={selectedGame} onValueChange={setSelectedGame}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Игра" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все игры</SelectItem>
                <SelectItem value="FS 25">FS 25</SelectItem>
                <SelectItem value="FS 22">FS 22</SelectItem>
                <SelectItem value="FS 19">FS 19</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="Трактора">Трактора</SelectItem>
                <SelectItem value="Комбайны">Комбайны</SelectItem>
                <SelectItem value="Техника">Техника</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMods.map((mod) => (
            <Card key={mod.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={mod.image} 
                  alt={mod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-secondary">{mod.game}</Badge>
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

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-xl">Профиль пользователя</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">MM</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-lg">ModMaster</h4>
                  <p className="text-sm text-muted-foreground">Автор с 2019 года</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Загружено</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Скачиваний</p>
                    <p className="text-2xl font-bold">156K</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Рейтинг</p>
                    <p className="text-2xl font-bold">4.7</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Подписчики</p>
                    <p className="text-2xl font-bold">1.2K</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">История загрузок</h5>
                  <div className="space-y-2">
                    {mockMods.slice(0, 3).map((mod) => (
                      <div key={mod.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                        <img src={mod.image} alt={mod.title} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{mod.title}</p>
                          <p className="text-xs text-muted-foreground">{mod.downloads.toLocaleString()} скачиваний</p>
                        </div>
                        <Badge variant="outline" className="shrink-0">{mod.game}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-xl">Комментарии и обсуждения</CardTitle>
            <CardDescription>Обсуждайте моды с сообществом</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              {mockComments.map((comment) => (
                <div key={comment.id} className="flex gap-4 p-4 rounded-lg border">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10">{comment.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                    <div className="flex gap-3">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Icon name="ThumbsUp" size={14} className="mr-1" />
                        Нравится
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        Ответить
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Input placeholder="Написать комментарий..." />
              <Button>
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-muted/30 border-dashed">
            <CardHeader className="text-center">
              <Icon name="Radio" size={32} className="mx-auto mb-2 text-muted-foreground" />
              <CardDescription>Рекламное место 300x250</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-muted/30 border-dashed">
            <CardHeader className="text-center">
              <Icon name="Radio" size={32} className="mx-auto mb-2 text-muted-foreground" />
              <CardDescription>Рекламное место 300x250</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-muted/30 border-dashed">
            <CardHeader className="text-center">
              <Icon name="Radio" size={32} className="mx-auto mb-2 text-muted-foreground" />
              <CardDescription>Рекламное место 300x250</CardDescription>
            </CardHeader>
          </Card>
        </div>
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