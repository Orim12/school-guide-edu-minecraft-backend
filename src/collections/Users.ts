import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'roles',
      type: 'array',
      label: 'Roles',
      fields: [
        {
          type: 'select',
          name: 'role',
          label: 'Role',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Word Adder', value: 'word-adder' },
          ],
        },
      ],
    },
  ],
}

export default Users
