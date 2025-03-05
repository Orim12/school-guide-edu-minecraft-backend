"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Media = {
    slug: 'media',
    labels: {
        singular: 'Media',
        plural: 'Media',
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        mimeTypes: ['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    },
    fields: [
        {
            name: 'altText',
            type: 'text',
        },
    ],
};
exports.default = Media;
