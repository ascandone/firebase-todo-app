export type RemoteLoading =
  | { type: 'NOT_ASKED' }
  | { type: 'LOADING' }
  | { type: 'GOT_ERROR'; message: string }
