import { useNavigate } from 'react-router-dom';
const NoPage = () => {
  const navigate = useNavigate();
  setTimeout(()=>{
    navigate("/")
  }, 2000)
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center text-center">
        404<br/>No Page Found
      </div>
      </>
  );
};

export default NoPage;
