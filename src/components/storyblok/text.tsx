import { $, component$, useOnDocument } from "@builder.io/qwik";
import { storyblokEditable } from "@storyblok/js";
import type { ISbRichtext } from "@storyblok/js";
import { renderRichText } from "@storyblok/js";

interface TextProps {
  blok: {
    text: ISbRichtext;
    centered: boolean;
  };
}
export default component$<TextProps>(({ blok }) => {
  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      console.log("DOM ready");
    })
  );

  const renderedRichText = renderRichText(blok.text);

  return (
    <div
      {...storyblokEditable(blok)}
      dangerouslySetInnerHTML={renderedRichText}
    />
  );
});
