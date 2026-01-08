import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function UploadMod() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [game, setGame] = useState('');
  const [category, setCategory] = useState('');
  const [version, setVersion] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !game || !category || !file) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      setUploading(false);
      toast.success('Мод успешно загружен и отправлен на модерацию!');
      navigate('/');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-[#1a2530] bg-[#0d151a]">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Icon name="Gamepad2" size={28} className="text-primary" />
            <h1 className="text-xl font-bold text-[#ffffff]">ModHub</h1>
          </div>
          
          <Button variant="ghost" onClick={() => navigate('/')} className="text-[#ffffff] hover:text-primary hover:bg-[#1a2530]">
            <Icon name="X" size={20} className="mr-2" />
            Отмена
          </Button>
        </div>
      </header>

      <div className="container px-4 md:px-8 py-12 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Загрузить модификацию</h2>
          <p className="text-muted-foreground">
            Поделитесь своим модом с сообществом. После загрузки он будет отправлен на модерацию.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>Заполните основные данные о вашем моде</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Название мода <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="John Deere 9RX Series"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Описание <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Подробное описание мода, его возможностей и особенностей..."
                  className="min-h-32"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {description.length} / 1000 символов
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="game">
                    Игра <span className="text-destructive">*</span>
                  </Label>
                  <Select value={game} onValueChange={setGame} required>
                    <SelectTrigger id="game">
                      <SelectValue placeholder="Выберите игру" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FS 25">Farming Simulator 25</SelectItem>
                      <SelectItem value="FS 22">Farming Simulator 22</SelectItem>
                      <SelectItem value="FS 19">Farming Simulator 19</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    Категория <span className="text-destructive">*</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tractors">Трактора</SelectItem>
                      <SelectItem value="combines">Комбайны</SelectItem>
                      <SelectItem value="trailers">Прицепы</SelectItem>
                      <SelectItem value="tools">Инструменты</SelectItem>
                      <SelectItem value="maps">Карты</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Версия мода</Label>
                <Input
                  id="version"
                  placeholder="1.0.0"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Файлы</CardTitle>
              <CardDescription>Загрузите файл мода и изображения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file">
                  Файл мода (.zip) <span className="text-destructive">*</span>
                </Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="file"
                    type="file"
                    accept=".zip"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    {file ? (
                      <div className="flex items-center justify-center gap-3">
                        <Icon name="FileArchive" size={32} className="text-primary" />
                        <div className="text-left">
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="font-medium mb-1">Нажмите для загрузки файла</p>
                        <p className="text-sm text-muted-foreground">ZIP до 500 MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Изображения (до 5 шт.)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="hidden"
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    {images.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          {images.slice(0, 5).map((img, idx) => (
                            <Badge key={idx} variant="secondary" className="gap-1">
                              <Icon name="Image" size={14} />
                              {img.name}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {images.length} файл(ов) выбрано
                        </p>
                      </div>
                    ) : (
                      <>
                        <Icon name="Image" size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="font-medium mb-1">Нажмите для загрузки изображений</p>
                        <p className="text-sm text-muted-foreground">JPG, PNG до 10 MB каждое</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Предпросмотр</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-muted/30">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded bg-muted flex items-center justify-center shrink-0">
                    {images.length > 0 ? (
                      <img 
                        src={URL.createObjectURL(images[0])} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <Icon name="ImageOff" size={32} className="text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg mb-1">
                      {title || 'Название мода'}
                    </h4>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {game && <Badge variant="secondary">{game}</Badge>}
                      {category && <Badge variant="outline">{category}</Badge>}
                      {version && <Badge variant="outline">v{version}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {description || 'Описание мода появится здесь...'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {uploading && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Загрузка мода...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3 justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/')}
              disabled={uploading}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Upload" size={18} className="mr-2" />
                  Опубликовать
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}