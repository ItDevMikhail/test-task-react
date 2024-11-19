export const TREE_NAME = "430373b1-2127-4b4b-80b3-fedd055c84f5";
export const BASE_URL = "https://test.vmarmysh.com/";
export const GET_TREE_URL = `${BASE_URL}api.user.tree.get`;
export const CREATE_TREE_NODE_URL = `${BASE_URL}api.user.tree.node.create`;
export const DELETE_TREE__NODE_URL = `${BASE_URL}api.user.tree.node.delete`;
export const RENAME_TREE_NODE_URL = `${BASE_URL}api.user.tree.node.rename`;

export enum ParamsName {
  TreeName = "treeName",
  ParentNodeId = "parentNodeId",
  NodeName = "nodeName",
  Nodeid = "nodeId",
  NewNodeName = "newNodeName",
}

export enum ModalActionType {
  Create = "Create",
  Rename = "Rename",
  Delete = "Delete",
}
