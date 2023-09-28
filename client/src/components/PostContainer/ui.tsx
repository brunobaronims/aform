import Image from 'next/image';

import { PostParams } from '@/interfaces/post.interfaces';
import UserImage from '../../../public/userimage.png';

export default function PostContainerUI({ posts }: { posts: PostParams[] }) {
  return (
    <section className='flex h-max w-full flex-col mt-14 sm:h-screen sm:w-1/3'>
      <ul className='flex w-full flex-col items-center pr-10 pt-10'>
        {posts.map((post, index) => {
          return (
            <li
              className='mb-16 flex h-36 w-full flex-row border-[0.5px] border-violet'
              key={index}
            >
              <div className='flex h-full flex-col items-center  px-5 py-5'>
                <Image
                  src={UserImage}
                  alt="Post owner's profile image"
                  className='mb-4 h-16 w-16 rounded-[10rem] bg-transparent'
                />
                <span className='rounded-lg font-secondary text-violet'>
                  @{post.handle}
                </span>
              </div>
              <div className='px-3 py-4 font-secondary text-lg text-violet'>
                {post.description}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
