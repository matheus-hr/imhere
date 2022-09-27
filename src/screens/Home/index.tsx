import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import { styles } from './styles'
import { Participant } from '../../components/Participant'


export function Home() {

  const participants = ['Rodrigo', 'Matheus', 'Gabriel', 'Henrique', 'Ana', 'Carina', 'Marquinhos', 'João', 'Pedrinho', 'Julio', 'Paulo']

  function handleParticipantAdd(){
    if(participants.includes("Matheus")){
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome")
    }
  }

  function handleParticipantRemove(name: string){
    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => Alert.alert("Deletado!")
      },
      {
        text: "Não",
        style: 'cancel'
      }
    ]);
  }

  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do Evento
      </Text>
      
      <Text style={styles.eventDate}>
        Sexta, 4 de janeiro de 2022
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor="#6B6B6B"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
            <Participant 
              key={item}
              name={item}
              onRemove={() => handleParticipantRemove(item)}
            />
          )
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          <Text style={(styles.listEmpty)}>
            Ninguem chegou bo evento ainda? Adicione participantes a sua lista de presensa
          </Text>
        }
      />
      </View>

      
  )
}
