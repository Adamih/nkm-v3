import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
  workShifts: PaginatedWorkShifts;
  workShift?: Maybe<WorkShift>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryWorkShiftsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryWorkShiftArgs = {
  id: Scalars['Int'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedWorkShifts = {
  __typename?: 'PaginatedWorkShifts';
  workShifts: Array<WorkShift>;
  hasMore: Scalars['Boolean'];
};

export type WorkShift = {
  __typename?: 'WorkShift';
  id: Scalars['Float'];
  title: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  createWorkShift: WorkShift;
  updateWorkShift?: Maybe<WorkShift>;
  deleteWorkShift: Scalars['Boolean'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  options: PostInput;
};


export type MutationUpdatePostArgs = {
  options?: Maybe<PostInput>;
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateWorkShiftArgs = {
  options: WorkShiftInput;
};


export type MutationUpdateWorkShiftArgs = {
  options?: Maybe<WorkShiftInput>;
  id: Scalars['Int'];
};


export type MutationDeleteWorkShiftArgs = {
  id: Scalars['Int'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user: User;
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type WorkShiftInput = {
  title: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
};

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'textSnippet' | 'points' | 'voteStatus'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  ) }
);

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'creatorId' | 'title' | 'text' | 'points' | 'createdAt' | 'updatedAt'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
);

export type RegularWorkShiftFragment = (
  { __typename?: 'WorkShift' }
  & Pick<WorkShift, 'id' | 'title' | 'notes' | 'createdAt' | 'updatedAt'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { user: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  options: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & RegularPostFragment
  ) }
);

export type CreateWorkShiftMutationVariables = Exact<{
  options: WorkShiftInput;
}>;


export type CreateWorkShiftMutation = (
  { __typename?: 'Mutation' }
  & { createWorkShift: (
    { __typename?: 'WorkShift' }
    & RegularWorkShiftFragment
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type DeleteWorkShiftMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteWorkShiftMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteWorkShift'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  options: PostInput;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'textSnippet'>
  )> }
);

export type UpdateWorkShiftMutationVariables = Exact<{
  id: Scalars['Int'];
  options: WorkShiftInput;
}>;


export type UpdateWorkShiftMutation = (
  { __typename?: 'Mutation' }
  & { updateWorkShift?: Maybe<(
    { __typename?: 'WorkShift' }
    & Pick<WorkShift, 'id' | 'title' | 'notes'>
  )> }
);

export type VoteMutationVariables = Exact<{
  postId: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'points' | 'voteStatus'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export type WorkShiftQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WorkShiftQuery = (
  { __typename?: 'Query' }
  & { workShift?: Maybe<(
    { __typename?: 'WorkShift' }
    & RegularWorkShiftFragment
  )> }
);

export type WorkShiftsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type WorkShiftsQuery = (
  { __typename?: 'Query' }
  & { workShifts: (
    { __typename?: 'PaginatedWorkShifts' }
    & Pick<PaginatedWorkShifts, 'hasMore'>
    & { workShifts: Array<(
      { __typename?: 'WorkShift' }
      & RegularWorkShiftFragment
    )> }
  ) }
);

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  textSnippet
  points
  voteStatus
  creator {
    id
    email
  }
}
    `;
export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  creatorId
  title
  text
  points
  createdAt
  updatedAt
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  firstName
  lastName
  email
}
    `;
export const RegularWorkShiftFragmentDoc = gql`
    fragment RegularWorkShift on WorkShift {
  id
  title
  notes
  createdAt
  updatedAt
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(token: $token, password: $password) {
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($options: PostInput!) {
  createPost(options: $options) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const CreateWorkShiftDocument = gql`
    mutation CreateWorkShift($options: WorkShiftInput!) {
  createWorkShift(options: $options) {
    ...RegularWorkShift
  }
}
    ${RegularWorkShiftFragmentDoc}`;

export function useCreateWorkShiftMutation() {
  return Urql.useMutation<CreateWorkShiftMutation, CreateWorkShiftMutationVariables>(CreateWorkShiftDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const DeleteWorkShiftDocument = gql`
    mutation DeleteWorkShift($id: Int!) {
  deleteWorkShift(id: $id)
}
    `;

export function useDeleteWorkShiftMutation() {
  return Urql.useMutation<DeleteWorkShiftMutation, DeleteWorkShiftMutationVariables>(DeleteWorkShiftDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $options: PostInput!) {
  updatePost(id: $id, options: $options) {
    id
    title
    text
    textSnippet
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const UpdateWorkShiftDocument = gql`
    mutation UpdateWorkShift($id: Int!, $options: WorkShiftInput!) {
  updateWorkShift(id: $id, options: $options) {
    id
    title
    notes
  }
}
    `;

export function useUpdateWorkShiftMutation() {
  return Urql.useMutation<UpdateWorkShiftMutation, UpdateWorkShiftMutationVariables>(UpdateWorkShiftDocument);
};
export const VoteDocument = gql`
    mutation Vote($postId: Int!, $value: Int!) {
  vote(postId: $postId, value: $value)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    createdAt
    updatedAt
    title
    text
    points
    creator {
      id
      firstName
      lastName
      email
    }
    voteStatus
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const WorkShiftDocument = gql`
    query WorkShift($id: Int!) {
  workShift(id: $id) {
    ...RegularWorkShift
  }
}
    ${RegularWorkShiftFragmentDoc}`;

export function useWorkShiftQuery(options: Omit<Urql.UseQueryArgs<WorkShiftQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<WorkShiftQuery>({ query: WorkShiftDocument, ...options });
};
export const WorkShiftsDocument = gql`
    query WorkShifts($limit: Int!, $cursor: String) {
  workShifts(limit: $limit, cursor: $cursor) {
    hasMore
    workShifts {
      ...RegularWorkShift
    }
  }
}
    ${RegularWorkShiftFragmentDoc}`;

export function useWorkShiftsQuery(options: Omit<Urql.UseQueryArgs<WorkShiftsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<WorkShiftsQuery>({ query: WorkShiftsDocument, ...options });
};