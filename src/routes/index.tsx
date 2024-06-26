import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import StoryblokComponent from "~/components/storyblok/component";
import type { ISbStoryData } from "@storyblok/js";
import { storyblokApi, useStoryblok } from "~/routes/plugin@storyblok";

export const useStory = routeLoader$(async () => {
  if (!storyblokApi)
    throw new Error("Not Storyblok plugin found to make the API calls");

  const { data } = await storyblokApi.get("cdn/stories/home", {
    version: "draft",
  });
  return data.story as ISbStoryData;
});

export default component$(() => {
  const story = useStoryblok(useStory().value);

  return <StoryblokComponent key={story.value.id} blok={story.value.content} />;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik with Storyblok",
  meta: [
    {
      name: "description",
      content: "Qwik & Storyblok site description",
    },
  ],
};
