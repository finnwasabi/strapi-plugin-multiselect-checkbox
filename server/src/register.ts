import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  //
  // Register custom field on the server - 100% compatible with strapi-plugin-multi-select
  //
  strapi.customFields.register({
    name: 'multiselect-checkbox',
    plugin: 'multiselect-checkbox',

    // The data type stored in the database - JSON array
    type: 'json',

    inputSize: {
      default: 12,
      isResizable: true,
    },
  });
};

export default register;
