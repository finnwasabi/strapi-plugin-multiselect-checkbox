import { Box, Checkbox, Field, Flex, Grid, GridItem, Typography } from '@strapi/design-system';
import { useField } from '@strapi/strapi/admin';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

const CapitalizedText = styled.p`
  &::first-letter {
    text-transform: uppercase;
  }
`;

const MultiSelect = ({
  hint,
  label,
  name,
  intlLabel,
  required,
  attribute,
  description,
  placeholder,
  disabled,
}: {
  hint: string;
  label: string;
  name: string;
  intlLabel: any;
  required: boolean;
  attribute: any;
  description: any;
  placeholder: string;
  disabled: boolean;
}) => {
  const { formatMessage } = useIntl();
  const { onChange, value, error } = useField(name);

  const possibleOptions = useMemo(() => {
    return (attribute['options'] || [])
      .map((option: string) => {
        const [label, value] = [...option.split(/:(.*)/s), option];
        if (!label || !value) return null;
        return { label, value };
      })
      .filter(Boolean);
  }, [attribute]);

  const sanitizedValue = useMemo(() => {
    let parsedValue;
    try {
      parsedValue = typeof value !== 'string' ? value || [] : JSON.parse(value || '[]');
    } catch (e) {
      parsedValue = [];
    }
    return Array.isArray(parsedValue)
      ? parsedValue
          .map((val) =>
            possibleOptions.find((option: { label: string; value: string }) => option.value === val)
          )
          .filter((option) => !!option)
      : [];
  }, [value, possibleOptions]);

  const fieldError = useMemo(() => {
    if (error) return error;

    const { min, max } = attribute;
    const hasNoOptions = required && !possibleOptions.length;
    const belowMin = sanitizedValue.length < min && (required || sanitizedValue.length > 0);
    const aboveMax = sanitizedValue.length > max;

    if (hasNoOptions) {
      return 'No options, but field is required';
    }

    if (belowMin) {
      return `Select at least ${min} options`;
    }

    if (aboveMax) {
      return `Select at most ${max} options`;
    }

    return null;
  }, [required, error, possibleOptions, sanitizedValue, attribute]);

  const handleCheckboxChange = (optionValue: string, isChecked: boolean) => {
    let newValues: string[];

    if (isChecked) {
      // Add value
      newValues = [...sanitizedValue.map((v: any) => v.value), optionValue];
    } else {
      // Remove value
      newValues = sanitizedValue.map((v: any) => v.value).filter((v: string) => v !== optionValue);
    }

    onChange({
      target: {
        name: name,
        value: newValues.length ? JSON.stringify(newValues) : null,
        type: attribute.type,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Field.Root
      hint={description?.id ? formatMessage(description) : hint}
      error={fieldError as string}
      name={name}
      required={required}
    >
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label>{intlLabel?.id ? formatMessage(intlLabel) : label}</Field.Label>

        {possibleOptions.length === 0 ? (
          <Typography variant="pi" textColor="neutral400">
            No options available. Please configure options in the field settings.
          </Typography>
        ) : (
          <Box padding={2}>
            <Grid gap={2} gridCols={2}>
              {possibleOptions.map((option: { label: string; value: string }) => {
                const isChecked = sanitizedValue.some((v: any) => v.value === option.value);
                const isDisabled =
                  disabled || (sanitizedValue.length >= attribute['max'] && !isChecked);

                return (
                  <GridItem key={option.value} col={1}>
                    <Checkbox
                      checked={isChecked}
                      disabled={isDisabled}
                      onCheckedChange={(checked: boolean) =>
                        handleCheckboxChange(option.value, checked)
                      }
                    >
                      <CapitalizedText>
                        {formatMessage({
                          id: option.label,
                          defaultMessage: option.label,
                        })}
                      </CapitalizedText>
                    </Checkbox>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        )}

        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};

export default MultiSelect;
