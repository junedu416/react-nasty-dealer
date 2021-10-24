import One from '../images/1.png'; 
import Five from '../images/5.png'; 
import Ten from '../images/10.png'; 
import TwentyFive from '../images/25.png'; 
import Fifty from '../images/50.png'; 
import OneHundred from '../images/100.png'; 
import FiveHundred from '../images/500.png'; 
import OneThousand from '../images/1000.png'; 
import FiveThousand from '../images/5000.png'; 
import TenThousand from '../images/10000.png'; 
import { ChipContainer, ChipButton } from './styled-components';

const Chips = (props) => {
  const { buttonFunc } = props;

  return (  
    <ChipContainer>
      <ChipButton onClick={buttonFunc} value={1}><img src={One} alt="1 dollar chip" value='1' /></ChipButton>
      <ChipButton onClick={buttonFunc} value={5}><img src={Five} alt="5 dollar chip" /></ChipButton>
      <ChipButton onClick={buttonFunc} value={10}><img src={Ten} alt="10 dollar chip" /></ChipButton>
      <ChipButton onClick={buttonFunc} value={25}><img src={TwentyFive} alt="25 dollar chip" /></ChipButton>
      <ChipButton onClick={buttonFunc} value={50}><img src={Fifty} alt="50 dollar chip" /></ChipButton>
      <ChipButton onClick={buttonFunc} value={100}><img src={OneHundred} alt="100 dollar chip" /></ChipButton>
      <ChipButton onClick={buttonFunc} value={500}><img src={FiveHundred} alt="500 dollar chip" /></ChipButton>
      <ChipButton onClick={buttonFunc} value={1000}><img src={OneThousand} alt="1000 dollar chip" /></ChipButton>
      <ChipButton onClick={buttonFunc} value={5000}><img src={FiveThousand} alt="5000 dollar chip" /></ChipButton>
      <ChipButton onClick={buttonFunc} value={10000}><img src={TenThousand} alt="10000 dollar chip" /></ChipButton>
    </ChipContainer>
  );
};

export default Chips;
