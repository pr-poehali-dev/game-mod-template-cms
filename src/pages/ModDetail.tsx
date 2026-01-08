import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const mockModsData = {
  '1': {
    id: 1,
    title: 'John Deere 9RX Series',
    game: 'FS 25',
    author: 'ModMaster',
    authorAvatar: 'MM',
    downloads: 12543,
    rating: 4.8,
    reviews: 234,
    version: '1.2.0',
    size: '45.6 MB',
    uploadDate: '15 декабря 2024',
    updateDate: '3 января 2025',
    category: 'Трактора',
    images: [
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589306060500-adc8edfb5ce4?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&auto=format&fit=crop',
    ],
    description: 'Реалистичная и детализированная модель трактора John Deere серии 9RX. Мод включает полную анимацию всех элементов, реалистичные звуки двигателя и гидравлики, а также поддержку различных конфигураций.',
    fullDescription: `Этот мод представляет собой полностью функциональную модель трактора John Deere 9RX Series для Farming Simulator 25.

**Основные характеристики:**
- Детализированная 3D модель с высококачественными текстурами
- Реалистичная физика и управление
- Полная анимация кабины, дверей, капота
- Настраиваемые конфигурации цветов и дисков
- Рабочее освещение и сигналы поворота
- Звуки двигателя записаны с реального трактора

**Технические возможности:**
- Мощность: 470-620 л.с.
- Максимальная скорость: 40 км/ч
- Вес: 22,000 кг
- Рабочая ширина гусениц: 762 мм

**Совместимость:**
Мод полностью совместим с базовой игрой и большинством популярных модов техники и карт.`,
    specs: {
      'Мощность': '470-620 л.с.',
      'Макс. скорость': '40 км/ч',
      'Цена в игре': '$485,000',
      'Вес': '22,000 кг',
      'Топливный бак': '1,893 л',
      'Тип двигателя': 'Дизель',
    },
    changelog: [
      { version: '1.2.0', date: '3 января 2025', changes: ['Исправлены текстуры капота', 'Улучшена физика гусениц', 'Добавлены новые цвета'] },
      { version: '1.1.0', date: '20 декабря 2024', changes: ['Обновлены звуки двигателя', 'Исправлена ошибка с освещением'] },
      { version: '1.0.0', date: '15 декабря 2024', changes: ['Первый релиз мода'] },
    ],
    requirements: [
      'Farming Simulator 25',
      'Минимум 2 GB свободного места',
      'Не требует DLC',
    ],
  },
};

const mockComments = [
  {
    id: 1,
    author: 'Farmer123',
    avatar: 'F',
    rating: 5,
    text: 'Отличный мод! Очень реалистичная модель, звуки супер. Единственное, что хотелось бы - больше вариантов цветов.',
    date: '2 часа назад',
    helpful: 15,
  },
  {
    id: 2,
    author: 'ModLover',
    avatar: 'M',
    rating: 4,
    text: 'Хороший мод, но у меня проблема с текстурами гусениц на некоторых картах. Можете исправить в следующем обновлении?',
    date: '5 часов назад',
    helpful: 8,
  },
  {
    id: 3,
    author: 'ProGamer',
    avatar: 'P',
    rating: 5,
    text: 'Лучший мод трактора для FS 25! Автор проделал огромную работу. Рекомендую всем!',
    date: '1 день назад',
    helpful: 42,
  },
  {
    id: 4,
    author: 'NewbieFarmer',
    avatar: 'N',
    rating: 5,
    text: 'Спасибо за мод! Работает отлично, никаких багов. Очень нравится управление.',
    date: '2 дня назад',
    helpful: 23,
  },
];

export default function ModDetail() {
  const navigate = useNavigate();
  const { modId } = useParams<{ modId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedRating, setSelectedRating] = useState(5);

  const mod = mockModsData[modId as keyof typeof mockModsData];

  if (!mod) {
    navigate('/');
    return null;
  }

  const handleDownload = () => {
    toast.success('Скачивание начнется через несколько секунд...');
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) {
      toast.error('Напишите комментарий');
      return;
    }
    toast.success('Комментарий добавлен!');
    setNewComment('');
  };

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
                  Все игры
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
            <Avatar className="cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-8 py-8">
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/')}>Главная</span>
          <Icon name="ChevronRight" size={16} />
          <span className="cursor-pointer hover:text-primary" onClick={() => navigate(`/game/fs25`)}>{mod.game}</span>
          <Icon name="ChevronRight" size={16} />
          <span className="cursor-pointer hover:text-primary" onClick={() => navigate(`/game/fs25`)}>{mod.category}</span>
          <Icon name="ChevronRight" size={16} />
          <span>{mod.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted overflow-hidden rounded-t-lg">
                  <img 
                    src={mod.images[selectedImage]} 
                    alt={mod.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2">
                    {mod.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`shrink-0 w-20 h-20 rounded border-2 overflow-hidden transition-all ${
                          selectedImage === idx ? 'border-primary scale-105' : 'border-white/50 hover:border-white'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{mod.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="User" size={16} />
                          {mod.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={16} />
                          {mod.uploadDate}
                        </span>
                      </div>
                    </div>
                    <Badge className="text-lg">{mod.game}</Badge>
                  </div>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon 
                            key={star}
                            name="Star" 
                            size={20} 
                            className={star <= Math.round(mod.rating) ? 'text-primary fill-primary' : 'text-muted'}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{mod.rating}</span>
                      <span className="text-sm text-muted-foreground">({mod.reviews} отзывов)</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Download" size={20} />
                      <span>{mod.downloads.toLocaleString()} скачиваний</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <Tabs defaultValue="description">
                    <TabsList>
                      <TabsTrigger value="description">
                        <Icon name="FileText" size={16} className="mr-2" />
                        Описание
                      </TabsTrigger>
                      <TabsTrigger value="specs">
                        <Icon name="Settings" size={16} className="mr-2" />
                        Характеристики
                      </TabsTrigger>
                      <TabsTrigger value="changelog">
                        <Icon name="History" size={16} className="mr-2" />
                        История версий
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="space-y-4 pt-4">
                      <p className="text-muted-foreground">{mod.description}</p>
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-line">{mod.fullDescription}</div>
                      </div>
                    </TabsContent>

                    <TabsContent value="specs" className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(mod.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between p-3 rounded-lg bg-muted/50">
                            <span className="text-muted-foreground">{key}</span>
                            <span className="font-semibold">{value}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="changelog" className="pt-4 space-y-4">
                      {mod.changelog.map((entry, idx) => (
                        <Card key={idx}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">Версия {entry.version}</CardTitle>
                              <span className="text-sm text-muted-foreground">{entry.date}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-1">
                              {entry.changes.map((change, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Icon name="Check" size={16} className="text-primary mt-0.5" />
                                  <span className="text-sm">{change}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Комментарии ({mockComments.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Ваша оценка:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setSelectedRating(star)}
                          className="transition-colors"
                        >
                          <Icon 
                            name="Star" 
                            size={24} 
                            className={star <= selectedRating ? 'text-primary fill-primary' : 'text-muted hover:text-primary'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Input 
                    placeholder="Напишите ваш отзыв..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button onClick={handleCommentSubmit}>
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 p-4 rounded-lg border">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10">{comment.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-sm">{comment.author}</span>
                            <div className="flex gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Icon 
                                  key={star}
                                  name="Star" 
                                  size={14} 
                                  className={star <= comment.rating ? 'text-primary fill-primary' : 'text-muted'}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                        <div className="flex gap-3">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            <Icon name="ThumbsUp" size={14} className="mr-1" />
                            Полезно ({comment.helpful})
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
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Скачать мод</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full h-12 text-lg" onClick={handleDownload}>
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать {mod.size}
                </Button>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Package" size={16} />
                    <span>v{mod.version}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="HardDrive" size={16} />
                    <span>{mod.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Calendar" size={16} />
                    <span>{mod.updateDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Tag" size={16} />
                    <span>{mod.category}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Требования:</h4>
                  <ul className="space-y-1">
                    {mod.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={16} className="text-primary mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Об авторе</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {mod.authorAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{mod.author}</h4>
                    <p className="text-sm text-muted-foreground">Автор с 2019 года</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Модов</p>
                    <p className="font-semibold text-lg">24</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Скачиваний</p>
                    <p className="font-semibold text-lg">156K</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль автора
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-dashed">
              <CardHeader className="text-center">
                <Icon name="Radio" size={32} className="mx-auto mb-2 text-muted-foreground" />
                <CardDescription>Рекламное место 300x600</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

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
