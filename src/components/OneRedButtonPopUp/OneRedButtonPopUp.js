import React from 'react';
import {View, Image, TouchableOpacity, Text, Modal, Dimensions} from 'react-native';

export default OneRedButtonPopUp = ({
  headerImage,
  hasTitle = false,
  title,
  description,
  button1Text,
  button1Color,
  button1Handler,
  isVisible = true,
}) => {
  console.log('Really its very frustating...!!!');

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#000000B2',
          justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <View
          style={{
            margin: 20,
            padding: 20,
            backgroundColor: '#ffffff',
            borderRadius: 2,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Image source={headerImage} />
          </View>
          {hasTitle ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
              }}>
              <Text
                style={{
                  color: '#323237',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {title}
              </Text>
            </View>
          ) : null}
          <View
            style={{
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#323237',
                fontSize: 14,
                textAlign: 'center',
              }}>
              {description}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              // flex: 1,
              height: 40,
              borderRadius: 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: button1Color,
              margin: 20,
            }}
            activeOpacity={1}
            onPress={button1Handler}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
              }}>
              {button1Text}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
