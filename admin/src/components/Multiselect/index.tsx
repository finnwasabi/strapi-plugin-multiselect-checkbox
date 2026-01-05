import { Box, Checkbox, Field, Flex, Typography } from '@strapi/design-system';
//
// Types
//
import type { FieldValue, InputProps } from '@strapi/strapi/admin';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { prefixKey } from '../../utils/prefixKey';

/** The properties for our `Multiselect` component below. */
type Props = InputProps &
  FieldValue & {
    attribute: {
      options: string[] | undefined;
    };
  };

//
// Config
//

const config = {
  /**
   * The default options used as fallbacks in case the user-defined values are missing.
   */
  defaultOptions: [],
};

//
// Components
//

/**
 * A styled <p> element that automatically uppercases
 * the first letter of its content using CSS.
 */
const CapitalizedText = styled.p`
  &::first-letter {
    text-transform: uppercase;
  }
`;

/**
 * The component that is shown in case no available options are set.
 */
const EmptyState = () => {
  return (
    <Typography variant="pi" textColor="neutral400">
      <FormattedMessage id={prefixKey('empty-state.text')} />
    </Typography>
  );
};

/**
 * `Multiselect` is a custom form component that allows users to select multiple options
 * via checkboxes. The selected values are stored as an array of strings.
 *
 * ### Props:
 * - `attribute`: An object containing the list of selectable `options: string[]`.
 * - `disabled`: (Optional) Disables all checkboxes when `true`.
 * - `hint`: (Optional) A string providing contextual help, shown below the field.
 * - `name`: The name of the form field (used in the synthetic `onChange` event).
 * - `label`: A label for the field, displayed above the checkboxes.
 * - `onChange`: A handler that receives the updated selection as an array of strings.
 * - `required`: (Optional) Indicates if the field is required.
 * - `value`: The current value as an array of selected options.
 */
const Multiselect = (props: Props) => {
  const { attribute, disabled, hint, label, name, onChange, required, type, value } = props;
  const availableOptions = attribute?.options || config.defaultOptions;

  // Ensure value is always an array
  const selectedOptions = Array.isArray(value) ? value : [];

  /**
   * Triggers the `onChange` handler with the given `value`.
   */
  const updateValue = (value: string[]) => onChange({ target: { name, value, type } } as any);

  /**
   * Updates the `selectedOptions` list by adding or removing the given `option`.
   *
   * @param option - The option to add or remove from the selection.
   * @param isSelected - If `true`, the option is added; if `false`, it is removed.
   */
  const updateSelectedOptions = (option: string, isSelected: boolean) => {
    const nextSelectedOptions = isSelected
      ? selectedOptions.concat(option)
      : selectedOptions.filter((selectedOption: string) => selectedOption !== option);

    // Ensure the selected options follow the order of the available options.
    const sortedNextSelectedOptions = nextSelectedOptions.sort(
      (lhs: string, rhs: string) => availableOptions.indexOf(lhs) - availableOptions.indexOf(rhs)
    );

    updateValue(sortedNextSelectedOptions);
  };

  // Renders our container with the corresponding checkboxes for each available option.
  return (
    <Field.Root hint={hint} name={name} required={required}>
      <Field.Label>{label}</Field.Label>

      {availableOptions.length === 0 ? (
        <EmptyState />
      ) : (
        <Box padding={2}>
          <Flex gap={2} direction="column" alignItems="leading">
            {availableOptions.map((option) => (
              <Checkbox
                key={option}
                checked={selectedOptions.includes(option)}
                disabled={disabled ?? false}
                onCheckedChange={(isSelected: boolean) => updateSelectedOptions(option, isSelected)}
              >
                <CapitalizedText>{option}</CapitalizedText>
              </Checkbox>
            ))}
          </Flex>
        </Box>
      )}
      <Field.Hint />
    </Field.Root>
  );
};

export default Multiselect;
