import React, {useState} from 'react';
import { Permissions, FileSystem } from 'expo';
import { Audio } from 'expo-av';
import {
    StyleSheet, Text, View, Pressable, ActivityIndicator, Platform,
} from 'react-native'

const AudioRecorder = () => {
    const [report, setReport] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const recordingOptions = {
        android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
        },
        ios: {
            extension: '.wav',
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
        },
    }
    
    return (
        <>
        {report == false ?
            <View>
                <Pressable onPress={() => setReport(!report)}>
                    <Text>Faire un rapport</Text>
                </Pressable>
            </View>
        :
            <View>
                <Pressable>
                    <Text>Press and stay to record</Text>
                </Pressable>
            </View>
        }

        </>
    );
};

export default AudioRecorder;