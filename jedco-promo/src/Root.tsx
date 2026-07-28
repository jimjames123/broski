import "./index.css";
import { Composition } from "remotion";
import { JedcoPromo } from "./JedcoPromo";
import { PlaceholderLogo } from "./PlaceholderLogo";
import { VIDEO } from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="JedcoPromo"
        component={JedcoPromo}
        durationInFrames={Math.round(VIDEO.durationInSeconds * VIDEO.fps)}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
      {/* Utility comp: renders public/logo.png placeholder. Not part of the promo. */}
      <Composition
        id="PlaceholderLogo"
        component={PlaceholderLogo}
        durationInFrames={1}
        fps={30}
        width={512}
        height={512}
      />
    </>
  );
};
