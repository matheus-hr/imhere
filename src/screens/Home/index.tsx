import { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import { styles } from './styles'
import { Participant } from '../../components/Participant'


export function Home() {

  //Estados por organização devem ficar no topo da função
  
  //const[estado, funçãoQueAtualizaEstado] = useState(valorinicial)
  //parece a instanciação de um objeto com construtor?
  const[participants, setParticipants] = useState<string[]>([]); //Preciso tipar, pois o que está sendo recebido é uma lista vazia
  const[paritipantName, setParticipantName] = useState(''); //Está fazendo uma inferencia,. se ta recebemdo uma string ele entende que é uma string

  function handleParticipantAdd(){
    
    if(participants.includes(paritipantName)){ //Exists
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome")
    }

    //prevState = Estado Anterior (Pode ser qualquer nome)
    setParticipants(prevState => [...prevState, paritipantName]); //Adiciona o participante na lista junto com os anteriores

    setParticipantName(""); //Apaga o que foi digitado
  }

  function handleParticipantRemove(name: string){

    // return console.log(participants.filter(participant => participant != name));//.Select()

    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant != name))//Me traz todos os participants menos o que eu deletei
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
          onChangeText={setParticipantName}//{text => setParticipantName(text)}
          value={paritipantName} //usa como valor pradrão
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleParticipantAdd} //onClick
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
            Ninguem chegou no evento ainda? Adicione participantes a sua lista de presensa
          </Text>
        }
      />
      </View>   
  )
}
