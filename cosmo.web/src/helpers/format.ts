class Format {
  cpnj(cnpj: string | number) {
    let cnpjStr = typeof cnpj === 'number' ? cnpj.toString() : cnpj;

    // Remove todos os caracteres não numéricos
    cnpjStr = cnpjStr.replace(/\D/g, '');

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpjStr.length !== 14) {
      throw new Error('CNPJ deve ter 14 dígitos.');
    }

    // Formata o CNPJ
    return cnpjStr.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
}

export const format = new Format();
