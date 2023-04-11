import React from "react";
import { GetServerSideProps } from "next";
import { Box, Heading, Text } from "@chakra-ui/react";
import { db } from "@/data/db";
import axios from "axios";
import NewFormLayout from "@/containers/newForm/NewFormLayout";

interface Props {
  form: typeof db[0] | null;
}

const Form: React.FC<Props> = ({ form }) => {
  if (form === null) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-300">
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
          >
            Student Info form
          </Heading>
          <Text>No Form exists with the id</Text>
        </Box>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-300">
      <NewFormLayout editMode={true} initialValues={form} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.params) {
    const { formId } = ctx.params; //formId is email
    const {data:{form}} = await axios.get(`http://localhost:3000/api/getform?formEmail=${formId}`)
    if (form) {
      return {
        props: {
          form,
        },
      };
    }
  }
  return {
    props: {
      form: null,
    },
  };
};
export default Form;
