export default function LoadingIndicator() {
  return (
    <div className='relative w-[16rem] sm:w-96'>
      <span className='absolute left-1/2 top-1/2 h-4 w-4 border-r-8 bg-black' />
      <span className='bg-red absolute left-1/2 top-1/2 h-3 w-3 border-r-8' />
    </div>
  );
};
