import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import welcomeScreen from './src/screens/welcomeScreen';
import ChooseScreen from './src/screens/choix';
import RegisterUser from './src/screens/RegisterScreenUser';
import LoginUser from './src/screens/LoginScreenUser';
import ForgotScreen from './src/screens/forgotscreen';
import RegisterScreenCompany1 from './src/screens/RegisterCompany1';
import RegisterScreenCompany2 from './src/screens/RegisterCompany2';
import RegisterScreenCompany3 from './src/screens/RegisterCompany3';
import HomeCompanyScreen from './src/screens/HomeCompanyScreen';
import LoginCompany from './src/screens/LoginCompany';
import ChooseScreen1 from './src/screens/choix1';
import Reservation from './src/screens/reservation';
import Location from './src/screens/Location';
import ProfilScreen from './src/screens/profilScreen';
import ProfilScreenCompany from './src/screens/profilScreenCompany';
import CocarScreen from './src/screens/CoCar';
import LoginPass from './src/screens/LoginPass';
import NameScreen from './src/screens/NameChangeUser';
import EmailScreen from './src/screens/EmailChange';
import PwdScreen from './src/screens/PwdChangeUser';
import StatisticScreen from './src/screens/StatisticScreen';
import PwdCompagny from './src/screens/PwdChangeCompagny';
import CompagnyScreen from './src/screens/nameChangeCompany';
import LogoScreen from './src/screens/LogoChange';
import FilterScreen from './src/screens/FilterUser';
import DayFilter from './src/components/DayFilter';
import WeekFilter from './src/components/WeekFilter';
import NoteScreen from './src/screens/NoteScreen';
import HistoryScreen from './src/screens/HistoryUser';
import Filter from './src/screens/Filter';
import PayScreen from './src/screens/PayScreen';
import VoyagesScreen from './src/screens/VoyageScreen';
import ColisScreen from './src/screens/ColiScreen';
import ReservScreen from './src/screens/ReservScreen';
import DeleteScreen from './src/screens/DeleteScreen';
import DeleteScreenCompany from './src/screens/DeleteScreenCompany';
import TicketScreen from './src/screens/Ticket';
const Stack = createStackNavigator();

const slideTransition = ({ current }) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 0], // Adjust the translation as needed
          }),
        },
      ],
    },
  };
};

// Custom transition for flip animation
const flipTransition = ({ current }) => {
  return {
    cardStyle: {
      transform: [
        {
          perspective: 1000,
        },
        {
          rotateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    },
  };
};

// Custom transition for scale animation
const scaleTransition = ({ current }) => {
  return {
    cardStyle: {
      transform: [
        {
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.9], // You can adjust the scaling as needed
          }),
        },
      ],
    },
  };
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="welcome" component={welcomeScreen} />
        <Stack.Screen name="Choose" component={ChooseScreen} />
        <Stack.Screen name="Choose1" component={ChooseScreen1} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} />
        <Stack.Screen name="LoginUser" component={LoginUser} />
        <Stack.Screen name="Forgot" component={ForgotScreen} />
        <Stack.Screen name="RegisterCompany" component={RegisterScreenCompany1} />
        <Stack.Screen name="RegisterCompany1" component={RegisterScreenCompany2} />
        <Stack.Screen name="RegisterCompany2" component={RegisterScreenCompany3} />
        <Stack.Screen name="HomeCompany" component={HomeCompanyScreen} />
        <Stack.Screen name="LoginCompany" component={LoginCompany} />
        <Stack.Screen name="FilterUser" component={FilterScreen} />
        <Stack.Screen name="Reservation" component={Reservation} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Profil" component={ProfilScreen} />
        <Stack.Screen name="ProfilCompany" component={ProfilScreenCompany} />
        <Stack.Screen name="Cocar" component={CocarScreen} />
        <Stack.Screen name="Pass" component={LoginPass} />
        <Stack.Screen name="Name" component={NameScreen} />
        <Stack.Screen name="Email" component={EmailScreen} />
        <Stack.Screen name="Password" component={PwdScreen} />
        <Stack.Screen name="Statistic" component={StatisticScreen} />
        <Stack.Screen name="PwdCompagny" component={PwdCompagny} />
        <Stack.Screen name="Compagny" component={CompagnyScreen} />
        <Stack.Screen name="Logo" component={LogoScreen} />
        <Stack.Screen name="Day" component={DayFilter} />
        <Stack.Screen name="Week" component={WeekFilter} />
        <Stack.Screen name="note" component={NoteScreen} />
        <Stack.Screen name="history" component={HistoryScreen} />
        <Stack.Screen name="Filter" component={Filter} />
        <Stack.Screen name="Pay" component={PayScreen} />
        <Stack.Screen name="Voyages" component={VoyagesScreen} />
        <Stack.Screen name="Colis" component={ColisScreen} />
        <Stack.Screen name="Reserv" component={ReservScreen} />
        <Stack.Screen name="Delete" component={DeleteScreen} />
        <Stack.Screen name="DeleteCompany" component={DeleteScreenCompany} />
        <Stack.Screen name="Ticket" component={TicketScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
