import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import DayFilter from '../components/DayFilter';
import WeekFilter from '../components/WeekFilter';
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav';
import Navbar1 from '../components/tab1';

const COLORS = { white: '#fff', black: '#000', orange: '#F58909', gris:'#808080' };

const StatisticScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const navigation = useNavigation(); 

  

  return (
    <View style={{ flex: 1, backgroundColor:COLORS.white }}>
      <Nav/>
        <View
          style={{
            width: '90%',
            height: 55,
            borderWidth: 0.5,
            borderColor: COLORS.white,
            backgroundColor:'white',
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 0,
            paddingRight: 0,
            left: 15,
            top:25
          }}
        >
         
        </View>

        

        
        {selectedTab === 0 ? <DayFilter /> : <WeekFilter />}
    </View>
  );
};

export default StatisticScreen;
