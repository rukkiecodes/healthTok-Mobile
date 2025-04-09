import { View, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { Appbar, PaperProvider } from 'react-native-paper'
import { ThemedView } from '@/components/ThemedView'
import { useColorScheme } from '@/hooks/useColorScheme'
import { accent, appDark, black, green, light } from '@/utils/colors'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import { ThemedText } from '@/components/ThemedText'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

export default function topDoctors () {
  const theme = useColorScheme()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const buttons = [
    'Gynaecologists',
    'Geriatricians',
    'Dieticians',
    'Cardiologists',
    'Dentists',
    'Mood Tracker'
  ]

  const renderBackdrop = useCallback((props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
    />
  ), []);

  return (
    <PaperProvider>
      <Appbar.Header
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme == 'dark' ? appDark : light,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('@/assets/images/icons/arrow_left.png')}
            style={{
              tintColor: theme == 'dark' ? light : appDark,
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>

        <ThemedText type='subtitle' font='Poppins-Bold'>Top Doctors</ThemedText>

        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.expand()}
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('@/assets/images/icons/dots_vertical.png')}
            contentFit='contain'
            style={{
              tintColor: theme == 'dark' ? light : appDark,
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      </Appbar.Header>

      <ThemedView style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ gap: 20, marginTop: 20 }}>
          <ThemedView
            style={{
              shadowColor: black,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
              padding: 20,
              borderRadius: 30,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 20
            }}
          >
            <Image
              source={require('@/assets/images/images/avatar.png')}
              contentFit='contain'
              style={{
                width: 120,
                height: 120
              }}
            />

            <View
              style={{
                flex: 1,
                height: 100
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 20
                }}
              >
                <View>
                  <ThemedText type='subtitle' font='Poppins-Bold'>Dr Majeed S.</ThemedText>
                  <ThemedText type='body' font='Poppins-Medium'>Gynaecologist</ThemedText>
                </View>

                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: green,
                    borderRadius: 50,
                    marginTop: 10
                  }}
                />
              </View>

              <ThemedView
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 20
                }}
              >
                <ThemedView
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: `${accent}20`,
                    alignSelf: 'flex-start',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                    gap: 5
                  }}
                >
                  <Image
                    source={require('@/assets/images/icons/star.png')}
                    contentFit='contain'
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: theme == 'dark' ? light : accent
                    }}
                  />

                  <ThemedText style={{ marginTop: 5 }}>4,7</ThemedText>
                </ThemedView>

                <ThemedView
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    borderRadius: 10,
                    paddingVertical: 5,
                    gap: 5
                  }}
                >
                  <Image
                    source={require('@/assets/images/icons/location_marker.png')}
                    contentFit='contain'
                    style={{
                      width: 20,
                      height: 20
                    }}
                  />

                  <ThemedText style={{ marginTop: 5 }}>300m away</ThemedText>
                </ThemedView>
              </ThemedView>
            </View>
          </ThemedView>
        </View>
      </ThemedView>

      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={[350, 500]}
        enablePanDownToClose
        enableOverDrag
        enableDynamicSizing
        animateOnMount
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView
          style={{
            flex: 1,
            padding: 36,
            gap: 20
          }}>
          {
            buttons.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  height: 50,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ThemedText type='body' font='Poppins-Medium'>{item}</ThemedText>
              </TouchableOpacity>
            ))
          }
        </BottomSheetView>
      </BottomSheet>
    </PaperProvider>
  )
}