import {
  TREE_NAME,
  GET_TREE_URL,
  CREATE_TREE_NODE_URL,
  DELETE_TREE__NODE_URL,
  RENAME_TREE_NODE_URL,
  ParamsName,
} from "../constants";

export type TreeData = {
  id: number;
  name: string;
  children?: Array<TreeData>;
};

export type Params = Array<{
  name: ParamsName;
  data: string | number;
}>;

const requestTemplate = async (
  url: string,
  params?: Params,
  method?: string,
  body?: BodyInit
) => {
  try {
    let queryParams: string = params
      ? `?${params.map((el) => `${el.name}=${el.data}`).join("&")}`
      : "";
    let response = await fetch(`${url}${queryParams}`, {
      method,
      body,
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTree = (params?: Params): Promise<TreeData | undefined> =>
  requestTemplate(
    GET_TREE_URL,
    (params = [
      {
        name: ParamsName.TreeName,
        data: TREE_NAME,
      },
    ])
  );

export const createTreeNode = (params: Params) =>
  requestTemplate(CREATE_TREE_NODE_URL, params, "POST");

export const deleteTreeNode = (params: Params) =>
  requestTemplate(DELETE_TREE__NODE_URL, params, "POST");

export const renameTreeNode = (params: Params) =>
  requestTemplate(RENAME_TREE_NODE_URL, params, "POST");
