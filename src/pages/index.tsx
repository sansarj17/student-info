import { Inter } from "next/font/google";
import { Box, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ emailList }: { emailList: any }) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-300">
      <Box
        minW="360px"
        rounded="md"
        boxShadow="md"
        maxW="960px"
        bgColor="white"
        px="15px"
        py="15px"
      >
        {emailList.map((form:any) => (
          <Link
            key={form.email}
            href={`http://localhost:3000/form/${form.email}`}
          >
            <Text>
              {form.email}
              <ExternalLinkIcon ml="8px" />
            </Text>
          </Link>
        ))}
      </Box>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    data: { forms },
  } = await axios.get("http://localhost:3000/api/getallforms");
  return {
    props: {
      emailList: forms,
    },
  };
};
