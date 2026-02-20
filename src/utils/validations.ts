// src/utils/validations.ts

/**
 * Valida se um valor está preenchido (não vazio)
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Valida formato de e-mail
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Valida CNPJ com dígitos verificadores (módulo 11)
 */
export function validateCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "");

  // Verifica se tem 14 dígitos
  if (cleanCNPJ.length !== 14) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (CNPJs inválidos conhecidos)
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cleanCNPJ[i]) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;

  if (parseInt(cleanCNPJ[12]) !== digito1) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cleanCNPJ[i]) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;

  if (parseInt(cleanCNPJ[13]) !== digito2) {
    return false;
  }

  return true;
}

/**
 * Valida número de telefone/WhatsApp brasileiro
 * Aceita formatos: (11) 99999-9999, 11999999999, +55 11 99999-9999
 */
export function validatePhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[^\d]/g, "");
  // Aceita 10 dígitos (fixo) ou 11 dígitos (celular)
  // Opcionalmente com código do país (55)
  return cleanPhone.length >= 10 && cleanPhone.length <= 13;
}

/**
 * Valida CEP brasileiro (8 dígitos)
 */
export function validateCEP(cep: string): boolean {
  const cleanCEP = cep.replace(/[^\d]/g, "");
  return cleanCEP.length === 8;
}

/**
 * Valida Inscrição Estadual (apenas se preenchido)
 * Retorna true se vazio ou se tiver formato válido (apenas números, 8-14 dígitos)
 */
export function validateIE(ie: string): boolean {
  // Se vazio, é válido (campo opcional)
  if (!ie || ie.trim().length === 0) {
    return true;
  }

  const cleanIE = ie.replace(/[^\d]/g, "");
  // IE geralmente tem entre 8 e 14 dígitos
  return cleanIE.length >= 8 && cleanIE.length <= 14;
}

/**
 * Formata CNPJ para exibição: 00.000.000/0000-00
 */
export function formatCNPJ(cnpj: string): string {
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "");
  if (cleanCNPJ.length <= 2) return cleanCNPJ;
  if (cleanCNPJ.length <= 5)
    return `${cleanCNPJ.slice(0, 2)}.${cleanCNPJ.slice(2)}`;
  if (cleanCNPJ.length <= 8)
    return `${cleanCNPJ.slice(0, 2)}.${cleanCNPJ.slice(2, 5)}.${cleanCNPJ.slice(5)}`;
  if (cleanCNPJ.length <= 12)
    return `${cleanCNPJ.slice(0, 2)}.${cleanCNPJ.slice(2, 5)}.${cleanCNPJ.slice(5, 8)}/${cleanCNPJ.slice(8)}`;
  return `${cleanCNPJ.slice(0, 2)}.${cleanCNPJ.slice(2, 5)}.${cleanCNPJ.slice(5, 8)}/${cleanCNPJ.slice(8, 12)}-${cleanCNPJ.slice(12, 14)}`;
}

/**
 * Formata telefone para exibição: (00) 00000-0000
 */
export function formatPhone(phone: string): string {
  const cleanPhone = phone.replace(/[^\d]/g, "");
  if (cleanPhone.length <= 2) return cleanPhone;
  if (cleanPhone.length <= 6)
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2)}`;
  if (cleanPhone.length <= 10)
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
  return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7, 11)}`;
}

/**
 * Formata CEP para exibição: 00000-000
 */
export function formatCEP(cep: string): string {
  const cleanCEP = cep.replace(/[^\d]/g, "");
  if (cleanCEP.length <= 5) return cleanCEP;
  return `${cleanCEP.slice(0, 5)}-${cleanCEP.slice(5, 8)}`;
}
