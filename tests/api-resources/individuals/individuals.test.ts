// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dataleon from '@dataleon/dataleon';

const client = new Dataleon({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource individuals', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.individuals.create({ workspace_id: 'wk_123' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.individuals.create({
      workspace_id: 'wk_123',
      person: {
        birthday: '15/05/1985',
        email: 'john.doe@example.com',
        first_name: 'John',
        gender: 'M',
        last_name: 'Doe',
        maiden_name: 'John Doe',
        phone_number: '+33 1 23 45 67 89',
      },
      source_id: 'ID54410069066',
      technical_data: {
        active_aml_suspicions: false,
        callback_url: 'https://example.com/callback',
        callback_url_notification: 'https://example.com/notify',
        language: 'fra',
        raw_data: true,
      },
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.individuals.retrieve('individual_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.individuals.retrieve(
        'individual_id',
        { document: true, scope: 'scope' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Dataleon.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.individuals.update('individual_id', { workspace_id: 'wk_123' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.individuals.update('individual_id', {
      workspace_id: 'wk_123',
      person: {
        birthday: '15/05/1985',
        email: 'john.doe@example.com',
        first_name: 'John',
        gender: 'M',
        last_name: 'Doe',
        maiden_name: 'John Doe',
        phone_number: '+33 1 23 45 67 89',
      },
      source_id: 'ID54410069066',
      technical_data: {
        active_aml_suspicions: false,
        callback_url: 'https://example.com/callback',
        callback_url_notification: 'https://example.com/notify',
        language: 'fra',
        raw_data: true,
      },
    });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.individuals.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.individuals.list(
        {
          end_date: '2019-12-27',
          limit: 1,
          offset: 0,
          source_id: 'source_id',
          start_date: '2019-12-27',
          state: 'VOID',
          status: 'rejected',
          workspace_id: 'workspace_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Dataleon.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.individuals.delete('individual_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
