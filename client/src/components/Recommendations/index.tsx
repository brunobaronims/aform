import Image from 'next/image';

import YvesTumor from '../../../public/yvestumor.jpg';
import DriveMyCar from '../../../public/drivemycar.png';

export default function Recommendations() {
  return (
    <section className='hidden sm:flex h-screen w-1/3 flex-col items-center justify-center sm:p-6'>
      <div className='flex flex-col items-center sm:h-max sm:w-72'>
        <span className='mb-3 font-secondary text-lg text-dark-violet'>
          You should listen to Yves Tumor
        </span>
        <Image
          src={YvesTumor}
          priority={true}
          className='h-auto w-full'
          alt='Album cover'
        />
      </div>
      <div className='mt-12 flex flex-col items-center sm:h-max sm:w-72 '>
        <span className='mb-3 font-secondary text-lg text-dark-violet'>
          You should watch Drive My Car
        </span>
        <Image src={DriveMyCar} className='h-auto w-full' alt='Movie poster' />
      </div>
    </section>
  );
}
