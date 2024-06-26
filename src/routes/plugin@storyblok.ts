import { $, useOnWindow, useSignal } from "@builder.io/qwik";
import {
  type ISbStoryData,
  loadStoryblokBridge,
  storyblokInit as sbInit,
  type StoryblokBridgeConfigV2,
  apiPlugin,
} from "@storyblok/js";
export { apiPlugin, renderRichText } from "@storyblok/js";

export const useStoryblok = (
  initialStory: ISbStoryData,
  bridgeOptions: StoryblokBridgeConfigV2 = {}
) => {
  const story = useSignal(initialStory);

  useOnWindow(
    "load",
    $(async () => {
      await loadStoryblokBridge();
      const { StoryblokBridge, location } = window;
      const storyblokInstance = new StoryblokBridge(bridgeOptions);

      storyblokInstance.on(["published", "change"], () => {
        // reload page if save or publish is clicked
        location.reload();
      });

      storyblokInstance.on("input", (event) => {
        // Access currently changed but not yet saved content via:
        story.value = event?.story as ISbStoryData;
      });
    })
  );

  return story;
};

export const { storyblokApi } = sbInit({
  accessToken: import.meta.env.PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  bridge: true,
});
