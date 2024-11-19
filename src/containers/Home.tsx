import { useEffect, useState } from "react";
import { getTree, TreeData } from "../api/requests";
import Accordion from "../components/accordion/Accordion";

const Home = () => {
  const [treeData, setTreeData] = useState<TreeData | undefined>();
  const [callData, setCallData] = useState<boolean>(false);

  const handleCallData = () => {
    setCallData(!callData);
  };

  useEffect(() => {
    getTree().then((data) => {
      setTreeData(data);
    });
  }, [callData]);

  return (
    <div className="container">
      {treeData && (
        <Accordion
          treeName={treeData.name}
          data={treeData}
          handleCallData={handleCallData}
        />
      )}
    </div>
  );
};

export default Home;
