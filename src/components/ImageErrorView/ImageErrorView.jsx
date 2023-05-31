import oops from '../../assets/oops.png';
import { Wraper, Img, Text } from './ImageErrorView.styled';

export default function ImageErrorView() {
  return (
    <Wraper>
      <Img src={oops} alt="oops" width="240" />
      <Text>Oops...🥶 there are no images matching your search...</Text>
    </Wraper>
  );
}
