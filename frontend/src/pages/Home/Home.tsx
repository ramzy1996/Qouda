import ExcelList from '@/components/Features/ExcelData/ExcelList';
import UploadExcel from '@/components/Features/ExcelData/UploadExcel';

const Home = () => {
  const initialParams = {
    pageNumber: parseInt(window.location.search.split('=')[1]) || 1,
    pageSize: 10,
  };
  return (
    <div>
      <div className="flex justify-center w-full">
        <UploadExcel />
      </div>
      <div>
        <hr />
        <ExcelList initialParams={initialParams} />
      </div>
    </div>
  );
};

export default Home;
