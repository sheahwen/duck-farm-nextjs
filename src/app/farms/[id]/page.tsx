'use client';

import { Duck } from '@/types/duck';
import { useUser } from '@clerk/nextjs';
import { Badge, Heart, Calendar, Users } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      {/* Header Section */}
      <div className="border-b border-orange-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-gray-900">
                {user?.firstName?.toLowerCase() || 'name'}&apos;s farm 🌱
              </h1>
              <p className="text-lg text-gray-600">
                A cozy collection of {ducks.length} adorable ducks
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-orange-100 p-3">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-orange-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Ducks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {ducks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Farm Age</p>
                <p className="text-2xl font-bold text-gray-900">
                  {ducks.length > 0
                    ? Math.floor(
                        (Date.now() -
                          new Date(ducks[0]?.created_at).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    : 0}{' '}
                  days
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Badge className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-2xl font-bold text-gray-900">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              Meet the Ducks
            </h2>
            <p className="text-gray-600">
              Each duck has its own unique personality and story
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="mb-4 aspect-square rounded-2xl bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
                <p className="text-lg font-medium text-red-600">{error}</p>
                <p className="mt-2 text-red-500">Please try again later</p>
              </div>
            </div>
          ) : ducks.length === 0 ? (
            <div className="py-12 text-center">
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-8">
                <div className="mb-4 text-6xl">🦆</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  No ducks yet!
                </h3>
                <p className="text-gray-600">
                  Start building your duck collection by adding some adorable
                  ducks to your farm.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ducks.map((duck) => (
                <DuckCard key={duck._id} duck={duck} />
              ))}
            </div>
          )}
        </div>
      </div>
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
    <div className="group rounded-2xl border border-orange-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 to-yellow-100">
        <img
          src={duck.image_url}
          alt={duck.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
          {duck.name}
        </h3>
        <p className="line-clamp-2 text-sm text-gray-600">{duck.description}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(duck.created_at)}</span>
        </div>
      </div>
    </div>
  );
};
