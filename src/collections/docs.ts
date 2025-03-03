import { CollectionConfig } from 'payload';

export const Docs: CollectionConfig = {
    slug: 'docs',
    fields: [
    {
        name: 'content',
        type: 'richText',
        label: 'Content',
        required: true,
    },
    ],
};
