export default function LoadingIndicator() {
  return (
    <div className='flex h-8 w-8 animate-spin items-center justify-center rounded-[4rem] bg-white bg-gradient-to-r from-dark-violet'>
      <div className='h-6 w-6 rounded-[4rem] bg-black' />
    </div>
  );
}
