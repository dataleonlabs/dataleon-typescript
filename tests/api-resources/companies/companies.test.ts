// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dataleon from 'dataleon';

const client = new Dataleon({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource companies', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.companies.create({
      company: { name: 'ACME Corp' },
      workspace_id: 'wk_123',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.companies.create({
      company: {
        name: 'ACME Corp',
        address: '123 rue Exemple, Paris',
        commercial_name: 'ACME',
        country: 'FR',
        email: 'info@acme.fr',
        employer_identification_number: 'EIN123456',
        legal_form: 'SARL',
        phone_number: '+33 1 23 45 67 89',
        registration_date: '2010-05-15',
        registration_id: 'RCS123456',
        share_capital: '100000',
        status: 'active',
        tax_identification_number: 'FR123456789',
        type: 'main',
        website_url: 'https://acme.fr',
      },
      workspace_id: 'wk_123',
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
    const responsePromise = client.companies.retrieve('company_id');
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
      client.companies.retrieve(
        'company_id',
        { document: true, scope: 'scope' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Dataleon.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.companies.update('company_id', {
      company: { name: 'ACME Corp' },
      workspace_id: 'wk_123',
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
  test.skip('update: required and optional params', async () => {
    const response = await client.companies.update('company_id', {
      company: {
        name: 'ACME Corp',
        address: '123 rue Exemple, Paris',
        commercial_name: 'ACME',
        country: 'FR',
        email: 'info@acme.fr',
        employer_identification_number: 'EIN123456',
        legal_form: 'SARL',
        phone_number: '+33 1 23 45 67 89',
        registration_date: '2010-05-15',
        registration_id: 'RCS123456',
        share_capital: '100000',
        status: 'active',
        tax_identification_number: 'FR123456789',
        type: 'main',
        website_url: 'https://acme.fr',
      },
      workspace_id: 'wk_123',
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
    const responsePromise = client.companies.list();
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
      client.companies.list(
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
    const responsePromise = client.companies.delete('company_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
