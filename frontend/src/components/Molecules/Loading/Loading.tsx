import { spinner } from '@/constant/Icons';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <img src={spinner} alt="" />
    </div>
  );
};

export default Loading;
