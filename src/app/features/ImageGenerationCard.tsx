import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { ArrowUp, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const ImageGenerationCard = () => {
  const [prompt, setPrompt] = useState('');
  const [promptError, setPromptError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [generatedUrlError, setGeneratedUrlError] = useState<string | null>(
    null
  );

  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isAddingDuck, setIsAddingDuck] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmitPrompt = async () => {
    // Validate prompt
    if (!prompt?.trim()) {
      setPromptError('What kind of duck do you want to add to the farm?');
      textareaRef.current?.focus();
      return;
    }

    try {
      setIsLoadingImage(true);
      // const response = await axios.post('/api/generate-image', { prompt });
      const response = { data: { imageUrl: 'abcdef' } };

      setGeneratedUrl(response.data.imageUrl);
      setGeneratedUrlError(null);
    } catch (error) {
      toast.error('Unable to generate image at the moment', {
        description: 'An error has occured',
      });
    } finally {
      setTimeout(() => {
        setIsLoadingImage(false);
      }, 1000);
      // setIsLoadingImage(false);
    }
  };

  const handleAddDuck = async () => {
    setIsAddingDuck(true);

    // Validation
    const isGeneratedUrlEmpty = !generatedUrl?.trim();
    const isNameEmpty = !name?.trim();
    const isNameInvalid = !/^[a-zA-Z0-9]+$/.test(name);
    if (isGeneratedUrlEmpty) {
      setGeneratedUrlError('Please generate a duck to add to the farm.');
    }
    if (isNameEmpty) {
      setNameError('Please give this duck a cool name 😎');
    }
    if (isNameInvalid) {
      setNameError('Name can only include letters and numbers');
    }
    if (isGeneratedUrlEmpty || isNameEmpty || isNameInvalid) {
      setIsAddingDuck(false);
      return;
    }

    // Save duck to DB
    try {
      const response = await axios.post('/api/save-duck', { name, prompt });
      if (response?.data?.id) {
        toast(
          <span>
            🦆 <strong>{response?.data?.name}</strong> has joined the farm!
          </span>
        );
      }
    } catch (error) {
      toast.error(`Unable to add ${name} to the farm`, {
        description: 'An error has occured',
      });
    } finally {
      setIsAddingDuck(false);
    }
  };

  useEffect(() => {
    if (promptError) {
      textareaRef.current?.focus();
      return;
    }
    if (generatedUrlError) {
      textareaRef.current?.focus();
      return;
    }
    if (nameError) {
      nameInputRef.current?.focus();
      return;
    }
  }, [promptError, generatedUrlError, nameError]);

  return (
    <Card className="mx-auto gap-y-5 border border-black p-2 pb-6 text-center sm:max-w-100 md:max-w-140">
      <div className="aspect-square h-full bg-yellow-50">
        {generatedUrl && (
          <img src={generatedUrl} alt="duck" className="h-full w-full" />
        )}
      </div>

      <div>
        <div className="relative">
          <Textarea
            placeholder="What kind of duck would you like to generate?"
            className={cn(
              `h-27 rounded-lg border pr-16 md:h-17`,
              generatedUrlError || promptError
                ? 'border-2 border-orange-400'
                : 'border-black'
            )}
            ref={textareaRef}
            value={prompt}
            onChange={(e) => {
              setPromptError(null);
              setGeneratedUrlError(null);
              setPrompt(e.target.value);
            }}
          />
          <Button
            variant="default"
            type="button"
            size="icon"
            className={
              'pointer-events-auto absolute right-2 bottom-2 z-10 rounded-full bg-gradient-to-br from-black via-gray-800 to-black p-2 transition-all duration-300 hover:cursor-pointer hover:from-yellow-400 hover:via-orange-300 hover:to-orange-500'
            }
            onClick={handleSubmitPrompt}
            disabled={isLoadingImage}
          >
            {isLoadingImage ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <ArrowUp className="h-4 w-4 text-white" />
            )}
          </Button>
        </div>
        {(promptError || generatedUrlError) && (
          <div className="mt-1 text-left text-xs text-orange-600">
            {promptError || generatedUrlError}
          </div>
        )}
      </div>

      <div className="xs:flex-row xs:items-center xs:justify-between xs:space-y-0 flex flex-col space-y-5 text-sm sm:space-x-2">
        <div className="">
          <div className="flex items-center space-x-2">
            <div className="whitespace-nowrap">Name:</div>
            <Input
              className={cn(
                'w-40',
                nameError ? 'border-2 border-orange-400' : 'border-black'
              )}
              ref={nameInputRef}
              onChange={(e) => {
                setNameError(null);
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mt-1 text-left text-xs text-orange-600">
            {nameError}
          </div>
        </div>
        <Button
          variant="default"
          className={cn('cursor-pointer', isAddingDuck ? '' : '')}
          onClick={handleAddDuck}
          disabled={isAddingDuck}
        >
          Add to the farm ➡️
        </Button>
      </div>
    </Card>
  );
};

export default ImageGenerationCard;
