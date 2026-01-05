import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { PLUGIN_ID } from './pluginId';
import { prefixKey } from './utils/prefixKey';

export default {
  register(app: any) {
    //
    // Register custom field in the admin panel.
    //
    // - See also: https://docs.strapi.io/cms/features/custom-fields#registering-a-custom-field-in-the-admin-panel
    //
    app.customFields.register({
      name: 'multiselect-checkbox',
      pluginId: `${PLUGIN_ID}`,
      type: 'json',
      intlLabel: {
        id: `${PLUGIN_ID}.label`,
        defaultMessage: 'Multiselect',
      },
      intlDescription: {
        id: `${PLUGIN_ID}.description`,
        defaultMessage:
          'A custom field for Strapi that allows users to select multiple options from a predefined list.',
      },
      icon: PluginIcon,
      components: {
        Input: async () => import('./components/Multiselect'),
      },
      options: {
        base: [
          {
            sectionTitle: null,
            items: [
              {
                name: 'options.availableOptions',
                type: 'textarea-enum',
                intlLabel: {
                  id: prefixKey('options.available-options.label'),
                  defaultMessage: 'Available Options',
                },
                description: {
                  id: prefixKey('options.available-options.description'),
                  defaultMessage: 'One option per line.',
                },
                placeholder: {
                  id: prefixKey('options.available-options.placeholder'),
                  defaultMessage: 'Option 1\nOption 2\nOption 3',
                },
              },
            ],
          },
        ],

        //
        // Strapi default advanced options.
        //
        // - See also: https://github.com/strapi/strapi/blob/develop/packages/core/content-type-builder/admin/src/components/FormModal/attributes/attributeOptions.ts
        //
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'content-type-builder.form.attribute.item.requiredField',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'content-type-builder.form.attribute.item.requiredField.description',
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: 'private',
                type: 'checkbox',
                intlLabel: {
                  id: 'content-type-builder.form.attribute.item.privateField',
                  defaultMessage: 'Private field',
                },
                description: {
                  id: 'content-type-builder.form.attribute.item.privateField.description',
                  defaultMessage: 'This field will not show up in the API response',
                },
              },
            ],
          },
        ],
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
