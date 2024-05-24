import { $, component$, useOnDocument, useComputed$ } from '@builder.io/qwik';
import { storyblokEditable } from '@storyblok/js';
import type { ISbRichtext } from '@storyblok/js';
import { renderRichTextSB } from '~/routes/plugin@storyblok';

interface TextProps {
    blok: {
        text: ISbRichtext;
        centered: boolean;
    };
}

export default component$<TextProps>((props) => {
    const richText = useComputed$(() => {
        return renderRichTextSB(props.blok.text);
    });

    useOnDocument(
        'DOMContentLoaded',
        $(() => {
            console.log('DOM ready');
        })
    );

    return (
        <div
            {...storyblokEditable(props.blok)}
            dangerouslySetInnerHTML={richText.value}></div>
    );
});
