/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation createComponent($input: CreateComponentInput!) {\n    createComponent(input: $input) {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.CreateComponentDocument,
    "\n  mutation createComponentConfig($input: CreateConfigInput!) {\n    createComponentConfig(input: $input) {\n      id\n      payload\n      commitMessage\n      revision\n    }\n  }\n": typeof types.CreateComponentConfigDocument,
    "\n  mutation CreateStages($input: CreateStagesInput!) {\n    createStages(input: $input) {\n      id\n      name\n    }\n  }\n": typeof types.CreateStagesDocument,
    "\n  mutation DeleteComponent($id: String!) {\n    deleteComponent(id: $id)\n  }\n": typeof types.DeleteComponentDocument,
    "\n  mutation DuplicateComponent($id: String!) {\n    duplicateComponent(id: $id) {\n      id\n      name\n    }\n  }\n": typeof types.DuplicateComponentDocument,
    "\n  query GetComponentByParent($input: GetComponentInput!) {\n    getComponentByParent(input: $input) {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.GetComponentByParentDocument,
    "\n  query GetConfigHistory($input: GetHistoryForConfig!) {\n    getConfigHistory(input: $input) {\n      id\n      payload\n      commitMessage\n      revision\n      createdAt\n    }\n  }\n": typeof types.GetConfigHistoryDocument,
    "\n  query GetStages {\n    getStages {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.GetStagesDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(input: { username: $username, password: $password }) {\n      token\n    }\n  }\n": typeof types.LoginDocument,
    "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n": typeof types.MeDocument,
    "\n  mutation RenameComponent($id: String!, $newName: String!) {\n    renameComponent(id: $id, newName: $newName) {\n      id\n      name\n    }\n  }\n": typeof types.RenameComponentDocument,
};
const documents: Documents = {
    "\n  mutation createComponent($input: CreateComponentInput!) {\n    createComponent(input: $input) {\n      id\n      name\n      createdAt\n    }\n  }\n": types.CreateComponentDocument,
    "\n  mutation createComponentConfig($input: CreateConfigInput!) {\n    createComponentConfig(input: $input) {\n      id\n      payload\n      commitMessage\n      revision\n    }\n  }\n": types.CreateComponentConfigDocument,
    "\n  mutation CreateStages($input: CreateStagesInput!) {\n    createStages(input: $input) {\n      id\n      name\n    }\n  }\n": types.CreateStagesDocument,
    "\n  mutation DeleteComponent($id: String!) {\n    deleteComponent(id: $id)\n  }\n": types.DeleteComponentDocument,
    "\n  mutation DuplicateComponent($id: String!) {\n    duplicateComponent(id: $id) {\n      id\n      name\n    }\n  }\n": types.DuplicateComponentDocument,
    "\n  query GetComponentByParent($input: GetComponentInput!) {\n    getComponentByParent(input: $input) {\n      id\n      name\n      createdAt\n    }\n  }\n": types.GetComponentByParentDocument,
    "\n  query GetConfigHistory($input: GetHistoryForConfig!) {\n    getConfigHistory(input: $input) {\n      id\n      payload\n      commitMessage\n      revision\n      createdAt\n    }\n  }\n": types.GetConfigHistoryDocument,
    "\n  query GetStages {\n    getStages {\n      id\n      name\n      createdAt\n    }\n  }\n": types.GetStagesDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(input: { username: $username, password: $password }) {\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n": types.MeDocument,
    "\n  mutation RenameComponent($id: String!, $newName: String!) {\n    renameComponent(id: $id, newName: $newName) {\n      id\n      name\n    }\n  }\n": types.RenameComponentDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createComponent($input: CreateComponentInput!) {\n    createComponent(input: $input) {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createComponent($input: CreateComponentInput!) {\n    createComponent(input: $input) {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createComponentConfig($input: CreateConfigInput!) {\n    createComponentConfig(input: $input) {\n      id\n      payload\n      commitMessage\n      revision\n    }\n  }\n"): (typeof documents)["\n  mutation createComponentConfig($input: CreateConfigInput!) {\n    createComponentConfig(input: $input) {\n      id\n      payload\n      commitMessage\n      revision\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStages($input: CreateStagesInput!) {\n    createStages(input: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStages($input: CreateStagesInput!) {\n    createStages(input: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteComponent($id: String!) {\n    deleteComponent(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteComponent($id: String!) {\n    deleteComponent(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DuplicateComponent($id: String!) {\n    duplicateComponent(id: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation DuplicateComponent($id: String!) {\n    duplicateComponent(id: $id) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetComponentByParent($input: GetComponentInput!) {\n    getComponentByParent(input: $input) {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetComponentByParent($input: GetComponentInput!) {\n    getComponentByParent(input: $input) {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConfigHistory($input: GetHistoryForConfig!) {\n    getConfigHistory(input: $input) {\n      id\n      payload\n      commitMessage\n      revision\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetConfigHistory($input: GetHistoryForConfig!) {\n    getConfigHistory(input: $input) {\n      id\n      payload\n      commitMessage\n      revision\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStages {\n    getStages {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetStages {\n    getStages {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(input: { username: $username, password: $password }) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(input: { username: $username, password: $password }) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RenameComponent($id: String!, $newName: String!) {\n    renameComponent(id: $id, newName: $newName) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation RenameComponent($id: String!, $newName: String!) {\n    renameComponent(id: $id, newName: $newName) {\n      id\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;