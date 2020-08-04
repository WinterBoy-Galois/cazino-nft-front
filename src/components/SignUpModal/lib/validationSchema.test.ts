import { cleanup } from '@testing-library/react';

import { validationSchema } from './validationSchema';
import { ValidationError } from 'yup';

const translate = (key: string) => {
  switch (key) {
    case 'validation.email.required':
      return 'Email is a required field';
    case 'validation.email.valid':
      return 'Email must be a valid email';
    case 'validation.username.required':
      return 'Username is a required field';
    case 'validation.username.min':
      return 'Username it too short';
    case 'validation.username.max':
      return 'Username it too long';
    case 'validation.username.alphanumeric':
      return 'Username must be alphanumeric';
    case 'validation.password.required':
      return 'Password is a required field';
    case 'validation.password.min':
      return 'Password it too short';
    case 'validation.password.max':
      return 'Password it too long';
    case 'validation.password.uppercase':
      return 'Must contain at least one uppercase character';
    case 'validation.password.lowercase':
      return 'Must contain at least one lowercase character';
    case 'validation.password.digit':
      return 'Must contain at least one number';
    case 'validation.password.special':
      return 'Must contain at least one special character';
    case 'validation.password.alphanumeric':
      return 'Password must be alphanumeric';
    case 'validation.password.match':
      return 'Passwords must match';
    case 'validation.terms.required':
      return 'Terms is a required field';
    default:
      return undefined;
  }
};

const data = {
  email: 'john.doe@example.com',
  username: 'johndoe',
  password: 'MyP@ssw0rd',
  confirmPassword: 'MyP@ssw0rd',
  terms: true,
};

describe('Validation Schema', () => {
  let mockedTranslation: jest.Mock;

  beforeEach(() => {
    cleanup();

    mockedTranslation = jest.fn(translate);
  });

  it('should pass on valid data', async () => {
    // Arrange
    const values = data;

    // Act
    const schema = validationSchema(mockedTranslation);
    await schema.validate(values);

    // Assert
    expect(schema.isValid).toBeTruthy();
  });

  describe('on username', () => {
    it('should fail if missing', async () => {
      // Arrange
      const values = { ...data, username: undefined };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(/Username is a required field/);
    });

    it('should fail if too short', async () => {
      // Arrange
      const values = { ...data, username: 'tes' };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(ValidationError);
    });

    it('should fail if too long', async () => {
      // Arrange
      const values = { ...data, username: 'testtesttesttest' };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(ValidationError);
    });

    it('should pass if length is appropriate', async () => {
      // Arrange
      const values = { ...data, username: 'test' };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).resolves.toBe(values);
    });

    it('should pass for alphanumeric values', async () => {
      // Arrange
      const usernames = ['Boris', 'Anton', 'Magic69', '13Thiefs'];

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      usernames.forEach(async username => {
        const value = { ...data, username: username };
        await expect(schema.validate(value)).resolves.toBe(value);
      });
    });

    it('should fail for non alphanumeric values', async () => {
      // Arrange
      const usernames = ['Борис', 'Антон', 'Di_Vider', '!Megaman', '_KillaMC'];

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      usernames.forEach(async username => {
        const value = { ...data, username: username };
        await expect(schema.validate(value)).rejects.toThrow(/Username must be alphanumeric/);
      });
    });
  });

  describe('on password', () => {
    it('should fail if missing', async () => {
      // Arrange
      const values = { ...data, password: undefined, confirmPassword: undefined };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(/Password is a required field/);
    });

    it('should fail if different from password confirmation', async () => {
      // Arrange
      const values = { ...data, confirmPassword: 'fail' };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(/Passwords must match/);
    });

    it('should fail if too short', async () => {
      // Arrange
      const values = { ...data, password: 'MP@sw0', confirmPassword: 'MP@sw0' };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(/Password it too short/);
    });

    it('should fail if too long', async () => {
      // Arrange
      const values = {
        ...data,
        password: 'MP@MyP@ssw0rdMyP@ssw0rd',
        confirmPassword: 'MP@MyP@ssw0rdMyP@ssw0rd',
      };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(/Password it too long/);
    });

    it('should pass if length is appropriate', async () => {
      // Arrange
      const values = {
        ...data,
        password: 'MyP@ssw0rd',
        confirmPassword: 'MyP@ssw0rd',
      };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).resolves.toBe(values);
    });

    it('should fail if no uppercase character provided', async () => {
      // Arrange
      const values = {
        ...data,
        password: 'myp@ssw0rd',
        confirmPassword: 'myp@ssw0rd',
      };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(
        /Must contain at least one uppercase character/
      );
    });

    it('should fail if no uppercase character provided', async () => {
      // Arrange
      const values = {
        ...data,
        password: 'MYP@SSW0RD',
        confirmPassword: 'MYP@SSW0RD',
      };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(
        /Must contain at least one lowercase character/
      );
    });

    it('should fail if no digit provided', async () => {
      // Arrange
      const values = {
        ...data,
        password: 'MyP@ssword',
        confirmPassword: 'MyP@ssword',
      };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(/Must contain at least one number/);
    });

    it('should fail if no special character provided', async () => {
      // Arrange
      const values = {
        ...data,
        password: 'MyPassw0rd',
        confirmPassword: 'MyPassw0rd',
      };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(
        /Must contain at least one special character/
      );
    });

    it('should pass for whitelisted special characters', async () => {
      // Arrange
      const specialCharacters = '^$*.[]{}()?-"!@#%&/\\,><\':;|_~`';
      const passwords: string[] = [];

      for (let _i = 0; _i < specialCharacters.length; _i++) {
        const specialCharacter = specialCharacters.substr(_i, 1);
        passwords.push(`MyP${specialCharacter}ssw0rd`);
      }

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      passwords.forEach(async password => {
        const values = {
          ...data,
          password: password,
          confirmPassword: password,
        };
        await expect(schema.validate(values)).resolves.toBe(values);
      });
    });

    it('should fail for non whitelisted special characters', async () => {
      // Arrange
      const specialCharacters = '€¥';
      const passwords: string[] = [];

      for (let _i = 0; _i < specialCharacters.length; _i++) {
        const specialCharacter = specialCharacters.substr(_i, 1);
        passwords.push(`MyP${specialCharacter}ssw0rd`);
      }

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      passwords.forEach(async password => {
        const values = {
          ...data,
          password: password,
          confirmPassword: password,
        };
        await expect(schema.validate(values)).rejects.toThrow(
          /Must contain at least one special character/
        );
      });
    });

    it('should fail for non alphanumeric values', async () => {
      // Arrange
      const passwords = ['мyP@ssw0rй', 'Пить_Password!2323'];

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      passwords.forEach(async password => {
        const value = { ...data, password: password, confirmPassword: password };
        await expect(schema.validate(value)).rejects.toThrow(/Password must be alphanumeric/);
      });
    });
  });

  describe('on email', () => {
    it('should fail if missing', async () => {
      // Arrange
      const values = { ...data, email: undefined };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(/Email is a required field/);
    });

    it('should fail if no valid email schema', async () => {
      // Arrange
      const values = { ...data, email: 'John.Doe@example' };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(/Email must be a valid email/);
    });
  });

  describe('on terms', () => {
    it('should fail if missing', async () => {
      // Arrange
      const values = { ...data, terms: false };

      // Act
      const schema = validationSchema(mockedTranslation);

      // Assert
      await expect(schema.validate(values)).rejects.toThrow(/Terms is a required field/);
    });
  });
});
