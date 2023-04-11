import React from "react";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import CustomInput from "./CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

export interface IFormValues {
  id?: string;
  name: string;
  email: string;
  number: string;
}

interface Props {
  initialValues?: IFormValues;
  editMode?: boolean;
}

const formSchema = Yup.object().shape({
  name: Yup.string().required("This is required."),
  email: Yup.string().email().required("This is required."),
  number: Yup.string()
    .matches(/^\+91[1-9][0-9]{9}$/, "Invalid number")
    .min(13, "Invalid number")
    .max(13, "Invalid number")
    .required("This is required."),
});

const NewFormLayout: React.FC<Props> = ({
  initialValues,
  editMode = false,
}) => {
  const router = useRouter();
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormik<IFormValues>({
      initialValues: {
        name: initialValues?.name || "",
        email: initialValues?.email || "",
        number: initialValues?.number || "",
      },
      validationSchema: formSchema,

      onSubmit: async (values, formikHelpers) => {
        const createform = "http://localhost:3000/api/createform";
        const formData = {
          id: initialValues?.id || undefined,
          ...values,
        };
        const {
          data: { form },
        } = await axios.post(createform, {
          form: formData,
        });
        router.push(`/form/${form.email}`);
      },
    });

  return (
    <Box
      minW="360px"
      rounded="md"
      boxShadow="md"
      maxW="960px"
      bgColor="white"
      px="15px"
      py="15px"
    >
      <Heading
        fontSize="20px"
        textAlign="center"
        textTransform="uppercase"
        className="font-inter"
        color="linkedin.500"
        textDecoration="underline"
      >
        Student Info form
      </Heading>
      <form onSubmit={(e) => handleSubmit(e)}>
        <CustomInput
          name="name"
          value={values.name}
          handleBlur={handleBlur}
          handleChange={handleChange}
          type="text"
          label="Name"
          placeholder="John Doe"
          error={errors.name}
          touched={touched.name}
          editMode={editMode}
        />
        <CustomInput
          name="email"
          value={values.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
          type="email"
          label="Email"
          placeholder="johndoe123@gmail.com"
          error={errors.email}
          touched={touched.email}
          editMode={editMode}
        />
        <CustomInput
          name="number"
          value={values.number}
          handleBlur={handleBlur}
          handleChange={handleChange}
          type="text"
          label="Phone Number"
          placeholder="+91 XXXXXXXXXX"
          error={errors.number}
          touched={touched.number}
          editMode={editMode}
        />
        <Flex mt="16px" justifyContent="flex-end">
          <Button colorScheme="linkedin" type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default NewFormLayout;
