export interface GenericError {
  type: GenericErrorType;
  field: string;
  severity: GenericErrorSeverity;
  messageKey: string;
  args: any;
}

export enum GenericErrorType {
  MANUALDISMISS = 'MANUALDISMISS',
  AUTODISMISS = 'AUTODISMISS',
  FIELD = 'FIELD',
  DIALOG = 'DIALOG',
}

export enum GenericErrorSeverity {
  WARNING = 'WARNING',
  NONCRITICAL = 'NONCRITICAL',
  CRITICAL = 'CRITICAL',
}
