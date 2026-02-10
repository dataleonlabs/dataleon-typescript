import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.individuals.create',
    fullyQualifiedName: 'individuals.create',
    httpMethod: 'post',
    httpPath: '/individuals',
  },
  {
    clientCallName: 'client.individuals.retrieve',
    fullyQualifiedName: 'individuals.retrieve',
    httpMethod: 'get',
    httpPath: '/individuals/{individual_id}',
  },
  {
    clientCallName: 'client.individuals.update',
    fullyQualifiedName: 'individuals.update',
    httpMethod: 'put',
    httpPath: '/individuals/{individual_id}',
  },
  {
    clientCallName: 'client.individuals.list',
    fullyQualifiedName: 'individuals.list',
    httpMethod: 'get',
    httpPath: '/individuals',
  },
  {
    clientCallName: 'client.individuals.delete',
    fullyQualifiedName: 'individuals.delete',
    httpMethod: 'delete',
    httpPath: '/individuals/{individual_id}',
  },
  {
    clientCallName: 'client.individuals.documents.list',
    fullyQualifiedName: 'individuals.documents.list',
    httpMethod: 'get',
    httpPath: '/individuals/{individual_id}/documents',
  },
  {
    clientCallName: 'client.individuals.documents.upload',
    fullyQualifiedName: 'individuals.documents.upload',
    httpMethod: 'post',
    httpPath: '/individuals/{individual_id}/documents',
  },
  {
    clientCallName: 'client.companies.create',
    fullyQualifiedName: 'companies.create',
    httpMethod: 'post',
    httpPath: '/companies',
  },
  {
    clientCallName: 'client.companies.retrieve',
    fullyQualifiedName: 'companies.retrieve',
    httpMethod: 'get',
    httpPath: '/companies/{company_id}',
  },
  {
    clientCallName: 'client.companies.update',
    fullyQualifiedName: 'companies.update',
    httpMethod: 'put',
    httpPath: '/companies/{company_id}',
  },
  {
    clientCallName: 'client.companies.list',
    fullyQualifiedName: 'companies.list',
    httpMethod: 'get',
    httpPath: '/companies',
  },
  {
    clientCallName: 'client.companies.delete',
    fullyQualifiedName: 'companies.delete',
    httpMethod: 'delete',
    httpPath: '/companies/{company_id}',
  },
  {
    clientCallName: 'client.companies.documents.list',
    fullyQualifiedName: 'companies.documents.list',
    httpMethod: 'get',
    httpPath: '/companies/{company_id}/documents',
  },
  {
    clientCallName: 'client.companies.documents.upload',
    fullyQualifiedName: 'companies.documents.upload',
    httpMethod: 'post',
    httpPath: '/companies/{company_id}/documents',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
