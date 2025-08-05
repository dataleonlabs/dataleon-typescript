# Shared

Types:

- <code><a href="./src/resources/shared.ts">Check</a></code>

# Individuals

Types:

- <code><a href="./src/resources/individuals/individuals.ts">Individual</a></code>
- <code><a href="./src/resources/individuals/individuals.ts">IndividualListResponse</a></code>

Methods:

- <code title="post /individuals">client.individuals.<a href="./src/resources/individuals/individuals.ts">create</a>({ ...params }) -> Individual</code>
- <code title="get /individuals/{individual_id}">client.individuals.<a href="./src/resources/individuals/individuals.ts">retrieve</a>(individualID, { ...params }) -> Individual</code>
- <code title="put /individuals/{individual_id}">client.individuals.<a href="./src/resources/individuals/individuals.ts">update</a>(individualID, { ...params }) -> Individual</code>
- <code title="get /individuals">client.individuals.<a href="./src/resources/individuals/individuals.ts">list</a>({ ...params }) -> IndividualListResponse</code>
- <code title="delete /individuals/{individual_id}">client.individuals.<a href="./src/resources/individuals/individuals.ts">delete</a>(individualID) -> void</code>

## Documents

Types:

- <code><a href="./src/resources/individuals/documents.ts">DocumentResponse</a></code>
- <code><a href="./src/resources/individuals/documents.ts">GenericDocument</a></code>

Methods:

- <code title="get /individuals/{individual_id}/documents">client.individuals.documents.<a href="./src/resources/individuals/documents.ts">list</a>(individualID) -> DocumentResponse</code>
- <code title="post /individuals/{individual_id}/documents">client.individuals.documents.<a href="./src/resources/individuals/documents.ts">upload</a>(individualID, { ...params }) -> GenericDocument</code>

# Companies

Types:

- <code><a href="./src/resources/companies/companies.ts">CompanyRegistration</a></code>
- <code><a href="./src/resources/companies/companies.ts">CompanyListResponse</a></code>

Methods:

- <code title="post /companies">client.companies.<a href="./src/resources/companies/companies.ts">create</a>({ ...params }) -> CompanyRegistration</code>
- <code title="get /companies/{company_id}">client.companies.<a href="./src/resources/companies/companies.ts">retrieve</a>(companyID, { ...params }) -> CompanyRegistration</code>
- <code title="put /companies/{company_id}">client.companies.<a href="./src/resources/companies/companies.ts">update</a>(companyID, { ...params }) -> CompanyRegistration</code>
- <code title="get /companies">client.companies.<a href="./src/resources/companies/companies.ts">list</a>({ ...params }) -> CompanyListResponse</code>
- <code title="delete /companies/{company_id}">client.companies.<a href="./src/resources/companies/companies.ts">delete</a>(companyID) -> void</code>

## Documents

Methods:

- <code title="get /companies/{company_id}/documents">client.companies.documents.<a href="./src/resources/companies/documents.ts">list</a>(companyID) -> DocumentResponse</code>
- <code title="post /companies/{company_id}/documents">client.companies.documents.<a href="./src/resources/companies/documents.ts">upload</a>(companyID, { ...params }) -> GenericDocument</code>
