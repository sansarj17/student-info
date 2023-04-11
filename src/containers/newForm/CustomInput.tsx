import React, { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { type } from "os";

interface Props {
  name: string;
  value: any;
  handleChange: any;
  handleBlur: any;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  editMode?: boolean;
  label: string;
  helperText?: string;
  error?: string;
  touched?: boolean;
}

const CustomInput: React.FC<Props> = ({
  name,
  value,
  handleBlur,
  handleChange,
  editMode = false,
  placeholder = "",
  label,
  helperText,
  error,
  touched,
  type,
}) => {
  const [isReadOnly, setIsReadOnly] = React.useState<boolean>(
    editMode ? true : false
  );

  return (
    <FormControl mt="8px">
      <Flex alignItems="center" columnGap="8px">
        <FormLabel m="0">{label}</FormLabel>
        {editMode && (
          <EditIcon
            opacity={isReadOnly ? "0.4" : "1"}
            color={isReadOnly ? "gray" : "linkedin.500"}
            onClick={() => setIsReadOnly((prev) => !prev)}
          />
        )}
      </Flex>
      <Input
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        readOnly={isReadOnly}
        mt="4px"
        type={type}
      />
      <FormHelperText fontSize="12px" opacity="0.8">
        {helperText}
      </FormHelperText>
      {touched && error && <Text>Err : {error}</Text>}
    </FormControl>
  );
};

export default CustomInput;
