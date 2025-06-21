'use client';

import { Duck } from '@/types/duck';
import { useUser } from '@clerk/nextjs';
import { Badge } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Farm = ({ params }: { params: Promise<{ id: string }> }) => {
  const [ducks, setDucks] = useState<Duck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchDucks = async () => {
      const { id } = await params;
      console.log('id', id);

      if (!id) return;

      try {
        const response = await axios.get<Duck[]>(`/api/farm/user/${id}`);
        console.log('response', response.data);
        setDucks(response.data);
      } catch (err) {
        console.error('Error fetching ducks:', err);
        setError('Failed to fetch ducks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDucks();
  }, [params]);

  return (
    <div className="flex min-h-screen flex-col bg-yellow-50">
      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-2 text-4xl font-bold">
            {user?.firstName?.toLowerCase() || 'name'}&apos;s ducks
          </h1>
          <p className="mb-10 max-w-2xl text-gray-700">
            you have a total of {ducks.length} ducks.
          </p>

          {/* Action Button */}
          <div className="flex w-full items-center justify-between rounded-2xl border-[3px] border-black bg-orange-500 px-4 py-1 text-xs text-white">
            <Badge className="text-black" />
            <span>
              Press{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 16 16"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                id="Ufo--Streamline-Tabler"
                height="22"
                width="22"
                className="inline-block align-middle"
              >
                <desc>Ufo Streamline Icon: https://streamlinehq.com</desc>
                <path
                  d="M10.59375 5.63125c1.8875 0.461875 3.15625 1.3268750000000002 3.15625 2.32125C13.75 9.431875 10.95 10.625 7.5 10.625S1.25 9.431875 1.25 7.952500000000001C1.25 6.95875 2.525 6.086875000000001 4.41875 5.625"
                  strokeWidth="1"
                ></path>
                <path
                  d="M4.375 5.625c0 0.690625 1.399375 1.25 3.125 1.25s3.125 -0.559375 3.125 -1.25v-0.021875000000000002C10.625 3.889375 9.225624999999999 2.5 7.5 2.5S4.375 3.889375 4.375 5.603125V5.625"
                  strokeWidth="1"
                ></path>
                <path d="m9.375 10.625 1.25 1.875" strokeWidth="1"></path>
                <path d="M5.3125 10.625 4.375 12.5" strokeWidth="1"></path>
                <path d="M7.5 8.75h0.00625" strokeWidth="1"></path>
                <path d="M4.375 8.125h0.00625" strokeWidth="1"></path>
                <path d="M10.625 8.125h0.00625" strokeWidth="1"></path>
              </svg>{' '}
              to send the ducks away
            </span>
            <Badge className="text-black" />
          </div>

          {/* Gallery */}
          <div className="mt-10 grid gap-4 space-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              // Loading state
              Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-2xl border border-black bg-gray-200"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 rounded bg-gray-200"></div>
                    <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Error state
              <div className="col-span-full text-center text-red-500">
                {error}
              </div>
            ) : ducks.length === 0 ? (
              // Empty state
              <div className="col-span-full text-center text-gray-500">
                No ducks found. Add some ducks to your farm!
              </div>
            ) : (
              // Duck cards
              ducks.map((duck) => <DuckCard key={duck._id} duck={duck} />)
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Farm;

const DuckCard = ({ duck }: { duck: Duck }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="">
      <div className="aspect-square overflow-hidden rounded-2xl border border-black bg-gray-200">
        <img
          src={duck.image_url}
          alt={duck.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-4 space-y-2">
        <div className="font-medium">{duck.name}</div>
        <div className="text-sm text-gray-500">
          {formatDate(duck.created_at)}
        </div>
      </div>
    </div>
  );
};
