import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  interpolateColor,
} from 'react-native-reanimated';
import { View,TouchableWithoutFeedback,StyleSheet} from 'react-native';
import { Foundation } from '@expo/vector-icons'; 
import React,{useState} from 'react';

export default function AnimatedStyleUpdateExample() {
  const colorMale = useSharedValue(1);
  const sizeMale=useSharedValue(50);


  const colorFemale = useSharedValue(1);
  const sizeFemale=useSharedValue(50);

  const AnimatedIcon= Animated.createAnimatedComponent(Foundation);
  const [chek,setCheck]=useState('');
  

  const config = {
    duration: 500,
  };
  
const colorsMale = ['blue', 'gray'];
const colorsFemale = ['red', 'gray'];
  const StyleAnimateIconMale= useAnimatedProps(()=>{
    return{
      fontSize: withTiming(sizeMale.value, config),
      color: interpolateColor(colorMale.value,[0,1],colorsMale )
    }
  });
  const StyleAnimateIconFemale= useAnimatedProps(()=>{
    return{
      fontSize: withTiming(sizeFemale.value, config),
      color: interpolateColor(colorFemale.value,[0,1],colorsFemale )
    }

  });
  function Female(){
    sizeMale.value=50;
    colorMale.value=withTiming(1, config);
    sizeFemale.value=70;
    colorFemale.value=withTiming(0, config);
  }
  function Male(){
    sizeFemale.value=50;
    colorFemale.value=withTiming(1, config);
    sizeMale.value =70;
    colorMale.value=withTiming(0, config);

  }
  function Animate(gen){
     gen==='male'? Male() : Female();
     setCheck(gen);
  }
  return (
    <View
      style={styles.Container}>
          <TouchableWithoutFeedback style={styles.Button} onPress={()=>{  Animate('male') }}>
            <AnimatedIcon name="male-symbol" style={StyleAnimateIconMale}/>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback style={styles.Button} onPress={()=>{  Animate('female') }}>
            <AnimatedIcon name="female-symbol" style={StyleAnimateIconFemale}/>
        </TouchableWithoutFeedback>

    </View>
  );
}

const styles=StyleSheet.create({
  Container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',  
    flexDirection: 'row',
    
  },
  space:{
    backgroundColor:'black',
    height:50,
    width:'100%'
  },
  Button:{
    marginHorizontal:15,
  }
});