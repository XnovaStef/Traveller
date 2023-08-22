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
import HomeUserScreen from './src/screens/FilterUser';
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


const Stack = createStackNavigator();

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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
