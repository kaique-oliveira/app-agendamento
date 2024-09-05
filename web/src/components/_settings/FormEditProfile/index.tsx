import { useEffect, useState } from 'react';
import { useStore } from '../../../hooks/useStore';
import { InputComponent } from '../../InputComponent';
import { Spacing } from '../../Spacing';
import { GroupWrapper, WrapperForm } from './styles';
import { IStoreFull } from '../../../Interfaces';
import { format } from '../../../helpers/format';

type FormEditProfile = {
  onChangeProfileEdit(profile: IStoreFull): void;
};

export function FormEditProfile({ onChangeProfileEdit }: FormEditProfile) {
  const { store } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [zipCode, setZipCode] = useState(0);
  const [street, setStreet] = useState('');
  const [num, setNumber] = useState(0);
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  useEffect(() => {
    if (store) {
      setName(store.name);
      setEmail(store.email);
      setCnpj(store.cnpj);

      setZipCode(store.address.zipCode);
      setStreet(store.address.street);
      setNumber(store.address.number);
      setNeighborhood(store.address.neighborhood);
      setCity(store.address.city);
      setUf(store.address.uf);
    }
  }, []);

  useEffect(() => {
    if (
      name &&
      email &&
      cnpj &&
      zipCode &&
      street &&
      num &&
      neighborhood &&
      city &&
      uf
    ) {
      onChangeProfileEdit({
        id: store!.id,
        name,
        email,
        cnpj,
        img: [],
        address: {
          id: store!.address.id,
          zipCode,
          street,
          number: num,
          neighborhood,
          city,
          uf,
          storeId: store!.id,
        },
        operation: [],
      });
    }
  }, [name, email, cnpj, zipCode, street, num, neighborhood, city, uf]);

  return (
    <WrapperForm>
      <InputComponent
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputComponent
        placeholder="CNPJ"
        maxLength={18}
        value={format.cnpj(cnpj)}
        onChange={(e) => setCnpj(e.target.value)}
      />
      <InputComponent
        placeholder="E-mail"
        value={email}
        type="name"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Spacing spacing={16} />

      <InputComponent
        placeholder="CEP"
        value={format.cep(zipCode)}
        maxLength={9}
        onChange={(e) => setZipCode(Number(e.target.value))}
      />

      <GroupWrapper>
        <InputComponent
          placeholder="Rua"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <InputComponent
          placeholder="Número"
          type="number"
          value={num}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
      </GroupWrapper>

      <InputComponent
        placeholder="Bairro"
        value={neighborhood}
        onChange={(e) => setNeighborhood(e.target.value)}
      />

      <GroupWrapper>
        <InputComponent
          placeholder="Cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <InputComponent
          placeholder="Estado"
          value={uf}
          onChange={(e) => setUf(e.target.value)}
        />
      </GroupWrapper>
    </WrapperForm>
  );
}
