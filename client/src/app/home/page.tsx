import HomeMenu from '@/components/HomeMenu';
import PostContainer from '@/components/PostContainer';
import Recommendations from '@/components/Recommendations';

export default function Home() {
  return (
    <div className='flex flex-col lg:flex-row'>
      <HomeMenu />
      <PostContainer />
      <Recommendations />
    </div>
  );
}
