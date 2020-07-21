export default interface ApplicationError {
  code: string;
  source?: string;
  message?: string;
  localizedMessage?: string;
  args?: [string];
}
