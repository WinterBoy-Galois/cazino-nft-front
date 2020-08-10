const env = (name: string): string => {
  const envVariable = process.env[name];
  if (envVariable !== undefined) {
    return envVariable;
  }

  throw new Error(`Environment variable ${name} is not configured.`);
};

export { env };
