import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { back, notfound } from '@/constant/Icons';
import {
  selectMinPageHeight,
  //   selectNavHeight,
} from '@/store/selectors/rootLayoutSelector';

import RootLayout from '../Layout/RootLayout';

const NotFound = () => {
  const navigate = useNavigate();
  const minPageHeight = useSelector(selectMinPageHeight);
  //   const navHeight = useSelector(selectNavHeight);
  return (
    <RootLayout>
      <section
        className="flex justify-center items-center px-5 my-auto"
        style={{
          minHeight: `calc(100vh - ${minPageHeight}px)`,
          //   marginTop: `${navHeight}px`,
        }}
      >
        <div className="container px-6 py-12 mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-sm font-medium text-blue-400">404 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
              Page not found
            </h1>
            <p className="mt-4 text-gray-400">
              Sorry, the page you are looking for doesn't exist. Here are some
              helpful links:
            </p>
            <div className="flex justify-center lg:justify-start items-center mt-6 gap-x-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center px-5 py-2 text-sm transition-colors duration-200 border rounded-lg gap-x-2 hover:bg-gray-800 bg-gray-900 text-gray-200 border-gray-700"
              >
                <img src={back} alt="Back Icon" width={30} />
                <span>Go home</span>
              </button>
            </div>
          </div>
          <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0 flex justify-center">
            <img
              src={notfound}
              alt="Not Found Illustration"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </section>
    </RootLayout>
  );
};

export default NotFound;
