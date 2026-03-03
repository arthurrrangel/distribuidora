// src/services/customerService.ts
import api from "./api";
import {
  CustomerFull,
  Address,
  UpdateCustomerInput,
  AddressInput,
  CustomerUserError,
} from "@/types/shopify";

// --- FRAGMENTOS ---

const ADDRESS_FRAGMENT = `
  id
  firstName
  lastName
  address1
  address2
  city
  province
  country
  zip
  phone
`;

const CUSTOMER_FULL_FRAGMENT = `
  id
  firstName
  lastName
  email
  phone
  createdAt
  defaultAddress {
    ${ADDRESS_FRAGMENT}
  }
  addresses(first: 20) {
    edges {
      node {
        ${ADDRESS_FRAGMENT}
      }
    }
  }
`;

// --- INTERFACES INTERNAS ---

interface MutationResult<T> {
  data: T | null;
  userErrors: CustomerUserError[];
}

// --- FUNÇÕES DO SERVICE ---

/**
 * Busca o cliente autenticado completo via Storefront API.
 */
export async function getCustomer(token: string): Promise<CustomerFull> {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        ${CUSTOMER_FULL_FRAGMENT}
      }
    }
  `;

  const response = await api.post("", {
    query,
    variables: { customerAccessToken: token },
  });

  const customer = response.data.data?.customer;

  if (!customer) {
    throw new Error("Cliente não encontrado ou sessão expirada.");
  }

  return customer as CustomerFull;
}

/**
 * Atualiza os dados cadastrais do cliente.
 */
export async function updateCustomer(
  token: string,
  data: UpdateCustomerInput,
): Promise<MutationResult<CustomerFull>> {
  const mutation = `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          ${CUSTOMER_FULL_FRAGMENT}
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await api.post("", {
    query: mutation,
    variables: {
      customerAccessToken: token,
      customer: data,
    },
  });

  const payload = response.data.data?.customerUpdate;

  return {
    data: payload?.customer ?? null,
    userErrors: payload?.customerUserErrors ?? [],
  };
}

/**
 * Cria um novo endereço para o cliente.
 */
export async function createAddress(
  token: string,
  address: AddressInput,
): Promise<MutationResult<Address>> {
  const mutation = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
          ${ADDRESS_FRAGMENT}
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await api.post("", {
    query: mutation,
    variables: {
      customerAccessToken: token,
      address,
    },
  });

  const payload = response.data.data?.customerAddressCreate;

  return {
    data: payload?.customerAddress ?? null,
    userErrors: payload?.customerUserErrors ?? [],
  };
}

/**
 * Atualiza um endereço existente do cliente.
 */
export async function updateAddress(
  token: string,
  addressId: string,
  address: AddressInput,
): Promise<MutationResult<Address>> {
  const mutation = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress {
          ${ADDRESS_FRAGMENT}
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await api.post("", {
    query: mutation,
    variables: {
      customerAccessToken: token,
      id: addressId,
      address,
    },
  });

  const payload = response.data.data?.customerAddressUpdate;

  return {
    data: payload?.customerAddress ?? null,
    userErrors: payload?.customerUserErrors ?? [],
  };
}

/**
 * Deleta um endereço do cliente.
 */
export async function deleteAddress(
  token: string,
  addressId: string,
): Promise<MutationResult<{ deletedCustomerAddressId: string }>> {
  const mutation = `
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        deletedCustomerAddressId
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await api.post("", {
    query: mutation,
    variables: {
      customerAccessToken: token,
      id: addressId,
    },
  });

  const payload = response.data.data?.customerAddressDelete;

  return {
    data: payload?.deletedCustomerAddressId
      ? { deletedCustomerAddressId: payload.deletedCustomerAddressId }
      : null,
    userErrors: payload?.customerUserErrors ?? [],
  };
}

/**
 * Define um endereço como padrão do cliente.
 */
export async function setDefaultAddress(
  token: string,
  addressId: string,
): Promise<MutationResult<CustomerFull>> {
  const mutation = `
    mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
      customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
        customer {
          ${CUSTOMER_FULL_FRAGMENT}
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await api.post("", {
    query: mutation,
    variables: {
      customerAccessToken: token,
      addressId,
    },
  });

  const payload = response.data.data?.customerDefaultAddressUpdate;

  return {
    data: payload?.customer ?? null,
    userErrors: payload?.customerUserErrors ?? [],
  };
}
