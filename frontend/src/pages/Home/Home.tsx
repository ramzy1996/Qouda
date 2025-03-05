import ExcelList from '@/components/Features/ExcelData/ExcelList';
import UploadExcel from '@/components/Features/ExcelData/UploadExcel';

const Home = () => {
  return (
    <div>
      <div className="flex justify-center w-full">
        <UploadExcel />
      </div>
      <div>
        <hr />
        <ExcelList />
      </div>
    </div>
  );
};

export default Home;
