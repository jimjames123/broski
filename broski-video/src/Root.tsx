import "./index.css";
import { Composition } from "remotion";
import { AcaConnectPromo } from "./promo/AcaConnectPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AcaConnectPromo"
        component={AcaConnectPromo}
        durationInFrames={742}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
