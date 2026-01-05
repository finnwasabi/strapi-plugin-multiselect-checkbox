import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  //
  // Register custom field in on the server.
  //
  // - See also: https://docs.strapi.io/cms/features/custom-fields#registering-a-custom-field-on-the-server
  //
  strapi.customFields.register({
    name: 'multiselect-checkbox',
    plugin: 'multiselect-checkbox',

    // The data type stored in the database - using json to store array of strings.
    type: 'json',
  });
};

export default register;
