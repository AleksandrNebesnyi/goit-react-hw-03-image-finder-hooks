import Template from 'react-loader-spinner';
import {LoaderStyled} from './Loader.styled'



const Loader = () => {
  return (
    <LoaderStyled>
      <Template type="TailSpin" color="#02be6e" height={100} width={100} />
    </LoaderStyled>
  );
}

export default Loader;