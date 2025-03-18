import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const ImageGenerationCard = () => {
  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [generatedUrlError, setGeneratedUrlError] = useState<string | null>(
    null
  );
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmitPrompt = async () => {
    try {
      setIsLoadingImage(true);
      const response = await axios.post('/api/generate-image', { prompt });
      console.log('imageUrl', response.data.imageUrl);
      setGeneratedUrl(response.data.imageUrl);
      setGeneratedUrlError(null);
    } catch (error) {
      toast.error('Unable to generate image at the moment', {
        description: 'An error has occured',
      });
    } finally {
      setIsLoadingImage(false);
    }
  };

  const handleAddDuck = async () => {
    // Validation
    if (!generatedUrl) {
      setGeneratedUrlError('Please generate a duck to add to the farm');
      return;
    }
    // if (!name) {
    //   setNameError('Name is required');
    //   return;
    // }

    // Save duck to DB
    try {
      console.log('saving to db');
    } catch (error) {
      toast.error(`Unable to add ${name} to the farm`, {
        description: 'An error has occured',
      });
    }
  };

  useEffect(() => {
    if (generatedUrlError) {
      textareaRef.current?.focus();
    }
  }, [generatedUrlError]);

  return (
    <Card className="mx-auto gap-y-5 border border-black p-2 pb-6 text-center sm:max-w-100 md:max-w-140">
      <div className="aspect-square h-full bg-yellow-50">
        {generatedUrl && (
          <img src={generatedUrl} alt="duck" className="h-full w-full" />
        )}
      </div>
      <div className="relative">
        <Textarea
          placeholder="What kind of duck would you like to generate?"
          className={cn(
            `h-27 rounded-lg border pr-16 md:h-17`,
            generatedUrlError ? 'border-2 border-red-500' : 'border-black'
          )}
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          variant="default"
          type="button"
          size="icon"
          className="absolute right-2 bottom-2 cursor-pointer rounded-full bg-black p-2 hover:bg-black/90"
          onClick={handleSubmitPrompt}
          disabled={isLoadingImage}
        >
          <ArrowUp className="h-4 w-4 text-white" />
        </Button>
      </div>
      <div className="xs:flex-row xs:items-center xs:justify-between xs:space-y-0 flex flex-col space-y-5 text-sm sm:space-x-2">
        <div className="flex items-center space-x-2">
          <div className="whitespace-nowrap">Name:</div>
          <Input className="w-40" />
        </div>
        <Button
          variant="default"
          className="cursor-pointer"
          onClick={handleAddDuck}
        >
          Add to the farm ➡️
        </Button>
      </div>
    </Card>
  );
};

export default ImageGenerationCard;
