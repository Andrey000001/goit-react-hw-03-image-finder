import { LineWave } from 'react-loader-spinner';
import { ContainerIcon } from './Loader.styled';
const Loader = () => {
  return (
    <ContainerIcon>
      <LineWave
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </ContainerIcon>
  );
};

export default Loader;
