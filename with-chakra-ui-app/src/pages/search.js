import { Input } from "@chakra-ui/react";
import Layout from "../components/MainLayout"
import TableParent from "../components/Table"
const Search = () => {
    return (
        <Layout>
            <Input placeholder='Enter a class...' />
            <TableParent />
      </Layout>
        
    );


};

export default Search;