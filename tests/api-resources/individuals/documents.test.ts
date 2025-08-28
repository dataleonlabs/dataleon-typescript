// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dataleon, { toFile } from '@dataleon/dataleon';

const client = new Dataleon({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource documents', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.individuals.documents.list('individual_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('upload: only required params', async () => {
    const responsePromise = client.individuals.documents.upload('individual_id', {
      document_type: 'liasse_fiscale',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('upload: required and optional params', async () => {
    const response = await client.individuals.documents.upload('individual_id', {
      document_type: 'liasse_fiscale',
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
      url: 'https://example.com/sample.pdf',
    });
  });
});
