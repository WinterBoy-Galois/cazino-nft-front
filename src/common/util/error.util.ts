import { GraphQLError } from 'graphql';
import { TFunction } from 'i18next';

import { GenericError } from '../../models/genericError.model';
import ApplicationError from '../../models/applicationError.model';

const getMessageFromCode = (t: TFunction, code: string) => {
  switch (code) {
    case 'AUTH_ERROR':
      return t('common:errors.ACCOUNT_AUTH_ERROR');
    case 'ALREADY_EXIST':
      return t('auth:errors.ACCOUNT_USERNAME_ALREADY_EXISTS');
    case 'INVALID_ACTIVATION_CODE':
      return t('errors.INVALID_ACTIVATION_CODE');
    case 'ALREADY_ACTIVATED':
      return t('errors.ALREADY_ACTIVATED');
    case 'SERVER_ERROR':
      return t('common:errors.SERVER_ERROR');
    default:
      return undefined;
  }
};

const getFromGraphQLErrors = (errors?: GraphQLError[] | readonly GraphQLError[], t?: TFunction) => {
  if (errors === undefined || errors.length <= 0) {
    return [];
  }

  const result: ApplicationError[] = [];

  errors.forEach((error: any) => {
    if (
      error.source !== undefined &&
      error.code !== undefined &&
      error.message !== undefined &&
      error.args !== undefined
    ) {
      const newError: ApplicationError = {
        source: error.source,
        code: error.code,
        message: error.message,
        localizedMessage: t ? getMessageFromCode(t, error.code) : undefined,
        args: error.args,
      };

      result.push(newError);
    }
  });

  return result;
};

const getFromGenericErrors = (errors?: GenericError[] | readonly GraphQLError[], t?: TFunction) => {
  if (errors === undefined || errors.length <= 0) {
    return [];
  }

  const result: ApplicationError[] = [];

  errors.forEach((error: any) => {
    if (
      error.source !== undefined &&
      error.code !== undefined &&
      error.message !== undefined &&
      error.args !== undefined
    ) {
      const newError: ApplicationError = {
        source: error.source,
        code: error.code,
        message: error.message,
        localizedMessage: t ? getMessageFromCode(t, error.code) : '',
        args: error.args,
      };

      result.push(newError);
    }
  });

  return result;
};

const isForbiddenError = (errors?: readonly GraphQLError[]) =>
  errors?.some(err => err?.extensions?.code === 'FORBIDDEN');

export { isForbiddenError, getMessageFromCode, getFromGraphQLErrors, getFromGenericErrors };
