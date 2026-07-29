import "./index.css";
import { Composition } from "remotion";
import { AcaConnectPromo } from "./promo/AcaConnectPromo";
import { AfrilandPromo } from "./afriland/AfrilandPromo";
import { PlaceholderLogo } from "./afriland/PlaceholderLogo";
import { DURATION_FRAMES } from "./afriland/timing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AfrilandPromo"
        component={AfrilandPromo}
        durationInFrames={DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* Utility: renders public/afriland/logo.png placeholder. Not in the film. */}
      <Composition
        id="AfrilandPlaceholderLogo"
        component={PlaceholderLogo}
        durationInFrames={1}
        fps={30}
        width={1120}
        height={300}
      />
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
