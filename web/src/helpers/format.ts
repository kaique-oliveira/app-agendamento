class Format {
  cnpj(value: number | string) {
    let cnpj = String(value);

    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length <= 14) {
      return cnpj
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }

    return cnpj.substring(0, 18);
  }
  dataScheduled(date: Date) {
    return `${date
      .toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: '2-digit',
      })
      .replace('.', '')} ${date.toLocaleDateString('pt-BR', {
      month: 'short',
    })}`.replace('.', '');
  }
  dataScheduledFull(date: Date) {
    return `${date
      .toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
      })
      .replace('.', '')} ${date.toLocaleDateString('pt-BR', {
      month: 'long',
    })}`.replace('.', '');
  }
  hourScheduled(date: string) {
    return date.split('T')[1].substring(0, 5);
  }
  cep(value: string | number): string {
    let cep = String(value);

    cep = cep.replace(/\D/g, '');

    if (cep.length <= 8) {
      return cep.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    return cep.substring(0, 9);
  }
}

export const format = new Format();
