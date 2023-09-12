import AuthForm from '../components/authForm';

export default function Auth() {
  return (
    <main className='flex min-h-screen flex-col items-center'>
      <div className='relative bg-black w-full h-44 mt-20 overflow-hidden'>
        <h1 className='bottom-32 inset-x-0 animate-slide absolute text-violet font-secondary font-extralight text-8xl'>
          WELCOME BACK
        </h1>
        <h1 className='bottom-24 inset-x-0 animate-slide-slow absolute text-violet font-secondary font-extralight text-8xl'>
          WELCOME BACK
        </h1>
        <h1 className='inset-x-0 animate-slide-xxslow absolute text-violet font-secondary font-extralight text-8xl mt-32'>
          WELCOME BACK
        </h1>
        <h1 className='inset-x-0 animate-slide-xxfast absolute text-violet font-secondary font-extralight text-8xl mt-15'>
          WELCOME BACK
        </h1>
        <h1 className='inset-x-0 animate-slide-xfast absolute text-violet font-secondary font-extralight text-8xl mt-44'>
          WELCOME BACK
        </h1>
        <h1 className='inset-x-0 animate-slide-fast absolute text-violet font-secondary font-extralight text-8xl mt-24'>
          WELCOME BACK
        </h1>
        <h1 className='inset-x-0 animate-slide-xslow absolute text-violet font-secondary font-light text-8xl mt-10'>
          WELCOME BACK
        </h1>
      </div>
      <AuthForm />
    </main>
  );
}
