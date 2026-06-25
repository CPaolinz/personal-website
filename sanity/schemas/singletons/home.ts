// /Users/cecilia/personal-website/sanity/schemas/singletons/home.ts

import {HomeIcon, ImageIcon, DocumentIcon} from '@sanity/icons' // Imported DocumentIcon for the file block
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your personal website.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description: 'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'url', title: 'Url'}],
              },
            ],
            decorators: [
              {title: 'Italic', value: 'em'},
              {title: 'Strong', value: 'strong'},
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      type: 'array',
      name: 'body',
      title: 'Body',
      description: "This is where you can write the homepage's content.",
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'url', title: 'Url'}],
              },
            ],
          },
          styles: [],
        }),
        defineArrayMember({
          name: 'timeline',
          type: 'timeline',
        }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {hotspot: true},
          preview: {
            select: {media: 'asset', title: 'caption'},
          },
          fields: [
            defineField({title: 'Caption', name: 'caption', type: 'string'}),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
        // ADDED: Downloadable File object definition
        defineField({
          type: 'file',
          icon: DocumentIcon,
          name: 'downloadFile',
          title: 'Downloadable File',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Link Text',
              description: 'Text shown on the download link/button (e.g., "Download Resume")',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              filename: 'asset.originalFilename',
            },
            prepare({title, filename}) {
              return {
                title: title || 'Downloadable File',
                subtitle: filename || 'No file attached',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
})