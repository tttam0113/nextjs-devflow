'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { formUrlQuery, removeKeysFormUrlQuery } from '@/lib/url';

import { Input } from '../ui/input';

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,
  otherClasses = '',
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFormUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['query'],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, route, searchParams, pathname]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>
      <Image
        src='/icons/search.svg'
        alt='search'
        width={24}
        height={24}
        className='cursor-pointer'
      />

      <Input
        type='text'
        placeholder='Search...'
        value={searchQuery}
        className='paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none'
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default LocalSearch;
