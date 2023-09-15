import AuthForm from '../components/authForm';

export default function Auth() {
  return (
    <main className='relative flex min-h-screen justify-center overflow-hidden md:block'>
      <h1 className='absolute inset-x-0 bottom-44 z-0 w-max animate-slide font-secondary text-8xl font-extralight text-violet'>
        WELCOME BACK
      </h1>
      <h1 className='absolute inset-x-0 bottom-24 z-0 w-max animate-slide-slow font-secondary text-8xl font-extralight text-violet'>
        WELCOME BACK
      </h1>
      <h1 className='absolute inset-x-0 z-0 mt-56 w-max animate-slide-xxslow font-secondary text-8xl font-extralight text-violet'>
        WELCOME BACK
      </h1>
      <h1 className='absolute inset-x-0 z-0 mt-4 w-max animate-slide-xxfast font-secondary text-8xl font-extralight text-violet'>
        WELCOME BACK
      </h1>
      <h1 className='absolute inset-x-0 z-0 mt-24 w-max animate-slide-xfast font-secondary text-8xl font-extralight text-violet'>
        WELCOME BACK
      </h1>
      <h1 className='absolute inset-x-0 z-0 mt-40 w-max animate-slide-fast font-secondary text-8xl font-extralight text-violet'>
        WELCOME BACK
      </h1>
      <h1 className='absolute inset-x-0 z-0 mt-[19rem] w-max animate-slide-xslow font-secondary text-[8rem] font-light text-violet'>
        WELCOME BACK
      </h1>
      <section className='absolute top-[calc((100vh-35rem)/2)] z-50 mt-0 flex h-[35rem] w-[20rem] items-center justify-center bg-purple/90 md:bg-purple sm:top-[calc((100vh-40rem)/2)] sm:h-[40rem] sm:w-[30rem] md:right-0 md:top-0 md:h-screen'>
        <AuthForm />
      </section>
    </main>
  );
}
