import { Header } from '@/components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@/components/Highlight';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { router } from 'expo-router';
import { useState } from 'react';
import { groupCreate } from '@/storage/group/groupCreate';
import { AppError } from '@/utils/AppError';
import { Alert } from 'react-native';

export function NewGroup() {
  const [group, setGroup] = useState('');

  function handleNew() {
    if (group.trim().length === 0) {
      return Alert.alert('Novo Grupo', 'Informe o nome da turma.');
    }

    groupCreate(group)
      .then(() => {
        router.navigate({ pathname: '/players', params: { group } });
      })
      .catch((err) => {
        if (err instanceof AppError) {
          return Alert.alert('Novo Grupo', err.message);
        }
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.');
      });
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Nova turma" subTitle="crie uma turma para adicionar pessoas" />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
