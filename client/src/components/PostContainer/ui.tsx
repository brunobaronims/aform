import Image from 'next/image';

import { PostParams } from '@/interfaces/post.interfaces';
import UserImage from '../../../public/userimage.png';
import CreatePostForm from '../CreatePostModal/CreatePostForm';

export default function PostContainerUI({ posts }: { posts: PostParams[] }) {
  return (
    <section className='flex h-max w-full flex-col mt-14 lg:overflow-y-scroll lg:mt-0 lg:h-screen lg:w-1/3'>
      <div className='lg:hidden h-44 w-screen'>
        <CreatePostForm />
      </div>
      <ul className='flex w-full flex-col items-center lg:pt-10 lg:pr-10'>
        {posts.map((post, index) => {
          return (
            <li
              className='lg:mb-16 flex h-36 w-full flex-row border-t-[0.5px] lg:border-[0.5px] border-violet'
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
