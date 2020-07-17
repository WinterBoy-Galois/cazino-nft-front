export interface GenericError {
  source: string | null;
  code: string;
  message: string;
  args: [string] | null;
}
