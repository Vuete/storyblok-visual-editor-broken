import { defineConfig ,loadEnv} from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

import mkcert from'vite-plugin-mkcert';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), mkcert()],
    preview: {
      headers: {
        "Cache-Control": env.PUBLIC_PREVIEW_SITE==="yes"? "public, max-age=0" : "public, max-age=600",
      },
    },
  };
});
