"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Documents = {
    slug: 'documents',
    labels: {
        singular: 'Document',
        plural: 'Documents',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'file',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
};
exports.default = Documents;
