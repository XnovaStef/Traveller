import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import Navbar from '../components/tab';
import { ListItem } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function ProfilScreen() {


  const navigation = useNavigation();

  const Name = () =>{
    navigation.navigate("Name")
  }

  const Number = () =>{
    navigation.navigate("Number")
  }

  const home = () =>{
    navigation.navigate("Reservation")
  }

  const Login = () =>{
    navigation.navigate("LoginUser")
  }
  return (
    <View>
      <StatusBar style='dark' />
      <View style = {styles.profil}>
          <Text style = {{color:'#fff', fontWeight:'bold',fontSize:25,textAlign:'center',marginTop:20}}>Profil</Text>
          <View style = {{width:'80%',marginLeft:30, top:50 }}>
          <ListItem
                title="Nom"
                leading={<Icon name="face-man-profile" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={ Name}
                style={{backgroundColor: '#2C333A', color: 'white'}}
            />  
          </View>

          <View style = {{width:'80%',marginLeft:30, top:60}}>
            <ListItem
                title="email"
                leading={<Icon name="access-point-network" size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={ Number}

            />
            </View>

            <View style = {{width:'80%',marginLeft:30, top:70}}>
            <ListItem
                title="mot de passe"
                leading={<Icon name='account'size={24} />}
                trailing={props => <Icon name="chevron-right" {...props} />}
                onPress={ Number}

            />
            </View>

          <View>
              <TouchableOpacity  style = {styles.Button}>
                <Text style = {{fontWeight:'bold', alignSelf:'center',textAlign:'center',padding:6}} onPress={home}>Retour</Text>
              </TouchableOpacity>

              <TouchableOpacity  style = {styles.Button1}>
                <Text style = {{fontWeight:'bold', alignSelf:'center',textAlign:'center',padding:6, color :'#fff'}} onPress={Login}>Déconnexion</Text>
              </TouchableOpacity>
          </View>

            
      </View>
      
    </View>
  );
}

styles = StyleSheet.create({
    profil:{
      width:'80%',
      height:'75%',
      backgroundColor:'#246EC3',
      marginTop:100,
      marginLeft:35,
      borderRadius:20,
      shadowOpacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    elevation: 20,
   
    },
    Button:{
      marginTop:100,
      marginLeft:115,
      backgroundColor:'#fff',
      width:90,
      height:35,
    },
    Button1:{
      top:'35%',
      marginLeft:100,
      backgroundColor:'#F58909',
      width:110,
      height:35,
      borderRadius:5,
      shadowOpacity: 0.5,
    shadowColor:'#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    }
})


  
