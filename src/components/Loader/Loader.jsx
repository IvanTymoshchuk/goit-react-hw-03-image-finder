import { Oval } from 'react-loader-spinner';
import {LoaderSvg} from './Loader.stylesd';

export default function Loader() {
  return (
    <LoaderSvg>
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        strokeWidthSecondary={1}
        color="blue"
        secondaryColor="white"
      />
    </LoaderSvg>
  );
}