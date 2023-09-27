import LandingAnimation from '@/components/LandingAnimation';
import AuthForm from '../components/Auth/AuthForm';

export default function Auth() {
  return (
    <main className='relative flex min-h-screen justify-center overflow-hidden md:block'>
      <LandingAnimation />
      <section className='absolute top-[calc((100vh-35rem)/2)] z-50 mt-0 flex h-[35rem] w-[20rem] items-center justify-center bg-purple/90 sm:top-[calc((100vh-40rem)/2)] sm:h-[40rem] sm:w-[30rem] md:right-0 md:top-0 md:h-screen md:bg-purple'>
        <AuthForm />
      </section>
    </main>
  );
}
