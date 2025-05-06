/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Component = {
  __typename?: 'Component';
  config: ComponentConfig;
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ComponentConfig = {
  __typename?: 'ComponentConfig';
  commitMessage: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  payload: Scalars['String']['output'];
  revision: Scalars['Int']['output'];
};

export type CreateComponentInput = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateConfigInput = {
  commitMessage: Scalars['String']['input'];
  componentId: Scalars['String']['input'];
  payload: Scalars['String']['input'];
};

export type CreateStageInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type GetComponentInput = {
  parent?: InputMaybe<Scalars['String']['input']>;
};

export type GetHistoryForConfig = {
  componentId: Scalars['String']['input'];
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComponent: Component;
  createComponentConfig: ComponentConfig;
  createStage: Stage;
  login: LoginOutput;
};


export type MutationCreateComponentArgs = {
  input: CreateComponentInput;
};


export type MutationCreateComponentConfigArgs = {
  input: CreateConfigInput;
};


export type MutationCreateStageArgs = {
  input: CreateStageInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  getComponentByParent: Array<Component>;
  getConfigHistory: Array<ComponentConfig>;
  getStages: Array<Stage>;
  me: UserAccount;
};


export type QueryGetComponentByParentArgs = {
  input: GetComponentInput;
};


export type QueryGetConfigHistoryArgs = {
  input: GetHistoryForConfig;
};

export type Stage = {
  __typename?: 'Stage';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UserAccount = {
  __typename?: 'UserAccount';
  id: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateComponentConfigMutationVariables = Exact<{
  input: CreateConfigInput;
}>;


export type CreateComponentConfigMutation = { __typename?: 'Mutation', createComponentConfig: { __typename?: 'ComponentConfig', id: string, payload: string, commitMessage: string, revision: number } };

export type GetComponentByParentQueryVariables = Exact<{
  input: GetComponentInput;
}>;


export type GetComponentByParentQuery = { __typename?: 'Query', getComponentByParent: Array<{ __typename?: 'Component', id: string, name: string, createdAt: string }> };

export type GetConfigHistoryQueryVariables = Exact<{
  input: GetHistoryForConfig;
}>;


export type GetConfigHistoryQuery = { __typename?: 'Query', getConfigHistory: Array<{ __typename?: 'ComponentConfig', id: string, payload: string, commitMessage: string, revision: number, createdAt: any }> };

export type GetStagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStagesQuery = { __typename?: 'Query', getStages: Array<{ __typename?: 'Stage', id: string, name: string, createdAt: string }> };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', token: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserAccount', id: string, username: string } };


export const CreateComponentConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createComponentConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComponentConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"commitMessage"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}}]}}]}}]} as unknown as DocumentNode<CreateComponentConfigMutation, CreateComponentConfigMutationVariables>;
export const GetComponentByParentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComponentByParent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetComponentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComponentByParent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetComponentByParentQuery, GetComponentByParentQueryVariables>;
export const GetConfigHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConfigHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetHistoryForConfig"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getConfigHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"commitMessage"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetConfigHistoryQuery, GetConfigHistoryQueryVariables>;
export const GetStagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetStagesQuery, GetStagesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;