import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { ArrowUp, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
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

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitPrompt();
    }
  };

  const handleSubmitPrompt = async () => {
    if (isLoadingImage) return;

    // Validate prompt
    if (!prompt?.trim()) {
      setPromptError('What kind of duck do you want to add to the farm?');
      textareaRef.current?.focus();
      return;
    }

    try {
      setIsLoadingImage(true);
      const response = await axios.post('/api/generate-image', { prompt });
      // const response = { data: { imageUrl: 'abcdef' } };

      setGeneratedUrl(response.data.imageUrl);
      setGeneratedUrlError(null);
    } catch (error: any) {
      const description =
        error?.response?.data?.error || 'An error has occured';
      toast.error('Unable to generate image at the moment', {
        description,
      });
    } finally {
      setTimeout(() => {
        setIsLoadingImage(false);
      }, 1000);
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
      const response = await axios.post('/api/save-duck', {
        name,
        prompt,
        imageUrl: generatedUrl,
      });

      if (response?.data?.id) {
        toast(
          <span>
            🦆 <strong>{response?.data?.name}</strong> has joined the farm!
          </span>
        );

        // Clear the form after successful save
        setPrompt('');
        setName('');
        setGeneratedUrl(null);
      }
    } catch (error) {
      toast.error(`Unable to add ${name} to the farm`, {
        description: 'An error has occured',
      });
    } finally {
      setIsAddingDuck(false);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl rounded-[25px] border-2 border-black p-8">
      <div className="space-y-6">
        <div className="flex aspect-auto w-full items-center justify-center rounded-lg border-2 border-black">
          {generatedUrl ? (
            <img
              src={generatedUrl}
              alt="Generated duck"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="crispEdges"
            >
              <rect x="4" y="2.5" width="1" height="1" fill="#000000" />
              <rect x="5" y="2.5" width="1" height="1" fill="#000000" />
              <rect x="6" y="2.5" width="1" height="1" fill="#000000" />
              <rect x="7" y="3.5" width="1" height="1" fill="#000000" />
              <rect x="7" y="4.5" width="1" height="1" fill="#000000" />
              <rect x="6" y="5.5" width="1" height="1" fill="#000000" />
              <rect x="5" y="6.5" width="1" height="1" fill="#000000" />
              <rect x="5" y="8.5" width="1" height="1" fill="#000000" />
            </svg>
          )}
        </div>
        <div className="">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              placeholder="Describe the duck you want to add to the farm"
              className={cn(
                'min-h-[100px] rounded-[10px] border-2 border-black p-4 pr-14 text-base',
                promptError && 'border-red-500'
              )}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setPromptError(null);
              }}
              onKeyDown={handleTextareaKeyDown}
            />
            {isLoadingImage ? (
              <Loader2 className="absolute right-0 bottom-0 mr-2 mb-2 h-10 w-10 animate-spin rounded-full bg-gray-500 p-2.5 text-white" />
            ) : (
              <ArrowUp
                onClick={handleSubmitPrompt}
                className="absolute right-0 bottom-0 mr-2 mb-2 h-10 w-10 cursor-pointer rounded-full bg-black p-2.5 text-white focus:outline-4 focus:outline-gray-600/40"
                tabIndex={0}
              />
            )}
          </div>
          {promptError && (
            <p className="mt-2 text-sm text-red-500">{promptError}</p>
          )}
        </div>

        <div className="flex items-center gap-x-2">
          <div>Name:</div>
          <Input
            ref={nameInputRef}
            placeholder="Give your duck a name"
            className={cn(
              'rounded-[10px] border-2 border-black p-4 text-base',
              nameError && 'border-red-500'
            )}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(null);
            }}
          />
          {nameError && (
            <p className="mt-2 text-sm text-red-500">{nameError}</p>
          )}
        </div>

        <div className="flex justify-end gap-x-4">
          <Button
            className="rounded-[10px] bg-black px-6 py-2 text-white"
            onClick={handleAddDuck}
            disabled={isLoadingImage || isAddingDuck || !generatedUrl}
          >
            {isAddingDuck ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add to Farm'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ImageGenerationCard;
